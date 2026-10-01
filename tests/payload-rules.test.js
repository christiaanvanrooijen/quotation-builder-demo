const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const pricingSource = fs.readFileSync("pricing-config.js", "utf8");
const htmlSource = fs.readFileSync("index.html", "utf8");
const inlineSource = htmlSource.match(/<script>\s*const PRICING[\s\S]*?<\/script>/)?.[0]
  ?.replace(/^<script>\s*/, "")
  .replace(/<\/script>\s*$/, "");
assert.ok(inlineSource, "Builder inline script must exist");

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
  NodeFilter: { SHOW_TEXT: 4 }, fetch: async () => ({ ok: false, status: 503 }), console, setTimeout, clearTimeout
};
vm.createContext(context);
vm.runInContext(pricingSource, context);
vm.runInContext(`${inlineSource}\nglobalThis.__api = { state, payload, commercialModelValidation, resolveOdooRouting, readInputs };`, context);

const { state, payload, commercialModelValidation, resolveOdooRouting, readInputs } = context.__api;
function configure(customerType, overrides = {}) {
  state.step = 6;
  state.lang = "EN";
  state.customerType = customerType;
  state.selectedGoals = customerType === "Shopping Centre" ? ["dwell_cross_shopping"] : ["visitor_profile_unknown"];
  state.selectedPackage = customerType === "Shopping Centre" ? "enterprise" : "professional";
  state.commercialModel = "capex_opex";
  state.impactCommercialModel = "capex_opex";
  state.values = {
    ...state.values,
    clientName: "Fixture customer", preparedBy: "Christiaan van Rooijen", contactName: "Fixture contact",
    contactEmail: "fixture@example.com", contactRole: "Commercial", country: "NL", locations: 1,
    weeklyFootfall: 8400, entrances: 4, storesPresent: customerType === "Shopping Centre" ? 55 : 85,
    centreType: "Covered centre", propertyOutdoorEntrances: 0, propertyVehicleEntrances: null, propertyZoneSensors: 0,
    propertyType: customerType === "Shopping Centre" ? "shopping_centre" : "",
    propertyReidCameras: customerType === "Shopping Centre" ? 55 : null,
    propertyServerSites: null,
    retailIsarsoftExistingNetwork: false, entranceSensorType: "isarsoft", instoreTechnology: "lidar",
    instoreStores: 1, avgStoreSqm: 150, tcoYears: 3, realisationFactor: 25, ...overrides
  };
}

function serverRules(result) {
  return result.odoo_line_quantity_rules.filter(rule => rule.role === "isarsoft_server");
}

function propertyPayload(overrides = {}) {
  const { commercialModel, ...valueOverrides } = overrides;
  configure("Shopping Centre", valueOverrides);
  if (commercialModel) state.commercialModel = commercialModel;
  return payload();
}

function selectedPropertyServer(result, productId) {
  return serverRules(result).find(rule => rule.product_id === productId && rule.action === "set_quantity");
}

function executionPlan(result) {
  return result.quote_execution_plan;
}

function assertPlanRouting(result, expectedCount, companyId, operatingUnitId) {
  const plan = executionPlan(result);
  assert.equal(plan.expected_quote_count, expectedCount);
  assert.equal(plan.quotes.length, expectedCount);
  assert.equal(plan.mapping_complete, true);
  assert.ok(plan.quotes.every(quote => quote.enabled && quote.mapping_complete));
  assert.ok(plan.quotes.every(quote => quote.odoo_company_id === companyId && quote.operating_unit_id === operatingUnitId));
}

function assertRouting(name, operatingUnitType, companyId, operatingUnitId) {
  const routing = resolveOdooRouting(name, operatingUnitType);
  assert.equal(routing.entityKey, name === "David Sturdy" ? "UK" : name === "Anna Reilander" ? "DE" : "NL");
  assert.equal(routing.odooCompanyId, companyId);
  assert.equal(routing.operatingUnitId, operatingUnitId);
  assert.equal(routing.routingComplete, true);
}

