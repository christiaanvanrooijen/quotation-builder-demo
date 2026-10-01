# Builder / Odoo Workbook Mapping Diff

Source of truth: `odoo-templates_quotation-builder-comprehensive_27082026.xlsx`.

The Quick input tab is excluded. IDs below are Odoo test IDs. Production IDs remain `null` because the workbook does not provide them.

Status:

- `MATCH`: Builder mapping matches the workbook template name and test ID.
- `MISSING`: the workbook has no ID or no row for the required mapping; Builder fails closed.
- `CONFLICT`: none remain after this synchronisation.

## Template mappings

### NL / Retail Chain

| Entity | Segment | Model | Package / technology | Workbook template | Workbook test ID | Builder key | Builder test ID | Status |
|---|---|---|---|---|---:|---|---:|---|
| NL | Retail Chain | CAPEX | Essential / Xovis | `NL_QB_Footfall_Essential_Xovis` | 203 | `tpl_rc_footfall_essential_premium` | 203 | MATCH |
| NL | Retail Chain | CAPEX | Essential / Milesight | `NL_QB_Footfall_Essential_Milesight` | 206 | `tpl_rc_footfall_essential_basic` | 206 | MATCH |
| NL | Retail Chain | CAPEX | Essential / Isarsoft | `NL_QB_Footfall_Essential_Isarsoft` | 266 | `tpl_rc_footfall_essential_isarsoft` | 266 | MATCH |
| NL | Retail Chain | CAPEX | Professional / Xovis | `NL_QB_Footfall_Professional_Xovis` | 204 | `tpl_rc_footfall_professional_premium` | 204 | MATCH |
| NL | Retail Chain | CAPEX | Professional / Milesight | `NL_QB_Footfall_Professional_Milesight` | 207 | `tpl_rc_footfall_professional_basic` | 207 | MATCH |
| NL | Retail Chain | CAPEX | Professional / Isarsoft | `NL_QB_Footfall_Professional_Isarsoft` | 272 | `tpl_rc_footfall_professional_isarsoft` | 272 | MATCH |
| NL | Retail Chain | CAPEX | Enterprise / Xovis | `NL_QB_Footfall_Enterprise_Xovis` | 209 | `tpl_rc_footfall_professional_enterprise` | 209 | MATCH |
| NL | Retail Chain | CAPEX | Enterprise / Isarsoft | `NL_QB_Footfall_Enterprise_Isarsoft` | 273 | `tpl_rc_footfall_enterprise_isarsoft` | 273 | MATCH |
| NL | Retail Chain | CAPEX | Capture / Xovis | `NL_QB_Footfall_Passersby_Professional_Xovis` | 205 | `tpl_rc_footfall_capture_professional_premium` | 205 | MATCH |
| NL | Retail Chain | CAPEX | Capture / Milesight | `NL_QB_Footfall_Passersby_Professional_Milesight` | 208 | `tpl_rc_footfall_capture_professional_basic` | 208 | MATCH |
| NL | Retail Chain | CAPEX | Capture / Isarsoft | `NL_QB_Footfall_Passersby_Professional_Isarsoft` | 268 | `tpl_rc_footfall_capture_professional_isarsoft` | 268 | MATCH |
| NL | Retail Chain | CAPEX | Capture Enterprise / Xovis | `NL_QB_Footfall_Passersby_Enterprise_Xovis` | 210 | `tpl_rc_footfall_capture_enterprise` | 210 | MATCH |
| NL | Retail Chain | CAPEX | Tracking / Xovis | `NL_QB_Footfall_Tracking_Enterprise_Xovis` | 211 | `tpl_rc_footfall_tracking_enterprise` | 211 | MATCH |
| NL | Retail Chain | CAPEX | Capture + tracking / Xovis | `NL_QB_Footfall_Passersby_Tracking_Enterprise_Xovis` | 212 | `tpl_rc_footfall_capture_tracking_enterprise` | 212 | MATCH |
| NL | Retail Chain | CAPEX add-on | In-store Xovis | `NL_QB_Addon_Tracking_Enterprise_Xovis` | 213 | `tpl_rc_instore_lidar` | 213 | MATCH |
| NL | Retail Chain | CAPEX add-on | In-store LiDAR | `NL_QB_Addon_Tracking_Enterprise_LiDAR` | 214 | `tpl_rc_instore_3d` | 214 | MATCH |
| NL | Retail Chain | CAPEX for OPEX | Hardware investment | `NL_QB_Footfall_Intel-5YR_CAPEX_Retail` | 225 | `fullOpex.capexForOpex` | 225 | MATCH |
| NL | Retail Chain | OPEX | Essential package | `NL_QB_Essential_Retail_Package` | 215 | `opex.essential` | 215 | MATCH |
| NL | Retail Chain | OPEX | Professional package | `NL_QB_Professional_Retail_Package` | 216 | `opex.professional` | 216 | MATCH |
| NL | Retail Chain | OPEX | Enterprise package | `NL_QB_Enterprise_Retail_Package` | 217 | `opex.enterprise` | 217 | MATCH |
| NL | Retail Chain | OPEX add-on | LiDAR | `NL_QB_Enterprise_Retail_Package_Addon-LiDAR` | 219 | `opex.instore_lidar` | 219 | MATCH |
| NL | Retail Chain | OPEX add-on | Xovis | `NL_QB_Enterprise_Retail_Package_Addon-Xovis` | 218 | `opex.instore_3d` | 218 | MATCH |
| NL | Retail Chain | Full OPEX | Essential / Xovis or Milesight | `NL_QB_Essential_INTEL-5YR_Retail` | 221 | `fullOpex.packages.*.essential` | 221 | MATCH |
| NL | Retail Chain | Full OPEX | Professional / Xovis or Milesight | `NL_QB_Professional_INTEL-5YR_Retail` | 223 | `fullOpex.packages.*.professional` | 223 | MATCH |
| NL | Retail Chain | Full OPEX | Enterprise / Xovis or Milesight | `NL_QB_Enterprise_INTEL-5YR_Retail` | 224 | `fullOpex.packages.*.enterprise` | 224 | MATCH |

