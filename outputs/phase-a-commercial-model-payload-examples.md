# Phase A Payload Examples

These examples document the builder-side contract. IDs are test IDs. They do not call n8n.

## 1. NL Retail Chain Isarsoft Base, One Location

```json
{
  "meta": { "entity_key": "NL", "commercial_model": "capex_opex" },
  "customer": { "segment": "retailChain", "locations": 1, "sensor_count": 3 },
  "solution": { "configuration_id": "RC_FOOTFALL", "solution_package": "essential", "technology_profile": "HYBRID_3D_IP", "entrance_sensor": { "technology_id": "REID_IP", "capex_per_unit": 450 } },
  "sensor_lines": [{ "technology_id": "REID_IP", "role": "entrance_performance", "quantity": 3 }],
  "isarsoft": { "mode": "base", "camera_count": 3, "camera_hardware_count": 3, "existing_network_reused": false, "location_resolution": [{ "location_key": "store_001", "camera_count": 3, "server": { "profile_key": "orin_nx_16gb", "odoo_product_id": 15548 } }], "mapping_complete": true },
  "instore": null,
  "odoo_template": { "base_template_test_id": 266, "base_template_builder_config": "NL_QB_Footfall_Essentials_Isarsoft_Retail", "package_opex_template": { "test_id": 215, "builder_config": "NL_QB_Essential_Package_Retail" }, "isarsoft_mode": "base" },
  "odoo_line_quantity_rules": [
    { "product_id": 15547, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "orin_nano_8gb", "action": "remove", "quantity": 0, "source": "builder_configuration" },
    { "product_id": 15548, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "orin_nx_16gb", "action": "set_quantity", "quantity": 1, "source": "builder_configuration" },
    { "product_id": 15549, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "agx_orin_64gb", "action": "remove", "quantity": 0, "source": "builder_configuration" },
    { "product_id": 15550, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "agx_thor_128gb", "action": "remove", "quantity": 0, "source": "builder_configuration" }
  ],
  "commercial_mapping_complete": true,
  "subscription_quote": { "commercial_model": "capex_opex", "template_id": 215, "pricelist_id": 3076, "quantity": 3 },
  "full_opex_quote": { "requested": false, "enabled_for_generation": true, "term_years": 5 },
  "odoo_routing": { "entity_key": "NL", "salesperson_name": "Christiaan van Rooijen", "user_id": 231 },
  "financials": { "total_capex": null, "total_monthly_opex": null, "tco_3_years": null }
}
```

## 2. NL Retail Chain Isarsoft Base, Two Server Profiles

```json
{
  "meta": { "entity_key": "NL", "commercial_model": "capex_opex" },
  "customer": { "segment": "retailChain", "locations": 2, "sensor_count": 9 },
  "solution": { "configuration_id": "RC_FOOTFALL", "solution_package": "professional", "technology_profile": "HYBRID_3D_IP", "entrance_sensor": { "technology_id": "REID_IP", "capex_per_unit": 450 } },
  "sensor_lines": [{ "technology_id": "REID_IP", "role": "entrance_performance", "quantity": 9 }],
  "isarsoft": { "mode": "base", "camera_count": 9, "camera_hardware_count": 9, "existing_network_reused": false, "location_resolution": [{ "location_key": "store_001", "camera_count": 5, "server": { "profile_key": "agx_orin_64gb", "odoo_product_id": 15549 } }, { "location_key": "store_002", "camera_count": 4, "server": { "profile_key": "orin_nx_16gb", "odoo_product_id": 15548 } }], "mapping_complete": true },
  "instore": null,
  "odoo_template": { "base_template_test_id": 267, "base_template_builder_config": "NL_QB_Footfall_Professional_Isarsoft_Retail", "package_opex_template": { "test_id": 216, "builder_config": "NL_QB_Professional_Package_Retail" }, "isarsoft_mode": "base" },
  "odoo_line_quantity_rules": [
    { "product_id": 15547, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "orin_nano_8gb", "action": "remove", "quantity": 0, "source": "builder_configuration" },
    { "product_id": 15548, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "orin_nx_16gb", "action": "set_quantity", "quantity": 1, "source": "builder_configuration" },
    { "product_id": 15549, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "agx_orin_64gb", "action": "set_quantity", "quantity": 1, "source": "builder_configuration" },
    { "product_id": 15550, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "agx_thor_128gb", "action": "remove", "quantity": 0, "source": "builder_configuration" }
  ],
  "commercial_mapping_complete": true,
  "subscription_quote": { "commercial_model": "capex_opex", "template_id": 216, "pricelist_id": 3077, "quantity": 9 },
  "full_opex_quote": { "requested": false, "enabled_for_generation": true, "term_years": 5 },
  "odoo_routing": { "entity_key": "NL", "salesperson_name": "Christiaan van Rooijen", "user_id": 231 },
  "financials": { "total_capex": null, "total_monthly_opex": null, "tco_3_years": null }
}
```