assertRouting("Christiaan van Rooijen", "Shops", 2, 7);
assertRouting("Christiaan van Rooijen", "Shopping Centres", 2, 8);
assertRouting("David Sturdy", "Shops", 7, 16);
assertRouting("David Sturdy", "Shopping Centres", 7, 17);
assertRouting("David Sturdy", "Fastfood", 7, 25);
assertRouting("Anna Reilander", "Shops", 20, 99);
assertRouting("Anna Reilander", "Shopping Centres", 20, 100);
assert.notEqual(resolveOdooRouting("Christiaan van Rooijen", "Shops").odooCompanyId, resolveOdooRouting("David Sturdy", "Shops").odooCompanyId);

const unresolvedRouting = resolveOdooRouting("Unknown salesperson", "Shops");
assert.equal(unresolvedRouting.entityKey, null);
assert.equal(unresolvedRouting.odooCompanyId, null);
assert.equal(unresolvedRouting.operatingUnitId, null);
assert.equal(unresolvedRouting.routingComplete, false);

configure("Retail Chain", { preparedBy: "Christiaan van Rooijen", country: "UK" });
const nlShopsPayload = payload();
assert.equal(nlShopsPayload.meta.odoo_entity_key, "NL");
assert.equal(nlShopsPayload.meta.odoo_company_id, 2);
assert.equal(nlShopsPayload.meta.operating_unit_id, 7);
assert.equal(nlShopsPayload.odoo_company_id, 2);
assert.equal(nlShopsPayload.operating_unit_id, 7);
assert.deepEqual(JSON.parse(JSON.stringify(nlShopsPayload.odoo_routing)), {
  source: "salesperson",
  salesperson_name: "Christiaan van Rooijen",
  user_id: 213,
  entity_key: "NL",
  company_id: 2,
  operating_unit_id: 7,
  sales_team_id: 1,
  sales_team_label: "Sales NL"
});

configure("Shopping Centre", { preparedBy: "David Sturdy", country: "NL" });
const ukPropertyPayload = payload();
assert.equal(ukPropertyPayload.meta.odoo_entity_key, "UK");
assert.equal(ukPropertyPayload.meta.odoo_company_id, 7);
assert.equal(ukPropertyPayload.meta.operating_unit_id, 17);
assert.equal(ukPropertyPayload.odoo_routing.company_id, 7);
assert.equal(ukPropertyPayload.odoo_routing.operating_unit_id, 17);

configure("Retail Chain", { preparedBy: "Anna Reilander", country: "UK" });
const deShopsPayload = payload();
assert.equal(deShopsPayload.meta.odoo_entity_key, "DE");
assert.equal(deShopsPayload.meta.odoo_company_id, 20);
assert.equal(deShopsPayload.meta.operating_unit_id, 99);

configure("Retail Chain", { preparedBy: "Unknown salesperson" });
const unresolvedPayload = payload();
assert.equal(unresolvedPayload.meta.odoo_entity_key, null);
assert.equal(unresolvedPayload.meta.odoo_company_id, null);
assert.equal(unresolvedPayload.meta.operating_unit_id, null);
assert.equal(unresolvedPayload.mapping_validation.routing.valid, false);
assert.equal(commercialModelValidation(unresolvedPayload).valid, false);
assert.match(commercialModelValidation(unresolvedPayload).errors[0], /routing is unresolved/);

configure("Retail Chain");
const nlRetailChainPlans = {};
for (const commercialModel of ["capex_opex", "full_opex", "both"]) {
  state.commercialModel = commercialModel;
  const result = payload();
  nlRetailChainPlans[commercialModel] = result;
  assertPlanRouting(result, commercialModel === "both" ? 4 : 2, 2, 7);
}
assert.deepEqual(Array.from(nlRetailChainPlans.both.quote_execution_plan.quotes, quote => [quote.commercial_model, quote.quote_role, quote.component_key]), [
  ["capex_opex", "investment_base", "base_capex"],
  ["capex_opex", "subscription_package", "base_subscription"],
  ["full_opex", "investment_base", "capex_for_opex"],
  ["full_opex", "subscription_package", "full_opex_subscription"]
]);

