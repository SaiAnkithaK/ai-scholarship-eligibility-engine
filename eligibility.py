import json


def load_scholarships():
    """Load scholarship data from JSON file."""
    with open("data/scholarships.json", "r", encoding="utf-8") as file:
        return json.load(file)


def calculate_match_score(student, scholarship):
    """Calculate how well a student matches a scholarship."""
    score = 0

    # Income
    if student["income"] <= scholarship["income_limit"]:
        score += 25

    # CGPA
    if student["cgpa"] >= scholarship["min_cgpa"]:
        score += 25

    # Gender
    if (
        "All" in scholarship["gender"]
        or student["gender"] in scholarship["gender"]
    ):
        score += 20

    # Degree
    if (
        "Any" in scholarship["degree"]
        or student["degree"] in scholarship["degree"]
    ):
        score += 15

    # Category
    if (
        "All" in scholarship["categories"]
        or student["category"] in scholarship["categories"]
    ):
        score += 15

    return score


def find_eligible_scholarships(student):
    """Return scholarships that satisfy eligibility conditions."""

    scholarships = load_scholarships()

    eligible = []

    for scholarship in scholarships:

        # Income check
        if student["income"] > scholarship["income_limit"]:
            continue

        # CGPA check
        if student["cgpa"] < scholarship["min_cgpa"]:
            continue

        # Gender check
        if (
            "All" not in scholarship["gender"]
            and student["gender"] not in scholarship["gender"]
        ):
            continue

        # Degree check
        if (
            "Any" not in scholarship["degree"]
            and student["degree"] not in scholarship["degree"]
        ):
            continue

        # Category check
        if (
            "All" not in scholarship["categories"]
            and student["category"] not in scholarship["categories"]
        ):
            continue

        # PwD check
        if scholarship.get("pwd_required", False):
            if not student["pwd"]:
                continue

        scholarship["match_score"] = calculate_match_score(
            student,
            scholarship
        )

        eligible.append(scholarship)

    eligible.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return eligible