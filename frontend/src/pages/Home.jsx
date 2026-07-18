import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <Navbar />

      <Hero />

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">

          <FeatureCard
            icon="🎯"
            title="Smart Eligibility"
            description="Instantly checks your profile against hundreds of Government, Private, NGO and Corporate scholarships."
          />

          <FeatureCard
            icon="🤖"
            title="AI Advisor"
            description="Get personalized suggestions, application tips and guidance powered by Gemini AI."
          />

          <FeatureCard
            icon="📄"
            title="Detailed Report"
            description="Download a clean eligibility report with scholarships, match scores and next steps."
          />

        </div>
      </section>
    </div>
  );
}