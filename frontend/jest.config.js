// Configuration for Jest

// Exports module
// Ignores all modules besides 'axios' package
module.exports = {
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)"
  ],
  moduleNameMapper: {
    '^axios$': require.resolve('axios')
  }
}