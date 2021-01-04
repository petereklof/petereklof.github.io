const initState = {
  authMessage: null,
  authType: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      // eslint-disable-next-line no-console
      console.log('login error');
      return {
        ...state,
        authMessage: action.err,
        authType: 'danger',
      };

    case 'LOGIN_SUCCESS':
      // eslint-disable-next-line no-console
      console.log('login success');
      return {
        ...state,
        authMessage: null,
        authType: null,
      };

    case 'SIGNOUT_SUCCESS':
      // eslint-disable-next-line no-console
      console.log('signout success');
      return state;

    case 'SIGNUP_SUCCESS':
      // eslint-disable-next-line no-console
      console.log('signup success');
      return {
        ...state,
        authMessage: null,
        authType: null,
      };

    case 'SIGNUP_ERROR':
      // eslint-disable-next-line no-console
      console.log(action.err.message);
      return {
        ...state,
        authMessage: action.err.message,
        authType: 'danger',
      };

    case 'FORGOT_PASSWORD_SUCCESS':
      // eslint-disable-next-line no-console
      console.log('Password reset email sent');
      return {
        ...state,
        authMessage: 'Password reset sent, check your email',
        authType: 'success',
      };

    case 'FORGOT_PASSWORD_ERROR':
      // eslint-disable-next-line no-console
      console.log('Password reset error');
      return {
        ...state,
        authMessage: action.err.message,
        authType: 'danger',
      };

    default:

      return state;
  }
};

export default authReducer;