configure("Retail Chain", { preparedBy: "David Sturdy", country: "UK", locations: 50 });
state.commercialModel = "both";
const ukRetailChainBoth = payload();
assertPlanRouting(ukRetailChainBoth, 4, 7, 16);
assert.equal(ukRetailChainBoth.isarsoft.location_resolution.length, 50);
assert.equal(ukRetailChainBoth.isarsoft.location_resolution.reduce((sum, location) => sum + location.camera_count, 0), 55);
const ukRetailChainRules = serverRules(ukRetailChainBoth);
assert.equal(ukRetailChainRules.find(rule => rule.product_id === 18521).action, "set_quantity");
assert.equal(ukRetailChainRules.find(rule => rule.product_id === 18521).quantity, 50);
assert.deepEqual(Array.from(ukRetailChainRules.filter(rule => rule.action === "remove"), rule => rule.product_id), [18522, 18523, 18524, 18525, 18526, 18527, 18528, 18529]);
assert.equal(ukRetailChainRules.some(rule => rule.product_id >= 15538 && rule.product_id <= 15546), false);

configure("Shopping Centre", { preparedBy: "David Sturdy", country: "UK", propertyReidCameras: 34 });
state.commercialModel = "both";
const ukRetailPropertyBoth = payload();
assertPlanRouting(ukRetailPropertyBoth, 4, 7, 17);
assert.deepEqual(Array.from(serverRules(ukRetailPropertyBoth), rule => rule.product_id), [18521, 18522, 18523, 18524, 18525, 18526, 18527, 18528, 18529]);

configure("Shopping Centre", { preparedBy: "Christiaan van Rooijen", country: "NL", propertyReidCameras: 34 });
state.commercialModel = "both";
const nlRetailPropertyBoth = payload();
assertPlanRouting(nlRetailPropertyBoth, 4, 2, 8);

configure("Retail Chain", { preparedBy: "Anna Reilander", country: "DE" });
state.commercialModel = "both";
const deRetailChainBoth = payload();
assert.equal(deRetailChainBoth.meta.odoo_company_id, 20);
assert.equal(deRetailChainBoth.meta.operating_unit_id, 99);
assert.equal(deRetailChainBoth.quote_execution_plan.quotes.length, 4);
assert.equal(deRetailChainBoth.quote_execution_plan.mapping_complete, false);
assert.ok(deRetailChainBoth.quote_execution_plan.missing_mapping.length > 0);

configure("Shopping Centre", { preparedBy: "Anna Reilander", country: "DE" });
state.commercialModel = "both";
const deRetailPropertyBoth = payload();
assert.equal(deRetailPropertyBoth.meta.odoo_company_id, 20);
assert.equal(deRetailPropertyBoth.meta.operating_unit_id, 100);
assert.equal(deRetailPropertyBoth.quote_execution_plan.quotes.length, 4);
assert.equal(deRetailPropertyBoth.quote_execution_plan.mapping_complete, false);

configure("Retail Chain");
const retailChainRules = serverRules(payload());
assert.deepEqual(Array.from(retailChainRules, rule => rule.product_id), [18530, 18531, 18532, 18533, 18534, 18535, 18536, 18537, 18538]);
assert.equal(retailChainRules.find(rule => rule.action === "set_quantity").product_id, 18530);
assert.deepEqual(Array.from(retailChainRules.filter(rule => rule.action === "remove"), rule => rule.product_id), [18531, 18532, 18533, 18534, 18535, 18536, 18537, 18538]);
assert.equal(retailChainRules.find(rule => rule.action === "set_quantity").odoo_product_template_id, 15547);
assert.equal(retailChainRules.find(rule => rule.action === "set_quantity").internal_reference, "PFMNL-PFM/14387");

configure("Shopping Centre");
const retailPropertyRules = serverRules(payload());
assert.deepEqual(Array.from(retailPropertyRules, rule => rule.product_id), [18530, 18531, 18532, 18533, 18534, 18535, 18536, 18537, 18538]);
assert.ok(retailPropertyRules.find(rule => rule.action === "set_quantity"));
assert.deepEqual(Array.from(retailPropertyRules.filter(rule => rule.action === "remove"), rule => rule.product_id), [18530, 18531, 18532, 18533, 18534, 18535, 18536, 18537, 18538].filter(id => !retailPropertyRules.some(rule => rule.product_id === id && rule.action === "set_quantity")));

