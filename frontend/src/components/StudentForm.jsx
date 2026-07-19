import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { STATES } from "@/data/states";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const educationLevels = [
  "School",
  "Intermediate",
  "Diploma",
  "Undergraduate",
  "Postgraduate",
  "PhD",
];

const categories = ["General", "EWS", "OBC", "SC", "ST"];

const boardOptions = ["CBSE", "ICSE", "State Board", "IB", "NIOS", "Other"];

const diplomaCourses = [
  "Polytechnic Diploma",
  "Engineering Diploma",
  "Pharmacy Diploma",
  "Nursing Diploma",
  "ITI Diploma",
];

const degreeOptions = [
  "B.Tech",
  "B.Sc",
  "B.Com",
  "B.A",
  "BBA",
  "BCA",
  "MBA",
  "M.Tech",
  "M.Sc",
  "M.A",
  "MCA",
];

const yearOptions = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
];

const documentOptions = [
  "Aadhaar Card",
  "Income Certificate",
  "Caste Certificate",
  "Bonafide Certificate",
  "Marksheets",
  "Bank Passbook",
  "PwD Certificate",
];

export default function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    state: "",
    district: "",
    education_level: "",
    degree: "",
    branch: "",
    specialization: "",
    current_year: "",
    current_class: "",
    board: "",
    cgpa: "",
    percentage: "",
    income: "",
    category: "",
    pwd: false,
    minority: false,
    orphan: false,
    single_girl: false,
    hosteller: false,
    first_generation: false,
    documents: [],
    scoreType: "cgpa",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleBoolean = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const toggleDocument = (documentName) => {
    setFormData((prev) => {
      const hasDocument = prev.documents.includes(documentName);
      const documents = hasDocument
        ? prev.documents.filter((item) => item !== documentName)
        : [...prev.documents, documentName];
      return { ...prev, documents };
    });
  };

  const handleEducationChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      education_level: value,
      degree: "",
      branch: "",
      specialization: "",
      current_year: "",
      current_class: "",
      board: "",
    }));
  };

  const handleScoreType = (value) => {
    setFormData((prev) => ({
      ...prev,
      scoreType: value,
      cgpa: value === "cgpa" ? prev.cgpa : "",
      percentage: value === "percentage" ? prev.percentage : "",
    }));
  };

  const buildPayload = () => {
    const percent = Number(formData.percentage);
    const derivedCgpa =
      formData.scoreType === "percentage" && !Number.isNaN(percent)
        ? Number((percent / 10).toFixed(2))
        : Number(formData.cgpa);

    const isSchoolIntermediate =
      formData.education_level === "School" || formData.education_level === "Intermediate";

    return {
      name: formData.name,
      gender: formData.gender,
      dob: formData.dob,
      state: formData.state,
      district: formData.district,
      education_level: formData.education_level,
      degree:
        formData.education_level === "Diploma"
          ? formData.degree
          : formData.education_level === "Undergraduate"
          ? formData.degree
          : formData.education_level === "Postgraduate"
          ? formData.degree
          : "",
      branch: formData.education_level === "Undergraduate" ? formData.branch : "",
      specialization:
        formData.education_level === "Postgraduate" || formData.education_level === "PhD"
          ? formData.specialization
          : "",
      current_year:
        formData.education_level === "Diploma" ||
        formData.education_level === "Undergraduate" ||
        formData.education_level === "Postgraduate" ||
        formData.education_level === "PhD"
          ? formData.current_year
          : "",
      current_class: isSchoolIntermediate ? formData.current_class : "",
      board: isSchoolIntermediate ? formData.board : "",
      cgpa: Number(
        formData.scoreType === "percentage" ? derivedCgpa : formData.cgpa
      ),
      percentage:
        formData.scoreType === "percentage"
          ? Number(formData.percentage)
          : Number(formData.percentage),
      income: Number(formData.income),
      category: formData.category,
      pwd: formData.pwd,
      minority: formData.minority,
      orphan: formData.orphan,
      single_girl: formData.single_girl,
      hosteller: formData.hosteller,
      first_generation: formData.first_generation,
      documents: formData.documents,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResults([]);
    //setResults(response.data.scholarships || []);
    setLoading(true);
    setHasSearched(true);

    if (!formData.name) {
      setError("Please enter your full name.");
      setLoading(false);
      return;
    }

    if (!formData.gender) {
      setError("Please select your gender.");
      setLoading(false);
      return;
    }

    if (!formData.state) {
      setError("Please select your state.");
      setLoading(false);
      return;
    }

    try {
      const payload = buildPayload();
      const response = await axios.post(
        //"http://127.0.0.1:8000/find-scholarships",
        //"https://shiny-meme-695q75g7xggv3gw5-8000.app.github.dev/find-scholarships",
        "/find-scholarships",
        payload
      );
      setResults(response.data.scholarships || []);
    } catch (err) {
      console.error(err);
      setError(
        "We could not fetch scholarships right now. Please check your information and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isSchoolIntermediate =
    formData.education_level === "School" || formData.education_level === "Intermediate";

  return (
    <div className="space-y-8">
      <Card className="rounded-[2rem] border border-[#D8C4A6] bg-[#F6EEE2] shadow-xl shadow-stone-200/30">
        <CardContent className="p-8 lg:p-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-base font-semibold uppercase tracking-[0.18em] text-olive-900">
                Scholarship Profile
              </p>
              <h2 className="text-3xl font-semibold text-stone-900">
                Complete your eligibility profile
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-stone-600">
                Provide accurate information so we can match you with the best scholarship opportunities.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <section className="space-y-6 rounded-[1.75rem] bg-white/90 p-6 shadow-sm shadow-stone-200 ring-1 ring-stone-100">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold text-stone-900">1. Personal Information</p>
                    <p className="text-sm text-stone-500">Basic profile details for eligibility matching.</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => updateField("gender", value)}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Choose gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => updateField("dob", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => updateField("state", value)}
                    >
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      value={formData.district}
                      onChange={(e) => updateField("district", e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-6 rounded-[1.75rem] bg-white/90 p-6 shadow-sm shadow-stone-200 ring-1 ring-stone-100">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold text-stone-900">2. Education</p>
                    <p className="text-sm text-stone-500">Choose your current study level and share the relevant academic details.</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="education_level">Education Level</Label>
                    <Select
                      value={formData.education_level}
                      onValueChange={handleEducationChange}
                    >
                      <SelectTrigger id="education_level">
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {isSchoolIntermediate && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="current_class">Current Class</Label>
                        <Input
                          id="current_class"
                          value={formData.current_class}
                          onChange={(e) => updateField("current_class", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="board">Board</Label>
                        <Select
                          value={formData.board}
                          onValueChange={(value) => updateField("board", value)}
                        >
                          <SelectTrigger id="board">
                            <SelectValue placeholder="Select board" />
                          </SelectTrigger>
                          <SelectContent>
                            {boardOptions.map((board) => (
                              <SelectItem key={board} value={board}>
                                {board}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {formData.education_level === "Diploma" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="degree">Diploma Course</Label>
                        <Select
                          value={formData.degree}
                          onValueChange={(value) => updateField("degree", value)}
                        >
                          <SelectTrigger id="degree">
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            {diplomaCourses.map((course) => (
                              <SelectItem key={course} value={course}>
                                {course}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="current_year">Current Year</Label>
                        <Select
                          value={formData.current_year}
                          onValueChange={(value) => updateField("current_year", value)}
                        >
                          <SelectTrigger id="current_year">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {yearOptions.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {formData.education_level === "Undergraduate" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="degree">Degree</Label>
                        <Select
                          value={formData.degree}
                          onValueChange={(value) => updateField("degree", value)}
                        >
                          <SelectTrigger id="degree">
                            <SelectValue placeholder="Select degree" />
                          </SelectTrigger>
                          <SelectContent>
                            {degreeOptions.map((degree) => (
                              <SelectItem key={degree} value={degree}>
                                {degree}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="branch">Branch</Label>
                        <Input
                          id="branch"
                          value={formData.branch}
                          onChange={(e) => updateField("branch", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="current_year">Current Year</Label>
                        <Select
                          value={formData.current_year}
                          onValueChange={(value) => updateField("current_year", value)}
                        >
                          <SelectTrigger id="current_year">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {yearOptions.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {formData.education_level === "Postgraduate" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="degree">Degree</Label>
                        <Select
                          value={formData.degree}
                          onValueChange={(value) => updateField("degree", value)}
                        >
                          <SelectTrigger id="degree">
                            <SelectValue placeholder="Select degree" />
                          </SelectTrigger>
                          <SelectContent>
                            {degreeOptions.map((degree) => (
                              <SelectItem key={degree} value={degree}>
                                {degree}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Input
                          id="specialization"
                          value={formData.specialization}
                          onChange={(e) => updateField("specialization", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="current_year">Current Year</Label>
                        <Select
                          value={formData.current_year}
                          onValueChange={(value) => updateField("current_year", value)}
                        >
                          <SelectTrigger id="current_year">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {yearOptions.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {formData.education_level === "PhD" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="specialization">Research Area</Label>
                        <Input
                          id="specialization"
                          value={formData.specialization}
                          onChange={(e) => updateField("specialization", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="current_year">Current Year</Label>
                        <Select
                          value={formData.current_year}
                          onValueChange={(value) => updateField("current_year", value)}
                        >
                          <SelectTrigger id="current_year">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {yearOptions.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>
              </section>

              <section className="space-y-6 rounded-[1.75rem] bg-white/90 p-6 shadow-sm shadow-stone-200 ring-1 ring-stone-100">
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-stone-900">3. Academic Performance</p>
                  <p className="text-sm text-stone-500">Choose the grading format you want to submit.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => handleScoreType("cgpa")}
                    className={`rounded-3xl border px-5 py-4 text-left text-sm font-medium transition ${
                      formData.scoreType === "cgpa"
                        ? "border-olive-900 bg-[#EAE1D2] text-stone-900"
                        : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    CGPA
                  </button>

                  <button
                    type="button"
                    onClick={() => handleScoreType("percentage")}
                    className={`rounded-3xl border px-5 py-4 text-left text-sm font-medium transition ${
                      formData.scoreType === "percentage"
                        ? "border-olive-900 bg-[#EAE1D2] text-stone-900"
                        : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    Percentage
                  </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {formData.scoreType === "cgpa" ? (
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="cgpa">CGPA</Label>
                      <Input
                        id="cgpa"
                        value={formData.cgpa}
                        onChange={(e) => updateField("cgpa", e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="percentage">Percentage</Label>
                      <Input
                        id="percentage"
                        type="number"
                        value={formData.percentage}
                        onChange={(e) => updateField("percentage", e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </section>

              <section className="space-y-6 rounded-[1.75rem] bg-white/90 p-6 shadow-sm shadow-stone-200 ring-1 ring-stone-100">
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-stone-900">4. Financial Information</p>
                  <p className="text-sm text-stone-500">Share your income range and reservation category.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="income">Annual Family Income</Label>
                    <Input
                      id="income"
                      value={formData.income}
                      onChange={(e) => updateField("income", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => updateField("category", value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>

              <section className="space-y-6 rounded-[1.75rem] bg-white/90 p-6 shadow-sm shadow-stone-200 ring-1 ring-stone-100">
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-stone-900">5. Additional Eligibility</p>
                  <p className="text-sm text-stone-500">Select every eligibility factor that applies to you.</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { field: "minority", label: "Minority Community" },
                    { field: "pwd", label: "Person with Disability" },
                    { field: "orphan", label: "Orphan" },
                    { field: "single_girl", label: "Single Girl Child" },
                    { field: "hosteller", label: "Hosteller" },
                    { field: "first_generation", label: "First Generation Learner" },
                  ].map((item) => (
                    <label
                      key={item.field}
                      className={`flex cursor-pointer items-center gap-3 rounded-3xl border px-4 py-4 text-sm transition ${
                        formData[item.field]
                          ? "border-olive-900 bg-[#EAE1D2] text-stone-900"
                          : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData[item.field]}
                        onChange={() => toggleBoolean(item.field)}
                        className="h-4 w-4 accent-olive-700"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="space-y-6 rounded-[1.75rem] bg-white/90 p-6 shadow-sm shadow-stone-200 ring-1 ring-stone-100">
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-stone-900">6. Documents</p>
                  <p className="text-sm text-stone-500">Select all documents you can provide.</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {documentOptions.map((documentName) => {
                    const selected = formData.documents.includes(documentName);
                    return (
                      <button
                        key={documentName}
                        type="button"
                        onClick={() => toggleDocument(documentName)}
                        className={`rounded-3xl border px-4 py-4 text-left text-sm transition ${
                          selected
                            ? "border-olive-900 bg-[#EAE1D2] text-stone-900"
                            : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                        }`}
                      >
                        {documentName}
                      </button>
                    );
                  })}
                </div>
              </section>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-stone-600">Submit your profile and view matching scholarships below.</p>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>
                <Button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[#6B5B40] px-8 py-3 text-sm font-semibold text-cream hover:bg-[#5a4f38] disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Searching...
                    </span>
                  ) : (
                    "Find Scholarships"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>

      {hasSearched && !loading && results.length === 0 && !error ? (
        <Card className="rounded-[2rem] border border-[#D8C4A6] bg-[#FFF9F1] p-8 shadow-sm shadow-stone-200">
          <CardContent className="space-y-4 p-0">
            <h3 className="text-2xl font-semibold text-stone-900">No scholarships matched.</h3>
            <p className="text-sm leading-6 text-stone-600">
              Try:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-sm text-stone-600">
              <li>Increasing income limit</li>
              <li>Changing CGPA or percentage</li>
              <li>Selecting more documents</li>
            </ul>
          </CardContent>
        </Card>
      ) : null}

      {results.length > 0 && (
        <div className="space-y-6">
          <div className="rounded-[2rem] bg-[#F2E8DC] p-6 shadow-sm shadow-stone-200 ring-1 ring-stone-100">
            <h3 className="text-2xl font-semibold text-stone-900">Matched Scholarships</h3>
            <p className="mt-2 text-sm text-stone-600">Review the opportunities that best align with your profile.</p>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {results.map((item, index) => {
              const matchValue = item.match_score ?? item.score;
              const matchLabel = matchValue != null ? `${matchValue}% Match` : "Recommended";

              return (
                <Card
                  key={`${item.name ?? item.scholarship_name ?? index}-${index}`}
                  className="rounded-[2rem] border border-[#D8C4A6] bg-[#FFF9F1] shadow-sm"
                >
                  <CardContent className="space-y-5 p-6">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-olive-900">Scholarship</p>
                      <h4 className="mt-2 text-xl font-semibold text-stone-900">
                        {item.name || item.scholarship_name || "Untitled Scholarship"}
                      </h4>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-[#F4E8DB] p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Provider</p>
                        <p className="mt-2 text-sm font-semibold text-stone-900">{item.provider || item.organization || "Unknown"}</p>
                      </div>
                      <div className="rounded-3xl bg-[#F4E8DB] p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Amount</p>
                        <p className="mt-2 text-sm font-semibold text-stone-900">{item.amount || item.reward || "N/A"}</p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-[#FFF2DC] p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Match Score</p>
                        <Badge className="mt-2 rounded-full bg-olive-900 px-3 py-1 text-[0.75rem] font-semibold text-cream">
                          {matchLabel}
                        </Badge>
                      </div>
                      <div className="rounded-3xl bg-[#FFF2DC] p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Eligibility</p>
                        <p className="mt-2 text-sm text-stone-700">{item.eligibility || item.requirements || "Details available on apply."}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-stone-900">Description</p>
                      <p className="text-sm leading-6 text-stone-600">{item.description || item.summary || "No description provided."}</p>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        asChild
                        className="rounded-full bg-[#6B5B40] px-6 py-2 text-sm font-semibold text-cream hover:bg-[#5a4f38]"
                      >
                        <a
                          href={item.official_url || item.apply_url || item.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply →
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}