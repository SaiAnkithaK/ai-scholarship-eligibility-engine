from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calculate_ai_score(student, scholarship):
    student_text = f"""
    {student.get('education_level', '')}
    {student.get('degree', '')}
    {student.get('category', '')}
    {student.get('gender', '')}
    {student.get('state', '')}
    CGPA {student.get('cgpa', '')}
    """

    scholarship_text = f"""
    {scholarship.get('name', '')}
    {scholarship.get('description', '')}
    {scholarship.get('education_level', '')}
    {scholarship.get('degree', '')}
    {scholarship.get('categories', '')}
    {scholarship.get('gender', '')}
    {scholarship.get('states', '')}
    """

    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(
        [student_text, scholarship_text]
    )

    similarity = cosine_similarity(
        vectors[0:1],
        vectors[1:2]
    )[0][0]

    return round(similarity * 100, 2)