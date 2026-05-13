"use client";

import { useState } from "react";
import { Search, ChevronDown, Lock, Unlock, Upload, FileText, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";

type StreamKey = "BPC" | "MPC" | "Engineering" | "Mainframe";
type CourseKey = "C++" | "Java" | "Python" | "JCL" | "COBOL" | "DB2" | "CICS" | "Maths" | "Physics" | "Chemistry" | "Botany" | "Zoology";

const streamData: Record<StreamKey, { title: string; subtitle: string; courses: CourseKey[] }> = {
  BPC: {
    title: "BPC Students",
    subtitle: "Biology, Physics & Chem",
    courses: ["Botany", "Zoology", "Physics", "Chemistry"],
  },
  MPC: {
    title: "MPC Students",
    subtitle: "Math, Physics & Chem",
    courses: ["Maths", "Physics", "Chemistry", "C++", "Python"],
  },
  Engineering: {
    title: "Engineering",
    subtitle: "Core subjects & practicals",
    courses: ["C++", "Java", "Python", "Maths"],
  },
  Mainframe: {
    title: "Mainframe",
    subtitle: "Enterprise Computing",
    courses: ["JCL", "COBOL", "DB2", "CICS"],
  }
};

const courseDetails: Record<CourseKey, { title: string; subtitle: string; points: string[]; advanced: string[] }> = {
  "C++": {
    title: "C++ Masterclass Notes",
    subtitle: "Introduction to system programming",
    points: ["Memory management & Pointers", "Object-Oriented paradigms", "Standard Template Library (STL)", "Basic syntax and variables"],
    advanced: ["Advanced multithreading", "Custom memory allocators", "Template metaprogramming"]
  },
  Java: {
    title: "Java Enterprise Notes",
    subtitle: "Core Java programming concepts",
    points: ["JVM Architecture Overview", "Classes, Objects and Methods", "Exception Handling Basics", "Collections Framework"],
    advanced: ["Spring Boot Microservices", "Concurrency and Thread Pools", "JPA and Hibernate caching"]
  },
  Python: {
    title: "Python Pro Notes",
    subtitle: "Scripting and Data structures",
    points: ["Dynamic Typing and Variables", "Lists, Dictionaries and Sets", "Basic functions and Lambdas", "File I/O operations"],
    advanced: ["Machine Learning with Scikit-learn", "Asynchronous Python (asyncio)", "Advanced Decorators and Generators"]
  },
  JCL: {
    title: "JCL (Job Control Language)",
    subtitle: "Mainframe Batch Processing basics",
    points: [
      "JOB Statement: Identifies the job to the OS, handles accounting and routing.",
      "EXEC Statement: Specifies the program or procedure to be executed.",
      "DD Statement (Data Definition): Links datasets to program files.",
      "Condition Codes (COND): Controls step execution based on previous steps.",
      "Procedures (PROCs): Reusable JCL code blocks to simplify batch jobs."
    ],
    advanced: [
      "Advanced VSAM cluster definitions via IDCAMS",
      "GDG (Generation Data Group) manipulation and best practices",
      "Complex nested PROCs and symbolic parameters"
    ]
  },
  COBOL: {
    title: "COBOL Fundamentals",
    subtitle: "Business-oriented language basics",
    points: ["Identification and Environment Divisions", "Data Division & File Section", "Procedure Division rules", "Basic arithmetic operations"],
    advanced: ["Multi-dimensional tables (Arrays)", "CICS Integration", "Advanced string manipulation (STRING/UNSTRING)"]
  },
  DB2: {
    title: "IBM DB2 Relational Database",
    subtitle: "Database management for Mainframes",
    points: ["Basic SQL syntax (SELECT, INSERT, UPDATE, DELETE)", "Primary and Foreign Keys", "Simple Joins", "Indexes and Views"],
    advanced: ["Stored Procedures in COBOL/DB2", "Performance tuning and EXPLAIN plans", "Partitioned tables and large object (LOB) handling"]
  },
  CICS: {
    title: "CICS Transaction Server",
    subtitle: "Online transaction processing",
    points: ["CICS Environment basics", "BMS Maps for UI design", "Pseudo-conversational programming", "Basic EXEC CICS commands"],
    advanced: ["Web services in CICS", "Advanced TSQ and TDQ handling", "CICS DB2 Cursor handling"]
  },
  Maths: {
    title: "Mathematics Core Notes",
    subtitle: "Calculus, Algebra, and Geometry",
    points: ["Limits and Continuity", "Derivatives and Integrals", "Linear Algebra essentials", "Probability & Statistics"],
    advanced: ["Advanced Differential Equations", "Vector Calculus", "Complex Analysis"]
  },
  Physics: {
    title: "Physics Core Notes",
    subtitle: "Mechanics, Optics, and Thermodynamics",
    points: ["Newton's Laws of Motion", "Work, Energy, and Power", "Basic Thermodynamics", "Optics & Light properties"],
    advanced: ["Quantum Mechanics Basics", "Electromagnetism advanced theory", "Nuclear Physics"]
  },
  Chemistry: {
    title: "Chemistry Fundamentals",
    subtitle: "Organic and Inorganic Chemistry",
    points: ["Atomic Structure & Periodic Table", "Chemical Bonding and Molecular Structure", "States of Matter", "Basic Organic Chemistry"],
    advanced: ["Advanced Coordination Compounds", "Electrochemistry", "Chemical Kinetics"]
  },
  Botany: {
    title: "Botany & Plant Sciences",
    subtitle: "Study of plant life",
    points: ["Plant Anatomy and Morphology", "Photosynthesis and Respiration", "Plant Reproduction Basics", "Taxonomy of Angiosperms"],
    advanced: ["Plant Genetics & Biotechnology", "Plant Pathology", "Advanced Ecological adaptions"]
  },
  Zoology: {
    title: "Zoology & Animal Sciences",
    subtitle: "Animal biology and environments",
    points: ["Animal Diversity and Classification", "Human Anatomy and Physiology", "Cell Biology Basics", "Genetics & Evolution"],
    advanced: ["Comparative Anatomy", "Advanced Biochemistry", "Animal Behavior (Ethology)"]
  }
};

export default function Home() {
  const [stream, setStream] = useState<StreamKey>("Engineering");
  const [course, setCourse] = useState<CourseKey>("C++");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const activeCourse = courseDetails[course];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navigation - Light Professional Theme */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold tracking-tighter text-slate-900">
              <span className="text-blue-600">Knowledge</span>Hub<span className="text-blue-600">.</span>
            </h1>
            
            {/* Advanced Dropdown Navigation */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <div className="group relative">
                <button className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition">
                  Streams <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 top-full mt-2 hidden w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg group-hover:block">
                  {(Object.keys(streamData) as StreamKey[]).map((key) => (
                    <button key={key} onClick={() => { setStream(key); setCourse(streamData[key].courses[0]); setShowPaywall(false); }} className="w-full text-slate-700 rounded-lg px-4 py-2 text-left hover:bg-slate-50 hover:text-blue-600 transition">
                      {streamData[key].title}
                    </button>
                  ))}
                </div>
              </div>
              <div className="group relative">
                <button className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition">
                  Courses <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 top-full mt-2 hidden w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg group-hover:block">
                  {streamData[stream].courses.map((key) => (
                    <button key={key} onClick={() => { setCourse(key); setShowPaywall(false); }} className="w-full text-slate-700 rounded-lg px-4 py-2 text-left hover:bg-slate-50 hover:text-blue-600 transition">
                      {key}
                    </button>
                  ))}
                </div>
              </div>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition border-b-2 border-transparent hover:border-blue-600 pb-1">Upload Portal</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 focus-within:border-blue-500 focus-within:bg-white transition shadow-inner">
              <Search className="h-4 w-4 text-slate-400 mr-2" />
              <input type="text" placeholder="Search notes..." className="bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 w-40" />
            </div>
            {!isUnlocked && (
              <button 
                onClick={() => setShowPaywall(true)}
                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-blue-500/30"
              >
                Go Premium
              </button>
            )}
            {isUnlocked && (
              <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                <Unlock className="w-4 h-4" /> Premium Active
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white"></div>
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Professional Note Portal
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{streamData[stream].title}</span> At Your Own Pace
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-500 mb-8">
            Start reading instantly. We provide comprehensive notes to get you interested—upgrade only when you're ready to master the advanced topics.
          </p>

          {/* Interactive Stream Tabs */}
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm flex-wrap justify-center">
            {(Object.keys(streamData) as StreamKey[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setStream(key);
                  setCourse(streamData[key].courses[0]);
                  setShowPaywall(false);
                }}
                className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
                  stream === key ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-6 py-12 grid gap-10 lg:grid-cols-[1fr_350px]">
        
        {/* Notes Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" /> Select Subject
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
              {streamData[stream].courses.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCourse(c);
                    setShowPaywall(false);
                  }}
                  className={`flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition whitespace-nowrap shadow-sm ${
                    course === c
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  <FileText className="h-4 w-4" /> {c}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Free Chapter List */}
            <div className="p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700 uppercase tracking-wider">Free Chapter</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900">{activeCourse.title}</h3>
              <p className="text-slate-500 mb-6">{activeCourse.subtitle}</p>
              
              <div className="space-y-4">
                {activeCourse.points.map((point, i) => (
                  <div key={i} className="flex p-4 rounded-xl bg-slate-50 border border-slate-100 items-start gap-4">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delaying Paywall - Show a prompt to study deeper */}
            <div className="p-8 border-t border-slate-100 bg-slate-50">
              {!showPaywall && !isUnlocked ? (
                <div className="text-center py-6">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Enjoying these notes?</h4>
                  <p className="text-slate-500 mb-6">Dive deeper into advanced topics and complete your mastery.</p>
                  <button 
                    onClick={() => setShowPaywall(true)}
                    className="flex items-center mx-auto gap-2 rounded-full border-2 border-blue-600 text-blue-600 px-8 py-3 font-semibold transition hover:bg-blue-50"
                  >
                    View Advanced Content <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              ) : null}

              {/* Advanced Content / Paywall Active Modal */}
              {(showPaywall || isUnlocked) && (
                <div className="relative">
                  {!isUnlocked && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center backdrop-blur-md bg-white/80 rounded-xl border border-blue-100 shadow-2xl transition-all">
                      <div className="rounded-full bg-blue-100 p-4 mb-4">
                        <Lock className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="text-2xl font-bold text-slate-900 mb-2">Unlock Advanced Material</h4>
                      <p className="text-slate-600 max-w-md mb-6">
                        You're doing great! Pay just $9.99 to unlock all advanced techniques, practice questions, and unlimited PDF downloads.
                      </p>
                      <button 
                        onClick={() => setIsUnlocked(true)}
                        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white transition hover:shadow-lg hover:scale-105"
                      >
                        Subscribe for $9.99 <Unlock className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  )}
                  
                  <div className={`space-y-4 ${!isUnlocked ? "opacity-30 select-none blur-sm" : ""}`}>
                    <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Lock className="h-5 w-5 text-slate-400" /> Premium Chapters
                    </h4>
                    {activeCourse.advanced.map((point, i) => (
                      <div key={i} className="flex p-4 rounded-xl bg-white border border-slate-200 items-start gap-3 shadow-sm">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-slate-700 font-medium">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: File Upload & Professional Extras */}
        <aside className="space-y-6">
          {/* Upload Widget */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-600" /> Share Resources
              </h3>
              <p className="text-sm text-slate-500 mt-1">Submit helpful PDFs or Word files.</p>
            </div>
            
            <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
              <FileText className="h-8 w-8 text-slate-400 mb-3 group-hover:text-blue-500 transition" />
              <span className="text-sm font-semibold text-slate-700">Click to browse</span>
              <span className="text-xs text-slate-500 mt-1">.pdf, .doc, .docx (Max 10MB)</span>
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
            </label>
          </div>

          {/* Premium Promotion */}
          <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 p-6 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-3 text-lg">Why Upgrade?</h4>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> Complete chapter access</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> Exam certification prep</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> Downloadable notes</li>
            </ul>
          </div>
        </aside>

      </main>
    </div>
  );
}