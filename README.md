# 🎯 AI Resume Reviewer

> Paste your resume + job description → Get instant AI-powered feedback in seconds.

🔗 **Live Demo:** https://resume-reviewer-xyz.vercel.app

---

## ✨ What it does

Most people apply to jobs without knowing if their resume even matches. This tool fixes that.

Paste your resume and the job description — AI instantly tells you:
- How well your resume matches the job
- Which keywords are missing
- What's strong and what needs work
- Exactly how to improve it

---

## 🚀 Features

| Feature | Description |
|---|---|
| 📊 Match Score | % match between resume and job description |
| 🤖 ATS Score | How well resume passes ATS filters |
| 🔑 Keyword Analysis | Matched vs missing keywords |
| 💪 Strengths | What's working in your resume |
| ⚠️ Weaknesses | What needs improvement |
| 💡 Tips | Step by step improvement suggestions |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| AI Model | Llama 3.3 70B via Groq API |
| Deployment | Vercel |

---

## 📦 Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/sharmakhushi18/resume-reviewer.git
cd resume-reviewer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```bash
echo VITE_GROQ_API_KEY=your_key_here > .env
```

### 4. Start the app
```bash
npm run dev
```

Open `http://localhost:5173`

---

## 🔑 Environment Variables

| Variable | Description | Get it from |
|---|---|---|
| `VITE_GROQ_API_KEY` | Groq API Key | [console.groq.com](https://console.groq.com) |

> ⚠️ Never commit your `.env` file. It's already in `.gitignore`.

---

## 📁 Project Structure

```
resume-reviewer/
├── src/
│   ├── App.jsx        ← Main component + AI logic
│   ├── main.jsx       ← Entry point
│   └── index.css      ← Tailwind imports
├── .env               ← API key (never commit!)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🤔 How it works

```
User pastes Resume + Job Description
        ↓
Sent to Groq API (Llama 3.3 70B)
        ↓
AI analyzes and returns JSON
        ↓
App displays scores + feedback
```

---

## 🔮 Coming Soon

- [ ] PDF upload support
- [ ] Interview questions generator
- [ ] Resume rewrite with AI
- [ ] Compare multiple job descriptions
- [ ] Export improved resume as PDF

---

## 👩‍💻 Author

**Khushi Sharma**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://linkedin.com/in/yourprofile)
[![GitHub](https://img.shields.io/badge/GitHub-sharmakhushi18-black?style=flat&logo=github)](https://github.com/sharmakhushi18)


---

