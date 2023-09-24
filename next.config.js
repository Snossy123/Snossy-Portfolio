/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['xztrvbzwbwrxkhpkblaq.supabase.co'],
  },
}

module.exports = nextConfig
