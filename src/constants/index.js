export const defaultColor = "#1ce5ff";

// The "default" accent (before the user picks one via ColorPicker) is
// theme-dependent — cyan reads well against the dark theme, but needs to
// switch to something with enough contrast/warmth against the light theme.
export const getDefaultColorForTheme = (theme) =>
  theme === "light" ? "#ef4444" : defaultColor;

// Single source of truth for the "currently building / things I've
// shipped" project links — referenced from both Hero (the terminal-style
// "Currently" line) and Footer (the shipped-projects chip list), so
// adding/removing/reordering an entry here updates every place at once.
export const shippedProjects = [
  { name: "BanglaGov", url: "https://www.bangla.gov.bd/" },
  { name: "Kagoj.ai", url: "https://kagoj.ai/" },
  { name: "Jiggasha.ai", url: "https://jiggasha.ai/" },
  { name: "TAS", url: "https://tas.bangla.gov.bd/" },
];

export const educationHistory = [
  {
    institution: "Rajshahi University of Engineering and Technology (RUET)",
    duration: "2017 - 2023",
    degree: "BSc in Materials Science and Engineering",
  },
  {
    institution: "BCIC College",
    duration: "2012 - 2016",
    degree: "HSC in Science",
  },
  {
    institution: "Kushtia Zilla School",
    duration: "2009 - 2011",
    degree: "SSC in Science",
  },
];