### NL / Retail Property

| Entity | Segment | Model | Package / technology | Workbook template | Workbook test ID | Builder key | Builder test ID | Status |
|---|---|---|---|---|---:|---|---:|---|
| NL | Retail Property | CAPEX add-on | Re-ID / Isarsoft | `NL_QB_Addon_Tracking_Exterprise_Re-ID` | 261 | `tpl_rp_reid_capex` | 261 | MATCH* |
| NL | Retail Property | OPEX | Essential package | `NL_QB_Essential_Retail_Property_Package` | 258 | `opex.essential` | 258 | MATCH |
| NL | Retail Property | OPEX | Professional package | `NL_QB_Professional_Retail_Property_Package` | 259 | `opex.professional` | 259 | MATCH |
| NL | Retail Property | OPEX | Enterprise package | `NL_QB_Enterprise_Retail_Property_Package` | 260 | `opex.enterprise` | 260 | MATCH |
| NL | Retail Property | OPEX add-on | Re-ID | `NL_QB_Enterprise_Retail_Package_Addon_Re-ID` | 265 | `opex.reid_addon` | 265 | MATCH* |
| NL | Retail Property | CAPEX for OPEX | Hardware investment | `NL_QB_Footfall_Intel-5YR_CAPEX_Retail_Property` | 254 | `fullOpex.capexForOpex` | 254 | MATCH |
| NL | Retail Property | Full OPEX | Essential / Xovis or Milesight | `NL_QB_Essential_INTEL-5YR_Retail_Property` | 255 | `fullOpex.packages.*.essential` | 255 | MATCH |
| NL | Retail Property | Full OPEX | Professional / Xovis or Milesight | `NL_QB_Professional_INTEL-5YR_Retail_Property` | 256 | `fullOpex.packages.*.professional` | 256 | MATCH |
| NL | Retail Property | Full OPEX | Enterprise / Xovis or Milesight | `NL_QB_Enterprise_INTEL-5YR_Retail_Property` | 257 | `fullOpex.packages.*.enterprise` | 257 | MATCH |

`*` These mappings were supplied earlier and retained as confirmed Builder mappings; they are not repeated as rows in the current NL workbook tab.

### UK / Retail Chain

The UK Retail Chain rows are the same mapping set as NL Retail Chain, with these workbook values:

