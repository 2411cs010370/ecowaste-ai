import { recentDetections } from "@/lib/demo-data";

export function RecentTable() {
  return (
    <div className="glass overflow-x-auto p-5">
      <h3 className="mb-4 font-semibold">Recent Detections</h3>
      <table className="w-full min-w-[640px] text-sm">
        <thead className="text-left text-muted-foreground">
          <tr><th className="pb-3">Image</th><th>Waste Type</th><th>Confidence</th><th>Recommendation</th><th>Date</th></tr>
        </thead>
        <tbody>
          {recentDetections.map((d) => (
            <tr key={d.id} className="border-t border-border transition-colors hover:bg-accent/40">
              <td className="py-3 text-2xl">{d.emoji}</td>
              <td className="font-medium">{d.type}</td>
              <td><span className="rounded-full bg-accent px-2 py-0.5 text-accent-foreground">{d.confidence}%</span></td>
              <td className="text-muted-foreground">{d.rec}</td>
              <td className="text-muted-foreground">{d.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
