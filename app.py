import streamlit as st

st.set_page_config(
    page_title="ScholarSense AI",
    page_icon="🎓",
    layout="wide"
)

# Load CSS
with open("assets/styles.css") as f:
    st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

# Hero Section
st.markdown(
    """
    <div class="glass-card">

    <div class="main-title">
    🎓 ScholarSense AI
    </div>

    <div class="sub-title">
    Discover Government, Private, NGO and Corporate Scholarships across India using AI.
    </div>

    </div>
    """,
    unsafe_allow_html=True
)

st.write("")

col1,col2,col3=st.columns(3)

with col1:
    st.markdown("""
    <div class="metric-card">
    <h2>100+</h2>
    Scholarships
    </div>
    """,unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class="metric-card">
    <h2>AI</h2>
    Eligibility Engine
    </div>
    """,unsafe_allow_html=True)

with col3:
    st.markdown("""
    <div class="metric-card">
    <h2>24x7</h2>
    AI Advisor
    </div>
    """,unsafe_allow_html=True)

st.divider()

st.success("✅ UI setup completed successfully.")