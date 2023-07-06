import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  documents: ['src/components/**/*.graphql', 'src/**/*.tsx'],
  schema: `${process.env.VITE_GITLAB_HOST}/api/graphql`,
  generates: {
    './src/graphql/gitlab/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
      },
      config: {
        enumsAsTypes: true,
        futureProofEnums: true,
      },
    },
    './src/graphql/gitlab.graphql': {
      plugins: ['schema-ast'],
    },
  },
};
export default config;
