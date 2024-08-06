/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/Schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview-mock_owner:EwMzZsb4f3gN@ep-square-hall-a59nn7ut.us-east-2.aws.neon.tech/ai-interview-mock?sslmode=require',
    }
  };