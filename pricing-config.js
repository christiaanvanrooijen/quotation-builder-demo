
// PFM Pricing Configuration
// Source of truth for the PFM Digital Quote Builder.
// VERSION: 2026-07-23-v30.1
//
// CHANGES v30.1 (from v30):
// - Added ENTRANCE_3D_ENTERPRISE sensor (€2.100, Xovis Re-ID capable)
// - Enterprise package NO LONGER has premium/basic toggle — fixed sensor
// - Template matrix reduced from 12 to 10 base templates (enterprise_basic removed)
// - In-store analytics sections added to SAME Enterprise quote (not separate template)
// - Clarified sensor selection logic per package tier
//
// All amounts in EUR unless stated otherwise.

window.PFM_PRICING = {
  meta: {
    version: "2026-07-23-v30.1",
    currency: "EUR",
    minimumContractYears: 3,
    contractTerms: {
      retailChain: 3,
      retailProperty: 3
    },
    notes: "Package-based model. Enterprise uses fixed Xovis Re-ID sensor (no toggle)."
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 1: PACKAGE PRICING MATRIX
  // Monthly subscription per sensor, by segment × technology × tier
  // BEFORE volume discount (see Section 15)
  // ═══════════════════════════════════════════════════════════════════════════
  packagePricing: {
    retailChain: {
      "3D": { essential: 30, professional: 40, enterprise: 70 },
      "IP": { essential: 23, professional: 36, enterprise: 54 }
    },
    retailProperty: {
      "3D": { essential: 40, professional: 50, enterprise: 100 },
      "IP": { essential: 25, professional: 35, enterprise: 65 }
    },
    unit: "EUR_per_sensor_per_month",
    status: "confirmed"
  },

  // Full OPEX monthly hardware lease rates supplied by the stakeholder. The
  // applicable package subscription is added separately to the monthly total.
  fullOpexHardwarePricing: {
    termYears: 5,
    unit: "EUR_per_sensor_per_month",
    source: "STAKEHOLDER-1308-OPEX-RATES",
    status: "confirmed",
    rateComposition: "hardware_only",
    quoteGenerationEnabled: true,
    tierBasis: "total_sensors",
    tiers: ["1-9", "10-29", "30-99", "100+"],
    sensorTypes: ["basic", "premium"],
    // The stakeholder table's duplicated first package header is Essential.
    packages: ["essential", "professional", "enterprise"],
    retailChain: [
      { sensorType: "basic", tier: "1-9", minSensors: 1, maxSensors: 9, monthlyHardwarePerSensor: { essential: 26.09, professional: 29.88, enterprise: 35.03 } },
      { sensorType: "basic", tier: "10-29", minSensors: 10, maxSensors: 29, monthlyHardwarePerSensor: { essential: 30.40, professional: 33.93, enterprise: 42.41 } },
      { sensorType: "basic", tier: "30-99", minSensors: 30, maxSensors: 99, monthlyHardwarePerSensor: { essential: 23.33, professional: 26.75, enterprise: 31.39 } },
      { sensorType: "basic", tier: "100+", minSensors: 100, maxSensors: null, monthlyHardwarePerSensor: { essential: 27.44, professional: 30.62, enterprise: 38.28 } },
      { sensorType: "premium", tier: "1-9", minSensors: 1, maxSensors: 9, monthlyHardwarePerSensor: { essential: 32.00, professional: 35.71, enterprise: 71.43 } },
      { sensorType: "premium", tier: "10-29", minSensors: 10, maxSensors: 29, monthlyHardwarePerSensor: { essential: 30.40, professional: 33.93, enterprise: 67.86 } },
      { sensorType: "premium", tier: "30-99", minSensors: 30, maxSensors: 99, monthlyHardwarePerSensor: { essential: 28.88, professional: 32.23, enterprise: 64.46 } },
      { sensorType: "premium", tier: "100+", minSensors: 100, maxSensors: null, monthlyHardwarePerSensor: { essential: 27.44, professional: 30.62, enterprise: 61.24 } }
    ],
    retailProperty: [
      { sensorType: "basic", tier: "1-9", minSensors: 1, maxSensors: 9, monthlyHardwarePerSensor: { essential: 35.87, professional: 41.83, enterprise: 49.04 } },
      { sensorType: "basic", tier: "10-29", minSensors: 10, maxSensors: 29, monthlyHardwarePerSensor: { essential: 41.80, professional: 47.50, enterprise: 59.38 } },
      { sensorType: "basic", tier: "30-99", minSensors: 30, maxSensors: 99, monthlyHardwarePerSensor: { essential: 32.08, professional: 37.46, enterprise: 43.94 } },
      { sensorType: "basic", tier: "100+", minSensors: 100, maxSensors: null, monthlyHardwarePerSensor: { essential: 37.72, professional: 42.87, enterprise: 53.59 } },
      { sensorType: "premium", tier: "1-9", minSensors: 1, maxSensors: 9, monthlyHardwarePerSensor: { essential: 44.00, professional: 50.00, enterprise: 100.00 } },
      { sensorType: "premium", tier: "10-29", minSensors: 10, maxSensors: 29, monthlyHardwarePerSensor: { essential: 41.80, professional: 47.50, enterprise: 95.00 } },
      { sensorType: "premium", tier: "30-99", minSensors: 30, maxSensors: 99, monthlyHardwarePerSensor: { essential: 39.71, professional: 45.13, enterprise: 90.25 } },
      { sensorType: "premium", tier: "100+", minSensors: 100, maxSensors: null, monthlyHardwarePerSensor: { essential: 37.72, professional: 42.87, enterprise: 85.74 } }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 2: CAPABILITY MATRIX
  // Determines minimum package tier per capability, split by sensor technology.
  // Rule: the HIGHEST tier across all selected capabilities = solution_package.
  // ═══════════════════════════════════════════════════════════════════════════
  capabilityMatrix: {
    advantagePortal:  { "3D": "essential",     "IP": "essential" },
    dataManagement:   { "3D": "essential",     "IP": "essential" },
    footfall:         { "3D": "essential",     "IP": "essential" },
    age:              { "3D": "professional",  "IP": "essential" },
    gender:           { "3D": "professional",  "IP": "essential" },
    group:            { "3D": "professional",  "IP": "essential" },
    occupancy:        { "3D": "professional",  "IP": "professional" },
    reId:             { "3D": "enterprise",    "IP": "professional" },
    dwell:            { "3D": "enterprise",    "IP": "enterprise" },
    heatMapping:      { "3D": "enterprise",    "IP": "enterprise" },
    customReport:     { "3D": "enterprise",    "IP": "enterprise" }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 3: TECHNOLOGY PROFILES & IDs
  // technology_id = unique key that flows: Builder → n8n → Odoo
  // ═══════════════════════════════════════════════════════════════════════════
  technologyProfiles: {
    "3D_ONLY": {
      description: "All measurement points use 3D sensors",
      requiresServer: false,
      typicalUseCase: "Footfall, demographics, occupancy without Re-ID"
    },
    "IP_ONLY": {
      description: "All measurement points use IP cameras",
      requiresServer: true,
      typicalUseCase: "Video analytics with counting, demographics, Re-ID"
    },
    "HYBRID_3D_IP": {
      description: "3D for entrance/zone, IP for Re-ID/advanced analytics",
      requiresServer: true,
      typicalUseCase: "3D entrance footfall + IP cameras + server for dwell/routing"
    }
  },

  technologyIds: {
    // ─── Retail Chain entrance sensors ───────────────────────────────────
    ENTRANCE_3D_PREMIUM: {
      label: "Premium 3D Entrance Sensor (Xovis)",
      segment: "retailChain",
      role: "entrance",
      capex: 1100,
      reIdCapable: false,
      packages: ["essential", "professional"],
      note: "Standard premium Xovis sensor. Demographics capable at 350cm."
    },
    ENTRANCE_3D_BASIC: {
      label: "Basic 3D Entrance Sensor (Xovis)",
      segment: "retailChain",
      role: "entrance",
      capex: 675,
      reIdCapable: false,
      packages: ["essential", "professional"],
      note: "Entry-level Xovis sensor. Also demographics capable."
    },
    ENTRANCE_3D_ENTERPRISE: {
      label: "Enterprise 3D Entrance Sensor (Xovis Re-ID)",
      segment: "retailChain",
      role: "entrance",
      capex: 2100,
      reIdCapable: true,
      packages: ["enterprise"],
      note: "Xovis sensor with built-in Re-ID in field of view. Mandatory for Enterprise package. No basic/premium toggle — this is the only option."
    },

    // ─── Retail Property entrance sensors ────────────────────────────────
    ENTRANCE_3D_RP_ESSENTIAL: {
      label: "3D Entrance Sensor (Property, Essential)",
      segment: "retailProperty",
      role: "entrance",
      capex: 1295,
      demographicsCapable: false
    },
    ENTRANCE_3D_RP_PROFESSIONAL: {
      label: "3D Entrance Sensor (Property, Professional+)",
      segment: "retailProperty",
      role: "entrance",
      capex: 1650,
      demographicsCapable: true
    },
    ENTRANCE_OUTDOOR: {
      label: "Outdoor Entrance Sensor",
      segment: "retailProperty",
      role: "entrance",
      capex: 2000,
      note: "Weather-resistant. Same price regardless of package."
    },

    // ─── Capture & zone ─────────────────────────────────────────────────
    CAPTURE_3D: {
      label: "Capture rate sensor 3D",
      segment: "retailChain",
      role: "capture",
      capex: 450
    },
    CAPTURE_IP: {
      label: "Capture rate sensor IP",
      segment: "retailChain",
      role: "capture",
      capex: 450
    },
    ZONE_3D_RP_ESSENTIAL: {
      label: "Zone counting sensor (Property, Essential)",
      segment: "retailProperty",
      role: "zone",
      capex: 1295,
      demographicsCapable: false
    },
    ZONE_3D_RP_PROFESSIONAL: {
      label: "Zone counting sensor (Property, Professional+)",
      segment: "retailProperty",
      role: "zone",
      capex: 1650,
      demographicsCapable: true
    },

    // ─── In-store analytics ─────────────────────────────────────────────
    INSTORE_LIDAR: {
      label: "In-store analytics Lidar",
      segment: "retailChain",
      role: "instore",
      capex: 4625,
      note: "All-in price incl. server share."
    },
    INSTORE_3D: {
      label: "In-store analytics 3D (PF-L)",
      segment: "retailChain",
      role: "instore",
      capex: 2500
    },

    // ─── Re-ID & ANPR ───────────────────────────────────────────────────
    REID_IP: {
      label: "Re-ID IP camera + server",
      segment: "both",
      role: "reid",
      capex: 450,
      pricingNote: "Retail Property Isarsoft IP camera price; installation and setup use the segment IP-camera setup rules."
    },
    ANPR: {
      label: "ANPR parking sensor",
      segment: "retailProperty",
      role: "parking",
      capex: 3500
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 4: CONFIGURATION IDs & TEMPLATE MAPPING
  // Each config = one commercial scenario → maps to Odoo template.
  //
  // IMPORTANT: Enterprise templates have NO _premium/_basic suffix because
  // Enterprise always uses the fixed Xovis Re-ID sensor (€2.100).
  // Only Essential and Professional have the premium/basic toggle.
  // ═══════════════════════════════════════════════════════════════════════════
  configurations: {
    retailChain: {
      RC_FOOTFALL: {
        label: "Retail Chain – Footfall",
        minimumPackage: "essential",
        includesFootfall: true,
        includesCaptureRate: false,
        includesTracking: false,
        templates: {
          essential_premium:    "tpl_rc_footfall_essential_premium",
          essential_basic:      "tpl_rc_footfall_essential_basic",
          essential_isarsoft:   "tpl_rc_footfall_essential_isarsoft",
          professional_premium: "tpl_rc_footfall_professional_premium",
          professional_basic:   "tpl_rc_footfall_professional_basic",
          professional_isarsoft: "tpl_rc_footfall_professional_isarsoft",
          enterprise_isarsoft:  "tpl_rc_footfall_enterprise_isarsoft",
          enterprise:           "tpl_rc_footfall_professional_enterprise"
        }
      },
      RC_FOOTFALL_CAPTURE: {
        label: "Retail Chain – Footfall + Capture Rate",
        minimumPackage: "professional",
        includesFootfall: true,
        includesCaptureRate: true,
        includesTracking: false,
        templates: {
          professional_premium: "tpl_rc_footfall_capture_professional_premium",
          professional_basic:   "tpl_rc_footfall_capture_professional_basic",
          professional_isarsoft: "tpl_rc_footfall_capture_professional_isarsoft",
          enterprise:           "tpl_rc_footfall_capture_enterprise"
        }
      },
      RC_FOOTFALL_TRACKING: {
        label: "Retail Chain – Footfall + Tracking/Re-ID",
        minimumPackage: "enterprise",
        includesFootfall: true,
        includesCaptureRate: false,
        includesTracking: true,
        templates: {
          enterprise: "tpl_rc_footfall_tracking_enterprise"
        }
      },
      RC_FOOTFALL_CAPTURE_TRACKING: {
        label: "Retail Chain – Footfall + Capture + Tracking/Re-ID",
        minimumPackage: "enterprise",
        includesFootfall: true,
        includesCaptureRate: true,
        includesTracking: true,
        templates: {
          enterprise: "tpl_rc_footfall_capture_tracking_enterprise"
        }
      }
    },
    retailProperty: {
      RP_FOOTFALL: {
        label: "Retail Property – Footfall",
        minimumPackage: "essential",
        templates: {
          essential:    "tpl_rp_footfall_essential",
          essential_basic: "tpl_rp_footfall_essential_basic",
          essential_premium: "tpl_rp_footfall_essential_premium",
          professional: "tpl_rp_footfall_professional",
          professional_basic: "tpl_rp_footfall_professional_basic",
          professional_premium: "tpl_rp_footfall_professional_premium",
          enterprise:   "tpl_rp_footfall_enterprise"
        }
      },
      RP_FOOTFALL_ZONE: {
        label: "Retail Property – Footfall + Zone Counting",
        minimumPackage: "essential",
        templates: {
          essential:    "tpl_rp_footfall_zone_essential",
          professional: "tpl_rp_footfall_zone_professional",
          enterprise:   "tpl_rp_footfall_zone_enterprise"
        }
      },
      RP_FOOTFALL_REID: {
        label: "Retail Property – Footfall + Re-ID",
        minimumPackage: "enterprise",
        templates: {
          enterprise: "tpl_rp_footfall_reid_enterprise"
        }
      },
      RP_FOOTFALL_ZONE_REID: {
        label: "Retail Property – Footfall + Zone + Re-ID",
        minimumPackage: "enterprise",
        templates: {
          enterprise: "tpl_rp_footfall_zone_reid_enterprise"
        }
      }
    }
  },

  // Odoo template catalogue supplied 2026-07-24. Builder IDs are the stable
  // references sent by the app; test and production IDs support n8n routing.
  odooTemplateCatalog: {
    retailChain: {
      capex: {
        tpl_rc_footfall_essential_premium: { configurationId: "RC_FOOTFALL", builderConfig: "NL_QB_Footfall_Essential_Xovis", testId: 203, productionId: null },
        tpl_rc_footfall_essential_basic: { configurationId: "RC_FOOTFALL", builderConfig: "NL_QB_Footfall_Essentials_Milesight", testId: 206, productionId: null },
        tpl_rc_footfall_professional_premium: { configurationId: "RC_FOOTFALL", builderConfig: "NL_QB_Footfall_Professional_Xovis", testId: 204, productionId: null },
        tpl_rc_footfall_professional_basic: { configurationId: "RC_FOOTFALL", builderConfig: "NL_QB_Footfall_Professional_Milesight", testId: 207, productionId: null },
        tpl_rc_footfall_professional_enterprise: { configurationId: "RC_FOOTFALL", builderConfig: "NL_QB_Footfall_Enterprise_Xovis", testId: 209, productionId: null },
        tpl_rc_footfall_capture_professional_premium: { configurationId: "RC_FOOTFALL_CAPTURE", builderConfig: "NL_QB_Footfall_Passersby_Professional_Xovis", testId: 205, productionId: null },
        tpl_rc_footfall_capture_professional_basic: { configurationId: "RC_FOOTFALL_CAPTURE", builderConfig: "NL_QB_Footfall_Passersby_Professional_Milesight", testId: 208, productionId: null },
        tpl_rc_footfall_capture_enterprise: { configurationId: "RC_FOOTFALL_CAPTURE", builderConfig: "NL_QB_Footfall_Passersby_Enterprise_Xovis", testId: 210, productionId: null },
        tpl_rc_footfall_tracking_enterprise: { configurationId: "RC_FOOTFALL_TRACKING", builderConfig: "NL_QB_Footfall_Tracking_Enterprise_Xovis", testId: 211, productionId: null },
        tpl_rc_footfall_capture_tracking_enterprise: { configurationId: "RC_FOOTFALL_CAPTURE_TRACKING", builderConfig: "NL_QB_Footfall_Passersby_Tracking_Enterprise_Xovis", testId: 212, productionId: null },
          tpl_rc_footfall_essential_isarsoft: { configurationId: "RC_FOOTFALL", builderConfig: "NL_QB_Footfall_Essentials_Isarsoft_Retail", testId: 266, productionId: null },
          tpl_rc_footfall_professional_isarsoft: { configurationId: "RC_FOOTFALL", builderConfig: "NL_QB_Footfall_Professional_Isarsoft_Retail", testId: 272, productionId: null },
          tpl_rc_footfall_enterprise_isarsoft: { configurationId: "RC_FOOTFALL", builderConfig: "NL_QB_Footfall_Enterprise_Isarsoft_Retail", testId: 273, productionId: null },
        tpl_rc_footfall_capture_professional_isarsoft: { configurationId: "RC_FOOTFALL_CAPTURE", builderConfig: "NL_QB_Footfall_Passersby_Professional_Isarsoft_Retail", testId: 268, productionId: null },
        tpl_rc_instore_lidar: { configurationId: null, builderConfig: "NL_QB_Addon_Tracking_Enterprise_Xovis", testId: 213, productionId: null },
        tpl_rc_instore_3d: { configurationId: null, builderConfig: "NL_QB_Addon_Tracking_Enterprise_LiDAR", testId: 214, productionId: null }
      },
      opex: {
        essential: { builderConfig: "NL_QB_Essential_Retail_Package", testId: 215, productionId: null },
        professional: { builderConfig: "NL_QB_Professional_Retail_Package", testId: 216, productionId: null },
        enterprise: { builderConfig: "NL_QB_Enterprise_Retail_Package", testId: 217, productionId: null },
        instore_lidar: { builderConfig: "NL_QB_Enterprise_Retail_Package_Addon-LiDAR", testId: 219, productionId: null },
        instore_3d: { builderConfig: "NL_QB_Enterprise_Retail_Package_Addon-Xovis", testId: 218, productionId: null }
      },
      fullOpex: {
        capexForOpex: {
          xovis: { builderConfig: "NL_QB_Footfall_Intel-5YR_CAPEX_Retail", testId: 225, productionId: null },
          milesight: { builderConfig: "NL_QB_Footfall_Intel-5YR_CAPEX_Retail", testId: 225, productionId: null }
        },
        packages: {
          milesight: {
            essential: { builderConfig: "NL_QB_Essential_INTEL-5YR_Retail", testId: 221, productionId: null },
            professional: { builderConfig: "NL_QB_Professional_INTEL-5YR_Retail", testId: 223, productionId: null },
            enterprise: { builderConfig: "NL_QB_Enterprise_INTEL-5YR_Retail", testId: 224, productionId: null }
          },
          xovis: {
            essential: { builderConfig: "NL_QB_Essential_INTEL-5YR_Retail", testId: 221, productionId: null },
            professional: { builderConfig: "NL_QB_Professional_INTEL-5YR_Retail", testId: 223, productionId: null },
            enterprise: { builderConfig: "NL_QB_Enterprise_INTEL-5YR_Retail", testId: 224, productionId: null }
          }
        }
      }
    },
    retailProperty: {
      capex: {
        tpl_rp_reid_capex: { configurationId: "RP_REID_CAPEX", builderConfig: "NL_QB_Addon_Tracking_Exterprise_Re-ID", testId: 261, productionId: null }
      },
      opex: {
        essential: { builderConfig: "NL_QB_Essential_Package_Retail_Property", testId: 258, productionId: null },
        professional: { builderConfig: "NL_QB_Professional_Package_Retail_Property", testId: 259, productionId: null },
        enterprise: { builderConfig: "NL_QB_Enterprise_Package_Retail_Property", testId: 260, productionId: null },
        reid_addon: { builderConfig: "NL_QB_Enterprise_Retail_Package_Addon_Re-ID", testId: 265, productionId: null }
      },
      fullOpex: {
        capexForOpex: {
          xovis: { builderConfig: "NL_QB_Footfall_Intel-5YR_CAPEX_Retail_Property", testId: 254, productionId: null },
          milesight: { builderConfig: "NL_QB_Footfall_Intel-5YR_CAPEX_Retail_Property", testId: 254, productionId: null }
        },
        packages: {
          milesight: {
            essential: { builderConfig: "NL_QB_Essential_INTEL-5YR_Retail_Property", testId: 255, productionId: null },
            professional: { builderConfig: "NL_QB_Professional_INTEL-5YR_Retail_Property", testId: 256, productionId: null },
            enterprise: { builderConfig: "NL_QB_Enterprise_INTEL-5YR_Retail_Property", testId: 257, productionId: null }
          },
          xovis: {
            essential: { builderConfig: "NL_QB_Essential_INTEL-5YR_Retail_Property", testId: 255, productionId: null },
            professional: { builderConfig: "NL_QB_Professional_INTEL-5YR_Retail_Property", testId: 256, productionId: null },
            enterprise: { builderConfig: "NL_QB_Enterprise_INTEL-5YR_Retail_Property", testId: 257, productionId: null }
          }
        }
      }
    }
  },

  odooPriceLists: {
    test: {
      retailChain: [
        { key: "tier0", minSensors: 0, maxSensors: 9, capex: { label: "QB_NL_Retail_Tier0", id: 3074 }, opex: { label: "QB_NL_SUBS_RETAIL_TIER0", id: 3076 }, fullOpex: { milesight: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_MILESIGHT", id: 3100 }, xovis: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_XOVIS", id: 3099 } } },
        { key: "tier1", minSensors: 10, maxSensors: 29, capex: { label: "QB_NL_Retail_Tier1", id: 3075 }, opex: { label: "QB_NL_SUBS_RETAIL_TIER1", id: 3077 }, fullOpex: { milesight: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_MILESIGHT", id: 3100 }, xovis: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_XOVIS", id: 3099 } } },
        { key: "tier2", minSensors: 30, maxSensors: 99, capex: { label: "QB_NL_Retail_Tier2", id: 3084 }, opex: { label: "QB_NL_SUBS_RETAIL_TIER2", id: 3078 }, fullOpex: { milesight: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_MILESIGHT", id: 3100 }, xovis: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_XOVIS", id: 3099 } } },
        { key: "tier3", minSensors: 100, maxSensors: null, capex: { label: "QB_NL_Retail_Tier3", id: 3085 }, opex: { label: "QB_NL_SUBS_RETAIL_TIER3", id: 3079 }, fullOpex: { milesight: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_MILESIGHT", id: 3100 }, xovis: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_XOVIS", id: 3099 } } }
      ],
      retailProperty: [
        { key: "tier0", minSensors: 0, maxSensors: 9, capex: { label: "QB_NL_Retail_Property_Tier0", id: 3086 }, opex: { label: "QB_NL_SUBS_RETAILPROP_TIER0", id: 3080 }, fullOpex: { milesight: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_PROPERTY_MILESIGHT", id: 3101 }, xovis: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS", id: 3102 } } },
        { key: "tier1", minSensors: 10, maxSensors: 29, capex: { label: "QB_NL_Retail_Property_Tier1", id: 3087 }, opex: { label: "QB_NL_SUBS_RETAILPROP_TIER1", id: 3081 }, fullOpex: { milesight: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_PROPERTY_MILESIGHT", id: 3101 }, xovis: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS", id: 3102 } } },
        { key: "tier2", minSensors: 30, maxSensors: 99, capex: { label: "QB_NL_Retail_Property_Tier2", id: 3088 }, opex: { label: "QB_NL_SUBS_RETAILPROP_TIER2", id: 3082 }, fullOpex: { milesight: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_PROPERTY_MILESIGHT", id: 3101 }, xovis: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS", id: 3102 } } },
        { key: "tier3", minSensors: 100, maxSensors: null, capex: { label: "QB_NL_Retail_Property_Tier3", id: 3089 }, opex: { label: "QB_NL_SUBS_RETAILPROP_TIER3", id: 3083 }, fullOpex: { milesight: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_PROPERTY_MILESIGHT", id: 3101 }, xovis: { label: "QB_NL_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS", id: 3102 } } }
      ]
    }
  },

  // Entity-aware Odoo placeholders for Phase A. NL continues to use the proven
  // legacy catalogue above; UK/DE must be filled before testing those entities.
  odooTemplateCatalogByEntity: {
    UK: {
      retailChain: {
        capex: {
          tpl_rc_footfall_essential_premium: { configurationId: "RC_FOOTFALL", builderConfig: "UK_QB_Footfall_Essential_Xovis", testId: 226, productionId: null },
          tpl_rc_footfall_essential_basic: { configurationId: "RC_FOOTFALL", builderConfig: "UK_QB_Footfall_Essentials_Milesight", testId: 233, productionId: null },
          tpl_rc_footfall_professional_premium: { configurationId: "RC_FOOTFALL", builderConfig: "UK_QB_Footfall_Professional_Xovis", testId: 227, productionId: null },
          tpl_rc_footfall_professional_basic: { configurationId: "RC_FOOTFALL", builderConfig: "UK_QB_Footfall_Professional_Milesight", testId: 234, productionId: null },
          tpl_rc_footfall_professional_enterprise: { configurationId: "RC_FOOTFALL", builderConfig: "UK_QB_Footfall_Enterprise_Xovis", testId: 228, productionId: null },
          tpl_rc_footfall_capture_professional_premium: { configurationId: "RC_FOOTFALL_CAPTURE", builderConfig: "UK_QB_Footfall_Passersby_Professional_Xovis", testId: 229, productionId: null },
          tpl_rc_footfall_capture_professional_basic: { configurationId: "RC_FOOTFALL_CAPTURE", builderConfig: "UK_QB_Footfall_Passersby_Professional_Milesight", testId: 235, productionId: null },
          tpl_rc_footfall_capture_enterprise: { configurationId: "RC_FOOTFALL_CAPTURE", builderConfig: "UK_QB_Footfall_Passersby_Enterprise_Xovis", testId: 230, productionId: null },
          tpl_rc_footfall_tracking_enterprise: { configurationId: "RC_FOOTFALL_TRACKING", builderConfig: "UK_QB_Footfall_Tracking_Enterprise_Xovis", testId: 232, productionId: null },
          tpl_rc_footfall_capture_tracking_enterprise: { configurationId: "RC_FOOTFALL_CAPTURE_TRACKING", builderConfig: "UK_QB_Footfall_Passersby_Tracking_Enterprise_Xovis", testId: 231, productionId: null },
          tpl_rc_footfall_essential_isarsoft: { configurationId: "RC_FOOTFALL", builderConfig: "UK_QB_Footfall_Essentials_Isarsoft", testId: 269, productionId: null },
          tpl_rc_footfall_professional_isarsoft: { configurationId: "RC_FOOTFALL", builderConfig: "UK_QB_Footfall_Professional_Isarsoft", testId: 274, productionId: null },
          tpl_rc_footfall_enterprise_isarsoft: { configurationId: "RC_FOOTFALL", builderConfig: "UK_QB_Footfall_Enterprise_Isarsoft", testId: 275, productionId: null },
          tpl_rc_footfall_capture_professional_isarsoft: { configurationId: "RC_FOOTFALL_CAPTURE", builderConfig: "UK_QB_Footfall_Passersby_Professional_Isarsoft", testId: 271, productionId: null },
          tpl_rc_instore_lidar: { configurationId: null, builderConfig: "UK_QB_Addon_Tracking_Enterprise_Xovis", testId: 236, productionId: null },
          tpl_rc_instore_3d: { configurationId: null, builderConfig: "UK_QB_Addon_Tracking_Enterprise_LiDAR", testId: 237, productionId: null }
        },
        opex: {
          essential: { builderConfig: "UK_QB_Essential_Retail_Package", testId: 238, productionId: null },
          professional: { builderConfig: "UK_QB_Professional_Retail_Package", testId: 240, productionId: null },
          enterprise: { builderConfig: "UK_QB_Enterprise_Retail_Package", testId: 243, productionId: null },
          instore_lidar: { builderConfig: "UK_QB_Enterprise_Retail_Package_Addon-LiDAR", testId: 244, productionId: null },
          instore_3d: { builderConfig: "UK_QB_Enterprise_Retail_Package_Addon-Xovis", testId: 245, productionId: null }
        },
        fullOpex: {
          capexForOpex: {
            xovis: { builderConfig: "UK_QB_Footfall_Intel-5YR_CAPEX_Retail", testId: 249, productionId: null },
            milesight: { builderConfig: "UK_QB_Footfall_Intel-5YR_CAPEX_Retail", testId: 249, productionId: null }
          },
          packages: {
            milesight: {
              essential: { builderConfig: "UK_QB_Essential_INTEL-5YR_Retail", testId: 248, productionId: null },
              professional: { builderConfig: "UK_QB_Professional_INTEL-5YR_Retail", testId: 247, productionId: null },
              enterprise: { builderConfig: "UK_QB_Enterprise_INTEL-5YR_Retail", testId: 246, productionId: null }
            },
            xovis: {
              essential: { builderConfig: "UK_QB_Essential_INTEL-5YR_Retail", testId: 248, productionId: null },
              professional: { builderConfig: "UK_QB_Professional_INTEL-5YR_Retail", testId: 247, productionId: null },
              enterprise: { builderConfig: "UK_QB_Enterprise_INTEL-5YR_Retail", testId: 246, productionId: null }
            }
          }
        }
      },
      retailProperty: {
        capex: {
          tpl_rp_reid_capex: { configurationId: "RP_REID_CAPEX", builderConfig: "UK_QB_Addon_Tracking_Exterprise_Re-ID", testId: 263, productionId: null }
        },
        opex: {
          essential: { builderConfig: "UK_QB_Essential_Retail_Property_Package", testId: 239, productionId: null },
          professional: { builderConfig: "UK_QB_Professional_Property_Package", testId: 241, productionId: null },
          enterprise: { builderConfig: "UK_QB_Enterprise_Retail_Property_Package", testId: 242, productionId: null },
          reid_addon: { builderConfig: "UK_QB_Enterprise_Retail_Package_Addon_Re-ID", testId: 264, productionId: null }
        },
        fullOpex: {
          capexForOpex: {
            xovis: { builderConfig: "UK_QB_Footfall_Intel-5YR_CAPEX_Retail_Property", testId: 253, productionId: null },
            milesight: { builderConfig: "UK_QB_Footfall_Intel-5YR_CAPEX_Retail_Property", testId: 253, productionId: null }
          },
          packages: {
            milesight: {
              essential: { builderConfig: "UK_QB_Essential_INTEL-5YR_Retail_Property", testId: 250, productionId: null },
              professional: { builderConfig: "UK_QB_Professional_INTEL-5YR_Retail_Property", testId: 251, productionId: null },
              enterprise: { builderConfig: "UK_QB_Enterprise_INTEL-5YR_Retail_Property", testId: 252, productionId: null }
            },
            xovis: {
              essential: { builderConfig: "UK_QB_Essential_INTEL-5YR_Retail_Property", testId: 250, productionId: null },
              professional: { builderConfig: "UK_QB_Professional_INTEL-5YR_Retail_Property", testId: 251, productionId: null },
              enterprise: { builderConfig: "UK_QB_Enterprise_INTEL-5YR_Retail_Property", testId: 252, productionId: null }
            }
          }
        }
      }
    },
    DE: {
      retailChain: {
        capex: {
          tpl_rc_footfall_essential_premium: { configurationId: "RC_FOOTFALL", builderConfig: "DE_QB_Footfall_Essential_Xovis_Retail", testId: null, productionId: null },
          tpl_rc_footfall_essential_basic: { configurationId: "RC_FOOTFALL", builderConfig: "DE_QB_Footfall_Essentials_Milesight_Retail", testId: null, productionId: null },
          tpl_rc_footfall_professional_premium: { configurationId: "RC_FOOTFALL", builderConfig: "DE_QB_Footfall_Professional_Xovis_Retail", testId: null, productionId: null },
          tpl_rc_footfall_professional_basic: { configurationId: "RC_FOOTFALL", builderConfig: "DE_QB_Footfall_Professional_Milesight_Retail", testId: null, productionId: null },
          tpl_rc_footfall_professional_enterprise: { configurationId: "RC_FOOTFALL", builderConfig: "DE_QB_Footfall_Enterprise_Xovis_Retail", testId: null, productionId: null },
          tpl_rc_footfall_capture_professional_premium: { configurationId: "RC_FOOTFALL_CAPTURE", builderConfig: "DE_QB_Footfall_Passersby_Professional_Xovis_Retail", testId: null, productionId: null },
          tpl_rc_footfall_capture_professional_basic: { configurationId: "RC_FOOTFALL_CAPTURE", builderConfig: "DE_QB_Footfall_Passersby_Professional_Milesight_Retail", testId: null, productionId: null },
          tpl_rc_footfall_capture_enterprise: { configurationId: "RC_FOOTFALL_CAPTURE", builderConfig: "DE_QB_Footfall_Passersby_Enterprise_Xovis_Retail", testId: null, productionId: null },
          tpl_rc_footfall_tracking_enterprise: { configurationId: "RC_FOOTFALL_TRACKING", builderConfig: "DE_QB_Footfall_Tracking_Enterprise_Xovis_Retail", testId: null, productionId: null },
          tpl_rc_footfall_capture_tracking_enterprise: { configurationId: "RC_FOOTFALL_CAPTURE_TRACKING", builderConfig: "DE_QB_Footfall_Passersby_Tracking_Enterprise_Xovis_Retail", testId: null, productionId: null },
          tpl_rc_instore_lidar: { configurationId: null, builderConfig: "DE_QB_Addon_Tracking_Enterprise_Xovis", testId: null, productionId: null },
          tpl_rc_instore_3d: { configurationId: null, builderConfig: "DE_QB_Addon_Tracking_Enterprise_LiDAR", testId: null, productionId: null }
        },
        opex: {
          essential: { builderConfig: "DE_QB_Essential_Package_Retail", testId: null, productionId: null },
          professional: { builderConfig: "DE_QB_Professional_Package_Retail", testId: null, productionId: null },
          enterprise: { builderConfig: "DE_QB_Enterprise_Package_Retail", testId: null, productionId: null },
          instore_lidar: { builderConfig: "DE_QB_Enterprise_Package_Addon-LiDAR", testId: null, productionId: null },
          instore_3d: { builderConfig: "DE_QB_Enterprise_Package_Addon-Xovis", testId: null, productionId: null }
        },
        fullOpex: {
          capexForOpex: {
            xovis: { builderConfig: "DE_QB_Footfall_Intel-5YR_CAPEX_Retail", testId: null, productionId: null },
            milesight: { builderConfig: "DE_QB_Footfall_Intel-5YR_CAPEX_Retail", testId: null, productionId: null }
          },
          packages: {
            milesight: {
              essential: { builderConfig: null, testId: null, productionId: null },
              professional: { builderConfig: null, testId: null, productionId: null },
              enterprise: { builderConfig: null, testId: null, productionId: null }
            },
            xovis: {
              essential: { builderConfig: "DE_QB_Essential_INTEL-5YR_Xovis_Retail", testId: null, productionId: null },
              professional: { builderConfig: "DE_QB_Professional_INTEL-5YR_Xovis_Retail", testId: null, productionId: null },
              enterprise: { builderConfig: "DE_QB_Enterprise_INTEL-5YR_Xovis_Retail", testId: null, productionId: null }
            }
          }
        }
      },
      retailProperty: {
        capex: {
          tpl_rp_reid_capex: { configurationId: "RP_REID_CAPEX", builderConfig: "DE_QB_Addon_Tracking_Exterprise_Re-ID", testId: null, productionId: null }
        },
        opex: {
          essential: { builderConfig: "DE_QB_Essential_Package_Retail_Property", testId: null, productionId: null },
          professional: { builderConfig: "DE_QB_Professional_Package_Retail_Property", testId: null, productionId: null },
          enterprise: { builderConfig: "DE_QB_Enterprise_Package_Retail_Property", testId: null, productionId: null },
          reid_addon: { builderConfig: null, testId: null, productionId: null }
        },
        fullOpex: {
          capexForOpex: {
            xovis: { builderConfig: "ML_QB_Footfall_Intel-5YR_CAPEX_Retail_Property", testId: null, productionId: null },
            milesight: { builderConfig: "ML_QB_Footfall_Intel-5YR_CAPEX_Retail_Property", testId: null, productionId: null }
          },
          packages: {
            milesight: {
              essential: { builderConfig: "DE_QB_Essential_INTEL-5YR_Retail_Property", testId: null, productionId: null },
              professional: { builderConfig: "DE_QB_Professional_INTEL-5YR_Retail_Property", testId: null, productionId: null },
              enterprise: { builderConfig: "DE_QB_Enterprise_INTEL-5YR_Retail_Property", testId: null, productionId: null }
            },
            xovis: {
              essential: { builderConfig: "DE_QB_Essential_INTEL-5YR_Retail_Property", testId: null, productionId: null },
              professional: { builderConfig: "DE_QB_Professional_INTEL-5YR_Retail_Property", testId: null, productionId: null },
              enterprise: { builderConfig: "DE_QB_Enterprise_INTEL-5YR_Retail_Property", testId: null, productionId: null }
            }
          }
        }
      }
    }
  },

  odooPriceListsByEntity: {
    UK: {
      test: {
        retailChain: [
          { key: "tier0", minSensors: 0, maxSensors: 9, capex: { label: "QB_UK_Retail_Retail-Chain", id: 3091 }, opex: { label: "QB_UK_SUBS_RETAIL", id: 3093 }, fullOpex: { milesight: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_MILESIGHT", id: 3097 }, xovis: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_XOVIS", id: 3096 } } },
          { key: "tier1", minSensors: 10, maxSensors: 29, capex: { label: "QB_UK_Retail_Retail-Chain", id: 3091 }, opex: { label: "QB_UK_SUBS_RETAIL", id: 3093 }, fullOpex: { milesight: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_MILESIGHT", id: 3097 }, xovis: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_XOVIS", id: 3096 } } },
          { key: "tier2", minSensors: 30, maxSensors: 99, capex: { label: "QB_UK_Retail_Retail-Chain", id: 3091 }, opex: { label: "QB_UK_SUBS_RETAIL", id: 3093 }, fullOpex: { milesight: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_MILESIGHT", id: 3097 }, xovis: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_XOVIS", id: 3096 } } },
          { key: "tier3", minSensors: 100, maxSensors: null, capex: { label: "QB_UK_Retail_Retail-Chain", id: 3091 }, opex: { label: "QB_UK_SUBS_RETAIL", id: 3093 }, fullOpex: { milesight: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_MILESIGHT", id: 3097 }, xovis: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_XOVIS", id: 3096 } } }
        ],
        retailProperty: [
          { key: "tier0", minSensors: 0, maxSensors: 9, capex: { label: "QB_UK_Retail_Retail-Property", id: 3092 }, opex: { label: "QB_UK_SUBS_RETAILPROP", id: 3094 }, fullOpex: { milesight: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_PROPERTY_MILESIGHT", id: 3098 }, xovis: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS", id: 3095 } } },
          { key: "tier1", minSensors: 10, maxSensors: 29, capex: { label: "QB_UK_Retail_Retail-Property", id: 3092 }, opex: { label: "QB_UK_SUBS_RETAILPROP", id: 3094 }, fullOpex: { milesight: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_PROPERTY_MILESIGHT", id: 3098 }, xovis: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS", id: 3095 } } },
          { key: "tier2", minSensors: 30, maxSensors: 99, capex: { label: "QB_UK_Retail_Retail-Property", id: 3092 }, opex: { label: "QB_UK_SUBS_RETAILPROP", id: 3094 }, fullOpex: { milesight: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_PROPERTY_MILESIGHT", id: 3098 }, xovis: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS", id: 3095 } } },
          { key: "tier3", minSensors: 100, maxSensors: null, capex: { label: "QB_UK_Retail_Retail-Property", id: 3092 }, opex: { label: "QB_UK_SUBS_RETAILPROP", id: 3094 }, fullOpex: { milesight: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_PROPERTY_MILESIGHT", id: 3098 }, xovis: { label: "QB_UK_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS", id: 3095 } } }
        ]
      }
    },
    DE: {
      test: {
        retailChain: [
          { key: "tier0", minSensors: 0, maxSensors: 9, capex: { label: "QB_DE_Retail_Retail-Chain", id: null }, opex: { label: "QB_DE_SUBS_RETAIL", id: null }, fullOpex: { milesight: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_MILESIGHT", id: null }, xovis: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_XOVIS", id: null } } },
          { key: "tier1", minSensors: 10, maxSensors: 29, capex: { label: "QB_DE_Retail_Retail-Chain", id: null }, opex: { label: "QB_DE_SUBS_RETAIL", id: null }, fullOpex: { milesight: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_MILESIGHT", id: null }, xovis: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_XOVIS", id: null } } },
          { key: "tier2", minSensors: 30, maxSensors: 99, capex: { label: "QB_DE_Retail_Retail-Chain", id: null }, opex: { label: "QB_DE_SUBS_RETAIL", id: null }, fullOpex: { milesight: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_MILESIGHT", id: null }, xovis: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_XOVIS", id: null } } },
          { key: "tier3", minSensors: 100, maxSensors: null, capex: { label: "QB_DE_Retail_Retail-Chain", id: null }, opex: { label: "QB_DE_SUBS_RETAIL", id: null }, fullOpex: { milesight: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_MILESIGHT", id: null }, xovis: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_XOVIS", id: null } } }
        ],
        retailProperty: [
          { key: "tier0", minSensors: 0, maxSensors: 9, capex: { label: "QB_DE_Retail_Retail-Property", id: null }, opex: { label: "QB_DE_SUBS_RETAILPROP", id: null }, fullOpex: { milesight: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_PROPERTY_MILESIGHT", id: null }, xovis: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS", id: null } } },
          { key: "tier1", minSensors: 10, maxSensors: 29, capex: { label: "QB_DE_Retail_Retail-Property", id: null }, opex: { label: "QB_DE_SUBS_RETAILPROP", id: null }, fullOpex: { milesight: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_PROPERTY_MILESIGHT", id: null }, xovis: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS", id: null } } },
          { key: "tier2", minSensors: 30, maxSensors: 99, capex: { label: "QB_DE_Retail_Retail-Property", id: null }, opex: { label: "QB_DE_SUBS_RETAILPROP", id: null }, fullOpex: { milesight: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_PROPERTY_MILESIGHT", id: null }, xovis: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS", id: null } } },
          { key: "tier3", minSensors: 100, maxSensors: null, capex: { label: "QB_DE_Retail_Retail-Property", id: null }, opex: { label: "QB_DE_SUBS_RETAILPROP", id: null }, fullOpex: { milesight: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_PROPERTY_MILESIGHT", id: null }, xovis: { label: "QB_DE_SUBS_INTEL-5YR_RETAIL_PROPERTY_XOVIS", id: null } } }
        ]
      }
    }
  },

  odooSalesTeams: {
    NL: { id: 1, label: "Sales NL" },
    DE: { id: 13, label: "Sales DE" },
    FR: { id: 1, label: "Sales NL" },
    UK: { id: 3, label: "PFM Intelligence UK Sales" }
  },

  odooLegalCompanies: {
    NL: 2,
    UK: 7,
    DE: 20
  },

  odooOperatingUnits: {
    NL: { "Shops": 7, "Shopping Centres": 8, "Fastfood": 11 },
    UK: { "Shops": 16, "Shopping Centres": 17, "Fastfood": 25 },
    DE: { "Shops": 99, "Shopping Centres": 100 }
  },

  odooSalespersonRouting: {
    "Christiaan van Rooijen": { userId: 231, entityKey: "NL", salesTeamId: 1 },
    "Anna Reilander": { userId: 394, entityKey: "DE", salesTeamId: 13 },
    "Arnoud Aschman": { userId: 343, entityKey: "NL", salesTeamId: 1 },
    "Bart Schmitz": { userId: 9, entityKey: "NL", salesTeamId: 1 },
    "David Sturdy": { userId: 4, entityKey: "UK", salesTeamId: 3 },
    "Krystof Gogela": { userId: 387, entityKey: "NL", salesTeamId: 1 },
    "Mark Gosnell": { userId: 335, entityKey: "UK", salesTeamId: 3 },
    "Mark King": { userId: 263, entityKey: "UK", salesTeamId: 3 },
    "Oliver Germer": { userId: 404, entityKey: "DE", salesTeamId: 13 },
    "Phill Cox": { userId: 122, entityKey: "UK", salesTeamId: 3 },
    "Prince Competence": { userId: 382, entityKey: "NL", salesTeamId: 1 },
    "Raymond Sestig": { userId: 328, entityKey: "NL", salesTeamId: 1 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 5: SERVER CATALOG
  // ═══════════════════════════════════════════════════════════════════════════
  serverCatalog: {
    retailChain: [
      { sku: "PFM-EDGE-NANO",     name: "PFM Edge AI – Nano",     maxStreams: 2,   capex: 1050,  status: "confirmed" },
      { sku: "PFM-EDGE-NX",       name: "PFM Edge AI – NX",       maxStreams: 4,   capex: 2000,  status: "confirmed" },
      { sku: "PFM-EDGE-AGX-ORIN", name: "PFM Edge AI – AGX Orin", maxStreams: 16,  capex: 3750,  status: "confirmed" },
      { sku: "PFM-EDGE-AGX-THOR", name: "PFM Edge AI – AGX Thor", maxStreams: 32,  capex: 6600,  status: "confirmed" }
    ],
    retailProperty: [
      { sku: "PFM-SVR-COMPACT",     name: "PFM Video Analytics Server – Compact",     maxStreams: 10,   capex: 11500, status: "confirmed" },
      { sku: "PFM-SVR-STANDARD",    name: "PFM Video Analytics Server – Standard",    maxStreams: 20,   capex: 16500, status: "confirmed" },
      { sku: "PFM-SVR-PERFORMANCE", name: "PFM Video Analytics Server – Performance", maxStreams: 40,   capex: 29500, status: "confirmed" },
      { sku: "PFM-SVR-ADVANCED",    name: "PFM Video Analytics Server – Advanced",    maxStreams: 80,   capex: 43500, status: "confirmed" },
      { sku: "PFM-SVR-ENTERPRISE",  name: "PFM Video Analytics Server – Enterprise",  maxStreams: 120,  capex: 58500, status: "confirmed" }
    ],
    setupCostPerServer: 750,
    serverMonitoringYearly: 1000,
    warrantyTerms: {
      retailChain: "1 year included",
      retailProperty: "3 years included"
    },
    selectionRule: "Choose smallest server where maxStreams >= required_channels.",
    status: "confirmed"
  },

  processingUnitProducts: {
    lidar_processing_unit: {
      NL: { internal_reference: "PFMNL-PFM/LIDARPU", odoo_product_id: 15284 },
      UK: { internal_reference: "PFMUK-PFM/LIDARPU", odoo_product_id: 11901 },
      DE: { internal_reference: "PFMDE-PFM/LIDARPU", odoo_product_id: null }
    },
    xovis_processing_unit: {
      NL: { internal_reference: "PFMNL-PFM/XOVISPU", odoo_product_id: 12081 },
      UK: { internal_reference: "PFMUK-PFM/XOVISPU", odoo_product_id: 15537 },
      DE: { internal_reference: "PFMDE-PFM/XOVISPU", odoo_product_id: null }
    }
  },

  isarsoftServerProfiles: {
    retailChain: [
      { profile_key: "orin_nano_8gb", gpu: "NVIDIA Jetson Orin Nano 8 GB", system_ram: "8 GB shared", max_streams: 2, odoo_products: {
        NL: { name: "PFM Isarsoft Server - Orin Nano 8GB - RC", internal_reference: "PFMNL-PFM/14387", odoo_product_template_id: 15547, odoo_product_id: 18530 },
        UK: { name: "PFM Isarsoft Server - Orin Nano 8GB - RC", internal_reference: "PFMUK-PFM/14378", odoo_product_template_id: 15538, odoo_product_id: 18521 },
        DE: { name: "PFM Isarsoft Server - Orin Nano 8GB - RC", internal_reference: "PFMDE-PFM/REID2002RC", odoo_product_id: null }
      } },
      { profile_key: "orin_nx_16gb", gpu: "NVIDIA Jetson Orin NX 16 GB", system_ram: "16 GB shared", max_streams: 4, odoo_products: {
        NL: { name: "PFM Isarsoft Server - Orin NX 16GB - RC", internal_reference: "PFMNL-PFM/14388", odoo_product_template_id: 15548, odoo_product_id: 18531 },
        UK: { name: "PFM Isarsoft Server - Orin NX 16GB - RC", internal_reference: "PFMUK-PFM/14379", odoo_product_template_id: 15539, odoo_product_id: 18522 },
        DE: { name: "PFM Isarsoft Server - Orin NX 16GB - RC", internal_reference: "PFMDE-PFM/REID2004RC", odoo_product_id: null }
      } },
      { profile_key: "agx_orin_64gb", gpu: "NVIDIA Jetson AGX Orin 64 GB", system_ram: "64 GB shared", max_streams: 16, odoo_products: {
        NL: { name: "PFM Isarsoft Server - AGX Orin 64GB - RC", internal_reference: "PFMNL-PFM/14389", odoo_product_template_id: 15549, odoo_product_id: 18532 },
        UK: { name: "PFM Isarsoft Server - AGX Orin 64GB - RC", internal_reference: "PFMUK-PFM/14380", odoo_product_template_id: 15540, odoo_product_id: 18523 },
        DE: { name: "PFM Isarsoft Server - AGX Orin 64GB - RC", internal_reference: "PFMDE-PFM/REID2016RC", odoo_product_id: null }
      } },
      { profile_key: "agx_thor_128gb", gpu: "NVIDIA Jetson AGX Thor 128 GB", system_ram: "128 GB shared", max_streams: 32, odoo_products: {
        NL: { name: "PFM Isarsoft Server - AGX Thor 128GB - RC", internal_reference: "PFMNL-PFM/14390", odoo_product_template_id: 15550, odoo_product_id: 18533 },
        UK: { name: "PFM Isarsoft Server - AGX Thor 128GB - RC", internal_reference: "PFMUK-PFM/14381", odoo_product_template_id: 15541, odoo_product_id: 18524 },
        DE: { name: "PFM Isarsoft Server - AGX Thor 128GB - RC", internal_reference: "PFMDE-PFM/REID2032RC", odoo_product_id: null }
      } }
    ],
    retailProperty: [
      { profile_key: "rtx_2000_ada", gpu: "NVIDIA RTX 2000 Ada", system_ram: "32 GB ECC", max_streams: 10, odoo_products: {
        NL: { name: "PFM Isarsoft Server - RTX 2000 Ada - RP", internal_reference: "PFMNL-PFM/14391", odoo_product_template_id: 15551, odoo_product_id: 18534 },
        UK: { name: "PFM Isarsoft Server - RTX 2000 Ada - RP", internal_reference: "PFMUK-PFM/14382", odoo_product_template_id: 15542, odoo_product_id: 18525 },
        DE: { name: "PFM Isarsoft Server - RTX 2000 Ada - RP", internal_reference: "PFMDE-PFM/REID2010RP", odoo_product_id: null }
      } },
      { profile_key: "rtx_4000_ada", gpu: "NVIDIA RTX 4000 Ada", system_ram: "64 GB ECC", max_streams: 20, odoo_products: {
        NL: { name: "PFM Isarsoft Server - RTX 4000 Ada - RP", internal_reference: "PFMNL-PFM/14392", odoo_product_template_id: 15552, odoo_product_id: 18535 },
        UK: { name: "PFM Isarsoft Server - RTX 4000 Ada - RP", internal_reference: "PFMUK-PFM/14383", odoo_product_template_id: 15543, odoo_product_id: 18526 },
        DE: { name: "PFM Isarsoft Server - RTX 4000 Ada - RP", internal_reference: "PFMDE-PFM/REID2020RP", odoo_product_id: null }
      } },
      { profile_key: "dual_rtx_4000_ada", gpu: "2 × NVIDIA RTX 4000 Ada", system_ram: "128 GB ECC", max_streams: 40, odoo_products: {
        NL: { name: "PFM Isarsoft Server - Dual RTX 4000 Ada - RP", internal_reference: "PFMNL-PFM/14393", odoo_product_template_id: 15553, odoo_product_id: 18536 },
        UK: { name: "PFM Isarsoft Server - Dual RTX 4000 Ada - RP", internal_reference: "PFMUK-PFM/14384", odoo_product_template_id: 15544, odoo_product_id: 18527 },
        DE: { name: "PFM Isarsoft Server - Dual RTX 4000 Ada - RP", internal_reference: "PFMDE-PFM/REID2040RP", odoo_product_id: null }
      } },
      { profile_key: "dual_rtx_5000_ada", gpu: "2 × NVIDIA RTX 5000 Ada", system_ram: "192 GB ECC", max_streams: 80, odoo_products: {
        NL: { name: "PFM Isarsoft Server - Dual RTX 5000 Ada - RP", internal_reference: "PFMNL-PFM/14394", odoo_product_template_id: 15554, odoo_product_id: 18537 },
        UK: { name: "PFM Isarsoft Server - Dual RTX 5000 Ada - RP", internal_reference: "PFMUK-PFM/14385", odoo_product_template_id: 15545, odoo_product_id: 18528 },
        DE: { name: "PFM Isarsoft Server - Dual RTX 5000 Ada - RP", internal_reference: "PFMDE-PFM/REID2080RP", odoo_product_id: null }
      } },
      { profile_key: "dual_rtx_6000_ada", gpu: "2 × NVIDIA RTX 6000 Ada", system_ram: "384 GB ECC", max_streams: 120, odoo_products: {
        NL: { name: "PFM Isarsoft Server - Dual RTX 6000 Ada - RP", internal_reference: "PFMNL-PFM/14395", odoo_product_template_id: 15555, odoo_product_id: 18538 },
        UK: { name: "PFM Isarsoft Server - Dual RTX 6000 Ada - RP", internal_reference: "PFMUK-PFM/14386", odoo_product_template_id: 15546, odoo_product_id: 18529 },
        DE: { name: "PFM Isarsoft Server - Dual RTX 6000 Ada - RP", internal_reference: "PFMDE-PFM/REID2120RP", odoo_product_id: null }
      } }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 6: RE-ID ARCHITECTURE RULES
  // ═══════════════════════════════════════════════════════════════════════════
  reId: {
    technologyId: "REID_IP",
    requiresIpCamera: true,
    channelsPerCamera: 1,
    requiresServer: true,
    requiresTechnicalReview: true,
    requiresPrivacyReview: true,
    ipCameraCapex: 450,
    remoteConfigPerCamera: 135,
    triggerCapabilities: ["reId", "dwell", "heatMapping"],
    note: "Enterprise entrance sensor (€2.100) has Re-ID built in. Separate IP cameras only needed for additional coverage points beyond entrance.",
    status: "confirmed"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 7: SENSOR SETUP & INSTALLATION (BASE = NL)
  // NOT subject to volume discount.
  // ═══════════════════════════════════════════════════════════════════════════
  sensorSetup: {
    retailChain: {
      systemSetupPerSensor: 25,
      "3D": {
        physicalInstallationPerSensor: 350,
        remoteConfigPerSensor: 50,
        totalPerSensor: 425,
        note: "25 + 350 + 50 = 425. NL base."
      },
      "IP": {
        physicalInstallationPerCamera: 350,
        remoteConfigPerCamera: 50,
        totalPerCamera: 425,
        note: "25 + 350 + 50 = 425. NL base."
      },
      status: "confirmed"
    },
    retailProperty: {
      systemSetupPerLocation: 1000,
      systemSetupPerSensor: 150,
      "3D": {
        physicalInstallationPerSensor: 350,
        remoteConfigPerSensor: 50,
        totalPerSensor: 550,
        note: "150 + 350 + 50 = 550. Plus €1.000/location."
      },
      "IP": {
        physicalInstallationPerCamera: 350,
        remoteConfigPerCamera: 95,
        totalPerCamera: 595,
        note: "150 + 350 + 95 = 595. Plus €1.000/location."
      },
      status: "confirmed"
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 8: IN-STORE ANALYTICS (Retail Chain only, Enterprise package)
  // Toggle on Impact Model: Lidar vs 3D (PF-L)
  // Items appear as SECTION on same Enterprise quote (not separate template)
  // ═══════════════════════════════════════════════════════════════════════════
  instoreAnalytics: {
    segment: "retailChain",
    requiredPackage: "enterprise",
    addedToSameQuote: true,
    mountingHeightAssumptionMeters: 3.0,
    defaultPilotStores: 1,
    defaultAverageStoreSqm: 150,
    technologies: {
      lidar: {
        technologyId: "INSTORE_LIDAR",
        label: "Lidar",
        capexPerSensorAllIn: 4625,
        sqmCoveragePerSensor: 134,
        monthlyPerSensor: 450,
        serverRequired: true,
        sensorsPerServer: 4,
        serverCapexIncludedInSensorPrice: true,
        calculationRules: {
          sensors: "Math.ceil(sqm / 134)",
          servers: "Math.ceil(sensors / 4)",
          totalCapex: "sensors * 4625",
          totalMonthly: "sensors * 450"
        },
        status: "confirmed"
      },
      "3d": {
        technologyId: "INSTORE_3D",
        label: "3D Sensor (PF-L)",
        capexPerSensorAllIn: 2500,
        sqmCoveragePerSensor: 44,
        monthlyPerSensor: 125,
        serverRequired: false,
        serverThreshold: 10,
        serverMaxSensors: 350,
        serverCapex: 2000,
        serverCapexIncludedInSensorPrice: false,
        calculationRules: {
          sensors: "Math.ceil(sqm / 44)",
          servers: "xovis_sensor_count >= 10 && xovis_sensor_count <= 350 ? 1 : 0",
          totalCapex: "(sensors * 2500) + (xovis_sensor_count >= 10 && xovis_sensor_count <= 350 ? 2000 : 0)",
          totalMonthly: "sensors * 125"
        },
        status: "confirmed"
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 9: RETAIL CHAIN — CAPEX COMPONENTS
  // ═══════════════════════════════════════════════════════════════════════════
  retail: {
    entrancePerformance: {
      sensors: {
        premium: {
          technologyId: "ENTRANCE_3D_PREMIUM",
          label: "Premium 3D Sensor (Xovis)",
          capexPerSensor: 1100,
          packages: ["essential", "professional"],
          note: "Toggle option for Essential/Professional."
        },
        basic: {
          technologyId: "ENTRANCE_3D_BASIC",
          label: "Basic 3D Sensor (Xovis)",
          capexPerSensor: 675,
          packages: ["essential", "professional"],
          note: "Toggle option for Essential/Professional."
        },
        enterprise: {
          technologyId: "ENTRANCE_3D_ENTERPRISE",
          label: "Enterprise 3D Sensor (Xovis Re-ID)",
          capexPerSensor: 2100,
          packages: ["enterprise"],
          reIdCapable: true,
          note: "Fixed sensor for Enterprise. NO toggle. Re-ID built into sensor FOV."
        },
        isarsoft: {
          technologyId: "REID_IP",
          label: "Isarsoft IP camera",
          capexPerSensor: 450,
          packages: ["essential", "professional", "enterprise"],
          reusesExistingNetwork: true,
          note: "Alternative entrance-counting route using Isarsoft analytics. Existing customer camera networks can be reused."
        }
      },
      sensorSelectionRule: "if (entranceSensorType === 'isarsoft') → use Isarsoft IP camera route for the selected package; otherwise enterprise uses the fixed Enterprise 3D sensor and Essential/Professional toggle Premium vs Basic.",
      defaultSensorsPerStore: 1,
      multiEntranceFactor: 1.10,
      sensorCalculation: "Math.ceil(stores * 1.10)",
      status: "confirmed"
    },
    captureRate: {
      technologyId: "CAPTURE_3D",
      capexPerSensor: 450,
      defaultSensorsPerStore: 1,
      status: "confirmed"
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 10: RETAIL PROPERTY — CAPEX COMPONENTS
  // ═══════════════════════════════════════════════════════════════════════════
  retailProperty: {
    mountingHeightAssumptionMeters: 3.5,
    sensors3d: {
      indoorEntrance: {
        essential:    { capex: 1295, demographicsCapable: false },
        professional: { capex: 1650, demographicsCapable: true },
        enterprise:   { capex: 1650, demographicsCapable: true },
        selectionRule: "Package determines sensor price.",
        status: "confirmed"
      },
      outdoorEntrance: {
        capex: 2000,
        allPackages: true,
        status: "confirmed"
      },
      indoorOutdoorSplit: {
        trigger: "User selects 'Partly covered centre' in Context",
        uiBehavior: "Editable outdoor entrance count on Impact Model card; indoor count is derived."
      },
      zoneSensor: {
        essential:    { capex: 1295, demographicsCapable: false },
        professional: { capex: 1650, demographicsCapable: true },
        enterprise:   { capex: 1650, demographicsCapable: true },
        status: "confirmed"
      }
    },
    tenantCapture: {
      directTenantSensor: { capexDefault: 1645, status: "confirmed" },
      corridorMultiTenantSensor: { capexDefault: 2750, tenantEntrancesCoveredPerSensor: 3, status: "confirmed" },
      defaultSelectedTenants: 60,
      averageEntrancesPerTenant: 1
    },
    anpr: {
      technologyId: "ANPR",
      sensorWithAccessoriesCapex: 3500,
      physicalInstallation: 350,
      remoteSetupAndValidation: 110,
      systemSetupPerSensor: 150,
      totalPerSensor: 4110,
      parkingDashboardMonthly: 100,
      status: "confirmed"
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 11: RETAIL PROPERTY — ADDITIONAL SERVICES
  // ═══════════════════════════════════════════════════════════════════════════
  retailPropertyServices: {
    dashboards: {
      centreDashboardMonthly: 125,
      parkingDashboardMonthly: 100,
      portfolioDashboardMonthly: 100
    },
    smartData: {
      geoAppDataYearlyPerAsset: 6000,
      geoAppDataMonthlyPerAsset: 500,
      includedCompetitorLocations: 2,
      extraCompetitorLocationPrice: 500,
      geoSnapshotOneOff: 750,
      status: "confirmed"
    },
    brandAffinity: {
      brandAffinityAddOnYearly: 1000,
      brandAffinityAddOnMonthly: 83.33,
      tenantMixReportOneOff: 500,
      leasingTargetListOneOff: 500,
      categoryGapAnalysisOneOff: 500,
      status: "confirmed"
    },
    eventMarketing: {
      eventMonitorMonthly: 100,
      eventReportOneOff: 750,
      socialMediaIntegrationSetup: 750,
      socialMediaIntegrationMonthly: 100,
      status: "confirmed"
    },
    lvi: {
      setupWorkshopOneOff: 1500,
      dashboardMonthly: 100,
      forecastingLayerMonthly: 100,
      executiveReportingMonthly: 100,
      status: "confirmed"
    },
    leasing: {
      battlecardOneOff: 1000,
      dashboardMonthly: 100,
      status: "confirmed"
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 12: ROUTE PACKAGES (UI LABELS)
  // ═══════════════════════════════════════════════════════════════════════════
  routePackages: {
    essential: {
      name: "Essential",
      headline: "Measure the basics reliably",
      contains: ["Advantage Portal", "Data management", "Footfall", "Portfolio-wide report", "Sensor management", "Remote support"]
    },
    professional: {
      name: "Professional",
      headline: "Understand who visits and what attracts them",
      contains: ["Essential included", "Age / Gender / Group", "Occupancy", "Capture rate"]
    },
    enterprise: {
      name: "Enterprise",
      headline: "Analyse journeys, zones and in-store behaviour",
      contains: ["Professional included", "Re-ID / Dwell", "Heat mapping", "Custom report"]
    }
  },

  // Approved Retail Property leak-to-minimum-package mapping.
  retailPropertyPackageMinimums: {
    centre_baseline: "essential",
    entrance_value: "essential",
    zone_flow: "essential",
    tenant_capture: "professional",
    leasing_evidence: "enterprise",
    catchment_geo: "enterprise",
    brand_affinity: "enterprise",
    parking_mobility: "professional",
    anpr_origin: "professional",
    dwell_cross_shopping: "enterprise",
    visitor_profile: "professional",
    event_marketing: "enterprise",
    asset_health: "enterprise"
  },

  // Initial service-package comparison supplied 2026-08-13. Contract terms
  // remain authoritative; optional items require commercial review.
  packageComparison: {
    status: "indicative_pending_contract_review",
    packages: ["essential", "professional", "enterprise"],
    items: [
      { label: "Data delivery check (daily)", essential: "included", professional: "included", enterprise: "included" },
      { label: "Sensor firmware updates", essential: "included", professional: "included", enterprise: "included" },
      { label: "Sensor online/offline status", essential: "included", professional: "included", enterprise: "included" },
      { label: "Operational and patch management including reporting", essential: "not_included", professional: "included", enterprise: "included" },
      { label: "Proactive data/systems monitoring", essential: "not_included", professional: "not_included", enterprise: "included" },
      { label: "7/7 dedicated data management", essential: "not_included", professional: "not_included", enterprise: "included" },
      { label: "All-inclusive hardware warranty for the term", essential: "not_included", professional: "included", enterprise: "included" },
      { label: "All service visits included", essential: "not_included", professional: "included", enterprise: "included" },
      { label: "Annual remote validation (audit and accuracy report)", essential: "not_included", professional: "included", enterprise: "included" },
      { label: "All access vehicles and HLA included", essential: "not_included", professional: "not_included", enterprise: "included" },
      { label: "Unlimited support calls/tickets", essential: "included", professional: "included", enterprise: "included" },
      { label: "PFM self-service dashboard", essential: "not_included", professional: "not_included", enterprise: "included" },
      { label: "PFM hardware performance report", essential: "not_included", professional: "not_included", enterprise: "included" },
      { label: "Dedicated service delivery manager reporting/meetings", essential: "not_included", professional: "not_included", enterprise: "included" },
      { label: "Response time: three working days", essential: "included", professional: "not_included", enterprise: "not_included" },
      { label: "Response time: eight hours during working days", essential: "not_included", professional: "included", enterprise: "not_included" },
      { label: "Response time: one hour during working days", essential: "not_included", professional: "not_included", enterprise: "included" },
      { label: "Call-to-fix duration: six working days", essential: "included", professional: "not_included", enterprise: "not_included" },
      { label: "Call-to-fix duration: four working days", essential: "not_included", professional: "included", enterprise: "not_included" },
      { label: "Call-to-fix duration: two working days", essential: "not_included", professional: "not_included", enterprise: "included" },
      { label: "PFM App Pulse", essential: "optional", professional: "optional", enterprise: "optional" },
      { label: "Customer-specific service requirements", essential: "optional", professional: "optional", enterprise: "optional" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 13: REVIEW GATES
  // ═══════════════════════════════════════════════════════════════════════════
  reviewGates: {
    technicalDesignReview: {
      triggers: ["reId", "dwell", "heatMapping", "instoreAnalytics"]
    },
    privacyReview: {
      triggers: ["reId", "dwell", "age", "gender"]
    },
    commercialReview: {
      triggers: ["serverCapacityExceeded", "mixedTierPricing", "customScope"]
    },
    manualApproval: { always: true }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 14: LEGACY (DEPRECATED — DO NOT USE)
  // ═══════════════════════════════════════════════════════════════════════════
  legacy: {
    deprecated: true,
    warning: "Pre-package model (v29). For reference only.",
    modules: {
      genderMonthlyPerSensor: 5,
      adultChildMonthlyPerSensor: 5,
      groupMonthlyPerSensor: 5,
      captureRateMonthlyPerStore: 10,
      instoreJourneyMonthlyPerSensor: 125,
      entranceMonthlyPerStore: 21,
      sensorMonthlyPerSensor3d: 16.5,
      tenantCaptureMonthlyPerSensor: 10
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 15: VOLUME DISCOUNT (Staffelkorting)
  // ═══════════════════════════════════════════════════════════════════════════
  volumeDiscount: {
    retailChain: {
      basis: "stores",
      capex: {
        tiers: [
          { min: 1,   max: 9,    discount: 0.00 },
          { min: 10,  max: 29,   discount: 0.10 },
          { min: 30,  max: 99,   discount: 0.14 },
          { min: 100, max: null, discount: 0.18 }
        ],
        appliesTo: ["entrance_sensor_capex", "capture_sensor_capex"],
        excludes: ["setup_costs", "server_capex", "instore_capex"]
      },
      opex: {
        tiers: [
          { min: 1,   max: 9,    discount: 0.00 },
          { min: 10,  max: 29,   discount: 0.05 },
          { min: 30,  max: 99,   discount: 0.08 },
          { min: 100, max: null, discount: 0.12 }
        ],
        appliesTo: ["monthly_subscription"]
      }
    },
    retailProperty: {
      basis: "sensors",
      capex: {
        tiers: [
          { min: 1,   max: 9,    discount: 0.00 },
          { min: 10,  max: 29,   discount: 0.05 },
          { min: 30,  max: 99,   discount: 0.10 },
          { min: 100, max: null, discount: 0.14 }
        ],
        appliesTo: ["entrance_sensor_capex", "zone_sensor_capex", "tenant_capture_sensor_capex"],
        excludes: ["setup_costs", "server_capex", "anpr_capex"]
      },
      opex: {
        tiers: [
          { min: 1,   max: 9,    discount: 0.00 },
          { min: 10,  max: 29,   discount: 0.05 },
          { min: 30,  max: 99,   discount: 0.08 },
          { min: 100, max: null, discount: 0.12 }
        ],
        appliesTo: ["monthly_subscription"]
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 16: COUNTRY OVERRIDES
  // ═══════════════════════════════════════════════════════════════════════════
  countryOverrides: {
    NL: {
      countryId: "NL",
      currency: "EUR",
      currencySymbol: "\u20ac",
      label: "Netherlands",
      overrides: null
    },
    DE: {
      countryId: "DE",
      currency: "EUR",
      currencySymbol: "\u20ac",
      label: "Germany",
      overrides: {
        sensorSetup: {
          retailChain: {
            systemSetupPerSensor: 25,
            "3D": { physicalInstallationPerSensor: 650, remoteConfigPerSensor: 50, totalPerSensor: 725 },
            "IP": { physicalInstallationPerCamera: 650, remoteConfigPerCamera: 50, totalPerCamera: 725 }
          },
          retailProperty: {
            systemSetupPerLocation: 1000,
            systemSetupPerSensor: 150,
            "3D": { physicalInstallationPerSensor: 650, remoteConfigPerSensor: 50, totalPerSensor: 850 },
            "IP": { physicalInstallationPerCamera: 650, remoteConfigPerCamera: 95, totalPerCamera: 895 }
          }
        }
      }
    },
    FR: {
      countryId: "FR",
      currency: "EUR",
      currencySymbol: "\u20ac",
      label: "France",
      overrides: {
        sensorSetup: {
          retailChain: {
            systemSetupPerSensor: 25,
            "3D": { physicalInstallationPerSensor: 450, remoteConfigPerSensor: 50, totalPerSensor: 525 },
            "IP": { physicalInstallationPerCamera: 450, remoteConfigPerCamera: 50, totalPerCamera: 525 }
          },
          retailProperty: {
            systemSetupPerLocation: 1000,
            systemSetupPerSensor: 150,
            "3D": { physicalInstallationPerSensor: 450, remoteConfigPerSensor: 50, totalPerSensor: 650 },
            "IP": { physicalInstallationPerCamera: 450, remoteConfigPerCamera: 95, totalPerCamera: 695 }
          }
        }
      }
    },
    UK: {
      countryId: "UK",
      currency: "GBP",
      currencySymbol: "\u00a3",
      label: "United Kingdom",
      overrides: {
        sensorSetup: {
          retailChain: {
            systemSetupPerSensor: 25,
            "3D": { physicalInstallationPerSensor: 365, remoteConfigPerSensor: 50, totalPerSensor: 440 },
            "IP": { physicalInstallationPerCamera: 365, remoteConfigPerCamera: 50, totalPerCamera: 440 }
          },
          retailProperty: {
            systemSetupPerLocation: 1000,
            systemSetupPerSensor: 150,
            "3D": { physicalInstallationPerSensor: 365, remoteConfigPerSensor: 50, totalPerSensor: 565 },
            "IP": { physicalInstallationPerCamera: 365, remoteConfigPerCamera: 95, totalPerCamera: 610 }
          }
        }
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 17: EXCHANGE RATE (ECB)
  // ═══════════════════════════════════════════════════════════════════════════
  exchangeRate: {
    provider: "European Central Bank (ECB)",
    jsonUrl: "https://data-api.ecb.europa.eu/service/data/EXR/D.GBP.EUR.SP00.A?format=jsondata&lastNObservations=1",
    fallbackRate: 0.845,
    behavior: {
      fetchOn: "page_load",
      cacheIn: "sessionStorage",
      cacheKey: "pfm_ecb_gbp_rate",
      maxAgeMinutes: 480,
      onError: "use_fallback_rate_and_show_disclaimer"
    },
    displayRules: {
      rounding: 0,
      disclaimer: "Exchange rate: ECB reference rate as of [date]. Final invoice in EUR."
    }
  }
};