const oldIds = new Set([15547, 15548, 15549, 15550, 15551, 15552, 15553, 15554, 15555]);
assert.equal(retailChainRules.some(rule => oldIds.has(rule.product_id)), false);
assert.equal(retailPropertyRules.some(rule => oldIds.has(rule.product_id)), false);

const oneProperty34 = propertyPayload({ propertyReidCameras: 34 });
assert.equal(oneProperty34.isarsoft.location_resolution.length, 1);
assert.equal(oneProperty34.isarsoft.location_resolution[0].camera_count, 34);
assert.equal(oneProperty34.isarsoft.location_resolution[0].server.profile_key, "dual_rtx_4000_ada");
assert.equal(selectedPropertyServer(oneProperty34, 18536).quantity, 1);

const oneProperty11 = propertyPayload({ propertyReidCameras: 11 });
assert.equal(oneProperty11.isarsoft.location_resolution.length, 1);
assert.equal(oneProperty11.isarsoft.location_resolution[0].server.profile_key, "rtx_4000_ada");
assert.equal(selectedPropertyServer(oneProperty11, 18535).quantity, 1);

const oneProperty8 = propertyPayload({ propertyReidCameras: 8 });
assert.equal(oneProperty8.isarsoft.location_resolution.length, 1);
assert.equal(oneProperty8.isarsoft.location_resolution[0].server.profile_key, "rtx_2000_ada");
assert.equal(selectedPropertyServer(oneProperty8, 18534).quantity, 1);

const multipleProperties = propertyPayload({
  propertyReidCameras: 32,
  propertyServerSites: [
    { location_key: "property_001", camera_count: 16 },
    { location_key: "property_002", camera_count: 16 }
  ]
});
assert.deepEqual(Array.from(multipleProperties.isarsoft.location_resolution, location => [location.location_key, location.camera_count, location.server.profile_key]), [
  ["property_001", 16, "rtx_4000_ada"],
  ["property_002", 16, "rtx_4000_ada"]
]);
assert.equal(selectedPropertyServer(multipleProperties, 18535).quantity, 2);
assert.equal(multipleProperties.isarsoft.location_resolution.length, 2);

const entranceSplitBase = {
  propertyReidCameras: 0,
  propertyType: "shopping_centre",
  entrances: 6,
  centreType: "Covered centre"
};
const allIndoor = propertyPayload({ ...entranceSplitBase, propertyOutdoorEntrances: 0 });
assert.equal(allIndoor.pfm_internal.customer_context.total_entrances, 6);
assert.equal(allIndoor.pfm_internal.customer_context.indoor_entrances, 6);
assert.equal(allIndoor.pfm_internal.customer_context.outdoor_entrances, 0);
assert.equal(allIndoor.sensor_lines.find(line => line.role === "entrance_sensor").indoor_quantity, 6);
assert.equal(allIndoor.sensor_lines.find(line => line.role === "entrance_sensor").outdoor_quantity, 0);

const mixedEntrances = propertyPayload({ ...entranceSplitBase, propertyOutdoorEntrances: 2 });
assert.deepEqual(
  [mixedEntrances.pfm_internal.customer_context.total_entrances, mixedEntrances.pfm_internal.customer_context.indoor_entrances, mixedEntrances.pfm_internal.customer_context.outdoor_entrances],
  [6, 4, 2]
);
assert.equal(mixedEntrances.sensor_lines.find(line => line.role === "entrance_sensor").quantity, 6);
assert.equal(mixedEntrances.sensor_lines.find(line => line.role === "entrance_sensor").indoor_quantity, 4);
assert.equal(mixedEntrances.sensor_lines.find(line => line.role === "entrance_sensor").outdoor_quantity, 2);

