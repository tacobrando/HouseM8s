interface ImportMetaEnv {
  readonly VITE_SERVER_PORT: string;
  readonly VITE_DEV_SERVER_PORT: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_DEV_SERVER_URL: string;
  readonly MODE: 'production' | 'development';
}

const env = import.meta.env as unknown as ImportMetaEnv;

export const PORT: string = env.MODE === 'production' ? env.VITE_SERVER_PORT : env.VITE_DEV_SERVER_PORT;
export const API_URL: string = env.MODE === 'production' ? env.VITE_SERVER_URL : `${env.VITE_DEV_SERVER_URL}:${PORT}`;