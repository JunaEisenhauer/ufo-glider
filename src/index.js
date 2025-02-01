import "../public/style.css";
import Application from "./application";

const canvas = document.querySelector("canvas.webgl");
const application = new Application(canvas);
application.start();
