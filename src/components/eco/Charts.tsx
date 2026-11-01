import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { CHART_COLORS, categoryData, efficiencyData, monthlyData } from "@/lib/demo-data";

const tip = { contentStyle: { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 } };

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass p-5">
      <h3 className="mb-4 font-semibold">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">{children as React.ReactElement}</ResponsiveContainer>
      </div>
    </div>
  );
}

export function DistributionPie() {
  return (
    <Box title="Waste Distribution">
      <PieChart>
        <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
          {categoryData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
        </Pie>
        <Tooltip {...tip} />
        <Legend />
      </PieChart>
    </Box>
  );
}

export function CategoryBar() {
  return (
    <Box title="Category Comparison">
      <BarChart data={categoryData}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="name" fontSize={12} stroke="var(--muted-foreground)" />
        <YAxis fontSize={12} stroke="var(--muted-foreground)" />
        <Tooltip {...tip} />
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {categoryData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
        </Bar>
      </BarChart>
    </Box>
  );
}

export function MonthlyTrend() {
  return (
    <Box title="Monthly Detection Trends">
      <AreaChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <Tooltip {...tip} />
        <Legend />
        <Area type="monotone" dataKey="detections" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.25} />
        <Area type="monotone" dataKey="recycled" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.25} />
      </AreaChart>
    </Box>
  );
}

export function EfficiencyLine() {
  return (
    <Box title="Recycling Efficiency (%)">
      <LineChart data={efficiencyData}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis domain={[50, 100]} stroke="var(--muted-foreground)" />
        <Tooltip {...tip} />
        <Line type="monotone" dataKey="rate" stroke="var(--deep)" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </Box>
  );
}
