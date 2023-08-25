require("dotenv").config();

module.exports = {
  dbURI: process.env.DB_URI,
  sessionSecret: process.env.SESSION_SECRET,
};
