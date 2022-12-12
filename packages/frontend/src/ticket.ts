import { FrontendServiceService, openmatchTicket } from "@node-open-match/api";
import { modes } from "./modes";

export async function makeTicket(): Promise<openmatchTicket> {
  const randomMode = modes[Math.round(Math.random() * (modes.length - 1))];
  const ticket = await FrontendServiceService.frontendServiceCreateTicket({
    body: {
      ticket: {
        search_fields: {
          tags: [randomMode],
        },
      },
    },
  });

  return ticket;
}
