import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Role Selector Auth",
      credentials: {
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.role) return null;
        
        let permissions: string[] = [];
        if (credentials.role === 'admin') permissions = ['manage_all', 'approve_orders', 'view_revenue'];
        if (credentials.role === 'manager') permissions = ['approve_orders', 'view_team'];
        if (credentials.role === 'sales_rep') permissions = ['create_order', 'view_catalog'];
        if (credentials.role === 'retailer') permissions = ['create_order', 'view_catalog'];

        return {
          id: `demo-${credentials.role}`,
          name: `${credentials.role.replace('_', ' ').toUpperCase()} User`,
          role: credentials.role,
          permissions
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.permissions = (user as any).permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session as any).user.role = token.role;
        (session as any).user.permissions = token.permissions;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