## 3. UK Retail Chain Isarsoft Base

```json
{
  "meta": { "entity_key": "UK", "commercial_model": "capex_opex" },
  "customer": { "segment": "retailChain", "locations": 1, "sensor_count": 3 },
  "solution": { "configuration_id": "RC_FOOTFALL", "solution_package": "professional", "technology_profile": "HYBRID_3D_IP", "entrance_sensor": { "technology_id": "REID_IP", "capex_per_unit": 450 } },
  "sensor_lines": [{ "technology_id": "REID_IP", "role": "entrance_performance", "quantity": 3 }],
  "isarsoft": { "mode": "base", "camera_count": 3, "camera_hardware_count": 3, "existing_network_reused": false, "location_resolution": [{ "location_key": "store_001", "camera_count": 3, "server": { "profile_key": "orin_nx_16gb", "odoo_product_id": 15539 } }], "mapping_complete": true },
  "instore": null,
  "odoo_template": { "base_template_test_id": 270, "base_template_builder_config": "UK_QB_Footfall_Professional_Isarsoft_Retail", "package_opex_template": { "test_id": 240, "builder_config": "UK_QB_Professional_Retail_Package" }, "isarsoft_mode": "base" },
  "odoo_line_quantity_rules": [
    { "product_id": 15538, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "orin_nano_8gb", "action": "remove", "quantity": 0, "source": "builder_configuration" },
    { "product_id": 15539, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "orin_nx_16gb", "action": "set_quantity", "quantity": 1, "source": "builder_configuration" },
    { "product_id": 15540, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "agx_orin_64gb", "action": "remove", "quantity": 0, "source": "builder_configuration" },
    { "product_id": 15541, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "agx_thor_128gb", "action": "remove", "quantity": 0, "source": "builder_configuration" }
  ],
  "commercial_mapping_complete": true,
  "subscription_quote": { "commercial_model": "capex_opex", "template_id": 240, "pricelist_id": 3093, "quantity": 3 },
  "full_opex_quote": { "requested": false, "enabled_for_generation": true, "term_years": 5 },
  "odoo_routing": { "entity_key": "UK", "salesperson_name": "David Sturdy", "user_id": 4 },
  "financials": { "total_capex": null, "total_monthly_opex": null, "tco_3_years": null }
}
```

## 4. NL Retail Property Isarsoft Add-on, 55 Cameras

```json
{
  "meta": { "entity_key": "NL", "commercial_model": "capex_opex" },
  "customer": { "segment": "retailProperty", "locations": 1, "sensor_count": 55 },
  "solution": { "configuration_id": "RP_FOOTFALL", "solution_package": "enterprise", "technology_profile": "HYBRID_3D_IP", "entrance_sensor": { "technology_id": "ENTRANCE_3D_ENTERPRISE", "capex_per_unit": 2100 } },
  "sensor_lines": [{ "technology_id": "REID_IP", "role": "reid_camera", "quantity": 55 }, { "technology_id": "ISARSOFT_SERVER", "role": "reid_server", "quantity": 1 }],
  "isarsoft": { "mode": "addon", "camera_count": 55, "camera_hardware_count": 55, "existing_network_reused": false, "location_resolution": [{ "location_key": "property_001", "camera_count": 55, "server": { "profile_key": "dual_rtx_5000_ada", "odoo_product_id": 15554 } }], "mapping_complete": true },
  "instore": null,
  "odoo_template": { "isarsoft_capex_template": { "test_id": 261, "builder_config": "NL_QB_Addon_Tracking_Exterprise_Re-ID" }, "isarsoft_subscription_addon_template": { "test_id": 265, "builder_config": "NL_QB_Enterprise_Retail_Package_Addon_Re-ID" }, "isarsoft_mode": "addon" },
  "odoo_line_quantity_rules": [
    { "product_id": 15551, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "rtx_2000_ada", "action": "remove", "quantity": 0, "source": "builder_configuration" },
    { "product_id": 15552, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "rtx_4000_ada", "action": "remove", "quantity": 0, "source": "builder_configuration" },
    { "product_id": 15553, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "dual_rtx_4000_ada", "action": "remove", "quantity": 0, "source": "builder_configuration" },
    { "product_id": 15554, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "dual_rtx_5000_ada", "action": "set_quantity", "quantity": 1, "source": "builder_configuration" },
    { "product_id": 15555, "role": "isarsoft_server", "technology_id": "REID_IP", "profile_key": "dual_rtx_6000_ada", "action": "remove", "quantity": 0, "source": "builder_configuration" }
  ],
  "commercial_mapping_complete": true,
  "subscription_quote": { "commercial_model": "capex_opex", "template_id": 260, "pricelist_id": 3083, "quantity": 55, "isarsoft_addon": { "template_id": 265, "quantity": 55 } },
  "full_opex_quote": { "requested": false, "enabled_for_generation": true, "term_years": 5 },
  "odoo_routing": { "entity_key": "NL", "salesperson_name": "Christiaan van Rooijen", "user_id": 231 },
  "financials": { "total_capex": null, "total_monthly_opex": null, "tco_3_years": null }
}
```

