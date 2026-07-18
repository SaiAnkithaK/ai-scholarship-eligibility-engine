import streamlit as st

from components.student_form import student_profile_form
from components.scholarship_cards import display_scholarships
from eligibility import find_eligible_scholarships
from ai.gemini_service import generate_scholarship_summary

# --------------------------------------------------
# Page Config
# --------------------------------------------------
st.set_page_config(
    page_title="ScholarSense AI",
    page_icon="🎓",
    layout="wide"
)

# --------------------------------------------------
# Load CSS
# --------------------------------------------------
with open("assets/styles.css") as f:
    st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

# --------------------------------------------------
# Hero Section
# --------------------------------------------------
st.markdown("""
<div class="glass-card">

<h1 class="main-title">
🎓 ScholarSense AI
</h1>

<p class="sub-title">
Discover Government, Private, NGO and Corporate Scholarships across India using AI.
</p>

</div>
""", unsafe_allow_html=True)

st.write("")

# --------------------------------------------------
# Metrics
# --------------------------------------------------
col1, col2, col3 = st.columns(3)

with col1:
    st.metric("Scholarships", "100+")

with col2:
    st.metric("Coverage", "India")

with col3:
    st.metric("AI Advisor", "24×7")

st.divider()

# --------------------------------------------------
# Student Form
# --------------------------------------------------
student = student_profile_form()

# --------------------------------------------------
# Results
# --------------------------------------------------
if student:

    scholarships = find_eligible_scholarships(student)

    st.divider()

    display_scholarships(scholarships)

    st.divider()

    st.header("🤖 AI Scholarship Advisor")

    with st.spinner("Generating AI insights..."):
        summary = generate_scholarship_summary(student, scholarships)

    st.write(summary)