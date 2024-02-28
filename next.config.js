/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    env: {
        //   nextauth_url : process.env.NEXTAUTH_URL,
        //   password_secret : process.env.PASSWORD_SECRET,
        backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
    },
}
