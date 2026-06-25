export default function SkillsAnalysis({ matched, missing, resumeSkills }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
        <h3 className="text-green-400 font-semibold mb-3">✓ Matched Skills ({matched.length})</h3>
        <div className="flex flex-wrap gap-2">
          {matched.length > 0 ? matched.map((s) => (
            <span key={s} className="bg-green-900 text-green-300 text-xs px-3 py-1 rounded-full">{s}</span>
          )) : <p className="text-gray-500 text-sm">No matched skills found</p>}
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
        <h3 className="text-red-400 font-semibold mb-3">✗ Missing Skills ({missing.length})</h3>
        <div className="flex flex-wrap gap-2">
          {missing.length > 0 ? missing.map((s) => (
            <span key={s} className="bg-red-900 text-red-300 text-xs px-3 py-1 rounded-full">{s}</span>
          )) : <p className="text-gray-500 text-sm">No missing skills — great match!</p>}
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 md:col-span-2">
        <h3 className="text-indigo-400 font-semibold mb-3">All Skills in Your Resume ({resumeSkills.length})</h3>
        <div className="flex flex-wrap gap-2">
          {resumeSkills.length > 0 ? resumeSkills.map((s) => (
            <span key={s} className="bg-indigo-900 text-indigo-300 text-xs px-3 py-1 rounded-full">{s}</span>
          )) : <p className="text-gray-500 text-sm">No skills detected</p>}
        </div>
      </div>
    </div>
  )
}