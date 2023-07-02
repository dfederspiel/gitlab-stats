export type Author = {
  name: string;
  avatarUrl: string;
  mergeRequests: number;
  additions: number;
  changes: number;
  deletions: number;
  fileCount: number;
  commits: number;
};

export type Reviewer = {
  name: string;
  avatarUrl: string;
  timesReviewed: number;
};
