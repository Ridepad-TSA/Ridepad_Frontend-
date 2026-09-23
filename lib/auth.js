import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';

// Assumes the backend exposes POST /auth/login returning { user, accessToken }.
export const authOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            identifier: credentials?.identifier,
            password: credentials?.password,
          });
          if (!data?.user || !data?.accessToken) return null;
          return { ...data.user, accessToken: data.accessToken };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = { ...session.user, id: token.id, role: token.role };
      return session;
    },
  },
};
