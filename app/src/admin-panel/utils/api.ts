import type { ApiConfig } from 'types/api';
import localStorageProvider from 'utils/localstorage-provider';

const defaultConfig: ApiConfig = {
  method: 'GET',
  body: null,
  headers: {
    'Content-Type': 'application/json',
  },
};
const prepareConfig = (config: ApiConfig) => {
  const target = {
    ...config,
  };

  target.headers = { ...defaultConfig.headers, ...target.headers };

  if (!target.method) target.method = defaultConfig.method;
  if (!target.body) target.body = defaultConfig.body;

  const userJwtToken = localStorageProvider.getJwt();
  if (userJwtToken) {
    target.headers.Authorization = `JWT ${userJwtToken}`;
  }
  return target;
};

async function client(endpoint: string, userConfig?: ApiConfig) {
  const config = prepareConfig(userConfig || {});

  const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`, config);

  const data = await response.text();

  let json;
  try {
    json = data ? JSON.parse(data) : {};
  } catch (e) {
    return Promise.reject(new Error(`Failed to parse response JSON: ${data}`));
  }

  if (response.ok) {
    return {
      headers: response.headers,
      json,
    };
  }
  return Promise.reject(json);
}

export default client;
