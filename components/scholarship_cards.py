import streamlit as st


def display_scholarships(scholarships):

    st.header("🎯 Scholarship Matches")

    if not scholarships:
        st.warning("No scholarships matched your profile.")
        return

    st.success(f"Found {len(scholarships)} scholarship(s)!")

    for scholarship in scholarships:

        with st.container(border=True):

            col1, col2 = st.columns([4,1])

            with col1:

                st.subheader(scholarship["name"])

                st.write(f"🏢 **Provider:** {scholarship['provider']}")

                st.write(f"📂 **Type:** {scholarship['type']}")

                st.write(scholarship["description"])

            with col2:

                st.metric(
                    "Match",
                    f"{scholarship['match_score']}%"
                )

            st.write("### 📄 Required Documents")

            for doc in scholarship["documents"]:
                st.write(f"✅ {doc}")

            st.link_button(
                "Official Website",
                scholarship["official_url"],
                use_container_width=True
            )

            st.divider()