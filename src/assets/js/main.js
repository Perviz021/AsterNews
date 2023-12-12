import "../css/index.css";

import Alpine from "alpinejs";
import { uiNavigator, uiNews, uiSubscription } from "./ui";

window.Alpine = Alpine;

Alpine.start();

uiNavigator();
uiSubscription();
uiNews();
