export const spyLocalStorageMethod = (methodName: string) => {
  return jest.spyOn(global.localStorage.__proto__, methodName);
}

export const spyFetchMethod = () => jest.spyOn(global, 'fetch');

describe('testing utils', () => {
  it('works!', () => {})
});
