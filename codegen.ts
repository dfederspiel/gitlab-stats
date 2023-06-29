import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  // schema: 'https://api.github.com/graphql',
  generates: {
    './src/graphql/gitlab/': {
      documents: ['src/components/GitLabStats/**/*.graphql'],
      schema: `${process.env.VITE_GITLAB_HOST}/api/graphql`,
      preset: 'client',
      config: {
        enumsAsTypes: true,
        futureProofEnums: true,
      },
    },
  },
};
export default config;
