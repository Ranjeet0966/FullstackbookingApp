const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

// const User = require("./models/user");
const sequelize = require("./util/database");

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));

const addRouter = require("./routes/add");
const deleteRouter = require("./routes/delete");
const getAllUsersRouter = require("./routes/get-all-users");
// const editRouter = require("./routes/edit");

app.use(addRouter);
app.use(deleteRouter);
app.use(getAllUsersRouter);
// app.use(editRouter);

app.use((req, res)=>{
  res.sendFile(path.join(__dirname,req.url));
})

sequelize
  .sync()
  .then(() => {})
  .catch((err) => console.log(err));
app.listen(4001);
