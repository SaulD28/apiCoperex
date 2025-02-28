"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import { createAdmin } from "../src/admin/admin.controller.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import { swaggerDocs, swaggerUi } from "./swagger.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false}))
    app.use(express.json())
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }))
    app.use(helmet({
        contentSecurityPolicy:{
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc:["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"]
            },
        }
    }))
}

const routes = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
} 

const conectarDB = async () => {
    try{
        await dbConnection();
        createAdmin()
    }catch (err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1);
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app);
        conectarDB()
        app.listen(process.env.PORT);
        console.log(`Server running on port ${process.env.PORT}`)
    }catch (err){
        console.log(`Server init failed: ${err}`);
    }
}