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
vm.runInContext(`${inlineSource}\nglobalThis.__api = { state, payload, commercialModelValidation, selectOdooPriceLists, fullOpexCommercialState, buildQuote };`, context);
const { state, payload, commercialModelValidation, selectOdooPriceLists, fullOpexCommercialState, buildQuote } = context.__api;

function templateIdsIn(catalog) {
  const ids = new Set();
  function visit(value) {
    if (!value || typeof value !== "object") return;
    if (Number.isInteger(value.productionId)) ids.add(value.productionId);
    for (const child of Object.values(value)) visit(child);
  }
  visit(catalog);
  return [...ids].sort((a, b) => a - b);
}

for (const [entity, expected] of Object.entries({
  NL: [429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 460, 461],
  UK: [792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 823, 824],
  DE: [660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 691, 692]
})) {
  const catalog = entity === "NL" ? context.window.PFM_PRICING.odooTemplateCatalog : context.window.PFM_PRICING.odooTemplateCatalogByEntity[entity];
  assert.deepEqual(templateIdsIn(catalog), expected, `${entity} production template IDs match workbook`);
}

for (const [entity, lidarId, xovisId] of [["NL", 440, 439], ["UK", 803, 802], ["DE", 671, 670]]) {
  const catalog = entity === "NL"
    ? context.window.PFM_PRICING.odooTemplateCatalog.retailChain.capex
    : context.window.PFM_PRICING.odooTemplateCatalogByEntity[entity].retailChain.capex;
  assert.equal(catalog.tpl_rc_instore_lidar.productionId, lidarId);
  assert.equal(catalog.tpl_rc_instore_3d.productionId, xovisId);
}

function configure(entity, segment, sensorType = "premium") {
  state.step = 6;
  state.lang = "EN";
  state.customerType = segment === "retailProperty" ? "Shopping Centre" : "Retail Chain";
  state.selectedGoals = segment === "retailProperty" ? ["centre_baseline"] : ["visitor_profile_unknown"];
  state.selectedPackage = "professional";
  state.commercialModel = "capex_opex";
  state.impactCommercialModel = "capex_opex";
  state.values = {
    ...state.values,
    clientName: "Fixture customer", contactName: "Fixture contact", contactEmail: "fixture@example.com",
    preparedBy: { NL: "Christiaan van Rooijen", UK: "David Sturdy", DE: "Anna Reiländer" }[entity],
    country: entity === "UK" ? "NL" : "UK", locations: 12, weeklyFootfall: 8400,
    entrances: 4, storesPresent: 55, centreType: "Covered centre", propertyType: "shopping_centre",
    propertyOutdoorEntrances: 0, propertyVehicleEntrances: null, propertyZoneSensors: 0,
    propertyReidCameras: 0, propertyServerSites: null, entranceSensorType: sensorType,
    instoreTechnology: "lidar", instoreStores: 0, avgStoreSqm: 150,
    tcoYears: 3, realisationFactor: 25
  };
}

const priceLists = {
  NL: { retailChain: [6256, 6258, 6259, 6260], retailProperty: [6257, 6261, 6262, 6263] },
  UK: { retailChain: [6329, 6307, 6288, 6290], retailProperty: [6336, 6282, 6284, 6286] },
  DE: { retailChain: [6353, 6265, 6272, 6270], retailProperty: [6355, 6267, 6269, 6271] }
};
for (const [entity, segments] of Object.entries(priceLists)) {
  for (const [segment, ids] of Object.entries(segments)) {
    for (const count of [1, 9, 10, 29, 30, 99, 100, 400]) {
      const lists = selectOdooPriceLists(entity, segment, count);
      assert.deepEqual([lists.capex.id, lists.opex.id, lists.fullOpex.xovis.id, lists.fullOpex.milesight.id], ids);
      assert.equal(lists.sensorCount, count);
    }
  }
}

