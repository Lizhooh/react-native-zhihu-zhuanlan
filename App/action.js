
export const INIT_ROUTER = 'INIT_ROUTER';
export const UPDATE_ROUTER = 'UPDATE_ROUTER';

export const initRouter = (component, data, navigator) => {
    return {
        type: INIT_ROUTER,
        component: component,
        router: navigator.getCurrentRoutes(),
        count: navigator.getCurrentRoutes().length,
        navigator: navigator,
        data: data,
    };
};

export const updateRouter = initRouter;