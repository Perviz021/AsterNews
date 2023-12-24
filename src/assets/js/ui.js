import { objectToQueryString } from "./helper";
import { viewRouter } from "./routers";
import {
  serviceCategoryList,
  serviceNewsBySlug,
  serviceNewsList,
} from "./service";
import { getStorage, saveStorage } from "./storage";

let categories = getStorage("categories");

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
  saveStorage("categories", res);
  const navContainer = document.querySelector("#navigation");
  const template = getUiTemplate("navigation-item", ".nav-link");

  let html = "";
  res.forEach((i) => {
    let newTemplate = template;
    newTemplate.href = `/#/search?category=${i.slug}`;
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

export const uiNews = async (params = {}) => {
  const res = await serviceNewsList(objectToQueryString(params));
  const content = document.querySelector("#news-content");
  const template = getUiTemplate("news-template", "article");

  let html = "";
  res.forEach((i) => {
    let newTemplate = template;
    newTemplate.querySelector("figure img").src = i.photo;
    newTemplate.querySelector(".title").textContent = i.title;
    newTemplate.querySelector(".agency").textContent = i.author.agency;
    newTemplate.querySelector(".read-later").href = `/#/view?slug=${i.slug}`;

    html += newTemplate.outerHTML;
  });

  content.innerHTML = html;
};

export const uiNewsView = async (slug) => {
  const res = await serviceNewsBySlug(slug);

  if (res?.status === 404) {
    viewRouter("error");
    return false;
  }

  const content = document.querySelector("#news-view");
  const template = getUiTemplate("news-view-content", "div");
  template.querySelector("#title").textContent = res.title;
  template.querySelector("#category").textContent = res.category.name;
  template.querySelector(
    "#category"
  ).href = `/#/search?category=${res.category.slug}`;
  template.querySelector("#photo").src = res.photo;
  template.querySelector("#content").innerHTML = res.content;
  content.innerHTML = template.outerHTML;
  console.log(res);
};

export const uiNewsSearch = (params) => {
  const { category } = params;
  const findCategory = categories.find((i) => i.slug === category);
  const pageTitle = document.querySelector("#pageTitle");

  pageTitle.textContent = findCategory?.name;

  uiNews(params);
};

export const UI = {
  home() {
    uiNews();
  },
  view({ slug }) {
    uiNewsView(slug);
  },
  search(params) {
    uiNewsSearch(params);
  },
};