## 5. NL LiDAR In-store Add-on

```json
{
  "meta": { "entity_key": "NL", "commercial_model": "capex_opex" },
  "customer": { "segment": "retailChain", "locations": 5, "sensor_count": 5 },
  "solution": { "configuration_id": "RC_FOOTFALL_TRACKING", "solution_package": "enterprise", "technology_profile": "HYBRID_3D_IP", "entrance_sensor": { "technology_id": "ENTRANCE_3D_ENTERPRISE", "capex_per_unit": 2100 } },
  "sensor_lines": [{ "technology_id": "INSTORE_LIDAR", "role": "instore_journey", "quantity": 5 }],
  "isarsoft": { "mode": "none", "camera_count": 0, "camera_hardware_count": 0, "existing_network_reused": false, "location_resolution": [], "mapping_complete": true },
  "instore": { "technology_id": "INSTORE_LIDAR", "total_sensors": 5, "processing_unit_quantity": 2 },
  "odoo_template": { "instore_capex_template": { "test_id": 213, "builder_config": "NL_QB_Addon_Tracking_Enterprise_Xovis" }, "instore_opex_template": { "test_id": 219, "builder_config": "NL_QB_Enterprise_Package_Addon-LiDAR" }, "isarsoft_mode": "none" },
  "odoo_line_quantity_rules": [{ "product_id": 15284, "role": "lidar_processing_unit", "technology_id": "INSTORE_LIDAR", "action": "set_quantity", "quantity": 2, "source": "builder_configuration" }],
  "commercial_mapping_complete": true,
  "subscription_quote": { "commercial_model": "capex_opex", "template_id": 217, "pricelist_id": 3078, "quantity": 5 },
  "full_opex_quote": { "requested": false, "enabled_for_generation": true, "term_years": 5 },
  "odoo_routing": { "entity_key": "NL", "salesperson_name": "Christiaan van Rooijen", "user_id": 231 },
  "financials": { "total_capex": null, "total_monthly_opex": null, "tco_3_years": null }
}
```

## 6. NL Xovis In-store Add-on

