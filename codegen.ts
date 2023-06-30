import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  // schema: 'https://api.github.com/graphql',
  generates: {
    './src/graphql/gitlab/': {
      documents: ['src/components/GitLabStats/**/*.graphql', 'src/**/*.tsx'],
      schema: `${process.env.VITE_GITLAB_HOST}/api/graphql`,
      preset: 'client',
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' }
      },
      config: {
        enumsAsTypes: true,
        futureProofEnums: true,
      },
    },
  },
};
export default config;
