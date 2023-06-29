import { MergeMetricsDiffStatsFragment, MergeMetricsMergeRequestConnectionFragment, MergeMetricsMergeRequestFragment, MergeMetricsUserCoreFragment } from '../../gql/graphql';
import { Author, Reviewer } from './types';

export function mapAuthorMetricsFromMergeRequests(
  nodes: MergeMetricsMergeRequestFragment[]
) {
  const authors: Author[] = [];

  for (const x of nodes) {
    const a = authors.find((a) => a.name === x?.author?.name);
    const diff = x.diffStatsSummary as MergeMetricsDiffStatsFragment;

    if (a && x?.diffStatsSummary) {
      a.additions += diff.additions;
      a.changes += diff.changes;
      a.deletions += diff.deletions;
      a.fileCount += diff.fileCount;
      a.commits += x.commits?.nodes?.length || 0;
      a.mergeRequests += 1;
    } else {
      if (x?.author && x.diffStatsSummary && x.commits?.nodes)
        authors.push({
          name: x.author.name,
          avatarUrl: x.author.avatarUrl || '',
          additions: diff.additions,
          commits: x.commits.nodes.length,
          changes: diff.changes,
          deletions: diff.deletions,
          fileCount: diff.fileCount,
          mergeRequests: 1,
        });
    }
  }
  return authors;
}

export function mapReviewersFromMergeRequests(
  nodes: MergeMetricsMergeRequestFragment[]
) {
  const reviewers: Reviewer[] = [];

  for (const x of nodes) {
    x?.approvedBy?.nodes?.forEach((y) => {
      const z = y as MergeMetricsUserCoreFragment;
      const reviewer = reviewers.find((r) => r.name === z?.name);
      if (!reviewer) {
        reviewers.push({
          name: z?.name || '',
          avatarUrl: z?.avatarUrl || '',
          timesReviewed: 1,
        });
      } else {
        reviewer.timesReviewed += 1;
      }
    });
  }
  return reviewers;
}

export function mapAuthorMetricsFromMergeRequestConnection(
  nodes: MergeMetricsMergeRequestConnectionFragment
) {
  const authors: Author[] = [];

  for (const x of nodes.nodes as MergeMetricsMergeRequestFragment[]) {
    const a = authors.find((a) => a.name === x?.author?.name);
    const diff = x.diffStatsSummary as MergeMetricsDiffStatsFragment;

    if (a && x?.diffStatsSummary) {
      a.additions += diff.additions;
      a.changes += diff.changes;
      a.deletions += diff.deletions;
      a.fileCount += diff.fileCount;
      a.commits += x.commits?.nodes?.length || 0;
      a.mergeRequests += 1;
    } else {
      if (x?.author && x.diffStatsSummary && x.commits?.nodes)
        authors.push({
          name: x.author.name,
          avatarUrl: x.author.avatarUrl || '',
          additions: diff.additions,
          commits: x.commits.nodes.length,
          changes: diff.changes,
          deletions: diff.deletions,
          fileCount: diff.fileCount,
          mergeRequests: 1,
        });
    }
  }
  return authors;
}

export function mapReviewersFromMergeRequestConnection(
  nodes: MergeMetricsMergeRequestConnectionFragment
) {
  const reviewers: Reviewer[] = [];

  for (const x of nodes.nodes as MergeMetricsMergeRequestFragment[]) {
    x?.approvedBy?.nodes?.forEach((y) => {
      const z = y as MergeMetricsUserCoreFragment;
      const reviewer = reviewers.find((r) => r.name === z?.name);
      if (!reviewer) {
        reviewers.push({
          name: z?.name || '',
          avatarUrl: z?.avatarUrl || '',
          timesReviewed: 1,
        });
      } else {
        reviewer.timesReviewed += 1;
      }
    });
  }
  return reviewers;
}
