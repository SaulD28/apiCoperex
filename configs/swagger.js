
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Coperex API",
            version: "1.0.0",
            description: "API para gestion de empresas y clientes para Coperex",
            contact:{
                name: "Edison Donis",
                email: "edidonis42@gmail.com"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/apiCoperex/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/admin.routes.js",

    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}
