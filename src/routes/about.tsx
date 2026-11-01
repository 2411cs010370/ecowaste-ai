import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Database, Cpu, Layers } from "lucide-react";
import { PageShell, SectionTitle } from "@/components/eco/Section";
import { metrics } from "@/lib/demo-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Model — EcoWaste AI" },
      { name: "description", content: "MobileNetV2 / EfficientNet CNN architecture, dataset and performance metrics behind EcoWaste AI." },
      { property: "og:title", content: "About the Model — EcoWaste AI" },
      { property: "og:description", content: "How the deep learning waste classifier works." },
    ],
  }),
  component: About,
});

const layers = [
  "Input Image (224×224×3)",
  "Data Augmentation (flip, rotate, zoom)",
  "MobileNetV2 / EfficientNet-B0 Backbone (ImageNet weights)",
  "Global Average Pooling",
  "Dense 256 + ReLU + Dropout 0.3",
  "Softmax Output (7 classes)",
];

function About() {
  return (
    <PageShell>
      <SectionTitle eyebrow="Deep Learning" title="About the AI Model" desc="A transfer-learning CNN that classifies waste into seven categories." />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="glass lift p-6"><Cpu className="size-7 text-primary" /><h3 className="mt-3 font-semibold">Model</h3><p className="text-sm text-muted-foreground">MobileNetV2 / EfficientNet / custom CNN built with TensorFlow & Keras.</p></div>
        <div className="glass lift p-6"><Database className="size-7 text-primary" /><h3 className="mt-3 font-semibold">Dataset</h3><p className="text-sm text-muted-foreground">Waste Image Dataset — 10,000+ labelled images, 80/10/10 split.</p></div>
        <div className="glass lift p-6"><Layers className="size-7 text-primary" /><h3 className="mt-3 font-semibold">Training</h3><p className="text-sm text-muted-foreground">Adam (lr 1e-4), 30 epochs, batch 32, categorical cross-entropy.</p></div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="glass animate-rise p-6 text-center">
            <p className="text-sm text-muted-foreground">{m.label}</p>
            <p className="mt-2 text-4xl font-bold eco-gradient-text">{m.value}%</p>
          </div>
        ))}
      </div>

      <h3 className="mt-14 text-center text-2xl font-bold">Model Architecture</h3>
      <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-2">
        {layers.map((l, i) => (
          <div key={l} className="flex w-full flex-col items-center gap-2">
            <div className="glass lift w-full px-5 py-3 text-center text-sm font-medium">{l}</div>
            {i < layers.length - 1 && <ArrowDown className="size-4 text-primary" />}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
