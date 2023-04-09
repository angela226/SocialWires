module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    globals: {
      NODE_ENV: "test",
      DATABASE_URL: "mysql://root@localhost:3306/wires"
    }
  };

 