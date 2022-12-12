import config from "config";
import {
  BackendServiceService,
  openmatchFunctionConfigType,
  openmatchMatch,
  openmatchMatchProfile,
} from "@node-open-match/api";
import { randomInt } from "crypto";
import { generateProfiles } from "./profile";

async function sleep(seconds: number): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));
}

async function fetch(
  profile: openmatchMatchProfile
): Promise<openmatchMatch[]> {
  const res = await BackendServiceService.backendServiceFetchMatches({
    body: {
      profile,
      config: {
        host: config.get<string>("match-function.host"),
        port: config.get<number>("match-function.port"),
        type: openmatchFunctionConfigType.REST,
      },
    },
  });
  console.log(res);
  return [];
}

async function assign(matches: openmatchMatch[]) {
  for (const match of matches) {
    const ticketIDs: string[] = [];

    if (match.tickets) {
      for (const ticket of match.tickets) {
        ticketIDs.push(ticket.id!);
      }
    }

    const connectionString = `${randomInt(256)}.${randomInt(256)}.${randomInt(
      256
    )}.${randomInt(256)}:2222`;

    const res = await BackendServiceService.backendServiceAssignTickets({
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
    });

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

      promises.push(fetch(profile));
    }

    await Promise.all(promises);

    await sleep(5);
  }
})();
