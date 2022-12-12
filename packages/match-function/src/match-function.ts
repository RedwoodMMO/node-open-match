import {
  openmatchMatch,
  openmatchMatchProfile,
  openmatchRunRequest,
  openmatchTicket,
  QueryServiceService,
} from "@node-open-match/api";
import { v4 as uuidv4 } from "uuid";

const matchName = "basic-matchfunction";
const ticketsPerPoolPerMatch = 4;

export function makeMatches(
  profile: openmatchMatchProfile,
  poolTickets: Map<string, openmatchTicket[]>
): openmatchMatch[] {
  const matches: openmatchMatch[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    let insufficientTickets = false;
    const matchTickets: openmatchTicket[] = [];

    for (const [pool, tickets] of poolTickets) {
      if (tickets.length < ticketsPerPoolPerMatch) {
        // This pool is completely drained out. Stop creating matches.
        insufficientTickets = true;
        break;
      }

      // Remove the Tickets from this pool and add to the match proposal.
      matchTickets.push(...tickets.slice(0, ticketsPerPoolPerMatch));
      tickets.splice(0, ticketsPerPoolPerMatch);
    }

    if (insufficientTickets) {
      break;
    }

    matches.push({
      match_id: `profile-${profile.name}-${uuidv4()}`,
      match_profile: profile.name,
      match_function: matchName,
      tickets: matchTickets,
    });
  }

  return matches;
}

export async function run(request: openmatchRunRequest) {
  console.log(`Generating proposals for function ${request.profile?.name}`);

  for (const pool of request.profile!.pools!) {
    const res = await QueryServiceService.queryServiceQueryTickets({
      body: {
        pool,
      },
    });
    console.log(res);
  }

  const poolTickets = new Map<string, openmatchTicket[]>(); // todo

  const proposals = makeMatches(request.profile!, poolTickets);

  for (const proposal of proposals) {
    // todo: stream proposal over?
  }
}
