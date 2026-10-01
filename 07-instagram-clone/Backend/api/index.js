require("dotenv").config()
const app = require("../src/app")
const connectDB = require("../src/config/database")

let connecting
module.exports = async (req, res) => {
  connecting ||= connectDB()
  await connecting
  return app(req, res)
}
