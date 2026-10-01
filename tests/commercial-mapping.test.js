const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const pricingSource = fs.readFileSync("pricing-config.js", "utf8");
const htmlSource = fs.readFileSync("index.html", "utf8");
const context = { window: {}, state: { customerType: "Retail Chain" } };
vm.createContext(context);
vm.runInContext(pricingSource, context);

function extractFunction(name) {
  const start = htmlSource.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `function ${name} must exist`);
  let brace = htmlSource.indexOf("{", start);
  let depth = 0;
  let quote = null;
  for (let i = brace; i < htmlSource.length; i += 1) {
    const char = htmlSource[i];
    const previous = htmlSource[i - 1];
    if (quote) {
      if (char === quote && previous !== "\\") quote = null;
      continue;
    }
    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "{") depth += 1;
    if (char === "}" && --depth === 0) return htmlSource.slice(start, i + 1);
  }
  throw new Error(`Could not extract ${name}`);
}

vm.runInContext([
  "const PRICING = window.PFM_PRICING;",
  "const ODOO_MAPPING_ENV = 'test';",
  "const state = globalThis.state;",
  "const ceilQuantity = value => Math.ceil(Number(value));",
  extractFunction("distributeLocationUnits"),
  extractFunction("odooIsarsoftServerProduct"),
  extractFunction("resolveIsarsoftServer"),
  extractFunction("resolveIsarsoftServers"),
  extractFunction("processingUnitResolution"),
  extractFunction("selectOdooTemplate"),
  "globalThis.testApi = { resolveIsarsoftServer, resolveIsarsoftServers, processingUnitResolution, selectOdooTemplate };"
].join("\n"), context);

const { resolveIsarsoftServer, resolveIsarsoftServers, processingUnitResolution, selectOdooTemplate } = context.testApi;

function templateRecord(entity, segment, type, key) {
  const entityCatalog = context.window.PFM_PRICING.odooTemplateCatalogByEntity?.[entity]?.[segment];
  if (entityCatalog?.[type] && Object.prototype.hasOwnProperty.call(entityCatalog[type], key)) return entityCatalog[type][key];
  return context.window.PFM_PRICING.odooTemplateCatalog?.[segment]?.[type]?.[key] || null;
}

function server(segment, cameras, entity) {
  return resolveIsarsoftServer(segment, cameras, entity);
}

for (const [entity, lidar, xovis] of [["NL", 15284, 12081], ["UK", 11901, 15537]]) {
  assert.equal(context.testApi.processingUnitResolution("INSTORE_LIDAR", 5, entity).product_id, lidar);
  assert.equal(context.testApi.processingUnitResolution("INSTORE_LIDAR", 5, entity).quantity, 2);
  assert.equal(context.testApi.processingUnitResolution("INSTORE_3D", 12, entity).product_id, xovis);
}
assert.equal(processingUnitResolution("INSTORE_LIDAR", 5, "DE").mappingComplete, false);
assert.equal(processingUnitResolution("INSTORE_3D", 12, "DE").mappingComplete, false);
for (const count of [9]) {
  const result = processingUnitResolution("INSTORE_3D", count, "NL");
  assert.equal(result.quantity, 0);
  assert.equal(result.required, false);
  assert.equal(result.mappingComplete, true);
}
for (const count of [10, 100, 350]) {
  const result = processingUnitResolution("INSTORE_3D", count, "NL");
  assert.equal(result.quantity, 1);
  assert.equal(result.required, true);
  assert.equal(result.mappingComplete, true);
  assert.equal(result.flagReview, false);
}
const unsupportedXovis = processingUnitResolution("INSTORE_3D", 351, "NL");
assert.equal(unsupportedXovis.quantity, 0);
assert.equal(unsupportedXovis.required, false);
assert.equal(unsupportedXovis.mappingComplete, false);
assert.equal(unsupportedXovis.flagReview, true);
assert.equal(context.window.PFM_PRICING.instoreAnalytics.technologies["3d"].serverThreshold, 10);
assert.equal(context.window.PFM_PRICING.instoreAnalytics.technologies["3d"].serverMaxSensors, 350);

