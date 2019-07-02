const express = require("express");
const app = express();
const helmet = require("helmet");
const mainRouter = require("./mainRouter");
const userRouter = require("./userRouter");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use("/", mainRouter);
app.use("/user", userRouter);

app.get("/", (req, res, next) => {
  res.send("test!");
});

app.listen(3000, () => console.log("server started"));
