export default function UploadSection({ resume, setResume, jd, setJd }) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Upload Resume (PDF)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
        />
        {resume && (
          <p className="mt-2 text-xs text-green-400">✓ {resume.name}</p>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Job Description</label>
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          rows={8}
          placeholder="Paste the full job description here..."
          className="w-full bg-gray-800 text-gray-200 text-sm rounded-lg p-3 border border-gray-600 focus:outline-none focus:border-indigo-500 resize-none placeholder-gray-600"
        />
      </div>
    </div>
  )
}