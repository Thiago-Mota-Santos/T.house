// import { } from "./src/test/environment/mongodb.ts"
export default {
  moduleFileExtensions: ["ts", "js", "tsx", "json"],

  preset: "ts-jest",
  resetModules: false,
  setupFiles: ["./src/test/jest.setup.ts"],
  testEnvironment: "./src/test/environment/mongodb.ts",
  testPathIgnorePatterns: ["/node_modules/"],

  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
};
