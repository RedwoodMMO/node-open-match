/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */
import config from "config";

export const basePath = config.get<string>("open-match.http-endpoint");

export type IList<T> = Array<T>;
export type List<T> = Array<T>;
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export type Dictionary<TValue> = IDictionary<TValue>;

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

export interface openmatchAcknowledgeBackfillRequest {
  /** An existing ID of Backfill to acknowledge. */
  backfill_id?: string;

  /** An updated Assignment of the requested Backfill. */
  assignment?: openmatchAssignment;
}

export interface openmatchAcknowledgeBackfillResponse {
  /** The Backfill that was acknowledged. */
  backfill?: openmatchBackfill;

  /**  */
  tickets?: openmatchTicket[];
}

export interface openmatchAssignment {
  /** Connection information for this Assignment. */
  connection?: string;

  /** Customized information not inspected by Open Match, to be used by the match
making function, evaluator, and components making calls to Open Match.
Optional, depending on the requirements of the connected systems. */
  extensions?: object;
}

export interface openmatchBackfill {
  /** Id represents an auto-generated Id issued by Open Match. */
  id?: string;

  /** Search fields are the fields which Open Match is aware of, and can be used
when specifying filters. */
  search_fields?: openmatchSearchFields;

  /** Customized information not inspected by Open Match, to be used by
the Match Function, evaluator, and components making calls to Open Match.
Optional, depending on the requirements of the connected systems. */
  extensions?: object;

  /** Customized information not inspected by Open Match, to be kept persistent
throughout the life-cycle of a backfill.
Optional, depending on the requirements of the connected systems. */
  persistent_field?: object;

  /** Create time is the time the Ticket was created. It is populated by Open
Match at the time of Ticket creation. */
  create_time?: Date;

  /** Generation gets incremented on GameServers update operations.
Prevents the MMF from overriding a newer version from the game server.
Do NOT read or write to this field, it is for internal tracking, and changing the value will cause bugs. */
  generation?: string;
}

export interface openmatchCreateBackfillRequest {
  /** An empty Backfill object. */
  backfill?: openmatchBackfill;
}

export interface openmatchCreateTicketRequest {
  /** A Ticket object with SearchFields defined. */
  ticket?: openmatchTicket;
}

export interface openmatchSearchFields {
  /** Float arguments.  Filterable on ranges. */
  double_args?: object;

  /** String arguments.  Filterable on equality. */
  string_args?: object;

  /** Filterable on presence or absence of given value. */
  tags?: string[];
}

export interface openmatchTicket {
  /** Id represents an auto-generated Id issued by Open Match. */
  id?: string;

  /** An Assignment represents a game server assignment associated with a Ticket,
or whatever finalized matched state means for your use case.
Open Match does not require or inspect any fields on Assignment. */
  assignment?: openmatchAssignment;

  /** Search fields are the fields which Open Match is aware of, and can be used
when specifying filters. */
  search_fields?: openmatchSearchFields;

  /** Customized information not inspected by Open Match, to be used by the match
making function, evaluator, and components making calls to Open Match.
Optional, depending on the requirements of the connected systems. */
  extensions?: object;

  /** Customized information not inspected by Open Match, to be kept persistent
throughout the life-cycle of a ticket.
Optional, depending on the requirements of the connected systems. */
  persistent_field?: object;

  /** Create time is the time the Ticket was created. It is populated by Open
Match at the time of Ticket creation. */
  create_time?: Date;
}

export interface openmatchUpdateBackfillRequest {
  /** A Backfill object with ID set and fields to update. */
  backfill?: openmatchBackfill;
}

export interface openmatchWatchAssignmentsResponse {
  /** An updated Assignment of the requested Ticket. */
  assignment?: openmatchAssignment;
}

