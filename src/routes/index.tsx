import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Brain, Camera, CheckCircle2, Factory, Layers, Leaf, Recycle, ScanSearch, Sparkles, Target, TrendingDown, Trash2, Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTitle, StatCard } from "@/components/eco/Section";
import { metrics } from "@/lib/demo-data";
import hero from "@/assets/hero-eco.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EcoWaste AI — AI-Powered Sustainable Waste Management" },
      { name: "description", content: "Deep learning waste classification: upload a photo, get the waste type, confidence and the right disposal method." },
      { property: "og:title", content: "EcoWaste AI — AI-Powered Sustainable Waste Management" },
      { property: "og:description", content: "Using deep learning to identify waste, improve recycling efficiency and promote sustainable disposal." },
    ],
  }),
  component: Home,
});

const steps = [
  { icon: Upload, title: "Upload Waste Image", desc: "Drag, drop or capture a photo" },
  { icon: Brain, title: "AI Deep Learning Analysis", desc: "CNN extracts visual features" },
  { icon: ScanSearch, title: "Waste Classification", desc: "Predicts 1 of 7 categories" },
  { icon: Recycle, title: "Disposal Recommendation", desc: "Eco-friendly action plan" },
];

const impact = [
  { icon: Trash2, title: "Reduced Landfill Waste", value: "-38%" },
  { icon: Recycle, title: "Improved Recycling Rates", value: "+52%" },
  { icon: Layers, title: "Smart Waste Segregation", value: "7 classes" },
  { icon: TrendingDown, title: "Carbon Footprint Reduction", value: "12.4 t CO₂" },
];

function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Sparkles className="size-3.5" /> Final-Year Engineering Project
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            AI-Powered <span className="eco-gradient-text">Sustainable</span> Waste Management
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Using Deep Learning to identify waste, improve recycling efficiency, and promote sustainable disposal practices.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="eco-glow">
              <Link to="/detect"><Camera className="size-4" /> Detect Waste</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#how">Learn More <ArrowRight className="size-4" /></a>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3">
            <StatCard icon={<Target className="size-4" />} label="Accuracy" value="96%" />
            <StatCard icon={<Factory className="size-4" />} label="Images" value="10K+" />
            <StatCard icon={<Layers className="size-4" />} label="Categories" value="7" />
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-8 rounded-full eco-gradient-bg opacity-20 blur-3xl" />
          <img src={hero} alt="AI robot sorting waste into recycling bins" className="relative mx-auto w-full max-w-lg animate-rise" />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16">
        <SectionTitle eyebrow="Workflow" title="How It Works" desc="Four simple steps from photo to proper disposal." />
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="glass lift h-full p-6 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-2xl eco-gradient-bg text-primary-foreground">
                  <s.icon className="size-6" />
                </span>
                <p className="mt-2 text-xs font-bold text-primary">STEP {i + 1}</p>
                <h3 className="mt-1 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-5 top-1/2 hidden size-5 -translate-y-1/2 text-primary md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Model */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle eyebrow="Deep Learning" title="Model Performance" desc="Transfer-learned MobileNetV2 / EfficientNet CNN trained on a waste image dataset." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="glass lift p-6">
              <p className="text-sm text-muted-foreground">{m.label}</p>
              <p className="mt-2 text-4xl font-bold eco-gradient-text">{m.value}%</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full eco-gradient-bg" style={{ width: `${m.value}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline"><Link to="/about">View model architecture <ArrowRight className="size-4" /></Link></Button>
        </div>
      </section>

      {/* Impact */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle eyebrow="Impact" title="Sustainability Impact" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((it) => (
            <div key={it.title} className="glass lift p-6">
              <it.icon className="size-8 text-primary" />
              <p className="mt-4 text-3xl font-bold">{it.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{it.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5">
        <div className="eco-gradient-bg rounded-3xl p-10 text-center text-primary-foreground eco-glow">
          <Leaf className="mx-auto size-10" />
          <h2 className="mt-3 text-3xl font-bold">Ready to sort smarter?</h2>
          <p className="mt-2 opacity-90">Upload a waste photo and let the AI do the rest.</p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link to="/detect"><CheckCircle2 className="size-4" /> Start Detecting</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
