import React from 'react';
import Helmet from 'react-helmet';

export const LoginPage = () => (
  <div>
    <Helmet
      title="Login Page"
      meta={[
        { name: 'description', content: 'A React.js Boilerplate application login page' },
      ]}
    />
    <h1>LOGIN</h1>
    <a className="btn btn-lg btn-google" href="auth/google">
      <i className="fa fa-google fa-lg"></i> Login with your TAB account
    </a>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <meta name="google-signin-client_id" content="328354766394-2v20l3ggtoo2q69qttv07btohmhv2c6j.apps.googleusercontent.com"></meta>

    <div className="g-signin2" data-onsuccess="onSignIn"></div>
  </div>
);

export default LoginPage;
