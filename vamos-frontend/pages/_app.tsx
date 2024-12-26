// _app.js or _app.tsx
import { SessionProvider } from 'next-auth/react';
// import type { AppProps } from "next/";
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
