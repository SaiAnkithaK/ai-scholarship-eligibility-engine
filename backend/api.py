from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from eligibility import find_eligible_scholarships

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/find-scholarships")
def find_scholarships(student: dict):
    scholarships = find_eligible_scholarships(student)
    return {
        "scholarships": scholarships
    }