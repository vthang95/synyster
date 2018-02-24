require("dotenv").load()
const express = require("express")
const next = require("next")
const http = require("http")
const cookieParser = require("cookie-parser")
const compression = require("compression")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const logger = require("morgan")
const chalk = require("chalk")
const mongoose = require("mongoose")

const dev = process.env.NODE_ENV !== "production"

const app = next({ dev })
const morganMode = dev ? "dev" : "common"
const mongodbURI = dev ? process.env.DB_DEV : process.env.DB_PROD

const controller = require("./global-controller")
const categoryController = require("./api/categories/category.controller")
const auth = require("./authentication")

/**
 * Routers
 */
const userRouter = require("./api/users")
const categoryRouter = require("./api/categories")
const postRouter = require("./api/posts")

app.prepare()
  .then(() => {
    const server = express()

    mongoose.Promise = global.Promise
    mongoose.connect(mongodbURI)
      .then(() => console.log(`%s Connected to ${dev ? "localDB" : "remoteDB"}`, chalk.green("✓")))
      .catch(err => {
        console.log(err)
        console.log("%s MongoDB connection error! Please make sure MongoDB is running", chalk.red("✗"))
      })

    server.set("port", process.env.PORT || 8090)
    server.use(cookieParser())
    server.use(compression())
    server.use(logger(morganMode))
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(expressValidator())
    server.locals.pretty = true

    server.use("/api/users", userRouter)
    server.use("/api/categories", auth.isAuthApi, categoryRouter)
    server.use("/api/posts", postRouter)

    server.use((req, res, next) => {
      if (dev) req.app = app
      next()
    })

    server.get("/manage/login", controller.handleNormalRequest)
    server.get("/manage/signup", controller.handleNormalRequest)
    server.get("/manage", auth.isAuthServer, controller.handleNormalRequest)

    server.get("/posts/:postSlug", controller.middlewareGetSinglePost, controller.handleGetPostPage)
    server.get("/", controller.middlewareGetHomepage, controller.handleNormalRequest)

    server.get("*", controller.handleNormalRequest)

    server.listen(server.get("port"), (err) => {
      if (err) throw err
      console.log("|> !!!Server is running on http://localhost:%s", server.get("port"))
    })
  })
  .catch((ex) => {
    console.log(ex.stack)
    process.exit(1)
  })