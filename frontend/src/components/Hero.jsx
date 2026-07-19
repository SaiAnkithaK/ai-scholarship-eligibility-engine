import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-center">

        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium bg-white shadow-sm">
            <Sparkles size={16} />
            AI Powered Scholarship Finder
          </div>

          <h1 className="mt-6 text-6xl font-black leading-tight tracking-tight">
            Find the Perfect
            <span className="block text-blue-600">
              Scholarship
            </span>
            Across India
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            Discover Government, Private, NGO and Corporate scholarships
            tailored to your academic profile with AI-powered recommendations.
          </p>

          <div className="flex gap-4 mt-8">
            <Link to="/eligibility">
              <Button size="lg" className="bg-stone-800 hover:bg-stone-900">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Right */}
        <div className="rounded-3xl border bg-white p-8 shadow-lg min-h-[420px] flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-bold">
              🎓 ScholarSense AI
            </h3>

            <p className="mt-4 text-slate-500">
              Smart scholarship recommendations,
              AI insights, eligibility checks,
              and downloadable reports.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}