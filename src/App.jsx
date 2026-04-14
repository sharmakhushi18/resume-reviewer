=import { useState } from "react"

export default function App() {
  const [resume, setResume] = useState("")
  const [jobDesc, setJobDesc] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function analyze() {
    if (!resume.trim() || !jobDesc.trim()) {
      alert("Please fill both fields.")
      return
    }

    setLoading(true)
    setResult(null)

    const prompt = `Analyze this resume against the job description.
Return ONLY raw JSON, no markdown, no explanation.
Format:
{
  "matchScore": 75,
  "atsScore": 80,
  "overallScore": 78,
  "matchedKeywords": ["React", "Node.js"],
  "missingKeywords": ["Docker", "AWS"],
  "strengths": ["Strong frontend skills"],
  "weaknesses": ["No cloud experience"],
  "tips": ["Add Docker to skills"]
}

RESUME:
${resume}

JOB DESCRIPTION:
${jobDesc}`

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "user",
                content: prompt
              }
            ]
          })
        }
      )

      const data = await response.json()
      console.log("API response:", JSON.stringify(data))

      if (!data.choices) {
        alert("API Error: " + JSON.stringify(data))
        setLoading(false)
        return
      }

      const text = data.choices[0].message.content
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim())
      setResult(parsed)
    } catch (e) {
      console.log("Full error:", e)
      alert("Error: " + e.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Reviewer</h1>
        <p className="text-gray-500 mb-6">Paste your resume and job description for AI feedback.</p>

        <textarea
          className="w-full p-3 border rounded-lg mb-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Paste your resume here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />

        <textarea
          className="w-full p-3 border rounded-lg mb-4 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Paste job description here..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />

        <button
          onClick={analyze}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold disabled:opacity-40 cursor-pointer"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {result && (
          <div className="mt-6 space-y-4">

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Match Score", key: "matchScore" },
                { label: "ATS Score", key: "atsScore" },
                { label: "Overall", key: "overallScore" },
              ].map(({ label, key }) => (
                <div key={key} className="bg-white border rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                  <p className={`text-3xl font-bold ${result[key] >= 75 ? "text-emerald-600" : result[key] >= 50 ? "text-amber-500" : "text-red-500"}`}>
                    {result[key]}%
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white border rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Keywords</p>
              <p className="text-xs text-gray-400 mb-2">Matched</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {result.matchedKeywords?.map(k => (
                  <span key={k} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">{k}</span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mb-2">Missing</p>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords?.map(k => (
                  <span key={k} className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full">{k}</span>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-xl p-4 space-y-4">
              {[
                { title: "Strengths", items: result.strengths, color: "border-emerald-400" },
                { title: "Weaknesses", items: result.weaknesses, color: "border-red-400" },
                { title: "Tips to improve", items: result.tips, color: "border-amber-400" },
              ].map(({ title, items, color }) => (
                <div key={title}>
                  <p className="text-sm font-semibold text-gray-700 mb-2">{title}</p>
                  {items?.map((item, i) => (
                    <div key={i} className={`text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2 mb-2 border-l-4 ${color}`}>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}