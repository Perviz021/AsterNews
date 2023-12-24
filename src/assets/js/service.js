import { get } from "./request";
import { routerLoading } from "./routers";

export const serviceNewsList = async (params) => {
  routerLoading(true);
  const res = await get("/news" + (params ? "?" + params : ""));
  routerLoading(false);
  return res.data;
};

export const serviceCategoryList = async () => {
  const res = await get("/news/category");
  return res;
};

export const serviceNewsBySlug = async (slug) => {
  routerLoading(true);
  const res = await get(`/news/slug/${slug}`);
  routerLoading(false);

  return res;
};
