import fs from "fs";
import path from "path";

test("passage data exists and has title and content", () => {
  const filePath = path.join(process.cwd(), "public", "data", "passages.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  // Support a few possible shapes: array, { passages: [...] }, { passage: {...} }, or single object
  const passages = Array.isArray(data)
    ? data
    : data.passages
    ? data.passages
    : data.passage
    ? [data.passage]
    : [data];

  expect(passages.length).toBeGreaterThan(0);
  const first = passages[0];
  expect(first).toBeDefined();
  expect(typeof first.title).toBe("string");
  expect(first.title.length).toBeGreaterThan(0);
  expect(typeof first.content).toBe("string");
  expect(first.content.length).toBeGreaterThan(0);
});
