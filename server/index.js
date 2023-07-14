const express = require("express");
const app = express();
const UserRouter = require("./routes/user");
const SecurityRouter = require("./routes/security");
const ValidationError = require("./errors/ValidationError");
const cors = require("cors");
const checkFormat = require("./middlewares/check-format");
const errorHandler = require("./middlewares/error-handler");
const checkAuth = require("./middlewares/check-auth");
const SiteRouter = require("./routes/site");
const SiteInvitationRouter = require("./routes/siteInvitation");
const TagRouter = require("./routes/tag");

app.use(cors());

app.use(checkFormat);

app.use(express.json());
app.use("/", SecurityRouter);
app.use("/users", checkAuth.requireAuthentication, UserRouter); // protect only this route
app.use("/sites", SiteRouter);
app.use("/invitations", SiteInvitationRouter);
app.use("/tags", TagRouter);
//app.use("/sites", [checkAuth.requireAuthentication,checkAuth.isGrantedForSite(['ADMIN', 'USER'])], SiteRouter); // protect only this route

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.json(req.body);
});

app.use(errorHandler);

module.exports = app;