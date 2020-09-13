import authProvider from './auth-provider';
import { spyLocalStorageMethod, spyFetchMethod } from "utils/testing/utils.test";

describe('webapp/utils/auth-provider', () => {
  const sampleToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImRhbW9kYXIiLCJleHAiOjE2MTI2NTQ1MDYsImVtYWlsIjoiZGFtb0BkYW1vLmNvbSIsImdyb3VwcyI6WyJBZG1pbiIsIlJlZ3VsYXIiXX0.DGTWSUxMFxBSnpsf0xBMCz1UjdETfrazL1-R6x1P7oI";

  const apiMock = jest.mock('admin-panel/utils/api').fn();

  const setup = async () => {
    return {
      apiMock,
      spyFetchMethod,
      mockFunction: jest.fn(),
      spyLocalStorageMethod,
    };
  }

  describe('login', () => {
    it('saves login credentials to localStorage on login success', async () => {
      const {
        spyLocalStorageMethod,
      } = await setup();

      const localStorageSetterSpy = spyLocalStorageMethod('setItem');

      const fetchSpy = spyFetchMethod();
      fetchSpy.mockReturnValue(Promise.resolve(new Response(`{"token": "${sampleToken}"}`)));

      // username and password not returned due to using mock api.
      await authProvider.login({username: '', password: ''})

      expect(localStorageSetterSpy).toHaveBeenCalledWith('jwt', sampleToken);
    });

    it('raises error if request fails.', async () => {
      const {apiMock,} = await setup();
      apiMock.mockReturnValue(Promise.reject());

      expect(authProvider.login({username: '', password: ''})).rejects.toThrow();
    });
  })

  it('clears localStorage on logout.', async () => {
    const { spyLocalStorageMethod } = await setup();
    const localStorageClearSpy = spyLocalStorageMethod('clear');

    await authProvider.logout();

    expect(localStorageClearSpy).toHaveBeenCalled();
  });

  it('detects unauthenticated user from localStorage correctly', async () => {
    const { spyLocalStorageMethod } = await setup();
    const localStorageGetterSpy = spyLocalStorageMethod('getItem');

    // return null by default.
    localStorageGetterSpy.mockImplementation((...args) => null);

    expect(authProvider.checkAuth()).rejects.toThrowError('You are not logged in.');
  })

  it('detects user logged-in from localStorage correctly', async () => {
    const { spyLocalStorageMethod } = await setup();
    const localStorageGetterSpy = spyLocalStorageMethod('getItem');

    localStorageGetterSpy.mockImplementation((...args) => {
      if (args[0] === 'jwt')
        return `jwt-mock-${args.length}`;
      return null;
    });

    expect(authProvider.checkAuth).not.toThrowError();
  })
})
