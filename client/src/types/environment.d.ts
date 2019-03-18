import * as ts from 'typescript';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      REACT_APP_API_URI: string;
      REACT_APP_AUTH0_DOMAIN: string;
      REACT_APP_AUTH0_CLIENT_ID: string;
      REACT_APP_AUTH0_CALLBACK_URI: string;
    }
  }

  namespace JSX {
    interface ElementClass {
      render: () => React.ReactNode;
    }
  }
}
