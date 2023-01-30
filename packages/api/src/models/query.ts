/** Generate by swagger-axios-codegen */
/* eslint-disable */

import { openmatchQueryBackfillsRequest, openmatchQueryTicketIdsRequest, openmatchQueryTicketsRequest } from './common';
import { IRequestOptions, IRequestConfig, getConfigs, axios } from './serviceOptions';

// customer definition
// empty

export class QueryServiceService {
  /**
 * QueryBackfills gets a list of Backfills.
BETA FEATURE WARNING:  This call and the associated Request and Response
messages are not finalized and still subject to possible change or removal.
 */
  static queryServiceQueryBackfills(
    params: {
      /**  */
      body: openmatchQueryBackfillsRequest;
    } = {} as any,
    options: IRequestOptions
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = options.url + '/v1/queryservice/backfills:query';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
 * QueryTicketIds gets the list of TicketIDs that meet all the filtering criteria requested by the pool.
  - If the Pool contains no Filters, QueryTicketIds will return all TicketIDs in the state storage.
QueryTicketIds pages the TicketIDs by `queryPageSize` and stream back responses.
  - queryPageSize is default to 1000 if not set, and has a minimum of 10 and maximum of 10000.
 */
  static queryServiceQueryTicketIds(
    params: {
      /**  */
      body: openmatchQueryTicketIdsRequest;
    } = {} as any,
    options: IRequestOptions
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = options.url + '/v1/queryservice/ticketids:query';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
 * QueryTickets gets a list of Tickets that match all Filters of the input Pool.
  - If the Pool contains no Filters, QueryTickets will return all Tickets in the state storage.
QueryTickets pages the Tickets by `queryPageSize` and stream back responses.
  - queryPageSize is default to 1000 if not set, and has a minimum of 10 and maximum of 10000.
 */
  static queryServiceQueryTickets(
    params: {
      /**  */
      body: openmatchQueryTicketsRequest;
    } = {} as any,
    options: IRequestOptions
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = options.url + '/v1/queryservice/tickets:query';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}
