import { GraduationCap, Bot, FileText, Target } from "lucide-react";

const stats = [
  {
    icon: GraduationCap,
    value: "500+",
    label: "Scholarships",
  },
  {
    icon: Target,
    value: "28",
    label: "States & UTs",
  },
  {
    icon: Bot,
    value: "AI",
    label: "Personalized Matching",
  },
  {
    icon: FileText,
    value: "100%",
    label: "Free Platform",
  },
];

export default function StatsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-3xl border border-stone-300 bg-[#FCFBF8] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Icon className="h-8 w-8 text-stone-700" />

              <h2 className="mt-6 text-4xl font-bold text-stone-900">
                {item.value}
              </h2>

              <p className="mt-2 text-stone-600">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}