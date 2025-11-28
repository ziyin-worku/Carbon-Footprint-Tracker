
import { useEffect } from 'react';
import api from './api';

/* global google */

export default function AuthButton() {
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // store Client ID in frontend env

    if (!window.google?.accounts?.id) {
      console.warn('Google Identity Services not loaded');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response) => {
        // response.credential is the Google ID token
        try {
          // Exchange the Google ID token with your backend to get app tokens / user
          const res = await api.post('/auth/google', { token: response.credential });
          const data = res?.data ?? res;

          if (data?.token) {
            localStorage.setItem('access_token', data.token);
          }
          if (data?.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
            console.log('Signed in as', data.user.email);
          }
        } catch (e) {
          console.error('Auth exchange failed', e);
        }
      },
      auto_select: false,
      ux_mode: 'popup',
    });

    window.google.accounts.id.renderButton(
      document.getElementById('gsiButton'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  return <div id="gsiButton" />;
}
