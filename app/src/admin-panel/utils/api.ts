import { fetchUtils } from 'react-admin';
import localStorageProvider from 'utils/localstorage-provider';

function client(endpoint: string, { body, ...customConfig }: any = {}) {
  const token = localStorageProvider.getJwt();
  const headers: any = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `JWT ${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = body;
  }

  console.log("making request", config, endpoint)

  return fetch(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`, config)
    .then(async (response) => {
      const data = await response.text();
      const json = data ? JSON.parse(data) : {};
      if (response.ok) {
        return {
          headers: response.headers,
          json,
        };
      }
      return Promise.reject(json);
    });
}

export default client;
