import os
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

# Get API Key
API_KEY = os.getenv("GOOGLE_API_KEY")

# Create Gemini Client
client = genai.Client(api_key=API_KEY)


def generate_scholarship_summary(student, scholarships):
    """
    Generates an AI summary of the eligible scholarships
    for a given student profile.
    """

    if not scholarships:
        return (
            "Unfortunately, no scholarships matched the student's "
            "current profile. Suggest ways they can improve their "
            "eligibility in the future."
        )

    scholarship_text = ""

    for scholarship in scholarships:
        scholarship_text += f"""
Name: {scholarship['name']}
Provider: {scholarship['provider']}
Type: {scholarship['type']}
Match Score: {scholarship['match_score']}%
Description: {scholarship['description']}
"""

    prompt = f"""
You are an expert Indian Scholarship Advisor.

A student has submitted the following profile:

Name: {student['name']}
Age: {student['age']}
Gender: {student['gender']}
State: {student['state']}
Category: {student['category']}
Degree: {student['degree']}
Current Year: {student['year']}
CGPA: {student['cgpa']}
Annual Family Income: ₹{student['income']}

Eligible Scholarships:

{scholarship_text}

Your task:

1. Congratulate the student.
2. Explain why they are eligible.
3. Mention their strongest scholarship.
4. Give application tips.
5. Keep the response under 200 words.
6. Use simple and encouraging language.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text