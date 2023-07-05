const {Router} = require("express");

module.exports = function (Controller, routesList) {
    const router = new Router();


    routesList.forEach(route => {
        switch (route.method) {
            case "get":
                route?.middlewares
                    ? router.get(route.path, route.middlewares, Controller[route.action])
                    : router.get(route.path, Controller[route.action])
                break;
            case "post":
                route?.middlewares
                    ? router.post(route.path, route.middlewares, Controller[route.action])
                    : router.post(route.path, Controller[route.action])
                break;
            case "put":
                route?.middlewares
                    ? router.put(route.path, route.middlewares, Controller[route.action])
                    : router.put(route.path, Controller[route.action])
                break;
            case "patch":
                route?.middlewares
                    ? router.patch(route.path, route.middlewares, Controller[route.action])
                    : router.patch(route.path, Controller[route.action])
                break;
            case "delete":
                route?.middlewares
                    ? router.delete(route.path, route?.middlewares, Controller[route.action])
                    : router.delete(route.path, Controller[route.action])
                break;
            default:
                break;
        }
    });


    return router;
};