```json
{
  "meta": { "entity_key": "NL", "commercial_model": "capex_opex" },
  "customer": { "segment": "retailChain", "locations": 12, "sensor_count": 12 },
  "solution": { "configuration_id": "RC_FOOTFALL_TRACKING", "solution_package": "enterprise", "technology_profile": "HYBRID_3D_IP", "entrance_sensor": { "technology_id": "ENTRANCE_3D_ENTERPRISE", "capex_per_unit": 2100 } },
  "sensor_lines": [{ "technology_id": "INSTORE_3D", "role": "instore_journey", "quantity": 12 }],
  "isarsoft": { "mode": "none", "camera_count": 0, "camera_hardware_count": 0, "existing_network_reused": false, "location_resolution": [], "mapping_complete": true },
  "instore": { "technology_id": "INSTORE_3D", "total_sensors": 12, "processing_unit_quantity": 1 },
  "odoo_template": { "instore_capex_template": { "test_id": 214, "builder_config": "NL_QB_Addon_Tracking_Enterprise_LiDAR" }, "instore_opex_template": { "test_id": 218, "builder_config": "NL_QB_Enterprise_Package_Addon-Xovis" }, "isarsoft_mode": "none" },
  "odoo_line_quantity_rules": [{ "product_id": 12081, "role": "xovis_processing_unit", "technology_id": "INSTORE_3D", "action": "set_quantity", "quantity": 1, "source": "builder_configuration" }],
  "commercial_mapping_complete": true,
  "subscription_quote": { "commercial_model": "capex_opex", "template_id": 217, "pricelist_id": 3078, "quantity": 12 },
  "full_opex_quote": { "requested": false, "enabled_for_generation": true, "term_years": 5 },
  "odoo_routing": { "entity_key": "NL", "salesperson_name": "Christiaan van Rooijen", "user_id": 231 },
  "financials": { "total_capex": null, "total_monthly_opex": null, "tco_3_years": null }
}
```

## 7. DE Isarsoft Base, Correctly Fail-closed

```json
{
  "meta": { "entity_key": "DE", "commercial_model": "capex_opex" },
  "customer": { "segment": "retailChain", "locations": 1, "sensor_count": 3 },
  "solution": { "configuration_id": "RC_FOOTFALL", "solution_package": "essential", "technology_profile": "HYBRID_3D_IP", "entrance_sensor": { "technology_id": "REID_IP", "capex_per_unit": 450 } },
  "sensor_lines": [{ "technology_id": "REID_IP", "role": "entrance_performance", "quantity": 3 }],
  "isarsoft": { "mode": "base", "camera_count": 3, "camera_hardware_count": 3, "existing_network_reused": false, "location_resolution": [{ "location_key": "store_001", "camera_count": 3, "server": { "profile_key": "orin_nx_16gb", "odoo_product_id": null } }], "mapping_complete": false },
  "instore": null,
  "odoo_template": { "base_template_test_id": null, "base_template_builder_config": "DE_QB_Footfall_Essentials_Isarsoft_Retail", "isarsoft_mode": "base" },
  "odoo_line_quantity_rules": [],
  "commercial_mapping_complete": false,
  "subscription_quote": { "commercial_model": "capex_opex", "template_id": null, "pricelist_id": null, "quantity": 3 },
  "full_opex_quote": { "requested": false, "enabled_for_generation": false, "term_years": 5 },
  "odoo_routing": { "entity_key": "DE", "salesperson_name": "Anna Reilander", "user_id": 394 },
  "financials": { "total_capex": null, "total_monthly_opex": null, "tco_3_years": null }
}
```

## 8. NL Ordinary Retail Chain Regression

```json
{
  "meta": { "entity_key": "NL", "commercial_model": "capex_opex" },
  "customer": { "segment": "retailChain", "locations": 5, "sensor_count": 6 },
  "solution": { "configuration_id": "RC_FOOTFALL", "solution_package": "essential", "technology_profile": "3D_ONLY", "entrance_sensor": { "technology_id": "ENTRANCE_3D_PREMIUM", "capex_per_unit": 1100 } },
  "sensor_lines": [{ "technology_id": "ENTRANCE_3D_PREMIUM", "role": "entrance_performance", "quantity": 6 }],
  "isarsoft": { "mode": "none", "camera_count": 0, "camera_hardware_count": 0, "existing_network_reused": false, "location_resolution": [], "mapping_complete": true },
  "instore": null,
  "odoo_template": { "base_template_test_id": 203, "base_template_builder_config": "NL_QB_Footfall_Essential_Xovis_Retail", "package_opex_template": { "test_id": 215, "builder_config": "NL_QB_Essential_Package_Retail" }, "isarsoft_mode": "none" },
  "odoo_line_quantity_rules": [],
  "commercial_mapping_complete": true,
  "subscription_quote": { "commercial_model": "capex_opex", "template_id": 215, "pricelist_id": 3076, "quantity": 6 },
  "full_opex_quote": { "requested": false, "enabled_for_generation": true, "term_years": 5 },
  "odoo_routing": { "entity_key": "NL", "salesperson_name": "Christiaan van Rooijen", "user_id": 231 },
  "financials": { "total_capex": null, "total_monthly_opex": null, "tco_3_years": null }
}
```
