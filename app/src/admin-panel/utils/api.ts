import localStorageProvider from 'utils/localstorage-provider';

function client(endpoint: string, { config }: any = {}) {
  const token = localStorageProvider.getJwt();
  const headers: any = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `JWT ${token}`;
  }

  const finalConfig = {
    method: config?.body ? 'POST' : 'GET',
    ...config,
    headers: {
      ...headers,
      ...config?.headers ?? {},
    },
  };

  return fetch(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`, finalConfig)
    .then(async (response) => {
      const data = await response.text();

      let json;
      try {
        json = data ? JSON.parse(data) : {};
      } catch (e) {
        return Promise.reject(new Error('Failed to parse response JSON.'));
      }

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
