export {};
declare global {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    REDIS_URL: string;
    REDIS_TOKEN: string;
  }
  interface Process {
    env: ProcessEnv;
  }
  let process: Process;
}
