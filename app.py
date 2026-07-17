import streamlit as st

from components.student_form import student_profile_form
from eligibility import find_eligible_scholarships

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
Discover scholarships across India with AI.
Government • Private • NGO • Corporate
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

    st.header("🎯 Eligible Scholarships")

    if len(scholarships) == 0:
        st.error("No scholarships matched your current profile.")
    else:

        st.success(f"Found {len(scholarships)} scholarship(s)!")

        for scholarship in scholarships:

            with st.container(border=True):

                c1, c2 = st.columns([4, 1])

                with c1:

                    st.subheader(scholarship["name"])

                    st.write(
                        f"**Provider:** {scholarship['provider']}"
                    )

                    st.write(
                        f"**Type:** {scholarship['type']}"
                    )

                    st.write(
                        scholarship["description"]
                    )

                with c2:

                    st.metric(
                        "Match",
                        f"{scholarship['match_score']}%"
                    )

                st.write("### Required Documents")

                for doc in scholarship["documents"]:
                    st.write(f"✅ {doc}")

                st.markdown(
                    f"[Official Website]({scholarship['official_url']})"
                )

                st.divider()