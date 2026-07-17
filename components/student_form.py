import streamlit as st


def student_profile_form():
    """
    Displays the student profile form and returns
    a dictionary containing the entered details.
    """

    st.markdown("## 👤 Student Profile")

    with st.form("student_form"):

        # -----------------------------
        # Personal Information
        # -----------------------------
        st.subheader("🧑 Personal Information")

        col1, col2 = st.columns(2)

        with col1:
            name = st.text_input("Full Name")
            age = st.number_input(
                "Age",
                min_value=15,
                max_value=40,
                value=18
            )
            gender = st.selectbox(
                "Gender",
                [
                    "Male",
                    "Female",
                    "Other"
                ]
            )

        with col2:
            state = st.selectbox(
                "State",
                [
                    "Andhra Pradesh",
                    "Arunachal Pradesh",
                    "Assam",
                    "Bihar",
                    "Chhattisgarh",
                    "Goa",
                    "Gujarat",
                    "Haryana",
                    "Himachal Pradesh",
                    "Jharkhand",
                    "Karnataka",
                    "Kerala",
                    "Madhya Pradesh",
                    "Maharashtra",
                    "Manipur",
                    "Meghalaya",
                    "Mizoram",
                    "Nagaland",
                    "Odisha",
                    "Punjab",
                    "Rajasthan",
                    "Sikkim",
                    "Tamil Nadu",
                    "Telangana",
                    "Tripura",
                    "Uttar Pradesh",
                    "Uttarakhand",
                    "West Bengal",
                    "Delhi",
                    "Jammu & Kashmir",
                    "Ladakh",
                    "Puducherry",
                    "Chandigarh",
                    "Andaman & Nicobar Islands",
                    "Dadra & Nagar Haveli and Daman & Diu",
                    "Lakshadweep"
                ]
            )

            category = st.selectbox(
                "Category",
                [
                    "General",
                    "EWS",
                    "OBC",
                    "SC",
                    "ST"
                ]
            )

        st.divider()

        # -----------------------------
        # Academic Information
        # -----------------------------
        st.subheader("🎓 Academic Information")

        col1, col2 = st.columns(2)

        with col1:

            degree = st.selectbox(
                "Degree",
                [
                    "B.Tech",
                    "B.E.",
                    "B.Sc",
                    "B.Com",
                    "BA",
                    "BBA",
                    "BCA",
                    "Diploma",
                    "Other"
                ]
            )

            year = st.selectbox(
                "Current Year",
                [
                    "1st Year",
                    "2nd Year",
                    "3rd Year",
                    "4th Year"
                ]
            )

        with col2:

            cgpa = st.number_input(
                "Current CGPA",
                min_value=0.0,
                max_value=10.0,
                value=7.0,
                step=0.1
            )

            income = st.number_input(
                "Annual Family Income (₹)",
                min_value=0,
                step=10000
            )

        st.divider()

        # -----------------------------
        # Additional Information
        # -----------------------------
        st.subheader("📌 Additional Details")

        col1, col2 = st.columns(2)

        with col1:
            pwd = st.checkbox("Person with Disability (PwD)")
            hosteller = st.checkbox("Hosteller")
            minority = st.checkbox("Minority Community")

        with col2:
            orphan = st.checkbox("Orphan")
            single_girl = st.checkbox("Single Girl Child")
            first_generation = st.checkbox("First Generation Learner")

        st.divider()

        submit = st.form_submit_button(
            "🔍 Find Eligible Scholarships",
            use_container_width=True
        )

    if submit:

        student_data = {
            "name": name,
            "age": age,
            "gender": gender,
            "state": state,
            "category": category,
            "degree": degree,
            "year": year,
            "cgpa": cgpa,
            "income": income,
            "pwd": pwd,
            "hosteller": hosteller,
            "minority": minority,
            "orphan": orphan,
            "single_girl": single_girl,
            "first_generation": first_generation
        }

        return student_data

    return None