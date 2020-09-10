import api from './api';

describe('admin-panel/utils/api', () => {
  const endPoint = process.env.REACT_APP_API_ENDPOINT

  it('adds content type to every request', async () => {
    const mockFetchPromise = (route: RequestInfo, params: any) => {
      expect(params).toBeTruthy()
      expect(params?.headers).toBeTruthy()
      expect(route).toEqual(`${endPoint}/`)

      const contentType = params.headers['Content-Type'];

      expect(contentType).toEqual('application/json');

      return Promise.resolve(new Response());
    }

    jest.spyOn(global, 'fetch').mockImplementationOnce(mockFetchPromise);

    api('/');
  })

  it('loads JWT token', async () => {
    const mockFetchPromise = (route: RequestInfo, params: any) => {
      expect(params).toBeTruthy();
      expect(route).toEqual(`${endPoint}/`);
      const authKey = params.headers['Authorization'];

      expect(authKey).toEqual('JWT token');

      return Promise.resolve(new Response());
    }

    const mockGetItem = (key: string) => {
      expect(key).toEqual('jwt');
      return 'token';
    };

    jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementationOnce(mockGetItem);
    jest.spyOn(global, 'fetch').mockImplementationOnce(mockFetchPromise);

    api('/');
  })
});
