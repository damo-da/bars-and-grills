import { fetchUtils } from 'react-admin';
import localStorageProvider from "./localstorage-provider";

function client(endpoint: string, {body, ...customConfig}: any = {}) {
  const token = localStorageProvider.getJwt()
  const headers: any = {'Content-Type': 'application/json'}
  if (token) {
    headers.Authorization = `JWT ${token}`
  }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }
  if (body) {
    // config.body = JSON.stringify(body)
    config.body = body;
  }

  return fetch(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`, config)
    .then(async response => {
      console.log('got response', response);
      const json = await response.json()
      if (response.ok) {
        return {
          headers: response.headers,
          json
        }
      } else {
        return Promise.reject(json)
      }
    })
}

export default client;
