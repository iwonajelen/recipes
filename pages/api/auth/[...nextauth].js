import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],

  callbacks: {
    session: async (session, user) => {
      session.id = user.id
      return Promise.resolve(session)
    }
  },

  database: process.env.MONGODB_URI
};

export default (req, res) => NextAuth(req, res, options);