const allOutdoor = propertyPayload({ ...entranceSplitBase, propertyOutdoorEntrances: 6 });
assert.deepEqual(
  [allOutdoor.pfm_internal.customer_context.total_entrances, allOutdoor.pfm_internal.customer_context.indoor_entrances, allOutdoor.pfm_internal.customer_context.outdoor_entrances],
  [6, 0, 6]
);

const invalidOutdoor = propertyPayload({ ...entranceSplitBase, propertyOutdoorEntrances: 7 });
assert.equal(invalidOutdoor.input_validation.entrance_split.valid, false);
assert.equal(commercialModelValidation(invalidOutdoor).entranceSplitValid, false);
assert.equal(commercialModelValidation(invalidOutdoor).valid, false);
assert.match(commercialModelValidation(invalidOutdoor).errors[0], /Outdoor entrances/);

const reducedTotal = propertyPayload({ ...entranceSplitBase, entrances: 3, propertyOutdoorEntrances: 4 });
assert.equal(reducedTotal.pfm_internal.customer_context.total_entrances, 3);
assert.equal(reducedTotal.pfm_internal.customer_context.indoor_entrances, 0);
assert.equal(reducedTotal.pfm_internal.customer_context.outdoor_entrances, 3);
assert.equal(reducedTotal.input_validation.entrance_split.valid, false);

configure("Shopping Centre", { entrances: 6, propertyOutdoorEntrances: 4 });
document.getElementById("entrances").type = "number";
document.getElementById("entrances").value = "3";
document.getElementById("propertyOutdoorEntrances").type = "number";
document.getElementById("propertyOutdoorEntrances").value = "4";
readInputs();
assert.equal(state.values.entrances, 3);
assert.equal(state.values.propertyOutdoorEntrances, 3);

const splitIndoorCapex = propertyPayload({ ...entranceSplitBase, propertyOutdoorEntrances: 0 });
const splitOutdoorCapex = propertyPayload({ ...entranceSplitBase, propertyOutdoorEntrances: 6 });
assert.notEqual(splitIndoorCapex.financials.total_hardware_capex, splitOutdoorCapex.financials.total_hardware_capex);

configure("Retail Chain", { propertyOutdoorEntrances: 4 });
const retailChainEntrancePayload = payload();
assert.equal(retailChainEntrancePayload.input_validation.valid, true);
assert.equal(retailChainEntrancePayload.customer.property_type, undefined);

const propertyCapexOpex = propertyPayload({ commercialModel: "capex_opex", propertyReidCameras: 34 });
const propertyFullOpex = propertyPayload({ commercialModel: "full_opex", propertyReidCameras: 34 });
const propertyBoth = propertyPayload({ commercialModel: "both", propertyReidCameras: 34 });
assert.equal(commercialModelValidation(propertyCapexOpex).valid, true);
assert.equal(commercialModelValidation(propertyFullOpex).valid, true);
const bothValidation = commercialModelValidation(propertyBoth);
assert.equal(bothValidation.model, "both");
assert.equal(bothValidation.capexOpexValid, true);
assert.equal(bothValidation.fullOpexValid, true);
assert.equal(bothValidation.valid, true);
assert.deepEqual(Array.from(bothValidation.errors), []);

const capexOnlyValid = commercialModelValidation({
  commercial_model: "both",
  template_id: 1,
  pricelist_id: 2,
  mapping_validation: { routing: { valid: true } },
  subscription_quote: { commercial_model: "capex_opex", template_id: 3, pricelist_id: 4 },
  full_opex_quote: { enabled_for_generation: false, mapping_complete: false, missing_mapping: { pricelist: true } }
});
assert.equal(capexOnlyValid.valid, false);
assert.match(capexOnlyValid.errors[0], /Full OPEX/);

const fullOnlyValid = commercialModelValidation({
  commercial_model: "both",
  template_id: null,
  pricelist_id: null,
  mapping_validation: { routing: { valid: true } },
  subscription_quote: null,
  full_opex_quote: { enabled_for_generation: true, mapping_complete: true }
});
assert.equal(fullOnlyValid.valid, false);
assert.match(fullOnlyValid.errors[0], /CAPEX \+ OPEX/);

