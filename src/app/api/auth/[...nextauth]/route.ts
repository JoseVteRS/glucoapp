import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'


export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
 
    providers: [
        CredentialsProvider({
            name: 'Sign in',

            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password"
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user) return null

                const isPasswordValid = await compare(credentials.password, user.password)
                if (!isPasswordValid) return null

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }


            }
        })
    ],
    callbacks: {
        session: async ({ session, user, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub
                }
            }
            // return Promise.resolve(session);
        },
        jwt: ({ token }) => {
            return token;
        },
        redirect: async ({ url, baseUrl }) => {
            return baseUrl
        }


    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
