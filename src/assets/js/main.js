import "../css/index.css";
import { router } from "./routers.js";
import Alpine from "alpinejs";
import { uiNavigator, uiSubscription } from "./ui.js";

window.Alpine = Alpine;

Alpine.start();

window.addEventListener("load", router);
window.addEventListener("hashchange", router);

uiNavigator();
uiSubscription();
