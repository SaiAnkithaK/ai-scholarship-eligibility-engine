function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">
        🎓 ScholarSense AI
      </h1>

      <div className="flex gap-6 text-gray-700 font-medium">
        <a href="#">Home</a>
        <a href="#">Scholarships</a>
        <a href="#">AI Advisor</a>
        <a href="#">About</a>
      </div>
    </nav>
  );
}

export default Navbar;