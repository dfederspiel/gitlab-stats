import { FragmentType, getFragmentData } from '../../graphql/gitlab';
import { MergeMetricsDiffStatsFragmentDoc, MergeMetricsMergeRequestConnectionFragment, MergeMetricsMergeRequestConnectionFragmentDoc, MergeMetricsMergeRequestFragment, MergeMetricsMergeRequestFragmentDoc, MergeMetricsProjectFragmentDoc, MergeMetricsQuery, MergeMetricsUserCoreFragmentDoc } from '../../graphql/gitlab/graphql';
import { Author, Reviewer } from './types';

export const getTopContributors = (data?: MergeMetricsQuery) => {
  let topAuthors: Author[] = [];
  let topReviewers: Reviewer[] = [];
  if (data?.projects) {
    const mergeRequests: MergeMetricsMergeRequestFragment[] = [];
    data.projects.nodes?.forEach((project) => {
      if (project) mergeRequests.push(...getProjectMergeRequests(project))
    });
    const projectAuthors = getAuthorMetricsFromMergeRequests(mergeRequests);
    const projectReviewers = getReviewersFromMergeRequests(mergeRequests);

    projectAuthors.sort((a, b) => (a.mergeRequests > b.mergeRequests ? -1 : 1));
    projectReviewers.sort((a, b) =>
      a.timesReviewed > b.timesReviewed ? -1 : 1
    );
    topAuthors = projectAuthors;
    topReviewers = projectReviewers;
  }
  return {
    topAuthors,
    topReviewers
  }
}

export const getProjectMergeRequests = (project: FragmentType<typeof MergeMetricsProjectFragmentDoc>) => {
  const mergeRequests: MergeMetricsMergeRequestFragment[] = [];
  const projectFragment = getFragmentData(
    MergeMetricsProjectFragmentDoc,
    project
  );
  const mergeRequestConnectionFragment = getFragmentData(
    MergeMetricsMergeRequestConnectionFragmentDoc,
    projectFragment.mergeRequests
  );

  mergeRequestConnectionFragment?.nodes?.forEach(
    (mergeRequestFragment) => {
      const mergeRequest = getFragmentData(
        MergeMetricsMergeRequestFragmentDoc,
        mergeRequestFragment
      );
      if (mergeRequest) mergeRequests.push(mergeRequest);
    }
  );
  return mergeRequests;
};


export function getAuthorMetricsFromMergeRequests(
  nodes: MergeMetricsMergeRequestFragment[]
) {
  const authors: Author[] = [];

  for (const request of nodes) {
    const author = authors.find((a) => a.name === request?.author?.name);
    const diff = getFragmentData(MergeMetricsDiffStatsFragmentDoc, request.diffStatsSummary);
    if (!diff) continue;

    if (author && request?.diffStatsSummary) {
      author.additions += diff.additions;
      author.changes += diff.changes;
      author.deletions += diff.deletions;
      author.fileCount += diff.fileCount;
      author.commits += request.commits?.nodes?.length || 0;
      author.mergeRequests += 1;
    } else {
      if (request?.author && request.diffStatsSummary && request.commits?.nodes)
        authors.push({
          name: request.author.name,
          avatarUrl: request.author.avatarUrl || '',
          additions: diff.additions,
          commits: request.commits.nodes.length,
          changes: diff.changes,
          deletions: diff.deletions,
          fileCount: diff.fileCount,
          mergeRequests: 1,
        });
    }
  }
  return authors;
}

export function getReviewersFromMergeRequests(
  nodes: MergeMetricsMergeRequestFragment[]
) {
  const reviewers: Reviewer[] = [];

  for (const x of nodes) {
    x?.approvedBy?.nodes?.forEach((y) => {
      const z = getFragmentData(MergeMetricsUserCoreFragmentDoc, y);
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

export function getAuthorMetricsFromMergeRequestConnection(
  connection: MergeMetricsMergeRequestConnectionFragment
) {
  const authors: Author[] = [];
  if (!connection.nodes) return authors;

  for (const projectFragment of connection.nodes) {
    const project = getFragmentData(MergeMetricsMergeRequestFragmentDoc, projectFragment);
    const author = authors.find((a) => a.name === project?.author?.name);
    const diff = getFragmentData(MergeMetricsDiffStatsFragmentDoc, project?.diffStatsSummary);

    if (project && author && diff) {
      author.additions += diff.additions;
      author.changes += diff.changes;
      author.deletions += diff.deletions;
      author.fileCount += diff.fileCount;
      author.commits += project.commits?.nodes?.length || 0;
      author.mergeRequests += 1;
    } else {
      if (project?.author && diff && project.commits?.nodes)
        authors.push({
          name: project.author.name,
          avatarUrl: project.author.avatarUrl || '',
          additions: diff.additions,
          commits: project.commits.nodes.length,
          changes: diff.changes,
          deletions: diff.deletions,
          fileCount: diff.fileCount,
          mergeRequests: 1,
        });
    }
  }
  return authors;
}

export function getReviewersFromMergeRequestConnection(
  connection: MergeMetricsMergeRequestConnectionFragment
) {
  const reviewers: Reviewer[] = [];
  if (!connection.nodes) return reviewers;

  for (const projectFragment of connection.nodes) {
    const project = getFragmentData(MergeMetricsMergeRequestFragmentDoc, projectFragment);
    project?.approvedBy?.nodes?.forEach((userFragment) => {
      const user = getFragmentData(MergeMetricsUserCoreFragmentDoc, userFragment)
      const reviewer = reviewers.find((r) => r.name === user?.name);
      if (!reviewer) {
        reviewers.push({
          name: user?.name || '',
          avatarUrl: user?.avatarUrl || '',
          timesReviewed: 1,
        });
      } else {
        reviewer.timesReviewed += 1;
      }
    });
  }
  return reviewers;
}