export interface protobufAny {
  /** A URL/resource name that uniquely identifies the type of the serialized
protocol buffer message. This string must contain at least
one "/" character. The last segment of the URL's path must represent
the fully qualified name of the type (as in
`path/google.protobuf.Duration`). The name should be in a canonical form
(e.g., leading "." is not accepted).

In practice, teams usually precompile into the binary all types that they
expect it to use in the context of Any. However, for URLs which use the
scheme `http`, `https`, or no scheme, one can optionally set up a type
server that maps type URLs to message definitions as follows:

* If no scheme is provided, `https` is assumed.
* An HTTP GET on the URL must yield a [google.protobuf.Type][]
  value in binary format, or produce an error.
* Applications are allowed to cache lookup results based on the
  URL, or have them precompiled into a binary to avoid any
  lookup. Therefore, binary compatibility needs to be preserved
  on changes to types. (Use versioned type names to manage
  breaking changes.)

Note: this functionality is not currently available in the official
protobuf release, and it is not used for type URLs beginning with
type.googleapis.com.

Schemes other than `http`, `https` (or the empty scheme) might be
used with implementation specific semantics. */
  type_url?: string;

  /** Must be a valid serialized protocol buffer of the above specified type. */
  value?: string;
}

export interface rpcStatus {
  /** The status code, which should be an enum value of [google.rpc.Code][google.rpc.Code]. */
  code?: number;

  /** A developer-facing error message, which should be in English. Any
user-facing error message should be localized and sent in the
[google.rpc.Status.details][google.rpc.Status.details] field, or localized by the client. */
  message?: string;

  /** A list of messages that carry the error details.  There is a common set of
message types for APIs to use. */
  details?: protobufAny[];
}

export interface openmatchAssignTicketsRequest {
  /** Assignments is a list of assignment groups that contain assignment and the Tickets to which they should be applied. */
  assignments?: openmatchAssignmentGroup[];
}

export interface openmatchAssignTicketsResponse {
  /** Failures is a list of all the Tickets that failed assignment along with the cause of failure. */
  failures?: openmatchAssignmentFailure[];
}

export interface openmatchAssignmentFailure {
  /**  */
  ticket_id?: string;

  /**  */
  cause?: AssignmentFailureCause;
}

export interface openmatchAssignmentGroup {
  /** TicketIds is a list of strings representing Open Match generated Ids which apply to an Assignment. */
  ticket_ids?: string[];

  /** An Assignment specifies game connection related information to be associated with the TicketIds. */
  assignment?: openmatchAssignment;
}

export interface openmatchDoubleRangeFilter {
  /** Name of the ticket's search_fields.double_args this Filter operates on. */
  double_arg?: string;

  /** Maximum value. */
  max?: number;

  /** Minimum value. */
  min?: number;

  /** Defines the bounds to apply when filtering tickets by their search_fields.double_args value.
BETA FEATURE WARNING: This field and the associated values are
not finalized and still subject to possible change or removal. */
  exclude?: DoubleRangeFilterExclude;
}

export interface openmatchFetchMatchesRequest {
  /** A configuration for the MatchFunction server of this FetchMatches call. */
  config?: openmatchFunctionConfig;

  /** A MatchProfile that will be sent to the MatchFunction server of this FetchMatches call. */
  profile?: openmatchMatchProfile;
}

export interface openmatchFetchMatchesResponse {
  /** A Match generated by the user-defined MMF with the specified MatchProfiles.
A valid Match response will contain at least one ticket. */
  match?: openmatchMatch;
}

export interface openmatchFunctionConfig {
  /**  */
  host?: string;

  /**  */
  port?: number;

  /**  */
  type?: openmatchFunctionConfigType;
}

export interface openmatchMatch {
  /** A Match ID that should be passed through the stack for tracing. */
  match_id?: string;

  /** Name of the match profile that generated this Match. */
  match_profile?: string;

  /** Name of the match function that generated this Match. */
  match_function?: string;

  /** Tickets belonging to this match. */
  tickets?: openmatchTicket[];

  /** Customized information not inspected by Open Match, to be used by the match
making function, evaluator, and components making calls to Open Match.
Optional, depending on the requirements of the connected systems. */
  extensions?: object;

