const webpack = require('webpack');
require('dotenv').config();


module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    config.plugins.push(new webpack.DefinePlugin(env));

    return config
  },
  env: {
    "FIREBASE_KEY": process.env.FIREBASE_KEY,
    "AUTH_DOMAIN": process.env.AUTH_DOMAIN,
    "DATABASE_URL": process.env.DATABASE_URL,
    "PROJECT_ID": process.env.PROJECT_ID,
    "STORAGE_BUCKET": process.env.STORAGE_BUCKET,
    "MESSAGING_SENDER_ID": process.env.MESSAGING_SENDER_ID,
    "APP_ID": process.env.APP_ID

  }
}
