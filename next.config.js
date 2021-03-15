module.exports = {
    // Target must be serverless
    target: 'serverless',
    env: {
      PRIVATE_KEY: process.env.PRIVATE_KEY,
      ACCOUNT_ID: process.env.ACCOUNT_ID,
      TOKENID: process.env.TOKENID
    },
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        config.node = {
          fs: 'empty'
        }
      }
  
      return config
    }
};