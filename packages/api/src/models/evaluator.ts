/** Generate by swagger-axios-codegen */
/* eslint-disable */

import { openmatchEvaluateRequest } from './common';
import { IRequestOptions, IRequestConfig, getConfigs, axios } from './serviceOptions';

// customer definition
// empty

export class EvaluatorService {
  /**
   * Evaluate evaluates a list of proposed matches based on quality, collision status, and etc, then shortlist the matches and returns the final results.
   */
  static evaluatorEvaluate(
    params: {
      /**  (streaming inputs) */
      body: openmatchEvaluateRequest;
    } = {} as any,
    options: IRequestOptions
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = options.url + '/v1/evaluator/matches:evaluate';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}