assert.equal(selectOdooTemplate("retailChain", "RC_FOOTFALL_TRACKING", "enterprise", "isarsoft").baseTemplate, "tpl_rc_footfall_enterprise_isarsoft");

for (const [entity, ids] of [["NL", [266, 272, 273]], ["UK", [269, 274, 275]]]) {
  for (const [key, expectedId] of [["tpl_rc_footfall_essential_isarsoft", ids[0]], ["tpl_rc_footfall_professional_isarsoft", ids[1]], ["tpl_rc_footfall_enterprise_isarsoft", ids[2]]]) {
    assert.equal(templateRecord(entity, "retailChain", "capex", key)?.testId, expectedId, `${entity} ${key} template ID`);
  }
}
assert.equal(templateRecord("NL", "retailChain", "opex", "instore_lidar")?.builderConfig, "NL_QB_Enterprise_Retail_Package_Addon-LiDAR");
assert.equal(templateRecord("NL", "retailChain", "opex", "instore_3d")?.builderConfig, "NL_QB_Enterprise_Retail_Package_Addon-Xovis");
assert.equal(templateRecord("UK", "retailChain", "opex", "instore_lidar")?.builderConfig, "UK_QB_Enterprise_Retail_Package_Addon-LiDAR");
assert.equal(templateRecord("UK", "retailChain", "opex", "instore_3d")?.builderConfig, "UK_QB_Enterprise_Retail_Package_Addon-Xovis");
assert.equal(context.window.PFM_PRICING.odooTemplateCatalogByEntity.DE.retailChain.capex.tpl_rc_footfall_essential_isarsoft.productionId, 688);
assert.equal(context.window.PFM_PRICING.odooTemplateCatalogByEntity.UK.retailProperty.capex.tpl_rp_footfall_essential_premium, undefined);

for (const [entity, ids] of [["NL", [18530, 18531, 18532, 18533]], ["UK", [18521, 18522, 18523, 18524]]]) {
  for (const [count, expectedId] of [[1, ids[0]], [2, ids[0]], [3, ids[1]], [4, ids[1]], [5, ids[2]], [16, ids[2]], [17, ids[3]], [32, ids[3]]]) {
    assert.equal(server("retailChain", count, entity).odoo_product_id, expectedId);
  }
}
for (const [count, expectedTemplateId, expectedReference] of [[1, 15547, "PFMNL-PFM/14387"], [3, 15548, "PFMNL-PFM/14388"], [5, 15549, "PFMNL-PFM/14389"], [17, 15550, "PFMNL-PFM/14390"]]) {
  const resolved = server("retailChain", count, "NL");
  assert.equal(resolved.odoo_product_template_id, expectedTemplateId);
  assert.equal(resolved.internal_reference, expectedReference);
}
for (const count of [1, 2]) assert.equal(server("retailChain", count, "NL").profile_key, "orin_nano_8gb");
for (const count of [3, 4]) assert.equal(server("retailChain", count, "NL").profile_key, "orin_nx_16gb");
assert.equal(server("retailChain", 5, "NL").profile_key, "agx_orin_64gb");
assert.equal(server("retailChain", 16, "NL").profile_key, "agx_orin_64gb");
assert.equal(server("retailChain", 17, "NL").profile_key, "agx_thor_128gb");
assert.equal(server("retailChain", 32, "NL").profile_key, "agx_thor_128gb");

