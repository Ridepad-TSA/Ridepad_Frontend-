import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';

// The backend exposes POST /auth/login returning { user, token }.
export const authOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api'}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });
          if (!data?.user || !data?.token) return null;
          return { ...data.user, accessToken: data.token };
        } catch (error) {
          if (error?.response?.status === 401) return null;
          if (error?.response?.status >= 500 || !error?.response) throw new Error('AUTH_UNAVAILABLE');
          throw new Error('AUTH_REQUEST_FAILED');
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
