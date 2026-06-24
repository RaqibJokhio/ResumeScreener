from sentence_transformers import SentenceTransformer, util
import spacy
import re

model = SentenceTransformer("all-MiniLM-L6-v2")
nlp = spacy.load("en_core_web_sm")

SKILLS_TAXONOMY = [
    "python", "javascript", "typescript", "react", "node.js", "fastapi", "django",
    "flask", "sql", "postgresql", "mongodb", "mysql", "redis", "docker", "kubernetes",
    "aws", "azure", "gcp", "git", "github", "linux", "rest api", "graphql",
    "machine learning", "deep learning", "nlp", "computer vision", "pytorch", "tensorflow",
    "scikit-learn", "pandas", "numpy", "hugging face", "transformers", "langchain",
    "java", "c++", "c#", "go", "rust", "php", "ruby", "swift", "kotlin",
    "html", "css", "tailwind", "bootstrap", "vue", "angular", "next.js",
    "data analysis", "data science", "tableau", "power bi", "excel",
    "agile", "scrum", "jira", "communication", "leadership", "problem solving",
    "firebase", "supabase", "vercel", "render", "ci/cd", "devops",
    "opencv", "yolo", "bert", "gpt", "llm", "rag", "vector database",
    "selenium", "playwright", "testing", "unit testing",
]

def extract_skills(text: str) -> list:
    text_lower = text.lower()
    found = []
    for skill in SKILLS_TAXONOMY:
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            found.append(skill)
    return list(set(found))

def compute_score(resume_text: str, jd_text: str):
    # Skill extraction
    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    # Matched skills
    matched_skills = [s for s in resume_skills if s in jd_skills]

    # Keyword score (40% weight)
    keyword_score = (len(matched_skills) / len(jd_skills) * 100) if jd_skills else 0

    # Semantic score (60% weight)
    resume_embedding = model.encode(resume_text, convert_to_tensor=True)
    jd_embedding = model.encode(jd_text, convert_to_tensor=True)
    semantic_score = float(util.cos_sim(resume_embedding, jd_embedding)[0][0]) * 100

    # Final weighted score
    final_score = round((keyword_score * 0.4) + (semantic_score * 0.6), 1)
    final_score = min(final_score, 100)

    return final_score, matched_skills, resume_skills, jd_skills