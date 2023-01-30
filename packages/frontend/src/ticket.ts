import config from "config";
import { FrontendServiceService, openmatchTicket } from "@open-match/api";
import { modes } from "./modes";

export async function makeTicket(): Promise<openmatchTicket> {
  const randomMode = modes[Math.round(Math.random() * (modes.length - 1))];
  const ticket = await FrontendServiceService.frontendServiceCreateTicket(
    {
      body: {
        ticket: {
          search_fields: {
            tags: [randomMode],
          },
        },
      },
    },
    {
      url: config.get<string>("open-match.frontend.endpoint"),
    }
  );

  return ticket;
}