assert.equal(commercialModelValidation(propertyFullOpex).valid, true);
assert.equal(commercialModelValidation(propertyCapexOpex).valid, true);

configure("Shopping Centre", { propertyType: "shopping_centre", centreType: "Covered centre" });
const shoppingCentrePropertyType = payload();
assert.equal(shoppingCentrePropertyType.customer.property_type, "shopping_centre");
assert.equal(shoppingCentrePropertyType.pfm_internal.customer_context.property_type, "shopping_centre");
assert.equal(shoppingCentrePropertyType.pfm_internal.customer_context.centre_type, "Covered centre");

configure("Shopping Centre", { propertyType: "retail_park", centreType: "Partly covered centre" });
const retailParkPropertyType = payload();
assert.equal(retailParkPropertyType.customer.property_type, "retail_park");
assert.equal(retailParkPropertyType.pfm_internal.customer_context.property_type, "retail_park");
assert.equal(retailParkPropertyType.pfm_internal.customer_context.centre_type, "Partly covered centre");

configure("Shopping Centre", { propertyType: "outlet_centre", centreType: "Open-air centre" });
const outletCentrePropertyType = payload();
assert.equal(outletCentrePropertyType.customer.property_type, "outlet_centre");
assert.equal(outletCentrePropertyType.pfm_internal.customer_context.property_type, "outlet_centre");
assert.equal(outletCentrePropertyType.pfm_internal.customer_context.centre_type, "Open-air centre");

configure("Shopping Centre", { propertyType: "" });
const missingPropertyType = payload();
assert.equal(missingPropertyType.input_validation.property_type.required, true);
assert.equal(missingPropertyType.input_validation.property_type.valid, false);
assert.equal(missingPropertyType.commercial_mapping_complete, true);
assert.equal(commercialModelValidation(missingPropertyType).propertyTypeValid, false);
assert.equal(commercialModelValidation(missingPropertyType).valid, false);
assert.match(commercialModelValidation(missingPropertyType).errors[0], /Select a property type/);

configure("Retail Chain", { propertyType: "" });
const retailChainWithoutPropertyType = payload();
assert.equal(retailChainWithoutPropertyType.input_validation.valid, true);
assert.equal(retailChainWithoutPropertyType.customer.property_type, undefined);
assert.equal(commercialModelValidation(retailChainWithoutPropertyType).valid, true);

configure("Retail Chain", { propertyType: "shopping_centre" });
const retailChainWithStalePropertyType = payload();
assert.equal(retailChainWithStalePropertyType.customer.property_type, undefined);
assert.equal(retailChainWithStalePropertyType.pfm_internal.customer_context.property_type, undefined);

configure("Shopping Centre", {
  propertyType: "retail_park",
  locations: 50,
  storesPresent: 12,
  entrances: 4,
  propertyOutdoorEntrances: 4,
  propertyVehicleEntrances: 2,
  propertyReidCameras: 0
});
state.commercialModel = "full_opex";
state.selectedGoals = ["centre_baseline", "entrance_value", "parking_mobility", "catchment_geo"];
const retailParkParkingGeoPayload = payload();
const retailParkContext = retailParkParkingGeoPayload.pfm_internal.customer_context;
assert.equal(retailParkContext.property_type, "retail_park");
assert.equal(retailParkContext.assets_in_scope, null);
assert.equal(retailParkContext.units_in_scope, 12);
assert.equal(retailParkContext.total_entrances, 4);
assert.equal(retailParkContext.indoor_entrances, 0);
assert.equal(retailParkContext.outdoor_entrances, 4);
assert.equal(retailParkContext.vehicle_entries, 2);
assert.equal(retailParkContext.vehicle_entries === retailParkContext.outdoor_entrances, false);
assert.equal(retailParkContext.has_catchment_context, true);
assert.equal(retailParkParkingGeoPayload.customer.assets_in_scope, null);
assert.equal(retailParkParkingGeoPayload.customer.units_in_scope, 12);
assert.equal(retailParkParkingGeoPayload.sensor_lines.find(line => line.role === "parking_anpr_sensor").quantity, 2);
assert.ok(retailParkParkingGeoPayload.customer_visible.active_solution_components.includes("Parking & Mobility Intelligence"));
assert.ok(retailParkParkingGeoPayload.customer_visible.active_solution_components.includes("Catchment & Geo App Intelligence"));
assert.equal(retailParkParkingGeoPayload.sensor_lines.some(line => line.role === "reid_camera"), false);
assert.equal(retailParkParkingGeoPayload.input_validation.parking.valid, true);

