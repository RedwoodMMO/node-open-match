/** Generate by swagger-axios-codegen */
/* eslint-disable */

import { basePath, openmatchRunRequest } from './common';
import { IRequestOptions, IRequestConfig, getConfigs, axios } from './serviceOptions';

// customer definition
// empty

export class MatchFunctionService {
  /**
 * DO NOT CALL THIS FUNCTION MANUALLY. USE backend.FetchMatches INSTEAD.
Run pulls Tickets that satisfy Profile constraints from QueryService,
runs matchmaking logic against them, then constructs and streams back
match candidates to the Backend service.
 */
  static matchFunctionRun(
    params: {
      /**  */
      body: openmatchRunRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/v1/matchfunction:run';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}