for (const [count, profile] of [[1, "rtx_2000_ada"], [10, "rtx_2000_ada"], [11, "rtx_4000_ada"], [20, "rtx_4000_ada"], [21, "dual_rtx_4000_ada"], [40, "dual_rtx_4000_ada"], [41, "dual_rtx_5000_ada"], [80, "dual_rtx_5000_ada"], [81, "dual_rtx_6000_ada"], [120, "dual_rtx_6000_ada"]]) {
  assert.equal(server("retailProperty", count, "NL").profile_key, profile);
}
for (const [count, expectedId] of [[1, 18525], [10, 18525], [11, 18526], [20, 18526], [21, 18527], [40, 18527], [41, 18528], [80, 18528], [81, 18529], [120, 18529]]) {
  assert.equal(server("retailProperty", count, "UK").odoo_product_id, expectedId);
}
for (const [count, expectedTemplateId, expectedReference] of [[1, 15538, "PFMUK-PFM/14378"], [3, 15539, "PFMUK-PFM/14379"], [5, 15540, "PFMUK-PFM/14380"], [17, 15541, "PFMUK-PFM/14381"]]) {
  const resolved = server("retailChain", count, "UK");
  assert.equal(resolved.odoo_product_template_id, expectedTemplateId);
  assert.equal(resolved.internal_reference, expectedReference);
}
for (const [count, expectedTemplateId, expectedReference] of [[1, 15542, "PFMUK-PFM/14382"], [11, 15543, "PFMUK-PFM/14383"], [21, 15544, "PFMUK-PFM/14384"], [41, 15545, "PFMUK-PFM/14385"], [81, 15546, "PFMUK-PFM/14386"]]) {
  const resolved = server("retailProperty", count, "UK");
  assert.equal(resolved.odoo_product_template_id, expectedTemplateId);
  assert.equal(resolved.internal_reference, expectedReference);
}
for (const [count, expectedId, expectedTemplateId, expectedReference] of [[1, 18534, 15551, "PFMNL-PFM/14391"], [11, 18535, 15552, "PFMNL-PFM/14392"], [21, 18536, 15553, "PFMNL-PFM/14393"], [41, 18537, 15554, "PFMNL-PFM/14394"], [81, 18538, 15555, "PFMNL-PFM/14395"]]) {
  const resolved = server("retailProperty", count, "NL");
  assert.equal(resolved.odoo_product_id, expectedId);
  assert.equal(resolved.odoo_product_template_id, expectedTemplateId);
  assert.equal(resolved.internal_reference, expectedReference);
}

const sameProfile = resolveIsarsoftServers("retailChain", 8, 2, "NL");
assert.deepEqual(Array.from(sameProfile.locations, location => location.camera_count), [4, 4]);
assert.deepEqual(Array.from(sameProfile.products, product => [product.profile_key, product.quantity]), [["orin_nx_16gb", 2]]);

const differentProfiles = resolveIsarsoftServers("retailChain", 6, 2, "NL");
assert.deepEqual(Array.from(differentProfiles.locations, location => location.server.profile_key), ["orin_nx_16gb", "orin_nx_16gb"]);
const mixed = resolveIsarsoftServers("retailChain", 9, 2, "NL");
assert.deepEqual(Array.from(mixed.locations, location => location.server.profile_key), ["agx_orin_64gb", "orin_nx_16gb"]);
assert.deepEqual(Array.from(mixed.products, product => [product.profile_key, product.quantity]), [["agx_orin_64gb", 1], ["orin_nx_16gb", 1]]);

const de = resolveIsarsoftServers("retailProperty", 11, 1, "DE");
assert.equal(de.mappingComplete, false);
assert.equal(de.products[0].odoo_product_id, null);
assert.equal(resolveIsarsoftServer("unsupported", 1, "NL").mappingComplete, false);
assert.equal(resolveIsarsoftServer("retailChain", 33, "NL").mappingComplete, false);
assert.equal(resolveIsarsoftServer("retailProperty", 121, "NL").mappingComplete, false);
assert.equal(resolveIsarsoftServers("retailProperty", 121, 1, "NL").mappingComplete, false);
assert.equal(resolveIsarsoftServers("retailChain", 0, 1, "NL").mappingComplete, false);

console.log("commercial mapping tests passed");
