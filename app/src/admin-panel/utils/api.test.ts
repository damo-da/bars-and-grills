import api from './api';
import {spyFetchMethod, spyLocalStorageMethod} from "utils/testing/utils.test";
import {ApiConfig} from "types/api";

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

  it('Makes authenticated calls in presence of JWT', async () => {
    const sampleToken = 'MY_JWT_TOKEN';

    const fetchSpy = spyFetchMethod();
    // @ts-ignore
    fetchSpy.mockImplementationOnce(async (url, config: ApiConfig) => {
      if (config?.headers?.Authorization === sampleToken) {
        return new Response();
      }
      throw Error('Authorization not provided.');
    })

    const localStorageSpy = spyLocalStorageMethod('getItem');
    localStorageSpy.mockImplementationOnce((key) => key === 'jwt' ? sampleToken : null);

    expect(api('/')).rejects.toEqual(new Error('Authorization not provided.'));
  })
});