configure("Retail Chain", { entranceSensorType: "premium", locations: 12 });
state.selectedGoals = ["visitor_profile_unknown"];
state.selectedPackage = "professional";
const retailChainProfessionalXovis = payload();
configure("Shopping Centre", { propertyType: "shopping_centre", entranceSensorType: "premium", entrances: 4, propertyReidCameras: 0, storesPresent: 12 });
state.selectedGoals = ["centre_baseline"];
state.selectedPackage = "professional";
const retailPropertyProfessionalXovis = payload();
assert.equal(retailChainProfessionalXovis.template_id, 204);
assert.equal(retailPropertyProfessionalXovis.template_id, 204);
assert.notEqual(retailChainProfessionalXovis.pricelist_id, retailPropertyProfessionalXovis.pricelist_id);

state.selectedGoals = ["centre_baseline"];
state.values.propertyVehicleEntrances = null;
const retailParkWithoutParking = payload();
assert.equal(retailParkWithoutParking.pfm_internal.customer_context.vehicle_entries, null);
assert.equal(retailParkWithoutParking.sensor_lines.some(line => line.role === "parking_anpr_sensor"), false);
assert.equal(retailParkWithoutParking.input_validation.parking.required, false);
assert.equal(retailParkWithoutParking.customer_visible.active_solution_components.some(label => label === "Parking & Mobility Intelligence"), false);
assert.equal(retailParkWithoutParking.customer_visible.active_solution_components.some(label => label === "Catchment & Geo App Intelligence"), false);

state.selectedGoals = ["parking_mobility"];
state.values.propertyVehicleEntrances = 0;
const invalidParkingPayload = payload();
assert.equal(invalidParkingPayload.input_validation.parking.valid, false);
assert.equal(commercialModelValidation(invalidParkingPayload).parkingValid, false);
assert.match(commercialModelValidation(invalidParkingPayload).errors[0], /Vehicle entrances/);

for (const propertyType of ["shopping_centre", "retail_park", "outlet_centre"]) {
  const result = propertyPayload({
    propertyType,
    propertyReidCameras: 34,
    commercialModel: "capex_opex"
  });
  assert.equal(result.customer.property_type, propertyType);
  assert.equal(result.template_id, 273);
  assert.equal(result.pricelist_id, 3088);
  assert.equal(result.subscription_quote.template_id, 260);
  assert.equal(result.subscription_quote.pricelist_id, 3082);
  assert.equal(result.quote_execution_plan.mapping_complete, true);
}

const retailParkWithoutReidCapex = propertyPayload({
  propertyType: "retail_park",
  propertyReidCameras: 0,
  commercialModel: "capex_opex"
});
state.selectedGoals = ["centre_baseline", "entrance_value", "parking_mobility", "catchment_geo"];
state.values.propertyVehicleEntrances = 2;
const retailParkMissingBaseTemplate = payload();
assert.equal(retailParkMissingBaseTemplate.odoo_template.base_template_id, "tpl_rc_footfall_enterprise_isarsoft");
assert.equal(retailParkMissingBaseTemplate.odoo_template.base_template_test_id, 273);
assert.equal(retailParkMissingBaseTemplate.quote_execution_plan.missing_mapping.includes("template_id"), false);
assert.equal(retailParkMissingBaseTemplate.full_opex_quote.mapping_complete, true);
assert.equal(retailParkMissingBaseTemplate.quote_execution_plan.mapping_complete, true);
assert.equal(retailParkWithoutReidCapex.customer.property_type, "retail_park");

console.log("payload Isarsoft product rules tests passed");
