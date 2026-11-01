import fs from "node:fs";
import path from "node:path";

const samples = [
  {
    filename: "1_plastic_bottles.jpg",
    name: "Crushed Plastic Bottles",
    type: "Plastic",
    category: "recyclable",
    material: "Polyethylene Terephthalate (PET #1)",
    url: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=700&auto=format&fit=crop&q=85",
  },
  {
    filename: "2_aluminum_soda_can.jpg",
    name: "Aluminum Soda Can",
    type: "Metal",
    category: "recyclable",
    material: "Aluminum (Alloy 3104 / 5182)",
    url: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?w=700&auto=format&fit=crop&q=85",
  },
  {
    filename: "3_cardboard_packaging.jpg",
    name: "Cardboard Packaging Box",
    type: "Paper",
    category: "recyclable",
    material: "Corrugated Cardboard / Cellulose Fiber",
    url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=700&auto=format&fit=crop&q=85",
  },
  {
    filename: "4_banana_peel_organic.jpg",
    name: "Banana Peel & Food Waste",
    type: "Organic",
    category: "organic",
    material: "Biodegradable Organic Biomass",
    url: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=700&auto=format&fit=crop&q=85",
  },
  {
    filename: "5_glass_bottle.jpg",
    name: "Glass Beverage Bottle",
    type: "Glass",
    category: "recyclable",
    material: "Soda-Lime Silica Glass",
    url: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=700&auto=format&fit=crop&q=85",
  },
  {
    filename: "6_electronic_circuit_board.jpg",
    name: "Circuit Board / E-Waste",
    type: "E-Waste",
    category: "e-waste",
    material: "FR-4 PCB, Silicon, Trace Copper & Gold",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=85",
  },
  {
    filename: "7_alkaline_batteries_hazardous.jpg",
    name: "Spent Batteries (Hazardous)",
    type: "Hazardous",
    category: "hazardous",
    material: "Zinc-Manganese Dioxide / Heavy Metals",
    url: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=700&auto=format&fit=crop&q=85",
  },
];

const destFolders = [
  path.resolve("sample_images"),
  path.resolve("public", "samples")
];

for (const folder of destFolders) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
}

async function run() {
  console.log("Downloading sample images...");
  for (const s of samples) {
    const p1 = path.join(destFolders[0], s.filename);
    const p2 = path.join(destFolders[1], s.filename);

    if (fs.existsSync(p1) && fs.existsSync(p2) && fs.statSync(p1).size > 1000) {
      console.log(`Skipping already downloaded ${s.filename}`);
      continue;
    }

    try {
      console.log(`Fetching ${s.name}...`);
      const res = await fetch(s.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      for (const folder of destFolders) {
        fs.writeFileSync(path.join(folder, s.filename), buffer);
      }
      console.log(`Saved ${s.filename} (${buffer.length} bytes)`);
    } catch (err) {
      console.warn(`Could not download ${s.filename}: ${err.message}`);
    }
  }

  // Also copy user's uploaded screenshot as a reference if available
  const userUploadPath = "C:/Users/bruce wayne/.gemini/antigravity/brain/00939b9f-66e5-4495-8b59-f30214fabd5e/.user_uploaded/media_1793519214049_e582e304.png";
  if (fs.existsSync(userUploadPath)) {
    try {
      const buf = fs.readFileSync(userUploadPath);
      fs.writeFileSync(path.join(destFolders[0], "user_captured_green_plastic_bottles.png"), buf);
      fs.writeFileSync(path.join(destFolders[1], "user_captured_green_plastic_bottles.png"), buf);
      console.log("Saved user reference image to sample_images");
    } catch (e) {
      console.warn("Could not copy user image:", e.message);
    }
  }

  // Write manifest
  const manifest = samples.map((s) => ({
    filename: s.filename,
    name: s.name,
    type: s.type,
    category: s.category,
    material: s.material,
    path: `/samples/${s.filename}`,
  }));

  fs.writeFileSync(path.resolve("public", "samples", "manifest.json"), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.resolve("sample_images", "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log("All sample images and manifests successfully updated!");
}

run();
