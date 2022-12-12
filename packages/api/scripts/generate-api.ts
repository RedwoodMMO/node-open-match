import { codegen } from "swagger-axios-codegen";
import { ISwaggerOptions } from "swagger-axios-codegen/dist/baseInterfaces";

const version = "1.5.0";
const baseUrl = `https://storage.googleapis.com/open-match-chart/api/v${version}`;

const baseOptions: ISwaggerOptions = {
  methodNameMode: "operationId",
  modelMode: "interface",
  strictNullChecks: true,
  sharedServiceOptions: true,
  outputDir: "src/models",
};

codegen({
  ...baseOptions,
  fileName: "frontend.ts",
  remoteUrl: `${baseUrl}/frontend.swagger.json`,
});

codegen({
  ...baseOptions,
  fileName: "backend.ts",
  remoteUrl: `${baseUrl}/backend.swagger.json`,
});

codegen({
  ...baseOptions,
  fileName: "query.ts",
  remoteUrl: `${baseUrl}/query.swagger.json`,
});

codegen({
  ...baseOptions,
  fileName: "match-function.ts",
  remoteUrl: `${baseUrl}/matchfunction.swagger.json`,
});

codegen({
  ...baseOptions,
  fileName: "evaluator.ts",
  remoteUrl: `${baseUrl}/evaluator.swagger.json`,
});
