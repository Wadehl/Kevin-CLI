import { getVersion, getAuthor, getInfo } from "../lib/information.mjs";

test("version should be the same as package.json", async () => {
  const version = await getVersion();
  const packageObj = await getInfo();
  expect(version).toBe(packageObj.version);
});

test("author should be the same as package.json", async () => {
  const author = await getAuthor();
  const packageObj = await getInfo();
  expect(author).toBe(packageObj.author);
});