const templateIds = {
  NL: { retailChain: [430, 442, 455, 450], retailProperty: [430, 447, 456, 453] },
  UK: { retailChain: [793, 805, 818, 813], retailProperty: [793, 810, 819, 816] },
  DE: { retailChain: [661, 673, 686, 681], retailProperty: [661, 678, 687, 684] }
};
for (const [entity, segments] of Object.entries(templateIds)) {
  for (const [segment, ids] of Object.entries(segments)) {
    configure(entity, segment);
    const capex = payload();
    assert.equal(capex.meta.odoo_mapping_environment, "production");
    assert.equal(capex.odoo_price_lists.environment, "production");
    assert.equal(capex.template_id, ids[0]);
    assert.equal(capex.subscription_quote.template_id, ids[1]);
    assert.equal(capex.odoo_template.selected_template_test_id, ids[0]);
    assert.equal(capex.odoo_template.selected_template_production_id, ids[0]);
    assert.equal(capex.pricelist_id, priceLists[entity][segment][0]);
    assert.equal(capex.subscription_quote.pricelist_id, priceLists[entity][segment][1]);
    assert.equal(capex.quote_execution_plan.quotes[0].template_id, ids[0]);
    assert.equal(capex.quote_execution_plan.quotes[1].template_id, ids[1]);
    state.commercialModel = "full_opex";
    const full = payload();
    assert.equal(full.template_id, ids[2]);
    assert.equal(full.subscription_quote.template_id, ids[3]);
    assert.equal(full.full_opex_quote.package_template.template_id, ids[3]);
    assert.equal(full.full_opex_quote.capex_for_opex_template.template_id, ids[2]);
    assert.equal(full.full_opex_quote.pricelist.pricelist_id, priceLists[entity][segment][2]);
    assert.equal(full.quote_execution_plan.quotes[1].pricelist_id, priceLists[entity][segment][2]);
    state.commercialModel = "both";
    const both = payload();
    assert.deepEqual(Array.from(both.quote_execution_plan.quotes, quote => quote.template_id), ids);
    const expectedReady = true;
    assert.equal(commercialModelValidation(capex).valid, expectedReady);
    assert.equal(commercialModelValidation(full).valid, expectedReady);
    assert.equal(commercialModelValidation(both).valid, expectedReady);
    if (entity === "DE") {
      assert.equal(full.full_opex_quote.mapping_complete, true);
      assert.equal(full.full_opex_quote.enabled_for_generation, true);
    }
  }
}

configure("DE", "retailChain", "basic");
state.commercialModel = "full_opex";
const deMilesight = payload();
assert.equal(deMilesight.full_opex_quote.package_template.template_id, 681);
assert.equal(deMilesight.full_opex_quote.pricelist.pricelist_id, 6270);
assert.equal(fullOpexCommercialState().ready, true);
assert.equal(fullOpexCommercialState().mappingComplete, true);

configure("NL", "retailChain");
state.selectedGoals = ["instore_unknown"];
state.selectedPackage = "enterprise";
state.values.instoreStores = 1;
const instore = payload();
assert.equal(instore.odoo_template.instore_opex_template.test_id, 445);
assert.equal(instore.instore_addon_template_id, 445);
assert.equal(instore.quote_execution_plan.mapping_complete, true);
assert.equal(instore.quote_execution_plan.missing_mapping.includes("processing_unit_product_mapping"), false);

