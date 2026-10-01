const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const htmlSource = fs.readFileSync("index.html", "utf8");
const inlineSource = htmlSource.match(/<script>\s*const PRICING[\s\S]*?<\/script>/)?.[0]
  ?.replace(/^<script>\s*/, "")
  .replace(/<\/script>\s*$/, "");
assert.ok(inlineSource);

function element(id = "") {
  return {
    id, value: "", checked: false, disabled: false, textContent: "", innerHTML: "", style: {}, dataset: {},
    classList: { add() {}, remove() {}, toggle() {} }, addEventListener() {}, appendChild() {}, append() {}, click() {}
  };
}

const elements = new Map();
const document = {
  documentElement: { lang: "" }, body: element("body"),
  getElementById(id) { if (!elements.has(id)) elements.set(id, element(id)); return elements.get(id); },
  querySelectorAll() { return []; },
  createTreeWalker() { return { nextNode() { return false; } }; },
  createElement: element
};
const context = {
  window: { scrollTo() {} }, document,
  sessionStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
  URL: { createObjectURL() { return "blob:fixture"; }, revokeObjectURL() {} }, Blob,
  NodeFilter: { SHOW_TEXT: 4 }, fetch: async () => ({ ok: false, status: 503 }),
  console: { ...console, warn() {} }, setTimeout, clearTimeout
};
vm.createContext(context);
vm.runInContext(fs.readFileSync("pricing-config.js", "utf8"), context);
vm.runInContext(inlineSource + "\nglobalThis.__routing = { SALESPERSON_ROUTING, SALESPERSON_MAP, resolveOdooRouting, populateSalespeople, setCountryDefaultForSalesperson, state };", context);

const { SALESPERSON_ROUTING, SALESPERSON_MAP, resolveOdooRouting, populateSalespeople, setCountryDefaultForSalesperson, state } = context.__routing;
const expected = {
  "Christiaan van Rooijen": { userId: 213, entityKey: "NL", salesTeamId: 1 },
  "Raymond Sestig": { userId: 328, entityKey: "NL", salesTeamId: 1 },
  "Krystof Gogela": { userId: 387, entityKey: "NL", salesTeamId: 1 },
  "Arnoud Aschman": { userId: 343, entityKey: "NL", salesTeamId: 1 },
  "Anna Reiländer": { userId: 394, entityKey: "DE", salesTeamId: 13 },
  "Bart Schmitz": { userId: 9, entityKey: "NL", salesTeamId: 1 },
  "David Sturdy": { userId: 44, entityKey: "UK", salesTeamId: 3 },
  "Mark King": { userId: 263, entityKey: "UK", salesTeamId: 3 },
  "Mark Gosnell": { userId: 335, entityKey: "UK", salesTeamId: 3 },
  "Oliver Germer": { userId: 404, entityKey: "DE", salesTeamId: 13 },
  "Prince Competente": { userId: 382, entityKey: "NL", salesTeamId: 1 },
  "Tim Drayton": { userId: 97, entityKey: "UK", salesTeamId: 3 },
  "Phil Cox": { userId: 122, entityKey: "UK", salesTeamId: 3 },
  "Kevin Zwoll": { userId: 424, entityKey: "DE", salesTeamId: 13 }
};

assert.deepEqual(JSON.parse(JSON.stringify(SALESPERSON_ROUTING)), expected);
for (const [name, routing] of Object.entries(expected)) {
  assert.equal(SALESPERSON_MAP[name], routing.userId);
  const resolved = resolveOdooRouting(name, "Shops");
  assert.deepEqual({ userId: resolved.userId, entityKey: resolved.entityKey, salesTeamId: resolved.salesTeamId }, routing);
}

state.values.preparedBy = "Kevin Zwoll";
populateSalespeople();
const salespersonSelect = document.getElementById("preparedBy");
assert.equal(salespersonSelect.value, "Kevin Zwoll");
assert.match(salespersonSelect.innerHTML, /<option>Kevin Zwoll<\/option>/);

const countrySelect = document.getElementById("country");
assert.equal(setCountryDefaultForSalesperson("Kevin Zwoll"), true);
assert.equal(countrySelect.value, "DE");
assert.equal(state.values.country, "DE");
assert.equal(setCountryDefaultForSalesperson("David Sturdy"), true);
assert.equal(countrySelect.value, "UK");
assert.equal(setCountryDefaultForSalesperson("Christiaan van Rooijen"), true);
assert.equal(countrySelect.value, "NL");

console.log("production salesperson routing tests passed");
