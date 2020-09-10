jest.mock('admin-panel/utils/api');
import authProvider from './auth-provider';
import api from './api';

describe('webapp/utils/auth-provider', () => {
  const sampleApiResponse = {
    jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImRhbW9kYXIiLCJleHAiOjE2MTI2NTQ1MDYsImVtYWlsIjoiZGFtb0BkYW1vLmNvbSIsImdyb3VwcyI6WyJBZG1pbiIsIlJlZ3VsYXIiXX0.DGTWSUxMFxBSnpsf0xBMCz1UjdETfrazL1-R6x1P7oI",
    userId: "1",
    groups: 'Admin,Regular',
    username: 'damodar'
  }

  it('saves login credentials to password on login', async () => {
    api.mockImplementation(() => Promise.resolve({json: { token: sampleApiResponse.jwt }}));

    const localStorageSpy = jest.spyOn(global.localStorage.__proto__, 'setItem');

    await authProvider.login({username: 'foo', password: 'bar'})

    expect(localStorageSpy).toHaveBeenCalledWith('jwt', sampleApiResponse.jwt);
    expect(localStorageSpy).toHaveBeenCalledWith('userId', sampleApiResponse.userId);
    expect(localStorageSpy).toHaveBeenCalledWith('groups', sampleApiResponse.groups);
    expect(localStorageSpy).toHaveBeenCalledWith('username', sampleApiResponse.username);


  });

  it('raises error if logging in fails.', async () => {
    api.mockImplementation(() => Promise.reject());

    expect(authProvider.login({username: 'foo', password: 'bar'})).rejects.toThrow();
  });

  it('clears localstorage on logout.', async () => {
    const spy = jest.spyOn(global.localStorage.__proto__, 'clear');

    await authProvider.logout();

    expect(spy).toHaveBeenCalled();

  });

  it('detects user is not logged-in if JWT not on localStorage', () => {
    const mockGetJwt = (key: string) => {
      expect(key).toEqual(key);
      return null;
    }

    jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementationOnce(mockGetJwt)

    expect(authProvider.checkAuth()).rejects.toThrowError();
  })

  it('detects user is logged-in if JWT on localStorage', async () => {
    const mockGetItem = (key: string) => {
      expect(key).toEqual(key);
      return 'some random key';
    }

    jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementationOnce(mockGetItem)

    expect(await authProvider.checkAuth()).toEqual(true);
  })
})
