import NextFederationPlugin from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    
    // Only enable Module Federation in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development' || process.env.ENABLE_MODULE_FEDERATION === 'true') {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            angular_mfe: `angular_mfe@http://localhost:4201/remoteEntry.js`,
            svelte_mfe: `svelte_mfe@http://localhost:4173/remoteEntry.js`,
          },
          shared: {
            react: { singleton: true, eager: true },
            'react-dom': { singleton: true, eager: true },
          },
          extraOptions: {
            skipSharingNextInternals: true,
          },
        })
      );
    }

    return config;
  },
};

export default nextConfig;
