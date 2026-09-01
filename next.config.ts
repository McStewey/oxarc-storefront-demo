import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGitHubPages ? '/oxarc-storefront-demo' : '',
  assetPrefix: isGitHubPages ? '/oxarc-storefront-demo/' : '',
};

export default nextConfig;
