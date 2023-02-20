const express = require("express")
const { error500 } = require('./controllers/error-handling-controller.js')
const app = express()
app.use(express.json())

const {
  testConnection,
  getTopics,
  getArticles
} = require("./controllers/controller.js")

app.get("/api", testConnection)

app.get("/api/topics", getTopics)

app.get("/api/articles", getArticles)

app.use(error500)

module.exports = app