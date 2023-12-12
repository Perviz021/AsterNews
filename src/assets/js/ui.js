import { serviceCategoryList, serviceNewsList } from "./service.js";

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
  const tagLink = getUiTemplate("navigation-item", ".nav-link");

  let html = "";
  res.forEach((i) => {
    let newTemplate = tagLink;
    newTemplate.querySelector("i").classList = `icon ${getCategoryIcon(
      i.slug
    )}`;
    newTemplate.querySelector("span").textContent =
      i.slug[0].toUpperCase() + i.slug.slice(1);
    html += newTemplate.outerHTML;
  });
  navContainer.innerHTML = html;
};

export const uiSubscription = () => {
  const subsContainer = document.querySelector("#subscription");
  const item = getUiTemplate("subscription-box", "div");
  subsContainer.innerHTML = item.outerHTML;
};

export const uiNews = async () => {
  const res = await serviceNewsList();
  const newsContainer = document.querySelector("#news-container");
  const newsTemplate = getUiTemplate("news-template", "article");

  let html = ``;
  res.forEach((i) => {
    let newTemplate = newsTemplate;
    newTemplate.querySelector("figure img").src = i.photo;
    newTemplate.querySelector(".title").textContent = i.title;
    newTemplate.querySelector(".text").textContent = i.description;
    newTemplate.querySelector(".agency").textContent = i.author.agency;
    newTemplate.querySelector(".read-later").href = `/view.html?slug=${i.slug}`;
    html += newTemplate.outerHTML;
  });

  newsContainer.innerHTML = html;
};
