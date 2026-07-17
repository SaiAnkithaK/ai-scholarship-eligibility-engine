import streamlit as st


def student_profile_form():

    st.header("🎓 Student Profile")

    with st.form("student_profile"):

        # -------------------------
        # Personal Information
        # -------------------------

        st.subheader("👤 Personal Information")

        col1, col2 = st.columns(2)

        with col1:
            full_name = st.text_input("Full Name")

            gender = st.selectbox(
                "Gender",
                [
                    "Male",
                    "Female",
                    "Non-binary",
                    "Prefer not to say"
                ]
            )

            dob = st.date_input("Date of Birth")

        with col2:

            state = st.selectbox(
                "State / UT",
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
                    "Lakshadweep",
                    "Andaman & Nicobar Islands",
                    "Dadra & Nagar Haveli and Daman & Diu"
                ]
            )

            district = st.text_input("District")

        st.divider()

        # -------------------------
        # Education
        # -------------------------

        st.subheader("📚 Education")

        education_level = st.selectbox(
            "Current Education Level",
            [
                "School",
                "Intermediate",
                "Diploma",
                "Undergraduate",
                "Postgraduate",
                "PhD"
            ]
        )

        if education_level == "School":

            current_class = st.selectbox(
                "Current Class",
                [str(i) for i in range(1, 11)]
            )

            board = st.selectbox(
                "Board",
                [
                    "CBSE",
                    "ICSE",
                    "State Board",
                    "Other"
                ]
            )
        elif education_level == "Intermediate":

            current_class = st.selectbox(
                "Current Class",
                ["11th", "12th"]
            )

            board = st.selectbox(
                "Board",
                [
                    "CBSE",
                    "State Board",
                    "ICSE",
                    "Other"
                ]
            )

        elif education_level == "Diploma":

            degree = st.text_input("Diploma Course")

            current_year = st.selectbox(
                "Current Year",
                ["1st Year", "2nd Year", "3rd Year"]
            )

        elif education_level == "Undergraduate":

            degree = st.selectbox(
                "Degree",
                [
                    "B.Tech",
                    "B.E.",
                    "B.Sc",
                    "B.Com",
                    "BBA",
                    "BCA",
                    "BA",
                    "MBBS",
                    "BDS",
                    "B.Pharm",
                    "LLB",
                    "Other"
                ]
            )

            branch = st.text_input("Branch / Specialization")

            current_year = st.selectbox(
                "Current Year",
                [
                    "1st Year",
                    "2nd Year",
                    "3rd Year",
                    "4th Year",
                    "5th Year"
                ]
            )

        elif education_level == "Postgraduate":

            degree = st.text_input("PG Degree")

            specialization = st.text_input("Specialization")

            current_year = st.selectbox(
                "Current Year",
                [
                    "1st Year",
                    "2nd Year"
                ]
            )

        else:

            specialization = st.text_input("Research Area")

            current_year = st.selectbox(
                "Current Year",
                [
                    "1st Year",
                    "2nd Year",
                    "3rd Year",
                    "4th Year",
                    "5th Year"
                ]
            )

        st.divider()

        # -------------------------
        # Academic Performance
        # -------------------------

        st.subheader("📈 Academic Performance")

        score_type = st.radio(
            "Score Type",
            [
                "CGPA",
                "Percentage"
            ],
            horizontal=True
        )

        if score_type == "CGPA":

            academic_score = st.number_input(
                "CGPA",
                min_value=0.0,
                max_value=10.0,
                value=7.0,
                step=0.1
            )

        else:

            academic_score = st.number_input(
                "Percentage",
                min_value=0.0,
                max_value=100.0,
                value=75.0,
                step=0.1
            )

        st.divider()

        # -------------------------
        # Financial Information
        # -------------------------

        st.subheader("💰 Financial Information")

        family_income = st.number_input(
            "Annual Family Income (₹)",
            min_value=0,
            step=10000
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

        # -------------------------
        # Additional Eligibility
        # -------------------------

        st.subheader("🏷️ Additional Eligibility")

        col1, col2 = st.columns(2)

        with col1:
            minority = st.checkbox("Minority Community")
            pwd = st.checkbox("Person with Disability (PwD)")
            orphan = st.checkbox("Orphan")

        with col2:
            single_girl = st.checkbox("Single Girl Child")
            hosteller = st.checkbox("Hosteller")
            first_generation = st.checkbox("First Generation Learner")

        st.divider()

        # -------------------------
        # Documents
        # -------------------------

        st.subheader("📄 Available Documents")

        documents = st.multiselect(
            "Select available documents",
            [
                "Aadhaar Card",
                "Income Certificate",
                "Caste Certificate",
                "Bonafide Certificate",
                "Marksheets",
                "Bank Passbook",
                "PwD Certificate"
            ]
        )

        submitted = st.form_submit_button(
            "🔍 Find Scholarships",
            use_container_width=True
        )

    if submitted:

        student = {
            "name": full_name,
            "gender": gender,
            "dob": str(dob),
            "state": state,
            "district": district,
            "education_level": education_level,
            "category": category,
            "income": family_income,
            "pwd": pwd,
            "minority": minority,
            "orphan": orphan,
            "single_girl": single_girl,
            "hosteller": hosteller,
            "first_generation": first_generation,
            "documents": documents
        }

        # Academic score
        if score_type == "CGPA":
            student["cgpa"] = academic_score
            student["percentage"] = None
        else:
            student["percentage"] = academic_score
            student["cgpa"] = academic_score / 10

        # Degree fields
        student["degree"] = locals().get("degree", "")
        student["branch"] = locals().get("branch", "")
        student["specialization"] = locals().get("specialization", "")
        student["current_year"] = locals().get("current_year", "")
        student["current_class"] = locals().get("current_class", "")
        student["board"] = locals().get("board", "")

        return student

    return None