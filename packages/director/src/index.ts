import config from "config";
import {
  BackendServiceService,
  openmatchFetchMatchesResponse,
  openmatchFunctionConfigType,
  openmatchMatch,
  openmatchMatchProfile,
} from "@open-match/api";
import { randomInt } from "crypto";
import waitOn from "wait-on";
import { generateProfiles } from "./profile";

async function sleep(seconds: number): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));
}

async function fetch(
  profile: openmatchMatchProfile
): Promise<openmatchMatch[]> {
  const res = await BackendServiceService.backendServiceFetchMatches(
    {
      body: {
        profile,
        config: {
          host: config.get<string>("match-function.host"),
          port: config.get<number>("match-function.port"),
          type: openmatchFunctionConfigType.REST,
        },
      },
    },
    {
      url: config.get<string>("open-match.backend.endpoint"),
    }
  );

  type ResponseWrapper = {
    result: openmatchFetchMatchesResponse;
  };

  if (typeof res === "string") {
    const lines = res.split("\n");
    const nonEmptyLines = lines.filter((line) => line.trim() !== "");

    const finalResult: ResponseWrapper[] = JSON.parse(
      `[${nonEmptyLines.join(",")}]`
    );

    const matches: openmatchMatch[] = finalResult
      .filter((response) => typeof response.result.match !== "undefined")
      .map((response) => {
        return response.result.match!;
      });

    return matches;
  } else {
    if (typeof res.error !== "undefined") {
      throw new Error(res.error.message);
    } else {
      return [(res as ResponseWrapper).result.match!];
    }
  }
}

async function assign(matches: openmatchMatch[]) {
  for (const match of matches) {
    const ticketIDs: string[] = [];

    if (match.tickets) {
      for (const ticket of match.tickets) {
        ticketIDs.push(ticket.id!);
      }
    }

    if (ticketIDs.length === 0) {
      continue;
    }

    const connectionString = `${randomInt(256)}.${randomInt(256)}.${randomInt(
      256
    )}.${randomInt(256)}:2222`;

    const res = await BackendServiceService.backendServiceAssignTickets(
      {
        body: {
          assignments: [
            {
              ticket_ids: ticketIDs,
              assignment: {
                connection: connectionString,
              },
            },
          ],
        },
      },
      {
        url: config.get<string>("open-match.backend.endpoint"),
      }
    );

    if (res.failures) {
      for (const failure of res.failures) {
        console.log(
          `AssignTickets failed for ticket ${failure.ticket_id}: ${failure.cause}`
        );
      }
    }
  }
}

(async () => {
  await waitOn({
    resources: [config.get<string>("open-match.backend.endpoint")],
    validateStatus: (status) => status === 404,
  });

  const profiles = generateProfiles();
  console.log(`Fetching matches for ${profiles.length} profiles`);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const promises: Promise<any>[] = [];

    for (const profile of profiles) {
      const promise = fetch(profile);

      promise.catch((reason) => {
        console.log(
          `Failed to fetch matches for profile ${profile.name}, got ${reason}`
        );
      });

      promise.then((matches) => {
        console.log(
          `Generated ${matches.length} matches for profile ${profile.name}`
        );

        return assign(matches);
      });

      promises.push(promise);
    }

    await Promise.all(promises);

    await sleep(5);
  }
})();
