const ROOTS = {
    HOME: '/',
    FRIENDS: '/friends',
    AUTH: '/auth',
};

export const PATHS = {
    HOME: ROOTS.HOME,
    AUTH: {
        LOGIN: `${ROOTS.AUTH}/login`,
        REGISTER: `${ROOTS.AUTH}/register`,
    },
};