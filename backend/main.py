from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from parser import extract_text
from scorer import compute_score
from llm import analyze_with_llm
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    pdf_bytes = await resume.read()
    resume_text = extract_text(pdf_bytes)
    score, matched_skills, resume_skills, jd_skills = compute_score(resume_text, job_description)
    llm_analysis = analyze_with_llm(resume_text, job_description, matched_skills)

    return {
        "score": score,
        "matched_skills": matched_skills,
        "resume_skills": resume_skills,
        "jd_skills": jd_skills,
        "missing_skills": [s for s in jd_skills if s not in matched_skills],
        "llm_analysis": llm_analysis
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)