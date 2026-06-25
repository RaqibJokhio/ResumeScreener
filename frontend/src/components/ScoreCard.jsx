export default function ScoreCard({ score, matchedCount, jdSkillCount }) {
  const getColor = (s) => {
    if (s >= 75) return "text-green-400"
    if (s >= 50) return "text-yellow-400"
    return "text-red-400"
  }

  const getLabel = (s) => {
    if (s >= 75) return "Strong Match"
    if (s >= 50) return "Moderate Match"
    return "Weak Match"
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center">
      <p className="text-gray-400 text-sm mb-1">ATS Match Score</p>
      <p className={`text-7xl font-bold ${getColor(score)}`}>{score}%</p>
      <p className={`text-lg font-medium mt-2 ${getColor(score)}`}>{getLabel(score)}</p>
      <p className="text-gray-500 text-sm mt-3">
        {matchedCount} of {jdSkillCount} required skills matched
      </p>
    </div>
  )
}