| Model / package / technology | Workbook template | Workbook test ID | Builder test ID | Status |
|---|---|---:|---:|---|
| CAPEX Essential / Xovis | `UK_QB_Footfall_Essential_Xovis` | 226 | 226 | MATCH |
| CAPEX Essential / Milesight | `UK_QB_Footfall_Essentials_Milesight` | 233 | 233 | MATCH |
| CAPEX Essential / Isarsoft | `UK_QB_Footfall_Essentials_Isarsoft` | 269 | 269 | MATCH |
| CAPEX Professional / Xovis | `UK_QB_Footfall_Professional_Xovis` | 227 | 227 | MATCH |
| CAPEX Professional / Milesight | `UK_QB_Footfall_Professional_Milesight` | 234 | 234 | MATCH |
| CAPEX Professional / Isarsoft | `UK_QB_Footfall_Professional_Isarsoft` | 274 | 274 | MATCH |
| CAPEX Enterprise / Xovis | `UK_QB_Footfall_Enterprise_Xovis` | 228 | 228 | MATCH |
| CAPEX Enterprise / Isarsoft | `UK_QB_Footfall_Enterprise_Isarsoft` | 275 | 275 | MATCH |
| CAPEX Capture Professional / Xovis | `UK_QB_Footfall_Passersby_Professional_Xovis` | 229 | 229 | MATCH |
| CAPEX Capture Professional / Milesight | `UK_QB_Footfall_Passersby_Professional_Milesight` | 235 | 235 | MATCH |
| CAPEX Capture Professional / Isarsoft | `UK_QB_Footfall_Passersby_Professional_Isarsoft` | 271 | 271 | MATCH |
| CAPEX Capture Enterprise / Xovis | `UK_QB_Footfall_Passersby_Enterprise_Xovis` | 230 | 230 | MATCH |
| CAPEX Tracking / Xovis | `UK_QB_Footfall_Tracking_Enterprise_Xovis` | 232 | 232 | MATCH |
| CAPEX Capture + tracking / Xovis | `UK_QB_Footfall_Passersby_Tracking_Enterprise_Xovis` | 231 | 231 | MATCH |
| CAPEX in-store Xovis | `UK_QB_Addon_Tracking_Enterprise_Xovis` | 236 | 236 | MATCH |
| CAPEX in-store LiDAR | `UK_QB_Addon_Tracking_Enterprise_LiDAR` | 237 | 237 | MATCH |
| CAPEX for OPEX | `UK_QB_Footfall_Intel-5YR_CAPEX_Retail` | 249 | 249 | MATCH |
| OPEX Essential / Professional / Enterprise | `UK_QB_Essential_Retail_Package`, `UK_QB_Professional_Retail_Package`, `UK_QB_Enterprise_Retail_Package` | 238 / 240 / 243 | 238 / 240 / 243 | MATCH |
| Full OPEX Essential / Professional / Enterprise | `UK_QB_Essential_INTEL-5YR_Retail`, `UK_QB_Professional_INTEL-5YR_Retail`, `UK_QB_Enterprise_INTEL-5YR_Retail` | 248 / 247 / 246 | 248 / 247 / 246 | MATCH |

### UK / Retail Property

| Model | Package / technology | Workbook template | Workbook test ID | Builder key | Builder test ID | Status |
|---|---|---|---:|---|---:|---|
| CAPEX add-on | Re-ID / Isarsoft | `UK_QB_Addon_Tracking_Exterprise_Re-ID` | 263 | `tpl_rp_reid_capex` | 263 | MATCH* |
| OPEX | Essential / Professional / Enterprise | `UK_QB_Essential_Retail_Property_Package`, `UK_QB_Professional_Retail_Property_Package`, `UK_QB_Enterprise_Retail_Property_Package` | 239 / 241 / 242 | `opex.*` | 239 / 241 / 242 | MATCH |
| OPEX add-on | Re-ID | `UK_QB_Enterprise_Retail_Package_Addon_Re-ID` | 264 | `opex.reid_addon` | 264 | MATCH* |
| CAPEX for OPEX | Hardware investment | `UK_QB_Footfall_Intel-5YR_CAPEX_Retail_Property` | 253 | `fullOpex.capexForOpex` | 253 | MATCH |
| Full OPEX | Essential / Professional / Enterprise | `UK_QB_Essential_INTEL-5YR_Retail_Property`, `UK_QB_Professional_INTEL-5YR_Retail_Property`, `UK_QB_Enterprise_INTEL-5YR_Retail_Property` | 250 / 251 / 252 | `fullOpex.packages.*` | 250 / 251 / 252 | MATCH |
| CAPEX base | Ordinary RP baseline/zone templates | No corresponding workbook rows | — | — | — | MISSING |

### DE

The DE workbook contains template names but no test IDs. The Builder preserves the exact names where rows exist and keeps all IDs `null`.

| Entity | Segment | Model | Mapping status |
|---|---|---|---|
| DE | Retail Chain | Ordinary CAPEX, capture, tracking and in-store add-ons | MISSING: all test IDs unresolved |
| DE | Retail Chain | Normal OPEX packages and add-ons | MISSING: all test IDs unresolved |
| DE | Retail Chain | Full OPEX capex-for-opex and Xovis packages | MISSING: all test IDs unresolved |
| DE | Retail Chain | Full OPEX Milesight packages | MISSING: no workbook template rows |
| DE | Retail Property | Normal OPEX packages | MISSING: all test IDs unresolved |
| DE | Retail Property | Full OPEX Xovis and Milesight packages | MISSING: all test IDs unresolved |
| DE | Retail Property | Ordinary RP CAPEX and Re-ID add-on | MISSING: no test IDs; Re-ID add-on ID not supplied |
| DE | Retail Property | CAPEX for OPEX | MISSING: test ID unresolved; exact workbook name retained as `ML_QB_Footfall_Intel-5YR_CAPEX_Retail_Property` |
| DE | Retail Chain / Retail Property | Isarsoft template rows | MISSING: no DE Isarsoft template rows in the workbook |

