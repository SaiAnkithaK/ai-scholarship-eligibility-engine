import { Card, CardContent } from "@/components/ui/card";

export default function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <Card className="rounded-3xl border-stone-300 bg-[#FCFBF8] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-8">
        <div className="text-4xl mb-5">
          {icon}
        </div>

        <h3 className="text-2xl font-semibold text-stone-900">
          {title}
        </h3>

        <p className="mt-3 text-stone-600 leading-7">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}