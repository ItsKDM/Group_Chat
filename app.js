const express = require("express");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./util/database");
const path = require("path");
const fs = require("fs");

const bodyParser = require("body-parser");
// const cors = require("cors");
// app.use(cors({
//     origin: "*",
// })
// );



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Router
const userRouter = require("./router/userRouter");
const homepageRouter = require("./router/homePageRouter");
const chatRouter = require("./router/chatRouter");
const groupRouter = require("./router/groupRouter");
//Models
const User = require("./models/userModel");
const Chat = require("./models/chatModel");
const Group = require("./models/groupModel");
const UserGroup= require("./models/userGroup");
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, `views/${req.url}`));
// });

User.hasMany(Chat, { onDelete: "CASCADE", hooks: true});

Chat.belongsTo(User);
Chat.belongsTo(Group);

User.hasMany(UserGroup);

Group.hasMany(Chat);
Group.hasMany(UserGroup);

UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);

//Middleware
app.use("/", userRouter);
app.use("/user", userRouter);
app.use("/homePage", homepageRouter);
app.use("/chat", chatRouter);
app.use("/group", groupRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));