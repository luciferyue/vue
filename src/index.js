// import "./style/index.css";
import "./style/index.less";
import pic from "./img/01.jpg";

console.log("hello webpack1");

import axios from "axios";

axios.get("/api/info").then((res) => {
  console.log(res);
});

let img = new Image();
img.src = pic;

document.querySelector("#app").append(img);

//图片 file-loader 加强版本 => url-loader
