/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'afex-frontend-technical-challenge-api.onrender.com',
              pathname: '/logos**',
            },
          ],
      },

      
     
}

module.exports = nextConfig
