const baseURL = `https://all-api.bitcode.az/api`;

const request = async (url, method, params = false) => {
  let headers = {};

  let options = {
    method,
    headers,
  };

  if (params) options.body = JSON.stringify(params);

  const api = await fetch(baseURL + url, options);

  return await api.json();
};

export const get = (url) => request(url, "GET");