  /** Backfill request which contains additional information to the match
and contains an association to a GameServer.
BETA FEATURE WARNING: This field is not finalized and still subject
to possible change or removal. */
  backfill?: openmatchBackfill;

  /** AllocateGameServer signalise Director that Backfill is new and it should
allocate a GameServer, this Backfill would be assigned.
BETA FEATURE WARNING: This field is not finalized and still subject
to possible change or removal. */
  allocate_gameserver?: boolean;
}

export interface openmatchMatchProfile {
  /** Name of this match profile. */
  name?: string;

  /** Set of pools to be queried when generating a match for this MatchProfile. */
  pools?: openmatchPool[];

  /** Customized information not inspected by Open Match, to be used by the match
making function, evaluator, and components making calls to Open Match.
Optional, depending on the requirements of the connected systems. */
  extensions?: object;
}

export interface openmatchPool {
  /** A developer-chosen human-readable name for this Pool. */
  name?: string;

  /** Set of Filters indicating the filtering criteria. Selected tickets must
match every Filter. */
  double_range_filters?: openmatchDoubleRangeFilter[];

  /**  */
  string_equals_filters?: openmatchStringEqualsFilter[];

  /**  */
  tag_present_filters?: openmatchTagPresentFilter[];

  /** If specified, only Tickets created before the specified time are selected. */
  created_before?: Date;

  /** If specified, only Tickets created after the specified time are selected. */
  created_after?: Date;
}

export interface openmatchReleaseAllTicketsRequest {}

export interface openmatchReleaseAllTicketsResponse {}

export interface openmatchReleaseTicketsRequest {
  /**  */
  ticket_ids?: string[];
}

export interface openmatchReleaseTicketsResponse {}

export interface openmatchStringEqualsFilter {
  /** Name of the ticket's search_fields.string_args this Filter operates on. */
  string_arg?: string;

  /**  */
  value?: string;
}

export interface openmatchTagPresentFilter {
  /**  */
  tag?: string;
}

export enum AssignmentFailureCause {
  "UNKNOWN" = "UNKNOWN",
  "TICKET_NOT_FOUND" = "TICKET_NOT_FOUND",
}

export enum DoubleRangeFilterExclude {
  "NONE" = "NONE",
  "MIN" = "MIN",
  "MAX" = "MAX",
  "BOTH" = "BOTH",
}

export enum openmatchFunctionConfigType {
  "GRPC" = "GRPC",
  "REST" = "REST",
}

export interface openmatchQueryBackfillsRequest {
  /** The Pool representing the set of Filters to be queried. */
  pool?: openmatchPool;
}

export interface openmatchQueryBackfillsResponse {
  /** Backfills that meet all the filtering criteria requested by the pool. */
  backfills?: openmatchBackfill[];
}

export interface openmatchQueryTicketIdsRequest {
  /** The Pool representing the set of Filters to be queried. */
  pool?: openmatchPool;
}

export interface openmatchQueryTicketIdsResponse {
  /** TicketIDs that meet all the filtering criteria requested by the pool. */
  ids?: string[];
}

export interface openmatchQueryTicketsRequest {
  /** The Pool representing the set of Filters to be queried. */
  pool?: openmatchPool;
}

export interface openmatchQueryTicketsResponse {
  /** Tickets that meet all the filtering criteria requested by the pool. */
  tickets?: openmatchTicket[];
}

export interface openmatchRunRequest {
  /** A MatchProfile defines constraints of Tickets in a Match and shapes the Match proposed by the MatchFunction. */
  profile?: openmatchMatchProfile;
}

export interface openmatchRunResponse {
  /** A Proposal represents a Match candidate that satifies the constraints defined in the input Profile.
A valid Proposal response will contain at least one ticket. */
  proposal?: openmatchMatch;
}

export interface openmatchEvaluateRequest {
  /** A Matches proposed by the Match Function representing a candidate of the final results. */
  match?: openmatchMatch;
}

export interface openmatchEvaluateResponse {
  /** A Match ID representing a shortlisted match returned by the evaluator as the final result. */
  match_id?: string;
}
