/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack:(config)=>{
    config.externals.push({'knex':'commonjs knex'})
/*     config.module.rules.push({       
      test: /assets.*\.png/,
      type: 'asset/inline'
    }) */
    return config
  }
};

export default nextConfig;