The `ML_` prefix above is preserved intentionally and requires confirmation before DE routing is activated.

## Pricelist mappings

| Entity | Segment | Scope | Workbook price list(s) and test ID(s) | Builder status |
|---|---|---|---|---|
| NL | Retail Chain | CAPEX tiers 0–3 | `QB_NL_Retail_Tier0` 3074; Tier1 3075; Tier2 3084; Tier3 3085 | MATCH |
| NL | Retail Chain | Normal OPEX tiers 0–3 | `QB_NL_SUBS_RETAIL_TIER0..3` 3076 / 3077 / 3078 / 3079 | MATCH |
| NL | Retail Chain | Full OPEX Xovis / Milesight | `QB_NL_SUBS_INTEL-5YR_RETAIL_XOVIS` 3099 / `...MILESIGHT` 3100 | MATCH |
| NL | Retail Property | CAPEX tiers 0–3 | `QB_NL_Retail_Property_Tier0..3` 3086 / 3087 / 3088 / 3089 | MATCH |
| NL | Retail Property | Normal OPEX tiers 0–3 | `QB_NL_SUBS_RETAILPROP_TIER0..3` 3080 / 3081 / 3082 / 3083 | MATCH |
| NL | Retail Property | Full OPEX Xovis / Milesight | `QB_NL_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS` 3102 / `...MILESIGHT` 3101 | MATCH |
| UK | Retail Chain | CAPEX, all volume tiers | `QB_UK_Retail_Retail-Chain` 3091 | MATCH |
| UK | Retail Chain | Normal OPEX, all volume tiers | `QB_UK_SUBS_RETAIL` 3093 | MATCH |
| UK | Retail Chain | Full OPEX Xovis / Milesight | `QB_UK_SUBS_INTEL-5YR_RETAIL_XOVIS` 3096 / `...MILESIGHT` 3097 | MATCH |
| UK | Retail Property | CAPEX, all volume tiers | `QB_UK_Retail_Retail-Property` 3092 | MATCH |
| UK | Retail Property | Normal OPEX, all volume tiers | `QB_UK_SUBS_RETAILPROP` 3094 | MATCH |
| UK | Retail Property | Full OPEX Xovis / Milesight | `QB_UK_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS` 3095 / `...MILESIGHT` 3098 | MATCH |
| DE | Retail Chain / Retail Property | CAPEX and OPEX | Workbook labels present; IDs blank | MISSING |

## Isarsoft article mappings

| Entity | Segment | Article internal references | Odoo test IDs | Status |
|---|---|---|---|---|
| NL | Retail Chain | `REID2002RC`, `REID2004RC`, `REID2016RC`, `REID2032RC` | 15547 / 15548 / 15549 / 15550 | MATCH |
| NL | Retail Property | `REID2010RP`, `REID2020RP`, `REID2040RP`, `REID2080RP`, `REID2120RP` | 15551 / 15552 / 15553 / 15554 / 15555 | MATCH |
| UK | Retail Chain | `REID2002RC`, `REID2004RC`, `REID2016RC`, `REID2032RC` | 15538 / 15539 / 15540 / 15541 | MATCH |
| UK | Retail Property | `REID2010RP`, `REID2020RP`, `REID2040RP`, `REID2080RP`, `REID2120RP` | 15542 / 15543 / 15544 / 15545 / 15546 | MATCH |
| DE | Retail Chain / Retail Property | Internal references present | IDs blank | MISSING |

Processing units retained: NL LiDAR `15284`, UK LiDAR `11901`, NL Xovis `12081`, UK Xovis `15537`; DE remains unresolved.

## Remaining decisions / assumptions

- The ordinary Retail Property CAPEX template rows are absent from the workbook for NL, UK and DE. Builder therefore does not reuse Retail Chain templates and fails closed for that missing mapping.
- The prior confirmed NL/UK Re-ID add-on mappings are retained even though they are not repeated in the current country tabs.
- The workbook’s DE property CAPEX-for-OPEX template begins with `ML_`; it is preserved and must be confirmed before DE is enabled.
- FR is preserved but outside the current NL/UK/DE rollout.
- Current payloads use test IDs. Production IDs remain unresolved.
