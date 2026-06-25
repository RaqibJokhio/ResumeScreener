export default function LLMAnalysis({ analysis }) {
  if (!analysis) return null

  const Section = ({ title, items, color }) => (
    <div>
      <h4 className={`font-semibold text-sm mb-2 ${color}`}>{title}</h4>
      {Array.isArray(items) ? (
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i} className="text-gray-300 text-sm flex gap-2">
              <span className="text-gray-500 mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300 text-sm">{items}</p>
      )}
    </div>
  )

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-5">
      <h3 className="text-white font-semibold text-lg">AI Analysis</h3>

      {analysis.summary && (
        <Section title="Overall Assessment" items={analysis.summary} color="text-white" />
      )}
      {analysis.strengths?.length > 0 && (
        <Section title="✓ Strengths" items={analysis.strengths} color="text-green-400" />
      )}
      {analysis.missing_skills?.length > 0 && (
        <Section title="✗ Missing Skills (LLM)" items={analysis.missing_skills} color="text-red-400" />
      )}
      {analysis.recommendations?.length > 0 && (
        <Section title="💡 Recommendations" items={analysis.recommendations} color="text-yellow-400" />
      )}
      {analysis.ats_tips?.length > 0 && (
        <Section title="🎯 ATS Tips" items={analysis.ats_tips} color="text-indigo-400" />
      )}
    </div>
  )
}