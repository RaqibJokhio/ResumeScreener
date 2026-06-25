import { useState } from "react"
import axios from "axios"
import UploadSection from "./components/UploadSection"
import ScoreCard from "./components/ScoreCard"
import SkillsAnalysis from "./components/SkillsAnalysis"
import LLMAnalysis from "./components/LLMAnalysis"

export default function App() {
  const [resume, setResume] = useState(null)
  const [jd, setJd] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAnalyze = async () => {
    if (!resume || !jd.trim()) {
      setError("Please upload a resume and enter a job description.")
      return
    }
    setError("")
    setLoading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("resume", resume)
      formData.append("job_description", jd)

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/analyze`, formData)
      setResult(res.data)
    } catch (err) {
      setError("Something went wrong. Make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Resume Screener</h1>
          <p className="text-gray-400">AI-powered ATS score, skill matching, and resume analysis</p>
        </div>

        <UploadSection
          resume={resume}
          setResume={setResume}
          jd={jd}
          setJd={setJd}
        />

        {error && (
          <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {loading && (
          <div className="mt-10 text-center text-gray-400 animate-pulse">
            Running NLP pipeline and LLM analysis...
          </div>
        )}

        {result && (
          <div className="mt-10 space-y-6">
            <ScoreCard score={result.score} matchedCount={result.matched_skills.length} jdSkillCount={result.jd_skills.length} />
            <SkillsAnalysis
              matched={result.matched_skills}
              missing={result.missing_skills}
              resumeSkills={result.resume_skills}
            />
            <LLMAnalysis analysis={result.llm_analysis} />
          </div>
        )}
      </div>
    </div>
  )
}