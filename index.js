import express from "express";
import bodyParser from "body-parser";
import connectToDB from "./config/db.js";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.static("public"));
app.use("./public/images", express.static("images"));
app.use(cors());

connectToDB();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/posts", PostRoute);
app.use("/upload", UploadRoute);

//step 3 of heroku deploy
if(process.env.NODE_ENV=="production"){
  app.use(express.static("frontend/build"));
  const path = require("path");
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","build",'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Connection successful on http://localhost:${PORT}`);
});
