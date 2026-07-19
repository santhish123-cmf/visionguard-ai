// AI-Based Machine Part Defect Detection and Maintenance System - Shared Database
const DEFECT_DATA = {
  // Preset Library of Machine Parts for Scanner Simulation
  parts: [
    {
      id: "gear_defective",
      name: "Drive Shaft Gear (Spur)",
      category: "Gears",
      image: "media/gear_defective.jpg",
      status: "Critical",
      defects: [
        {
          id: "def_001",
          type: "Structural Crack",
          severity: "Critical",
          confidence: 96.4,
          box: { x: 380, y: 180, width: 220, height: 280 }, // Dynamic box on 1000x1000 base
          details: "Micro-fracture detected propagating from the root circle of Tooth #14 through to the rim. Risk of tooth shear."
        },
        {
          id: "def_002",
          type: "Surface Wear",
          severity: "Medium",
          confidence: 84.1,
          box: { x: 200, y: 550, width: 150, height: 150 },
          details: "Scuffing and adhesive wear on active profile faces of flank teeth #22-#25."
        }
      ],
      recommendations: {
        urgency: "Immediate Replacement Required",
        urgencyCode: "CRITICAL", // CRITICAL, WARNING, HEALTHY
        rul: "12 Operating Hours", // Remaining Useful Life
        actions: [
          "Halt drive line transmission immediately to prevent catastrophic gearbox lockup.",
          "Perform Lockout/Tagout (LOTO) on Main Panel B-4.",
          "Drain lubrication oil and inspect for metallic debris/filings.",
          "Replace Spur Gear with matching part (Part No. SG-88402)."
        ],
        safety: "Wear protective thermal gloves. Gear assembly may be hot. Ensure LOTO is fully verified.",
        tools: ["Hydraulic Gear Puller (10-Ton)", "Torque Wrench (Range 50-300 Nm)", "Socket Set (24mm, 32mm)", "Debris Magnetic Probe"],
        spareId: "part_sg_88402"
      }
    },
    {
      id: "bearing_defective",
      name: "Main Shaft Roller Bearing",
      category: "Bearings",
      image: "media/bearing_defective.jpg",
      status: "Warning",
      defects: [
        {
          id: "def_003",
          type: "Race Spalling",
          severity: "High",
          confidence: 89.7,
          box: { x: 420, y: 410, width: 250, height: 240 },
          details: "Sub-surface fatigue flaking (spalling) detected on the inner ring raceway. Severe metallic pitting."
        },
        {
          id: "def_004",
          type: "Corrosion & Pitting",
          severity: "Medium",
          confidence: 78.5,
          box: { x: 220, y: 250, width: 160, height: 180 },
          details: "Acidic etching and rust spots on bearing guard and seals, likely due to moisture ingress."
        }
      ],
      recommendations: {
        urgency: "Scheduled Maintenance Needed",
        urgencyCode: "WARNING",
        rul: "180 Operating Hours (Approx. 7 days)",
        actions: [
          "Schedule repair work order within the next 4-5 operating days.",
          "Verify lubricant film thickness; flush and replace bearing oil during repair.",
          "Inspect seals for integrity and install double-lip rubber contact seals.",
          "Install new Spherical Roller Bearing (Part No. SRB-22215)."
        ],
        safety: "LOTO mandatory. Avoid skin contact with contaminated oil. Handle heavy bearing assembly with crane assist.",
        tools: ["Bearing Heater (Induction)", "Internal Puller kit", "Shaft Deflectometer", "Feeler Gauge (0.03 - 0.5 mm)"],
        spareId: "part_srb_22215"
      }
    },
    {
      id: "gear_healthy",
      name: "High-Speed Pinion Gear",
      category: "Gears",
      image: "media/gear_healthy.jpg",
      status: "Healthy",
      defects: [],
      recommendations: {
        urgency: "Routine Inspection Only",
        urgencyCode: "HEALTHY",
        rul: "12,000 Operating Hours",
        actions: [
          "Maintain standard operational loads.",
          "Perform routine lubricant visual inspection in next scheduled cycle (30 days).",
          "Ensure temperature monitors remain calibrated."
        ],
        safety: "None required beyond standard workshop PPE.",
        tools: ["Lubricant Dipstick", "Infrared Thermometer"],
        spareId: "part_pg_4022"
      }
    }
  ],

  // Mock Historical Inspections Data
  history: [
    { id: "ins_9812", timestamp: "2026-07-19 14:32", partName: "Drive Shaft Gear (Spur)", status: "Critical", defectType: "Structural Crack", inspector: "Operator-09 (System AI)", cost: 1200 },
    { id: "ins_9811", timestamp: "2026-07-19 10:15", partName: "High-Speed Pinion Gear", status: "Healthy", defectType: "None", inspector: "Operator-12", cost: 0 },
    { id: "ins_9810", timestamp: "2026-07-18 16:45", partName: "Main Shaft Roller Bearing", status: "Warning", defectType: "Race Spalling", inspector: "Operator-09 (System AI)", cost: 450 },
    { id: "ins_9809", timestamp: "2026-07-18 09:20", partName: "Conveyor Drum Pulley", status: "Healthy", defectType: "None", inspector: "Operator-03", cost: 0 },
    { id: "ins_9808", timestamp: "2026-07-17 11:30", partName: "Turbine Blade Section C", status: "Critical", defectType: "Thermal Fatigue Crack", inspector: "Operator-09 (System AI)", cost: 3500 },
    { id: "ins_9807", timestamp: "2026-07-16 15:40", partName: "Hydraulic Pump Piston #3", status: "Warning", defectType: "Piston Wear", inspector: "Operator-05", cost: 320 },
    { id: "ins_9806", timestamp: "2026-07-15 08:10", partName: "Gearbox Housing Seal", status: "Healthy", defectType: "None", inspector: "Operator-09 (System AI)", cost: 0 }
  ],

  // Spare Parts Inventory Database
  inventory: [
    { id: "part_sg_88402", name: "Spur Gear SG-88402", category: "Gears", stock: 1, minStock: 2, price: 420.00, location: "Aisle 4, Shelf C", compatibility: "Drive Shaft Line A/B", status: "Low Stock Alert" },
    { id: "part_srb_22215", name: "Spherical Roller Bearing SRB-22215", category: "Bearings", stock: 5, minStock: 3, price: 185.00, location: "Aisle 12, Shelf A", compatibility: "Main Shaft Assm 2", status: "In Stock" },
    { id: "part_pg_4022", name: "High-Speed Pinion PG-4022", category: "Gears", stock: 3, minStock: 2, price: 290.00, location: "Aisle 4, Shelf F", compatibility: "Pinion Box C3", status: "In Stock" },
    { id: "part_ms_100", name: "Hydraulic Piston HP-P3", category: "Hydraulics", stock: 0, minStock: 1, price: 650.00, location: "Aisle 8, Shelf B", compatibility: "Hydraulic Pump Series 5", status: "Out of Stock" },
    { id: "part_or_50", name: "Synthetic Seal O-Ring OR-50", category: "Seals", stock: 45, minStock: 20, price: 5.50, location: "Bin 3B, Small Parts", compatibility: "General Gearbox Housings", status: "In Stock" }
  ],

  // Active Work Orders / Maintenance Planner
  maintenanceOrders: [
    { id: "wo_4001", partId: "gear_defective", partName: "Drive Shaft Gear (Spur)", priority: "Critical", status: "Unscheduled", assignedTo: "Team Alpha (Lead: J. Doe)", dateScheduled: "Immediate", estimatedHours: 4.5 },
    { id: "wo_4002", partId: "bearing_defective", partName: "Main Shaft Roller Bearing", priority: "High", status: "Scheduled", assignedTo: "M. Smith", dateScheduled: "2026-07-21", estimatedHours: 3.0 },
    { id: "wo_4003", partId: "unknown", partName: "Turbine Blade Section C", priority: "Critical", status: "In Progress", assignedTo: "Specialist Team B", dateScheduled: "2026-07-19", estimatedHours: 12.0 }
  ],

  // AI Inference Configurations & Stats
  models: [
    { id: "model_yolov8", name: "YOLOv8-MetalDefect (v2.4)", type: "Object Detection", precision: 96.8, recall: 95.2, latency: 12, description: "Highly optimized convolutional model trained on NEU-DET surface defect dataset. Best for structural cracks, corrosion, and wear markings.", active: true },
    { id: "model_resnet50", name: "ResNet50-AnomalyClassifier", type: "Anomaly Classification", precision: 92.4, recall: 94.8, latency: 8, description: "Deep residual classifier designed to identify overall surface anomalies. Best for fast screening and sorting.", active: false },
    { id: "model_autoencoder", name: "Unsupervised-ConvAutoencoder", type: "Reconstruction Anomaly", precision: 88.5, recall: 90.1, latency: 22, description: "Identifies anomalies by computing reconstruction error deviation. Ideal for novel defects not in training sets.", active: false }
  ],

  // Plant Stats Summary
  stats: {
    totalScanned: 1420,
    defectsDetected: 184,
    unresolvedCritical: 2,
    plantHealthIndex: 94.2,
    mtbf: 742, // Mean Time Between Failures in hours
    scansToday: 24
  }
};

// Helper methods to query/modify data in localStorage (to make the website stateful across page loads!)
function initLocalStorageData() {
  if (!localStorage.getItem("defectSystemDB")) {
    localStorage.setItem("defectSystemDB", JSON.stringify(DEFECT_DATA));
  }
}

function getSystemDB() {
  initLocalStorageData();
  return JSON.parse(localStorage.getItem("defectSystemDB"));
}

function saveSystemDB(db) {
  localStorage.setItem("defectSystemDB", JSON.stringify(db));
}

// Automatically initialize when data.js is loaded
initLocalStorageData();
