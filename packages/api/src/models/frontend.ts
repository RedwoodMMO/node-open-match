/** Generate by swagger-axios-codegen */
/* eslint-disable */

import { basePath, openmatchAcknowledgeBackfillRequest, openmatchAcknowledgeBackfillResponse, openmatchBackfill, openmatchCreateBackfillRequest, openmatchCreateTicketRequest, openmatchTicket, openmatchUpdateBackfillRequest } from './common';
import { IRequestOptions, IRequestConfig, getConfigs, axios } from './serviceOptions';

// customer definition
// empty

export class FrontendServiceService {
  /**
 * CreateBackfill creates a new Backfill object.
BETA FEATURE WARNING:  This call and the associated Request and Response
messages are not finalized and still subject to possible change or removal.
 */
  static frontendServiceCreateBackfill(
    params: {
      /**  */
      body: openmatchCreateBackfillRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<openmatchBackfill> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/v1/frontendservice/backfills';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
 * UpdateBackfill updates search_fields and extensions for the backfill with the provided id.
Any tickets waiting for this backfill will be returned to the active pool, no longer pending.
BETA FEATURE WARNING:  This call and the associated Request and Response
messages are not finalized and still subject to possible change or removal.
 */
  static frontendServiceUpdateBackfill(
    params: {
      /**  */
      body: openmatchUpdateBackfillRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<openmatchBackfill> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/v1/frontendservice/backfills';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
 * GetBackfill returns a backfill object by its ID.
BETA FEATURE WARNING:  This call and the associated Request and Response
messages are not finalized and still subject to possible change or removal.
 */
  static frontendServiceGetBackfill(
    params: {
      /** An existing ID of Backfill to retrieve. */
      backfillId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<openmatchBackfill> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/v1/frontendservice/backfills/{backfill_id}';
      url = url.replace('{backfill_id}', params['backfillId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
 * DeleteBackfill receives a backfill ID and deletes its resource.
Any tickets waiting for this backfill will be returned to the active pool, no longer pending.
BETA FEATURE WARNING:  This call and the associated Request and Response
messages are not finalized and still subject to possible change or removal.
 */
  static frontendServiceDeleteBackfill(
    params: {
      /** An existing ID of Backfill to delete. */
      backfillId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any | null> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/v1/frontendservice/backfills/{backfill_id}';
      url = url.replace('{backfill_id}', params['backfillId'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
 * AcknowledgeBackfill is used to notify OpenMatch about GameServer connection info
This triggers an assignment process.
BETA FEATURE WARNING: This call and the associated Request and Response
messages are not finalized and still subject to possible change or removal.
 */
  static frontendServiceAcknowledgeBackfill(
    params: {
      /** An existing ID of Backfill to acknowledge. */
      backfillId: string;
      /**  */
      body: openmatchAcknowledgeBackfillRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<openmatchAcknowledgeBackfillResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/v1/frontendservice/backfills/{backfill_id}/acknowledge';
      url = url.replace('{backfill_id}', params['backfillId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
 * CreateTicket assigns an unique TicketId to the input Ticket and record it in state storage.
A ticket is considered as ready for matchmaking once it is created.
  - If a TicketId exists in a Ticket request, an auto-generated TicketId will override this field.
  - If SearchFields exist in a Ticket, CreateTicket will also index these fields such that one can query the ticket with query.QueryTickets function.
 */
  static frontendServiceCreateTicket(
    params: {
      /**  */
      body: openmatchCreateTicketRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<openmatchTicket> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/v1/frontendservice/tickets';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * GetTicket get the Ticket associated with the specified TicketId.
   */
  static frontendServiceGetTicket(
    params: {
      /** A TicketId of a generated Ticket. */
      ticketId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<openmatchTicket> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/v1/frontendservice/tickets/{ticket_id}';
      url = url.replace('{ticket_id}', params['ticketId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
 * DeleteTicket immediately stops Open Match from using the Ticket for matchmaking and removes the Ticket from state storage.
The client should delete the Ticket when finished matchmaking with it.
 */
  static frontendServiceDeleteTicket(
    params: {
      /** A TicketId of a generated Ticket to be deleted. */
      ticketId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any | null> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/v1/frontendservice/tickets/{ticket_id}';
      url = url.replace('{ticket_id}', params['ticketId'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
 * WatchAssignments stream back Assignment of the specified TicketId if it is updated.
  - If the Assignment is not updated, GetAssignment will retry using the configured backoff strategy.
 */
  static frontendServiceWatchAssignments(
    params: {
      /** A TicketId of a generated Ticket to get updates on. */
      ticketId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/v1/frontendservice/tickets/{ticket_id}/assignments';
      url = url.replace('{ticket_id}', params['ticketId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}
