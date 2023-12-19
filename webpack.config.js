/**
 * This file is only in the project for eslint module resolution config
 * for our custom import path of @hhs so that eslint knows we're aliasing
 *
 */

const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, 'src'),
      '@/theme': path.resolve(__dirname, 'src/theme'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/screens': path.resolve(__dirname, 'src/screens'),
      '@/helpers': path.resolve(__dirname, 'src/helpers'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/navigation': path.resolve(__dirname, 'src/navigation'),
    },
    extensions: ['.android.js', '.ios.js', '.js'],
  },
}
