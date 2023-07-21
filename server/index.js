const express = require("express");
const app = express();
const UserRouter = require("./routes/user");
const SecurityRouter = require("./routes/security");
const cors = require("cors");
const checkFormat = require("./middlewares/check-format");
const errorHandler = require("./middlewares/error-handler");
const SiteRouter = require("./routes/site");
const SiteInvitationRouter = require("./routes/siteInvitation");
const TagRouter = require("./routes/tag");
const EventRouter = require("./routes/event");
const mongodb     = require('./mongodb/mongo');
const eventPermission = require('./middlewares/event-permissions');

mongodb.initClientDbConnection();

app.use(checkFormat);
app.use(express.json());
app.use(cors())

app.use("/events", EventRouter);


app.use("/", SecurityRouter);
app.use("/users", UserRouter); // protect only this route
app.use("/sites", SiteRouter);
app.use("/invitations", SiteInvitationRouter);
app.use("/tags", TagRouter);
//app.use("/sites", [checkAuth.requireAuthentication,checkAuth.isGrantedForSite(['ADMIN', 'USER'])], SiteRouter); // protect only this route

app.use(errorHandler);

module.exports = app;