export const projects = [
  {
    projectName: "BanglaGovBD — EBLICT Information Portal",
    technologies: ["Next.js", "TypeScript", "Tailwind", "MUI"],
    projectDescription:
      "Multi-level category → subcategory → detail navigation, with a full CRUD Next.js Admin CMS for content, media, and auth.",
    liveLink: "https://www.bangla.gov.bd/",
    imageLink: "https://i.ibb.co.com/gZ04Nm71/image.png",
    images: ["https://i.ibb.co.com/gZ04Nm71/image.png"],
  },
  {
    projectName: "Kagoj.ai",
    technologies: [
      "Next.js",
      "TypeScript",
      "AI/ML",
      "Django",
      "PostgreSQL",
      "shadcn/ui",
      "Auth",
    ],
    projectDescription:
      "Bangla's first all-in-one AI platform — spell & grammar check (including complex rules like ণ-ত্ব and ষ-ত্ব), OCR that turns printed Bangla documents into editable, searchable text, text-to-speech and audio transcription, and machine translation. Built under the EBLICT project by the Bangladesh Computer Council and ICT Division; launched December 15, 2025 alongside the new 'July' Bangla font.",
    liveLink: "https://kagoj.ai/",
    imageLink: "https://i.ibb.co.com/Hp7stDwg/image.png",
    images: [
      "https://i.ibb.co.com/Hp7stDwg/image.png",
      "https://i.ibb.co.com/1fvg2Zty/image.png",
      "https://i.ibb.co.com/whbTXXhd/image.png",
    ],
  },
  {
    projectName: "Jiggasha.ai",
    technologies: [
      "Next.js",
      "TypeScript",
      "AI/ML",
      "Django",
      "PostgreSQL",
      "shadcn/ui",
      "Auth",
    ],
    projectDescription:
      "An AI-powered conversational chatbot and voice assistant that helps citizens find verified information about Bangladeshi government services, offices, and administrative procedures in natural Bangla. Built as an LLM-based conversational agent using RAG (Retrieval-Augmented Generation), with both voice and text chat, under public-sector ICT language-technology research efforts like Brain Lab.",
    liveLink: "https://jiggasha.ai/",
    imageLink: "https://i.ibb.co.com/gbWDtpym/image.png",
    images: [
      "https://i.ibb.co.com/gbWDtpym/image.png",
      "https://i.ibb.co.com/8LFB6Tsn/image.png",
      "https://i.ibb.co.com/8nDk5k2S/image.png",
    ],
  },
  {
    projectName: "TAS — AI Meeting Minutes",
    technologies: ["Next.js", "TypeScript", "AI/ML"],
    projectDescription:
      "Transcribe. Generate meeting minutes. Collaborate. Converts speech to text with AI and instantly generates structured meeting minutes — decisions, action items, and speaker attribution.",
    liveLink: "https://tas.bangla.gov.bd/",
    imageLink: "https://i.ibb.co.com/KpWxkz2n/image.png",
    images: [
      "https://i.ibb.co.com/KpWxkz2n/image.png",
      "https://i.ibb.co.com/8LFzYmFY/image.png",
      "https://i.ibb.co.com/0pq1msMb/image.png",
      "https://i.ibb.co.com/0VdY6c1K/image.png",
    ],
  },
  {
    projectName: "Eblict Crowd Data Platform",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Redux Toolkit",
      "Tailwind CSS",
    ],
    projectDescription:
      "A collaborative platform for managing crowd-sourced data annotation projects. Built a real-time collaboration system with Socket.io group chat and WebRTC video calling, JWT-based auth with RBAC, a multi-format data pipeline for passages/dialogues/translations/Q&A, a RESTful API with Swagger docs and rate limiting, RTK Query for server state, a 'Relax & Refresh' module with procedural Web Audio API sound synthesis, and a responsive analytics dashboard with Chart.js and Recharts.",
    liveLink: "http://114.130.116.78/",
    imageLink: "https://i.ibb.co.com/7xkX5Y9f/image.png",
    images: [
      "https://i.ibb.co.com/7xkX5Y9f/image.png",
      "https://i.ibb.co.com/pskmTfz/image.png",
      "https://i.ibb.co.com/ym4rGB7f/image.png",
    ],
  },
  {
    projectName: "Clustar — Focused Workspace",
    technologies: ["Next.js", "PostgreSQL", "shadcn/ui"],
    projectDescription:
      "Tools built for focused work. Annotate documents, chat with AI, and manage your workflow — all from a single dashboard built for focus.",
    liveLink: "https://clustar.duckdns.org/",
    imageLink: "https://i.ibb.co.com/1JjC6fdf/image.png",
    images: [
      "https://i.ibb.co.com/1JjC6fdf/image.png",
      "https://i.ibb.co.com/DPDV2Gjk/image.png",
      "https://i.ibb.co.com/YFk4Y59j/image.png",
      "https://i.ibb.co.com/jPRC34Tq/image.png",
    ],
  },
  {
    projectName: "Chalk Board App",
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "React",
      "Canvas",
      "MUI",
      "Redux toolkit",
    ],
    projectDescription:
      "Create, edit, and save drawings with ease. Download your work, receive notifications, and engage with others through comments and reactions. Explore and discover other users' creations using the search feature.",
    liveLink: "https://chalkboard-mitul.netlify.app/create-drawing",
    githubLink: "https://github.com/tanvirmitul1/whiteboard-application",
    imageLink: "https://i.ibb.co.com/Tc5PVc0/image.png",

    images: [
      "https://i.ibb.co.com/9sjGcDp/image.png",
      "https://i.ibb.co.com/gtyvtJY/image.png/image.png",
      "https://i.ibb.co.com/Cm0WwVr/image.png",
      "https://i.ibb.co.com/0V8v1P4/image.png",
      "https://i.ibb.co.com/SR0j9JQ/image.png",
      "https://i.ibb.co.com/pwRTGtL/image.png",
      "https://i.ibb.co.com/KztcJjQ/image.png",
    ],
  },
  {
    projectName: "Game Lab — Search Any Game",
    technologies: ["React", "TypeScript", "RAWG API", "Zustand"],
    projectDescription:
      "Efficient large-dataset handling from the RAWG API with smart caching and pagination for smooth browsing. Search Made Easy: quickly find your favorite games by name, platform, genre, and more, with dark mode and infinite scrolling.",
    liveLink: "https://game-lab-tanvirim.vercel.app/",
    githubLink: "https://github.com/tanvirim/Game-Lab/",
    imageLink: "https://i.ibb.co.com/xFr80P8/image.png",

    images: [
      "https://i.ibb.co.com/p0BgkfN/image.png",
      "https://i.ibb.co.com/3C5x3QD/image.png",
    ],
  },
  {
    projectName: "Dua App",
    technologies: [
      "Node.js",
      "Express.js",
      "SQLite",
      "Next.js",
      "Zustand",
      "Tailwind CSS",
    ],
    projectDescription:
      " This app provides a collection of essential duas for various occasions, presenting each dua in Arabic, Bangla, and English translations. It also includes audio for pronunciation guidance and references for authenticity.",
    liveLink: "https://dualist.vercel.app/",
    githubLink: "https://github.com/tanvirim/IRD-Foundation",
    imageLink: "https://i.ibb.co.com/CnyfH1R/image.png",
    images: [
      "https://i.ibb.co.com/k95Zrbv/image.png",
      "https://i.ibb.co.com/vkHxtKh/image.png",
    ],
  },
  {
    projectName: "The Chat App!",
    technologies: [
      "Express.js",
      "MongoDB",
      "React",
      "Styled Component",
      "Socket.Io",
    ],
    projectDescription:
      "Real-time Chat: Seamlessly chat with other users in real time.Avatar Selection: Choose a unique avatar, thanks to the api.multiavatar.com.Secure & Protected: bcryptjs for password protection and used MongoDB for a reliable database.",
    liveLink: "https://chat-app-client-kydmfnloo-tanvirim.vercel.app/",
    githubLink: "https://github.com/tanvirim/Chat-App",
    imageLink: "https://i.ibb.co.com/qyqRrCP/image.png",
    images: [
      "https://i.ibb.co.com/S0hvjLS/image.png",
      "https://i.ibb.co.com/k1XL3SX/image.png",
      "https://i.ibb.co.com/1MKpBXJ/image.png",
    ],
  },
  {
    projectName: "Expense Management App",
    technologies: ["Express.js", "MongoDB", "React", "ANT Design", "Redux"],
    projectDescription:
      "The Expense Management App simplifies expense tracking and management. It ensures data security with user authentication. Users can filter expenses by type and category. Visual representations offer insights through dynamic graphs.",
    liveLink: "https://adorable-pink-pantyhose.cyclic.cloud/",
    githubLink: "https://github.com/Tanvir-Mitul/GameHub-App",
    imageLink: "https://i.ibb.co.com/tK67c1L/image.png",
    images: ["https://i.ibb.co.com/tK67c1L/image.png"],
  },

  {
    projectName: "Employee Evaluation",
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "React",
      "Tailwind CSS",
      "Styled Component",
    ],
    projectDescription:
      " Employees can conveniently update their progress using forms.Admins can analyze the data and provide valuable recommendations for promotions, increments, or both, based on the employees",
    liveLink: "https://employee-evaluation.netlify.app/admin-dashboard",
    githubLink: "https://github.com/tanvirim/employee-evaluation",
    imageLink: "https://i.ibb.co.com/PD8Wq52/image.png",
    images: [
      "https://i.ibb.co.com/phJjHzS/image.png",
      "https://i.ibb.co.com/th7z25p/image.png",
      "https://i.ibb.co.com/PD8Wq52/image.png",
    ],
  },
];
