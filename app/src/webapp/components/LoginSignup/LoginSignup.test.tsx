import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginSignup from './LoginSignup';
import { LoginFormData } from "types/login";

describe('webapp/components/LoginSignup/LoginSignup', () => {
  const setup = async () => {
    const loginMockFunction = jest.fn();
    const signupMockFunction = jest.fn();
    const forgotPasswordMockFunction = jest.fn();

    const loginMock = async (props: LoginFormData) => { loginMockFunction(props) };
    const signupMock = async (props: LoginFormData) => { signupMockFunction(props) };
    const forgotPasswordMock = async () => { forgotPasswordMockFunction() };

    const utils = render(<LoginSignup
        onLogin={loginMock}
        onSignup={signupMock}
        onForgetPasswordClick={forgotPasswordMock}
    />);

    return {
        ...utils,
      loginMockFunction,
      signupMockFunction,
      forgotPasswordMockFunction,
      usernameInput: await utils.getByLabelText('username_input'),
      passwordInput: await utils.getByLabelText('password_input'),
      loginButton: await utils.getByLabelText('login_button'),
      signupButton: await utils.getByLabelText('signup_button'),
      forgotPasswordButton: await utils.getByLabelText('on_forget_button'),
    }
  }

  it('fires login callback on login button submit', async () => {
    const {
      usernameInput,
      passwordInput,
      loginButton,
      loginMockFunction,
    } = await setup();

    fireEvent.change(usernameInput, { target: { value: 'blah blah' } })
    fireEvent.change(passwordInput, { target: { value: 'bluh bluh' } })

    fireEvent.click(loginButton);

    expect(loginMockFunction.mock.calls.length).toEqual(1);
  })

  it('fires sign up callback on click', async () => {
    const {
      usernameInput,
      passwordInput,
      signupButton,
      signupMockFunction,
    } = await setup();

    fireEvent.change(usernameInput, { target: { value: 'blah blah' } })
    fireEvent.change(passwordInput, { target: { value: 'bluh bluh' } })

    fireEvent.click(signupButton);

    expect(signupMockFunction.mock.calls.length).toEqual(1);
  })

  it('fires forgot password callback on click', async () => {
    const {
      forgotPasswordButton,
      forgotPasswordMockFunction,
    } = await setup();

    fireEvent.click(forgotPasswordButton);

    expect(forgotPasswordMockFunction.mock.calls.length).toEqual(1);
  })
});
