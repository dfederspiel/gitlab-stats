/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment MergeMetricsDiffStats on DiffStatsSummary {\n  additions\n  changes\n  deletions\n  fileCount\n}\n\nfragment MergeMetricsUserCore on UserCore {\n  name\n  id\n  avatarUrl\n}\n\nfragment MergeMetricsMergeRequest on MergeRequest {\n  commits {\n    nodes {\n      title\n      description\n      webUrl\n    }\n  }\n  author {\n    name\n    id\n    avatarUrl\n  }\n  approvedBy {\n    nodes {\n      ...MergeMetricsUserCore\n    }\n  }\n  diffStatsSummary {\n    ...MergeMetricsDiffStats\n  }\n}\n\nfragment MergeMetricsMergeRequestConnection on MergeRequestConnection {\n  count\n  totalTimeToMerge\n  nodes {\n    ...MergeMetricsMergeRequest\n  }\n}\n\nfragment MergeMetricsProject on Project {\n  id\n  name\n  fullPath\n  mergeRequests(mergedAfter: $mergedAfter) {\n    ...MergeMetricsMergeRequestConnection\n  }\n}\n\nquery MergeMetrics($projectIds: [ID!]!, $mergedAfter: Time!) {\n  projects(ids: $projectIds) {\n    nodes {\n      ...MergeMetricsProject\n    }\n  }\n}\n\nquery CurrentUser($mergedAfter: Time!) {\n  currentUser {\n    avatarUrl\n    name\n    username\n    authoredMergeRequests(mergedAfter: $mergedAfter) {\n      ...MergeMetricsMergeRequestConnection\n    }\n  }\n}": types.MergeMetricsDiffStatsFragmentDoc,
    "fragment PageInfo on PageInfo {\n  startCursor\n  endCursor\n  hasNextPage\n  hasPreviousPage\n}\n\nfragment Project on Project {\n  id\n  name\n  fullPath\n  webUrl\n}\n\nfragment ProjectConnection on ProjectConnection {\n  edges {\n    cursor\n  }\n  pageInfo {\n    ...PageInfo\n  }\n  nodes {\n    ...Project\n  }\n}\n\nquery Projects($first: Int, $last: Int, $before: String, $after: String) {\n  projects(\n    first: $first\n    last: $last\n    before: $before\n    after: $after\n    sort: \"name_asc\"\n  ) {\n    ...ProjectConnection\n  }\n}": types.PageInfoFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MergeMetricsDiffStats on DiffStatsSummary {\n  additions\n  changes\n  deletions\n  fileCount\n}\n\nfragment MergeMetricsUserCore on UserCore {\n  name\n  id\n  avatarUrl\n}\n\nfragment MergeMetricsMergeRequest on MergeRequest {\n  commits {\n    nodes {\n      title\n      description\n      webUrl\n    }\n  }\n  author {\n    name\n    id\n    avatarUrl\n  }\n  approvedBy {\n    nodes {\n      ...MergeMetricsUserCore\n    }\n  }\n  diffStatsSummary {\n    ...MergeMetricsDiffStats\n  }\n}\n\nfragment MergeMetricsMergeRequestConnection on MergeRequestConnection {\n  count\n  totalTimeToMerge\n  nodes {\n    ...MergeMetricsMergeRequest\n  }\n}\n\nfragment MergeMetricsProject on Project {\n  id\n  name\n  fullPath\n  mergeRequests(mergedAfter: $mergedAfter) {\n    ...MergeMetricsMergeRequestConnection\n  }\n}\n\nquery MergeMetrics($projectIds: [ID!]!, $mergedAfter: Time!) {\n  projects(ids: $projectIds) {\n    nodes {\n      ...MergeMetricsProject\n    }\n  }\n}\n\nquery CurrentUser($mergedAfter: Time!) {\n  currentUser {\n    avatarUrl\n    name\n    username\n    authoredMergeRequests(mergedAfter: $mergedAfter) {\n      ...MergeMetricsMergeRequestConnection\n    }\n  }\n}"): (typeof documents)["fragment MergeMetricsDiffStats on DiffStatsSummary {\n  additions\n  changes\n  deletions\n  fileCount\n}\n\nfragment MergeMetricsUserCore on UserCore {\n  name\n  id\n  avatarUrl\n}\n\nfragment MergeMetricsMergeRequest on MergeRequest {\n  commits {\n    nodes {\n      title\n      description\n      webUrl\n    }\n  }\n  author {\n    name\n    id\n    avatarUrl\n  }\n  approvedBy {\n    nodes {\n      ...MergeMetricsUserCore\n    }\n  }\n  diffStatsSummary {\n    ...MergeMetricsDiffStats\n  }\n}\n\nfragment MergeMetricsMergeRequestConnection on MergeRequestConnection {\n  count\n  totalTimeToMerge\n  nodes {\n    ...MergeMetricsMergeRequest\n  }\n}\n\nfragment MergeMetricsProject on Project {\n  id\n  name\n  fullPath\n  mergeRequests(mergedAfter: $mergedAfter) {\n    ...MergeMetricsMergeRequestConnection\n  }\n}\n\nquery MergeMetrics($projectIds: [ID!]!, $mergedAfter: Time!) {\n  projects(ids: $projectIds) {\n    nodes {\n      ...MergeMetricsProject\n    }\n  }\n}\n\nquery CurrentUser($mergedAfter: Time!) {\n  currentUser {\n    avatarUrl\n    name\n    username\n    authoredMergeRequests(mergedAfter: $mergedAfter) {\n      ...MergeMetricsMergeRequestConnection\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PageInfo on PageInfo {\n  startCursor\n  endCursor\n  hasNextPage\n  hasPreviousPage\n}\n\nfragment Project on Project {\n  id\n  name\n  fullPath\n  webUrl\n}\n\nfragment ProjectConnection on ProjectConnection {\n  edges {\n    cursor\n  }\n  pageInfo {\n    ...PageInfo\n  }\n  nodes {\n    ...Project\n  }\n}\n\nquery Projects($first: Int, $last: Int, $before: String, $after: String) {\n  projects(\n    first: $first\n    last: $last\n    before: $before\n    after: $after\n    sort: \"name_asc\"\n  ) {\n    ...ProjectConnection\n  }\n}"): (typeof documents)["fragment PageInfo on PageInfo {\n  startCursor\n  endCursor\n  hasNextPage\n  hasPreviousPage\n}\n\nfragment Project on Project {\n  id\n  name\n  fullPath\n  webUrl\n}\n\nfragment ProjectConnection on ProjectConnection {\n  edges {\n    cursor\n  }\n  pageInfo {\n    ...PageInfo\n  }\n  nodes {\n    ...Project\n  }\n}\n\nquery Projects($first: Int, $last: Int, $before: String, $after: String) {\n  projects(\n    first: $first\n    last: $last\n    before: $before\n    after: $after\n    sort: \"name_asc\"\n  ) {\n    ...ProjectConnection\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;