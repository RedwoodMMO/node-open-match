import config from "config";
import waitOn from "wait-on";
import { FrontendServiceService, openmatchTicket } from "@node-open-match/api";
import { makeTicket } from "./ticket";

// Number of tickets created per iteration
const ticketsPerIter = 20;

async function sleep(seconds: number): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));
}

async function deleteOnAssign(ticket: openmatchTicket) {
  let retrievedTicket: openmatchTicket | undefined;
  while (typeof retrievedTicket?.assignment === "undefined") {
    await sleep(1);

    try {
      retrievedTicket = await FrontendServiceService.frontendServiceGetTicket(
        {
          ticketId: ticket.id!,
        },
        {
          url: config.get<string>("open-match.frontend.endpoint"),
        }
      );
    } catch (e: any) {
      console.error(`Failed to Get Ticket ${ticket.id}, got ${e}`);
      process.exit(1);
    }
  }

  console.log(
    `Ticket ${retrievedTicket.id} got assignment ${retrievedTicket.assignment}`
  );

  try {
    await FrontendServiceService.frontendServiceDeleteTicket(
      {
        ticketId: ticket.id!,
      },
      {
        url: config.get<string>("open-match.frontend.endpoint"),
      }
    );
  } catch (e: any) {
    console.error(`Failed to Delete Ticket ${ticket.id}, got ${e}`);
  }
}

(async () => {
  await waitOn({
    resources: [config.get<string>("open-match.frontend.endpoint")],
    validateStatus: (status) => status === 404,
  });

  // eslint-disable-next-line no-constant-condition
  while (true) {
    for (let i = 0; i < ticketsPerIter; i++) {
      let ticket: openmatchTicket;
      try {
        ticket = await makeTicket();
      } catch (e: any) {
        console.log(`Failed to Create Ticket, got ${e}`);
        continue;
      }

      if (!ticket.id) {
        console.log(`Created a ticket, but it doesn't have an id: ${ticket}`);
        continue;
      }

      console.log(`Ticket created successfully, id: ${ticket.id}`);

      deleteOnAssign(ticket);
    }

    await sleep(5);
  }
})();
