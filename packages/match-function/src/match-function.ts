import { openmatchMatchProfile, openmatchTicket } from "@open-match/api";
import { Writable } from "stream";
import { v4 as uuidv4 } from "uuid";

const matchName = "basic-matchfunction";
const ticketsPerPoolPerMatch = 4;

export function makeAndStreamMatches(
  profile: openmatchMatchProfile,
  poolTickets: Map<string, openmatchTicket[]>,
  output: Writable
) {
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

    output.write(
      JSON.stringify({
        result: {
          proposal: {
            match_id: `profile-${profile.name}-${uuidv4()}`,
            match_profile: profile.name,
            match_function: matchName,
            tickets: matchTickets,
          },
        },
      })
    );
  }
}
