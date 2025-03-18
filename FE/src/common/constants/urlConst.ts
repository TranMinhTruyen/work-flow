// Auth screen
export const AUTH_PREFIX = 'auth';

// Main screen
export const MAIN_PREFIX = 'main';

export const screenUrl: Record<
  string,
  {
    prefix: string;
    path: string;
  }
> = {
  LOGIN: { prefix: AUTH_PREFIX, path: '/login' },
  REGISTER: { prefix: AUTH_PREFIX, path: '/register' },
  HOME: { prefix: MAIN_PREFIX, path: '/home' },
  KANBAN: { prefix: MAIN_PREFIX, path: '/kanban' },
  SCREEN_MASTER: { prefix: MAIN_PREFIX, path: '/screen-setting' },
  USER_MASTER: { prefix: MAIN_PREFIX, path: '/user-setting' },
};
