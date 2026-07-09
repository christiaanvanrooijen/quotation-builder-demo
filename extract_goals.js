const retailGoals = {
      baseline_missing: {
        icon: "🧱",
        title: "We do not have a trusted performance baseline",
        pain: "We know sales or transactions, but we do not know how many people actually entered, which makes store performance hard to judge.",
        outcome: "Create a reliable baseline for footfall, conversion and store potential across every location.",
        insightFit: "Trusted Footfall & Conversion Baseline",
        proof: "Seen in Wibra, PassaSports, Telenet and smaller retailers: existing counters are minimal, old, lazy or missing, while transaction data alone cannot explain opportunity.",
        hiddenKpis: ["footfall", "count_in", "count_out", "transactions", "conversion_rate", "data_quality", "sensor_uptime"],
        hiddenSubscriptions: ["sub_footfall_core", "sub_sensor_monitoring", "sub_data_quality", "sub_sales_conversion"],
        questions: ["Do you know how many visitors you need to create today’s sales?", "Is the data trusted enough to compare stores?", "Can store teams see the same truth as head office?"]
      },
      visitors_not_buying: {
        icon: "📈",
        title: "We have visitors, but not enough buyers",
        pain: "Traffic is visible, but the moment, store or reason for conversion leakage is still unclear.",
        outcome: "Identify which stores, days and hours have enough visitors but miss sales potential.",
        insightFit: "Conversion Leak Intelligence",
        proof: "Recurring pattern in sales calls: retailers want to connect footfall with transactions, conversion, ATV and sales per visitor instead of only counting people.",
        hiddenKpis: ["footfall", "transactions", "conversion_rate", "sales_per_visitor", "atv", "conversion_by_hour"],
        hiddenSubscriptions: ["sub_footfall_core", "sub_sales_conversion", "sub_performance_dashboard", "sub_hourly_conversion"],
        questions: ["Which stores have good traffic but weak sales?", "When does conversion drop?", "Can teams see what to improve next week?"]
      },
      street_vs_store: {
        icon: "🎯",
        title: "We do not know if the problem is the street or the store",
        pain: "When visits drop, teams debate whether the street is quieter or the store has lost attraction power.",
        outcome: "Separate external traffic decline from storefront attraction and calculate capture rate by day, week and campaign.",
        insightFit: "Capture Rate & Street Potential Intelligence",
        proof: "Mr Marvis, Essentials and LAGAAM all raised the need to compare passers-by with store visitors to understand attraction, window impact and real location potential.",
        hiddenKpis: ["passerby_traffic", "capture_rate", "footfall", "weather_context", "campaign_uplift", "street_trend"],
        hiddenSubscriptions: ["sub_passerby_measurement", "sub_capture_rate", "sub_external_context", "sub_marketing_insights"],
        questions: ["Are fewer people entering because the street is quieter?", "Is the window or facade pulling enough people in?", "Can marketing prove it increased store visits?"]
      },
      groups_distort_conversion: {
        icon: "👨‍👩‍👧",
        title: "Families and groups make conversion look worse than it is",
        pain: "A store can look underperforming when many visitors come in as families, friends or groups where only one person is likely to buy.",
        outcome: "Add buying-unit context so conversion discussions become fairer and more useful for store teams.",
        insightFit: "Buying Unit Conversion Context",
        proof: "This came up strongly in conversations around weekend traffic, families, tourists, school groups and group entry patterns.",
        hiddenKpis: ["individual_footfall", "buying_units", "group_size", "group_count", "adult_child_split", "family_share", "conversion_rate", "conversion_per_buying_unit"],
        hiddenSubscriptions: ["sub_buying_units", "sub_group_counting", "sub_adult_child", "sub_demographic_context", "sub_sales_conversion"],
        questions: ["Do weekend numbers punish stores with family traffic?", "Are you measuring people or real buying opportunities?", "Can store managers explain conversion with context?"]
      },
      visitor_profile_unknown: {
        icon: "🧬",
        title: "We do not know who is entering our stores",
        pain: "Footfall shows how many people enter, but not whether the visitor mix is changing by gender, adults, children, families, groups or later age categories.",
        outcome: "Activate visitor profile datasets so teams can understand who visits, when the mix changes and which stores attract the right audience.",
        insightFit: "Visitor Profile & Demographic Intelligence",
        proof: "Retail conversations increasingly move beyond count-in/count-out: customers ask for gender, kids versus adults, family/group context and later age categories to understand real buying potential and audience fit.",
        hiddenKpis: ["gender_split", "adult_child_split", "age_category_future", "group_count", "family_share", "visitor_profile_by_store", "visitor_profile_by_period"],
        hiddenSubscriptions: ["sub_demographics_gender", "sub_adult_child", "sub_age_future", "sub_group_counting", "sub_visitor_profile_dashboard"],
        questions: ["Do you know if the right audience is entering?", "Does the visitor mix differ by store, day or campaign?", "Are families and groups changing the real buying opportunity?"]
      },
      stores_hard_to_compare: {
        icon: "⚖️",
        title: "Stores are compared unfairly",
        pain: "City stores, destination stores, retail parks, tourist locations and flagships are often compared as if they operate under the same conditions.",
        outcome: "Create fair peer groups and reveal real underperformance, hidden potential and benchmark gaps.",
        insightFit: "Portfolio Benchmark Intelligence",
        proof: "Rituals and Mr Marvis both show the need to compare stores by type, context, traffic profile and location potential instead of raw totals alone.",
        hiddenKpis: ["store_type", "sqm", "footfall", "conversion_rate", "sales_per_visitor", "benchmark_index", "peer_group"],
        hiddenSubscriptions: ["sub_portfolio_dashboard", "sub_benchmarking", "sub_store_type_analysis", "sub_region_dashboard"],
        questions: ["Do you compare stores by type, size and context?", "Which locations deserve attention first?", "Can regional managers explain performance differences?"]
      },
      staffing_feels_reactive: {
        icon: "👥",
        title: "Staff planning and service moments are based too much on feeling",
        pain: "Busy moments are obvious afterwards, but service capacity should be planned before the commercial opportunity is missed.",
        outcome: "Match staffing, service focus and store routines to real visitor demand, peaks, dead hours and conversion gaps.",
        insightFit: "Store Operations & Service Intelligence",
        proof: "Multiple conversations link footfall to staffing, service levels, missed opportunity hours and whether employees have enough time to convert visitors.",
        hiddenKpis: ["hourly_footfall", "peak_hours", "dead_hours", "conversion_by_hour", "staff_interaction", "service_wait_time"],
        hiddenSubscriptions: ["sub_operations_insights", "sub_weekly_reporting", "sub_dead_hour_analysis", "sub_service_interaction"],
        questions: ["Which hours are busy but commercially weak?", "Are schedules based on real demand?", "Where can service levels improve without guessing?"]
      },
      entrance_bounce: {
        icon: "🚪",
        title: "People step in, hesitate and leave again",
        pain: "Some visitors cross the threshold, browse the entrance area, see friction such as stairs or layout, and leave before they become a real sales opportunity.",
        outcome: "Measure entrance engagement and bounce so teams know whether the first metres of the store create or lose potential.",
        insightFit: "Entrance Engagement & Bounce Intelligence",
        proof: "Essentials showed a very concrete leak: people enter, pause near the entrance, see the stairs or first display, and walk out again.",
        hiddenKpis: ["entrance_detection", "entry_bounce", "threshold_to_store_ratio", "front_zone_dwell", "first_zone_conversion"],
        hiddenSubscriptions: ["sub_entrance_engagement", "sub_zone_analytics", "sub_store_layout_insights"],
        questions: ["Do people actually enter the store or only the doorway?", "Where should the visitor become a counted opportunity?", "Does the first zone help or block conversion?"]
      },
      instore_unknown: {
        icon: "🧭",
        title: "We do not know what happens after people enter",
        pain: "The store may be busy, but teams cannot see where people go, what they skip, where they dwell or which category loses attention.",
        outcome: "Use zone, journey, heatmap and dwell insights to improve layout, category exposure and flagship learnings.",
        insightFit: "In-store Journey & Category Intelligence",
        proof: "George / D'HYÈRES wanted to compare gold versus silver sections; PassaSports asked about heatmapping and assortment; Telenet and Dreamland explored in-store analytics as a next stage.",
        hiddenKpis: ["zone_traffic", "dwell_time", "heatmap", "product_category_exposure", "route_flow", "interaction_time"],
        hiddenSubscriptions: ["sub_zone_analytics", "sub_journey_tracking", "sub_heatmap", "sub_category_performance"],
        questions: ["Which areas attract traffic but do not convert?", "Does layout or product category explain performance?", "Which flagship learnings should shape future stores?"]
      },
      expansion_gut_feel: {
        icon: "📍",
        title: "Expansion decisions still rely too much on gut feel",
        pain: "Retail teams often choose cities or streets because they feel right, without knowing if the audience, traffic and location potential match the brand.",
        outcome: "Support expansion, relocation and lease discussions with location potential, catchment and street-performance context.",
        insightFit: "Location Potential & Expansion Intelligence",
        proof: "Mr Marvis described expansion decisions using some data but also gut feeling and brand fit; the conversation moved directly to using data for future store decisions.",
        hiddenKpis: ["location_potential", "catchment_profile", "brand_affinity", "street_traffic", "capture_rate", "rent_vs_potential"],
        hiddenSubscriptions: ["sub_location_strategy", "sub_external_context", "sub_catchment_analysis", "sub_passerby_measurement"],
        questions: ["Is this street right for your customer profile?", "Do you know expected traffic before signing?", "Should you open, optimise or move?"]
      },
      data_not_activated: {
        icon: "🏆",
        title: "The data exists, but teams do not act on it enough",
        pain: "Dashboards alone do not change behaviour. Store and regional teams need simple action triggers, rhythm and motivation.",
        outcome: "Turn performance data into weekly action, store leagues, management focus and measurable improvement.",
        insightFit: "Retail Activation & Action Layer",
        proof: "Rituals discussed gamification, leagues and weekly sharing to increase engagement; Dreamland explicitly searched for a knowledge partner that helps them understand what to do with the data.",
        hiddenKpis: ["weekly_action_points", "store_ranking", "conversion_delta", "league_score", "opportunity_score", "priority_driver"],
        hiddenSubscriptions: ["sub_ai_recommendations", "sub_weekly_action_layer", "sub_gamification", "sub_customer_success"],
        questions: ["Do store teams know what to do next week?", "Can regional managers prioritise action?", "How do you keep performance improvement top of mind?"]
      }
    };


    const shoppingGoals = {
      centre_baseline: {
        icon: "🏛️",
        cluster: "Centre baseline",
        title: "We cannot prove how the centre is performing over time",
        pain: "The centre feels busy or quiet, but owners, tenants and investors need objective proof of traffic trends, peaks and benchmark context.",
        outcome: "Create a trusted centre baseline for visits, entrance contribution, peak moments and comparable performance over time.",
        insightFit: "Centre Performance Baseline",
        proof: "Seen in shopping centre conversations: owners need clear monthly/yearly traffic proof for tenants, investors, municipalities and internal stakeholders.",
        hiddenKpis: ["centre_footfall", "entrance_traffic", "centre_traffic_index", "peak_day", "peak_hour", "benchmark_index", "year_on_year_growth", "month_on_month_growth", "weather_context", "event_context"],
        hiddenSubscriptions: ["mod_entrance_counting", "mod_centre_dashboard", "mod_benchmark_reporting", "mod_data_validation_service"],
        questions: ["Can you prove whether the centre is growing or declining?", "Can you benchmark against similar centres?", "Do tenants trust the numbers?"],
        modules: ["Entrance Counting", "Centre Dashboard", "Benchmark Reporting"]
      },
      entrance_value: {
        icon: "🚪",
        cluster: "Centre baseline",
        title: "We do not know which entrances actually drive value",
        pain: "Total centre traffic is useful, but it does not explain which entrances, access points or floors are becoming stronger or weaker.",
        outcome: "Reveal the contribution, trend and anomalies of every entrance or access point.",
        insightFit: "Entrance Performance Intelligence",
        proof: "Shopping centre setups often require all public access routes to be sealed: main entrances, parking entrances, upper/lower levels and anchor entrances.",
        hiddenKpis: ["entrance_count", "entrance_share", "entrance_trend", "in_out_balance", "access_point_index", "entrance_anomaly"],
        hiddenSubscriptions: ["mod_3d_entrance_sensors", "mod_entrance_dashboard", "mod_data_quality_monitoring"],
        questions: ["Which entrance contributes most to centre visits?", "Did roadworks, parking or tenant changes shift traffic?", "Which access point underperforms?"],
        modules: ["3D Entrance Sensors", "Entrance Performance Dashboard"]
      },
      zone_flow: {
        icon: "🧭",
        cluster: "Flow & engagement",
        title: "Visitors enter the centre, but we do not know where they go",
        pain: "Entrance counts show how many people arrive, but not whether visitors reach floors, corridors, toilets, F&B zones, anchors or weaker areas.",
        outcome: "Understand zone traffic, corridor flows, floor distribution and facility usage across the centre.",
        insightFit: "Zone Flow Intelligence",
        proof: "Centre managers increasingly ask for zone, passage and floor data to explain why certain areas or upper levels attract less traffic.",
        hiddenKpis: ["zone_traffic", "floor_traffic", "corridor_flow", "facility_usage", "toilet_zone_traffic", "anchor_zone_traffic", "zone_share", "zone_conversion_proxy"],
        hiddenSubscriptions: ["mod_zone_counting", "mod_floor_flow_dashboard", "mod_facility_flow_analytics"],
        questions: ["Do visitors reach every floor?", "Which corridors are underused?", "Do facilities and anchors pull traffic?"],
        modules: ["Zone Counting", "Floor Flow Dashboard", "Facility Analytics"]
      },
      tenant_capture: {
        icon: "🛍️",
        cluster: "Tenant & leasing value",
        title: "We cannot prove tenant value or tenant capture",
        pain: "Centre traffic is visible, but it is unclear which tenants capture mall traffic and which units underperform despite strong flow.",
        outcome: "Show tenant visits, tenant capture, traffic in front of stores and category performance.",
        insightFit: "Tenant Capture Intelligence",
        proof: "For outlet and shopping centre portfolios, tenant capture ratio, gross/net capture and retailer-level performance are key leasing and asset management metrics.",
        hiddenKpis: ["tenant_traffic", "tenant_capture_rate", "gross_capture_rate", "net_capture_rate", "traffic_in_front_of_store", "tenant_visit_share", "category_capture", "top_tenant_performers", "bottom_tenant_performers"],
        hiddenSubscriptions: ["mod_tenant_counting", "mod_mall_to_tenant_capture", "mod_tenant_dashboard", "mod_category_benchmarking"],
        questions: ["Which tenants turn mall traffic into store visits?", "Where is traffic strong but tenant capture weak?", "Can leasing prove unit value?"],
        modules: ["Tenant Counting", "Capture Analytics", "Category Benchmarking"]
      },
      leasing_evidence: {
        icon: "📍",
        cluster: "Tenant & leasing value",
        title: "Leasing conversations are still based too much on opinion",
        pain: "When a unit is vacant or rent is challenged, leasing needs evidence about flow, unit position, brand fit and catchment potential.",
        outcome: "Create leasing evidence with unit heatmaps, flow scores, brand affinity and tenant-mix opportunities.",
        insightFit: "Leasing Evidence & Unit Value Intelligence",
        proof: "Retail park and centre owners want to show potential tenants why a specific unit, zone or boulevard position is attractive.",
        hiddenKpis: ["unit_flow_score", "zone_heatmap", "tenant_mix_gap", "brand_affinity", "leasing_potential", "category_gap", "unit_visibility_score"],
        hiddenSubscriptions: ["mod_smart_data", "mod_brand_affinity", "mod_leasing_battlecard", "mod_unit_heatmap_layer"],
        questions: ["Can we prove this unit has strong traffic?", "Which tenant category is missing?", "Which brands fit this catchment?"],
        modules: ["Smart Data", "Brand Affinity", "Leasing Battlecard"]
      },
      catchment_geo: {
        icon: "🗺️",
        cluster: "Catchment & marketing",
        title: "We do not know where visitors come from or how our catchment is changing",
        pain: "The centre needs better insight into visitor origin, postcode areas, competitor overlap, visit frequency and household profiles.",
        outcome: "Map catchment, visitor origin, cross-visitation and geo-marketing battlegrounds using geo-app data.",
        insightFit: "Catchment & Geo App Intelligence",
        proof: "Geo-app data can enrich sensor counts with catchment, postcode, competitor and visitor-profile insights; it is a data service, not extra counting hardware.",
        hiddenKpis: ["catchment_area", "visitor_origin", "postcode_penetration", "city_origin", "visit_frequency", "cross_visitation", "competitor_overlap", "household_profile", "income_profile", "geo_marketing_area"],
        hiddenSubscriptions: ["mod_geo_app_data", "mod_catchment_dashboard", "mod_competitor_battlecard", "mod_geo_marketing_insights"],
        questions: ["Where do visitors come from?", "Which competitors share our audience?", "Where should marketing focus?"],
        modules: ["Geo App Data", "Catchment Dashboard", "Competitor Battlecard"]
      },
      brand_affinity: {
        icon: "🏷️",
        cluster: "Tenant & leasing value",
        title: "We do not know which brands our visitors already love",
        pain: "Tenant mix decisions are harder when you cannot see which brands your visitors visit elsewhere or which categories are missing.",
        outcome: "Use brand affinity, category gaps and competitor pull to create a data-backed leasing target list.",
        insightFit: "Brand Affinity & Tenant Mix Intelligence",
        proof: "Brand affinity can help identify brands or categories that your catchment already visits elsewhere but that are missing in your asset.",
        hiddenKpis: ["brand_affinity", "brand_penetration", "missing_brand_opportunity", "category_affinity", "tenant_mix_score", "competitor_brand_pull", "leasing_target_score"],
        hiddenSubscriptions: ["mod_brand_affinity_data", "mod_tenant_mix_analysis", "mod_leasing_intelligence", "mod_smart_data_dashboard"],
        questions: ["Which brands have high affinity in our catchment?", "Which categories are missing?", "Can we support tenant acquisition with data?"],
        modules: ["Brand Affinity Data", "Tenant Mix Analysis", "Leasing Intelligence"]
      },
      parking_mobility: {
        icon: "🚗",
        cluster: "Parking & mobility",
        title: "We cannot explain parking pressure and mobility patterns",
        pain: "Parking feels busy, but teams cannot prove occupancy, dwell time, peak pressure or unused capacity.",
        outcome: "Measure car counts, vehicle dwell time, parking occupancy and mobility patterns across access points.",
        insightFit: "Parking & Mobility Intelligence",
        proof: "For retail parks and centres with parking access, ANPR and car counting can reveal visits, dwell time, occupancy and space utilisation.",
        hiddenKpis: ["car_count_in", "car_count_out", "parking_occupancy", "vehicle_dwell_time", "parking_peak_pressure", "parking_capacity_utilisation", "parking_space_potential", "mobility_index"],
        hiddenSubscriptions: ["mod_anpr_counting", "mod_car_park_dashboard", "mod_vehicle_dwell", "mod_mobility_layer"],
        questions: ["When is parking actually full?", "How long do cars stay?", "Is there unused capacity for EV, kiosks or other uses?"],
        modules: ["ANPR Counting", "Parking Occupancy", "Vehicle Dwell"]
      },
      anpr_origin: {
        icon: "🌍",
        cluster: "Parking & mobility",
        title: "We do not know enough about international visitors and car origin",
        pain: "Cross-border assets need to understand where cars come from and how visitor origin changes by period or campaign.",
        outcome: "Show vehicle country/region origin, international share and dwell time by visitor group where legally available.",
        insightFit: "ANPR Origin Intelligence",
        proof: "ANPR origin analytics is relevant for centres and retail parks with visitors from multiple countries or regions.",
        hiddenKpis: ["vehicle_origin_country", "vehicle_origin_region", "international_share", "vehicle_dwell_time", "cross_border_visitation", "car_origin_mix"],
        hiddenSubscriptions: ["mod_anpr_origin", "mod_vehicle_dwell_dashboard", "mod_cross_border_reporting"],
        questions: ["What share of cars comes from other countries?", "Which regions matter most?", "Does international traffic change over time?"],
        modules: ["ANPR Origin Analytics", "Cross-border Reporting"]
      },
      dwell_cross_shopping: {
        icon: "🔁",
        cluster: "Flow & engagement",
        title: "We cannot measure dwell time and cross-shopping properly",
        pain: "The centre needs to understand whether visitors stay longer, visit multiple tenants, pass through or return later.",
        outcome: "Estimate dwell time, shops per visit, cross-shopping and visit frequency using the right mix of sensors, smart data and feasibility review.",
        insightFit: "Dwell Time & Cross-Shopping Intelligence",
        proof: "Re-ID and cross-shopping can be valuable, but should be positioned as advanced and subject to feasibility, privacy and DPIA review.",
        hiddenKpis: ["dwell_time", "shops_per_visit", "cross_shopping_index", "repeat_visit_frequency", "visitor_engagement", "re_id_feasibility", "journey_depth"],
        hiddenSubscriptions: ["mod_reid_feasibility", "mod_dwell_time", "mod_cross_shopping", "mod_smart_data_frequency"],
        questions: ["Do visitors stay long enough?", "Do they visit multiple tenants?", "Is Re-ID feasible and privacy-safe for this asset?"],
        modules: ["Re-ID Feasibility", "Dwell Analytics", "Cross-Shopping Analysis"]
      },
      visitor_profile: {
        icon: "👨‍👩‍👧",
        cluster: "Flow & engagement",
        title: "We do not understand visitor demographics well enough",
        pain: "Visitor numbers are visible, but the mix of adults, children, families and gender patterns is not yet part of the asset story.",
        outcome: "Activate visitor profile datasets on suitable 3D sensors to understand adult/child split, gender and later age categories.",
        insightFit: "Visitor Profile Intelligence",
        proof: "3D sensor datasets can add gender and adult/child indicators at entrances; age can be considered later when reliable and appropriate.",
        hiddenKpis: ["gender_split", "adult_child_split", "family_share", "group_count", "visitor_profile_by_entrance", "demographic_trend", "age_category_future"],
        hiddenSubscriptions: ["mod_3d_sensor_demographics", "mod_visitor_profile_dashboard", "mod_family_group_analytics"],
        questions: ["Is the centre attracting families?", "Does visitor profile differ by entrance or event?", "Which demographics respond to campaigns?"],
        modules: ["3D Demographics Add-on", "Visitor Profile Dashboard"]
      },
      event_marketing: {
        icon: "📣",
        cluster: "Catchment & marketing",
        title: "We cannot connect events, marketing and offline visits",
        pain: "Events and campaigns cost money, but offline impact is often hard to prove in visitor traffic and catchment response.",
        outcome: "Measure event uplift, campaign response, social/online signals and offline visits in one view.",
        insightFit: "Event & Marketing Impact Intelligence",
        proof: "Centre teams need evidence that events, roadworks, campaigns or seasonal activations changed visits, not just impressions.",
        hiddenKpis: ["event_uplift", "campaign_traffic_uplift", "social_engagement", "offline_visit_response", "event_roi", "marketing_effect_index", "weather_adjusted_traffic"],
        hiddenSubscriptions: ["mod_event_monitor", "mod_marketing_impact", "mod_geo_campaign_analysis", "mod_weather_event_context"],
        questions: ["Did the event increase visits?", "Which areas responded to marketing?", "Can we prove offline impact?"],
        modules: ["Event Monitor", "Marketing Impact", "Geo Campaign Analysis"]
      },
      asset_health: {
        icon: "📊",
        cluster: "Portfolio control",
        title: "Portfolio and asset teams cannot compare centres fairly",
        pain: "Multiple centres and retail parks need one comparable view of asset health, trend, forecast and performance drivers.",
        outcome: "Create an asset health score or Location Vitality Index to compare centres over time and identify what drives performance.",
        insightFit: "Location Vitality Index / Asset Health Intelligence",
        proof: "For portfolios, an all-in-one index can combine footfall, dwell time, car park occupancy, catchment and other factors into one comparable asset score.",
        hiddenKpis: ["location_vitality_index", "asset_health_score", "portfolio_rank", "benchmark_score", "forecast_trend", "driver_breakdown", "footfall_benchmark", "dwell_time_score", "mobility_score", "catchment_score"],
        hiddenSubscriptions: ["mod_lvi_asset_health", "mod_portfolio_dashboard", "mod_forecasting", "mod_executive_reporting"],
        questions: ["Which centres are improving or declining?", "Which driver explains the score?", "Can asset teams compare apples-to-apples?"],
        modules: ["LVI / Asset Health Index", "Portfolio Dashboard", "Forecasting"]
      }
    };

    const packages = {
      starter: {
        name: "Essential",
        headline: "Measure the basics reliably",
        promise: "For retailers that first need a trusted baseline for store traffic and conversion potential.",
        contains: ["Advantage Portal", "Data management", "Footfall", "Portfolio-wide report", "Sensor management", "Remote support", "Conversion rate"],
        odooKey: "essential"
      },
      performance: {
        name: "Professional",
        headline: "Understand who visits and what attracts them",
        promise: "For retailers that want visitor profile insights, capture-rate context and richer performance explanation.",
        contains: ["Essential included", "Age / gender / group options", "Occupancy", "Capture rate"],
        odooKey: "professional"
      },
      intelligence: {
        name: "Enterprise",
        headline: "Analyse journeys, zones and in-store behaviour",
        promise: "For retailers that want in-store analytics, zoning, dwell, Re-ID feasibility or advanced reporting.",
        contains: ["Professional included", "Re-ID / dwell", "Heat mapping", "Sales-data conversion report"],
        odooKey: "enterprise"
      }
    };

    
console.log(JSON.stringify({retailGoals, shoppingGoals, packages}, null, 2));