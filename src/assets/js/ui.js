import { serviceCategoryList, serviceNewsList } from "./service";

const getUiTemplate = (id, selector) => {
  const el = document.getElementById(id);
  const clone = el.content.cloneNode(true);
  return clone.querySelector(selector);
};

const getCategoryIcon = (key) => {
  const icons = {
    world: "icon-globe",
    politics: "icon-newspaper-o",
    sports: "icon-futbol-o",
    technology: "icon-desktop",
    economy: "icon-money",
    entertainment: "icon-gamepad",
    health: "icon-medkit",
    science: "icon-book",
    culture: "icon-suitcase",
    environment: "icon-envira",
  };

  return icons[key];
};

export const uiNavigator = async () => {
  const res = await serviceCategoryList();
  const navContainer = document.querySelector("#navigation");
  const template = getUiTemplate("navigation-item", ".nav-link");

  let html = "";
  res.forEach((i) => {
    let newTemplate = template;
    newTemplate.querySelector("i").classList = `icon ${getCategoryIcon(
      i.slug
    )}`;

    newTemplate.querySelector("span").textContent = i.name;

    html += newTemplate.outerHTML;
  });

  navContainer.innerHTML = html;
};

export const uiSubscription = () => {
  const content = document.querySelector("#subscription");
  const item = getUiTemplate("subscription-box", "div");

  content.innerHTML = item.outerHTML;
};

export const uiNews = async () => {
  const res = await serviceNewsList();
  const content = document.querySelector("#news-content");
  const template = getUiTemplate("news-template", "article");

  let html = "";
  res.forEach((i) => {
    let newTemplate = template;
    newTemplate.querySelector("figure img").src = i.photo;
    newTemplate.querySelector(".title").textContent = i.title;
    newTemplate.querySelector(".agency").textContent = i.author.agency;
    newTemplate.querySelector(".read-later").href = `/view.html?slug=${i.slug}`;

    html += newTemplate.outerHTML;
  });

  content.innerHTML = html;
};
