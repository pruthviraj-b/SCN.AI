// Production-safe logger utility
// Only logs in development, silent in production

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
    log: (...args: any[]) => {
        if (isDevelopment) {
            console.log(...args);
        }
    },

    error: (...args: any[]) => {
        if (isDevelopment) {
            console.error(...args);
        }
        // In production, you could send to error tracking service
        // e.g., Sentry.captureException(args[0]);
    },

    warn: (...args: any[]) => {
        if (isDevelopment) {
            console.warn(...args);
        }
    },

    info: (...args: any[]) => {
        if (isDevelopment) {
            console.info(...args);
        }
    }
};
