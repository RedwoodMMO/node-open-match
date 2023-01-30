import config from "config";
import express from "express";
import {
  openmatchMatchProfile,
  openmatchPool,
  openmatchQueryTicketsResponse,
  openmatchTicket,
  QueryServiceService,
} from "@node-open-match/api";
import concat from "concat-stream";
import { makeAndStreamMatches } from "./match-function";

async function QueryPools(
  pools: openmatchPool[]
): Promise<Map<string, openmatchTicket[]>> {
  const poolTickets = new Map<string, openmatchTicket[]>();

  for (const pool of pools) {
    const res = await QueryServiceService.queryServiceQueryTickets(
      {
        body: {
          pool,
        },
      },
      {
        url: config.get<string>("open-match.query.endpoint"),
      }
    );

    type ResponseWrapper = {
      result: openmatchQueryTicketsResponse;
    };

    if (typeof res === "string") {
      const lines = res.split("\n");
      const nonEmptyLines = lines.filter((line) => line.trim() !== "");

      const finalResult: ResponseWrapper[] = JSON.parse(
        `[${nonEmptyLines.join(",")}]`
      );

      const tickets: openmatchTicket[][] = finalResult
        .filter((response) => typeof response.result.tickets !== "undefined")
        .map((response) => {
          return response.result.tickets!;
        });

      poolTickets.set(pool.name!, tickets.flat());
    } else {
      if (typeof res.error !== "undefined") {
        throw new Error(res.error.message);
      } else {
        poolTickets.set(pool.name!, (res as ResponseWrapper).result.tickets!);
      }
    }
  }

  return poolTickets;
}

(async () => {
  const app = express();

  app.use((req, res, next) => {
    req.pipe(
      concat((data) => {
        req.body = JSON.parse(data.toString());
        next();
      })
    );
  });

  app.post("/v1/matchfunction:run", async (req, res) => {
    const profile: openmatchMatchProfile = req.body.profile;

    const poolTickets = await QueryPools(profile.pools!);

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    });

    makeAndStreamMatches(profile, poolTickets, res);

    res.end();
  });

  const port = config.get<number>("match-function.port");
  app.listen(port, () => {
    console.log(`Match function server listening on port ${port}`);
  });
})();
