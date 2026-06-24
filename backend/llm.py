import requests
import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def analyze_with_llm(resume_text: str, jd_text: str, matched_skills: list) -> dict:
    prompt = f"""
You are an expert ATS (Applicant Tracking System) and career coach.

Analyze the following resume against the job description and return a JSON object with exactly these keys:
- "summary": 2-3 sentence overall assessment
- "strengths": list of 3-4 strong points from the resume relevant to the JD
- "missing_skills": list of important skills/keywords from JD missing in resume
- "recommendations": list of 3-4 actionable tips to improve the resume for this JD
- "ats_tips": list of 2-3 ATS formatting tips based on the resume

Return ONLY valid JSON. No markdown, no explanation, no backticks.

RESUME:
{resume_text[:3000]}

JOB DESCRIPTION:
{jd_text[:2000]}

ALREADY MATCHED SKILLS:
{', '.join(matched_skills)}
"""

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "google/gemini-2.5-flash",
            "messages": [{"role": "user", "content": prompt}]
        }
    )

    data = response.json()
    raw = data["choices"][0]["message"]["content"]

    # Strip markdown if model wraps in backticks
    raw = raw.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()

    import json
    try:
        return json.loads(raw)
    except:
        return {
            "summary": raw,
            "strengths": [],
            "missing_skills": [],
            "recommendations": [],
            "ats_tips": []
        }