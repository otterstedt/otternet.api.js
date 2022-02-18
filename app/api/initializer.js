const Router = require('koa-router');
const swagger = require('swagger2');
const { ui } = require('swagger2-koa');
const restConfig = require('./rest-modules/config');

/* Bind all rest APIs to the application object */
module.exports = (app) => {

    /* Get API specifications for enabled API interfaces */
    let apis = restConfig.restInterfaces.filter(interface => {
        return interface.enabled === true;
    }).map(interface => {

        /* Append API spec and configs */
        let specification = {};
        specification.config = require('./rest-modules' + interface.path + '/apiConfig');
        specification.document = require('./rest-modules' + interface.path + '/apiSpec')
        specification.document.basePath = interface.path;

        /* Create api router */
        specification.router = new Router({ prefix: specification.document.basePath});

        /* Wrap functions to add routes for this API specification */
        specification.routeAdd = {};
        specification.routeAdd.GET = (name, path, func) => { return specification.router.get(name, path, func); };
        specification.routeAdd.PUT = (name, path, func) => { return specification.router.put(name, path, func); };
        specification.routeAdd.POST = (name, path, func) => { return specification.router.post(name, path, func); };
        specification.routeAdd.DELETE = (name, path, func) => { return specification.router.delete(name, path, func); };
        specification.routeAdd.PATCH = (name, path, func) => { return specification.router.patch(name, path, func); };
        specification.routeAdd.OPTIONS = (name, path, func) => { return specification.router.options(name, path, func); };


        /* Add predefined routes from endpoint config */
        specification.config.routes.forEach(route => {
            if(!route.func) {
                throw('No function for route:', route.name);
            }

            specification.routeAdd[route.verb](route.name, route.url, route.func);
        });

        return specification;
    
    }).forEach(api => {

        let validator = swagger.validateDocument(api.document);
        if (!swagger.validateDocument(api.document)) {
            throw Error('Swagger document does not conform to Swagger 2.0 schema', validator);
        }
      
        /* Set routes and specify swagger endpoint for each enable REST API */
        app.use(api.router.routes());
        app.use(ui(api.document, restConfig.swaggerPath + api.document.basePath));
        

    });



return app;

}