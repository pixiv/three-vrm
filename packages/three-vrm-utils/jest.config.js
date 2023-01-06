module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "[^.]*.test.ts$",
  "moduleFileExtensions": [
    "ts",
    "js",
    "json",
    "node"
  ],
  "collectCoverageFrom": [
    "**/*.ts",
    "!**/tests/**"
  ]
}
