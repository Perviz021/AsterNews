import { get } from "./request";

export const serviceNewsList = async () => {
  const res = await get("/news");
  return res.data;
};

export const serviceCategoryList = async () => {
  const res = await get("/news/category");
  return res;
};
