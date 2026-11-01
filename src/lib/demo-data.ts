export const categoryData = [
  { name: "Plastic", value: 3420 },
  { name: "Paper", value: 2180 },
  { name: "Glass", value: 940 },
  { name: "Metal", value: 870 },
  { name: "Organic", value: 1960 },
  { name: "E-Waste", value: 410 },
  { name: "Hazardous", value: 220 },
];

export const monthlyData = [
  { month: "Jan", detections: 620, recycled: 410 },
  { month: "Feb", detections: 710, recycled: 480 },
  { month: "Mar", detections: 830, recycled: 590 },
  { month: "Apr", detections: 790, recycled: 570 },
  { month: "May", detections: 940, recycled: 700 },
  { month: "Jun", detections: 1080, recycled: 820 },
  { month: "Jul", detections: 1150, recycled: 900 },
  { month: "Aug", detections: 1240, recycled: 990 },
];

export const efficiencyData = monthlyData.map((m) => ({
  month: m.month,
  rate: Math.round((m.recycled / m.detections) * 100),
}));

export const recentDetections = [
  { id: 1, emoji: "🧴", type: "Plastic Bottle", confidence: 96.8, rec: "Rinse and place in recycling bin", date: "2026-08-12" },
  { id: 2, emoji: "📦", type: "Cardboard Box", confidence: 94.1, rec: "Flatten and recycle with paper", date: "2026-08-12" },
  { id: 3, emoji: "🍌", type: "Banana Peel", confidence: 98.3, rec: "Compost in organic bin", date: "2026-08-11" },
  { id: 4, emoji: "🔋", type: "AA Battery", confidence: 92.7, rec: "Drop at hazardous collection point", date: "2026-08-11" },
  { id: 5, emoji: "🥫", type: "Aluminium Can", confidence: 97.5, rec: "Crush and recycle with metals", date: "2026-08-10" },
  { id: 6, emoji: "📱", type: "Old Phone", confidence: 90.2, rec: "Take to certified e-waste recycler", date: "2026-08-10" },
];

export const users = [
  { name: "Ananya Rao", email: "ananya@ecowaste.ai", role: "Admin", scans: 142 },
  { name: "Rahul Verma", email: "rahul@ecowaste.ai", role: "User", scans: 87 },
  { name: "Priya Sharma", email: "priya@ecowaste.ai", role: "User", scans: 64 },
  { name: "Karthik N", email: "karthik@ecowaste.ai", role: "Moderator", scans: 51 },
];

export const metrics = [
  { label: "Accuracy", value: 96.2 },
  { label: "Precision", value: 95.4 },
  { label: "Recall", value: 94.8 },
  { label: "F1 Score", value: 95.1 },
];

export const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--deep)",
  "var(--muted-foreground)",
];
