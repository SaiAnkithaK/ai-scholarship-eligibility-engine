import StudentForm from "../components/StudentForm";

export default function Eligibility() {
  return (
    <div className="min-h-screen bg-[#F7F4EF] py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-12">
          <h1 className="text-5xl font-bold text-stone-900">
            Scholarship Eligibility
          </h1>

          <p className="mt-3 text-lg text-stone-600">
            Fill in your profile once. We'll handle the rest.
          </p>
        </div>

        <StudentForm />

      </div>

    </div>
  );
}