const productionServerIds = {
  NL: [18671, 18674, 18677, 18680, 18683, 18686, 18689, 18692, 18695],
  UK: [18673, 18675, 18678, 18784, 18684, 18687, 18690, 18693, 18696],
  DE: [18672, 18676, 18679, 18682, 18685, 18688, 18691, 18694, 18697]
};
const productionServerArticleIds = {
  NL: [15665, 15668, 15671, 15674, 15677, 15680, 15683, 15686, 15689],
  UK: [15667, 15669, 15672, 15675, 15678, 15681, 15684, 15687, 15690],
  DE: [15666, 15670, 15673, 15676, 15679, 15682, 15685, 15688, 15691]
};
const productionProcessingUnits = {
  NL: [15284, 12081], UK: [11901, 15663], DE: [15662, 15438]
};
const retailPropertySetupProductIds = {
  NL: { web_reporting: 15554, sensor_setup: 18241 },
  UK: { web_reporting: 15555, sensor_setup: 15553 },
  DE: { web_reporting: 18386, sensor_setup: 18449 }
};
const retiredSetupProductIds = new Set([12640, 15275, 12641, 12639, 15418, 15480]);
for (const [entity, segment] of [["NL", "retailChain"], ["NL", "retailProperty"], ["UK", "retailChain"], ["UK", "retailProperty"], ["DE", "retailChain"], ["DE", "retailProperty"]]) {
  configure(entity, segment, "isarsoft");
  if (segment === "retailProperty") {
    state.selectedGoals = ["dwell_cross_shopping"];
    state.values.propertyReidCameras = 34;
  }
  const result = payload();
  const setupIds = retailPropertySetupProductIds[entity];
  const webReportingRule = result.odoo_line_quantity_rules.find(rule => rule.product_id === setupIds.web_reporting);
  const sensorSetupRule = result.odoo_line_quantity_rules.find(rule => rule.product_id === setupIds.sensor_setup);
  assert.equal(result.odoo_line_quantity_rules.some(rule => retiredSetupProductIds.has(rule.product_id)), false);
  assert.ok(webReportingRule, `${entity} ${segment} explicitly handles Web Reporting template line`);
  assert.ok(sensorSetupRule, `${entity} ${segment} explicitly handles Sensor Setup template line`);
  if (segment === "retailChain") {
    assert.deepEqual([webReportingRule.action, webReportingRule.quantity], ["remove", 0]);
    assert.deepEqual([sensorSetupRule.action, sensorSetupRule.quantity], ["remove", 0]);
  } else {
    assert.deepEqual([webReportingRule.action, webReportingRule.quantity], ["set_quantity", 1]);
    assert.deepEqual([sensorSetupRule.action, sensorSetupRule.quantity], ["set_quantity", 38]);
  }
  assert.equal(result.quote_execution_plan.mapping_complete, segment !== "retailProperty");
  assert.equal(result.quote_execution_plan.missing_mapping.includes("isarsoft_server_product_mapping"), false);
  if (segment === "retailProperty") assert.ok(result.quote_execution_plan.missing_mapping.includes("isarsoft_addon_template_mapping"));
  const serverRules = Array.from(result.odoo_line_quantity_rules).filter(rule => rule.role === "isarsoft_server");
  assert.equal(serverRules.length, 9, `${entity} ${segment} must emit rules for all nine server alternatives`);
  assert.deepEqual(serverRules.map(rule => rule.product_id), productionServerIds[entity]);
  assert.deepEqual(serverRules.map(rule => rule.odoo_article_id), productionServerArticleIds[entity]);
  for (const rule of serverRules) {
    const serverMapping = context.window.PFM_PRICING.odooProductionArticlesByEntity[entity].isarsoft_servers[rule.profile_key];
    assert.equal(rule.product_id, serverMapping.odoo_product_id, `${entity} ${rule.profile_key} emits its product.product ID`);
    assert.equal(rule.odoo_article_id, serverMapping.odoo_article_id, `${entity} ${rule.profile_key} preserves its article ID`);
    assert.notEqual(rule.product_id, rule.odoo_article_id, `${entity} ${rule.profile_key} must not emit its article ID as product_id`);
    if (rule.action === "set_quantity") assert.ok(rule.quantity > 0);
    else assert.deepEqual([rule.action, rule.quantity], ["remove", 0]);
  }
  assert.equal(serverRules.filter(rule => rule.action === "set_quantity").length, 1);
  assert.equal(serverRules.filter(rule => rule.action === "remove").length, 8);
  const selectedRule = serverRules.find(rule => rule.action === "set_quantity");
  const resolvedServer = result.isarsoft.location_resolution[0].server;
  assert.equal(selectedRule.profile_key, resolvedServer.profile_key);
  assert.equal(selectedRule.product_id, resolvedServer.odoo_product_id);
  assert.equal(commercialModelValidation(result).valid, segment !== "retailProperty");
  assert.equal(result.isarsoft.location_resolution[0].server.odoo_article_id != null, true);
}

for (const [entity, ids] of Object.entries(productionServerIds)) {
  const production = context.window.PFM_PRICING.odooProductionArticlesByEntity[entity];
  assert.deepEqual({
    web_reporting: production.retail_property_setup.web_reporting.odoo_product_id,
    sensor_setup: production.retail_property_setup.sensor_setup.odoo_product_id
  }, retailPropertySetupProductIds[entity]);
  assert.deepEqual(Object.values(production.isarsoft_servers).map(item => item.odoo_product_id), ids);
  assert.deepEqual(Object.values(production.isarsoft_servers).map(item => item.odoo_article_id), productionServerArticleIds[entity]);
  assert.deepEqual([
    production.lidar_processing_unit.odoo_product_id,
    production.xovis_processing_unit.odoo_product_id
  ], productionProcessingUnits[entity]);
}

configure("NL", "retailChain");
let externalWrites = 0;
let submittedUrl = null;
let submittedPayload = null;
context.fetch = async (url, options) => {
  externalWrites += 1;
  submittedUrl = url;
  submittedPayload = JSON.parse(options.body);
  return { ok: true, status: 200 };
};
buildQuote().then(() => {
  assert.equal(externalWrites, 1);
  assert.equal(submittedUrl, "https://n8n.pfm-intelligence.com/webhook/2c2b23b8-e270-4e8d-ac42-c49ea76185a6");
  assert.equal(submittedPayload.meta.odoo_mapping_environment, "production");
  assert.equal(submittedPayload.template_id, 430);
  assert.match(document.getElementById("quoteWebhookStatus").textContent, /Quote request sent for human review/);
  console.log("production mapping and payload tests passed");
}).catch(error => { console.error(error); process.exitCode = 1; });
