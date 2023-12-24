const baseURL = "https://all-api.bitcode.az/api";

export const request = async (url, method, params = false) => {
  let headers = {
    Accept: "application/json", //geriye normal json qaytarmaq ucun
  };

  let options = {
    method,
    headers,
  };

  if (params) options.body = JSON.stringify(params);

  const api = await fetch(baseURL + url, options);

  if (api.ok) {
    return await api.json();
  } else if (api.status === 404) {
    return { status: 404 };
  } else {
    return { status: 500 };
  }
};

export const get = (url) => request(url, "GET");
