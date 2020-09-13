export type LoginFormData = {
  username: string,
  password: string,
};

export interface LoginSignupCallback {
  // TypeScript parsing bug for no-unused-vars.
  // See https://github.com/eslint/typescript-eslint-parser/issues/457
  // eslint-disable-next-line no-unused-vars
  (params: LoginFormData): Promise<void>
}

export type LoginSignupProps = {
  onForgetPasswordClick?: () => Promise<void>,
  onLogin?: LoginSignupCallback,
  onSignup?: LoginSignupCallback,
};

export type LoginApiPayload = {
  token: string,
};
