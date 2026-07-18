import json


def load_scholarships():
    with open("data/scholarships.json", "r", encoding="utf-8") as file:
        return json.load(file)


def calculate_match_score(student, scholarship):
    score = 0

    # Income
    if student["income"] <= scholarship["income_limit"]:
        score += 20

    # CGPA
    if student["cgpa"] >= scholarship["min_cgpa"]:
        score += 20

    # Gender
    if (
        "All" in scholarship["gender"]
        or student["gender"] in scholarship["gender"]
    ):
        score += 10

    # Education Level
    if (
        "All" in scholarship["education_level"]
        or student["education_level"] in scholarship["education_level"]
    ):
        score += 20

    # Degree
    if (
        "Any" in scholarship["degree"]
        or student["degree"] in scholarship["degree"]
    ):
        score += 10

    # Category
    if (
        "All" in scholarship["categories"]
        or student["category"] in scholarship["categories"]
    ):
        score += 10

    # State
    if (
        "All" in scholarship["states"]
        or student["state"] in scholarship["states"]
    ):
        score += 10

    return score


def find_eligible_scholarships(student):

    scholarships = load_scholarships()

    eligible = []

    for scholarship in scholarships:

        # Income
        if student["income"] > scholarship["income_limit"]:
            continue

        # CGPA
        if student["cgpa"] < scholarship["min_cgpa"]:
            continue

        # Gender
        if (
            "All" not in scholarship["gender"]
            and student["gender"] not in scholarship["gender"]
        ):
            continue

        # Education Level
        if (
            "All" not in scholarship["education_level"]
            and student["education_level"] not in scholarship["education_level"]
        ):
            continue

        # Degree
        if (
            "Any" not in scholarship["degree"]
            and student["degree"] not in scholarship["degree"]
        ):
            continue

        # Category
        if (
            "All" not in scholarship["categories"]
            and student["category"] not in scholarship["categories"]
        ):
            continue

        # State
        if (
            "All" not in scholarship["states"]
            and student["state"] not in scholarship["states"]
        ):
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