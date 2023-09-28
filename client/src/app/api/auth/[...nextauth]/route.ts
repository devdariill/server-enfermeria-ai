import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    })
  ]
  // callbacks: {
  //   async redirect ({ url, baseUrl }) {
  //     console.log('🚀 ~ file: route.ts:13 ~ redirect ~ url, baseUrl:', url, baseUrl)
  //     return url.startsWith(baseUrl) ? url : baseUrl
  //   }
  // }
})

export { handler as GET, handler as POST }
// eslint-disable-next-line no-multiple-empty-lines
