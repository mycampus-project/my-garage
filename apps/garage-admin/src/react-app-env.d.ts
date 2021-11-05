/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * Backend base url. Excludes trailing /
     */
    BACKEND_URL: string;
  }
}
