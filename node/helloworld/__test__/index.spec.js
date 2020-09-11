test("Hello world", () => {
  const str = require("../index");
  console.log(str);
  expect(str).toBe("Hello world")
});
