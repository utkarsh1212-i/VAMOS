import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// env variables for auth js : 
// AUTH_GOOGLE_ID
// AUTH_GOOGLE_SECRET


// env variables for next auth : 
// GOOGLE_CLIENT_ID=your-google-client-id
// GOOGLE_CLIENT_SECRET=your-google-client-secret
// NEXTAUTH_URL=http://localhost:3000

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    },
  },
});

// export const { handlers, auth, signIn, signOut } = NextAuth({
//     providers: [Google],
//   })
