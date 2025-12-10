import { TerminalCommand } from "./types";
import projectsData from "@/data/projects.json";
import contactData from "@/data/contact.json";

// Static metadata: Professional, engineering-focused descriptions based on your actual work.
const projectMeta: Record<string, { title: string; description: string }> = {
  "1": {
    title: "SongSeek",
    description: "Full-stack music migration platform (OAuth/SSE)",
  },
  "2": {
    title: "PuntoCultura",
    description: "Government event management system (Django/DRF)",
  },
  "3": {
    title: "TuPDF",
    description: "Privacy-focused, client-side PDF toolkit (Web Workers)",
  },
  "4": {
    title: "Ahorcado",
    description: "Multi-language interactive game (Next.js/TS)",
  },
  "5": {
    title: "Clipper", 
    description: "Desktop GUI for trimming, encoding, and uploading videos",
  },
  "6": {
    title: "Userscripts",
    description: "Browser automation & enhancements",
  },
};

// Helper for consistent key-value alignment (CLI style)
const formatKV = (key: string, value: string) => 
  `  ${key.padEnd(12)} : ${value}`;

// --- CORE COMMANDS ---
export const commands: TerminalCommand[] = [
  // --- SYSTEM/UTILITY COMMANDS ---
  {
    name: "clear",
    description: "Clear the terminal screen.",
    handler: () => "__CLEAR__",
  },
  {
    name: "cls",
    description: "Clear the terminal (alias for clear).",
    handler: () => "__CLEAR__",
  },
  {
    name: "echo",
    description: "Display a line of text.",
    handler: (args: string[]) => args.join(" ") || "",
  },
  {
    name: "help",
    description: "List available commands.",
    handler: () => [
      "AVAILABLE COMMANDS",
      "──────────────────",
      formatKV("profile", "Professional summary & elevator pitch"),
      formatKV("whoami", "Identity & active status"),
      formatKV("uptime", "System statistics & experience stats"),
      formatKV("projects", "Portfolio index (use --view=<ID>)"),
      formatKV("stack", "Technical stack & tooling"),
      formatKV("experience", "Work history timeline"),
      formatKV("social", "Connect links"),
      formatKV("resume", "Download PDF resume"),
      formatKV("clear", "Clear screen"),
      "",
      "> Type 'projects' to browse work.",
    ],
  },

  // --- IDENTITY & STATS ---
  {
    name: "whoami",
    description: "Display user information.",
    handler: () => [
      formatKV("User", "Agustin Luna"),
      formatKV("Role", "Software Developer"),
      formatKV("Location", "Argentina (GMT-3)"),
      formatKV("Stack", "Python, TypeScript, React, Django"),
      formatKV("Status", "Open to opportunities"),
    ],
  },
  {
    name: "uptime",
    description: "Show professional statistics.",
    handler: () => [
      "SYSTEM STATUS",
      "─────────────",
      formatKV("Kernel", "Software Development / Backend Focused"),
      formatKV("Uptime", "3 Years of Experience"),
      formatKV("Load", "Freelance, Open Source"),
      formatKV("Memory", "React, Next.js, Django, PostgreSQL"),
      "",
      "✅ System healthy and ready to deploy.",
    ],
  },
  {
    name: "profile",
    description: "Show professional profile.",
    handler: () => [
      "Agustin Luna",
      "────────────",
      "Software Developer specialized in high-performance web architectures.",
      "Focused on combining robust Python backends with modern and efficient frontends.",
      "",
      "• Focus:    Scalability, Clean Architecture, and User Experience",
      "• Approach: User-centric design backed by efficient engineering",
      "• Location: Remote / Argentina (GMT-3)",
    ],
  },

  // --- EXPERIENCE & RESUME ---
  {
    name: "experience",
    description: "Show work experience timeline.",
    handler: () => [
      "WORK HISTORY",
      "────────────",
      "2022 - Present  |  Software Developer (Freelance)",
      "• Architecting scalable web solutions for global clients.",
      "• Tech: React, Next.js, Django, Node.js, TypeScript.",
      "",
      "2021 - Present  |  Open Source Contributor",
      "• Developing libraries and tools for the dev community.",
      "• Focus: Automation scripts, UI components, and tooling.",
    ],
  },
  {
    name: "resume",
    description: "Show resume summary.",
    handler: () => [
      "RESUME SUMMARY",
      "──────────────",
      "Software Developer with 3 years of experience.",
      "Specialized in backend efficiency and frontend performance.",
      "",
      "KEY PROJECTS",
      "• SongSeek: Real-time playlist migration (OAuth, SSE, Scraping)",
      "• PuntoCultura: Govt. platform with complex role management (Django)",
      "• TuPDF: High-performance client-side PDF manipulation (Web Workers)",
      "",
      "> Type 'resume --download' to get the PDF.",
    ],
  },
  {
    name: "resume --download",
    description: "Get resume download link.",
    handler: () => [
      "Fetching document...",
      "Link: /CV.pdf",
    ],
  },

  // --- CONTACT & SOCIAL ---
  {
    name: "contact",
    description: "Show contact details.",
    handler: () => [
      formatKV("Email", contactData.social.email?.replace("mailto:", "") || "hernanagustinluna@gmail.com"),
      formatKV("GitHub", contactData.social.github),
      formatKV("LinkedIn", contactData.social.linkedin),
      formatKV("Web", "https://lunagus.github.io"),
    ],
  },
  {
    name: "social",
    description: "Show social media links.",
    handler: () => [
      formatKV("GitHub", contactData.social.github),
      formatKV("LinkedIn", contactData.social.linkedin),
      formatKV("Twitter", contactData.social.twitter),
      formatKV("Email", contactData.social.email?.replace("mailto:", "") || "hernanagustinluna@gmail.com"),
    ],
  },

  // --- STACK & SKILLS ---
  {
    name: "stack",
    description: "Show technology stack.",
    handler: () => [
      "TECHNOLOGY STACK",
      "────────────────",
      formatKV("Languages", "Python, TypeScript, JavaScript, SQL"),
      formatKV("Frontend", "React, Next.js, TailwindCSS, Framer Motion"),
      formatKV("Backend", "Django, DRF, Node.js/Express"),
      formatKV("Data", "PostgreSQL, MongoDB, SQLite"),
      formatKV("DevOps", "Git, Docker, GitHub Actions"),
    ],
  },
  {
    name: "skills",
    description: "List skills.",
    handler: () => [
      "Use 'stack' for a categorized view.",
      "",
      "CORE SKILLS:",
      "• Languages: Python, JavaScript, TypeScript, SQL",
      "• Frontend:  React, Next.js, TailwindCSS",
      "• Backend:   Django, REST APIs, Node.js",
      "• Tools:     Git, Docker, VS Code, Linux",
    ],
  },

  // --- PROJECTS (Main List) ---
  {
    name: "projects",
    description: "List all projects.",
    handler: () => {
      const output = ["FEATURED WORK"];

      // Process Featured
      projectsData
        .filter((p: any) => p.featured)
        .forEach((p: any) => {
          const meta = projectMeta[p.id] ?? { title: p.id, description: "" };
          // Clean ID formatting like "[1] Title ....... Description"
          output.push(`  [${p.id}] ${meta.title.padEnd(14)} ${meta.description}`);
        });

      output.push("", "OTHER EXPERIMENTS");

      // Process Others
      projectsData
        .filter((p: any) => !p.featured)
        .forEach((p: any) => {
          const meta = projectMeta[p.id] ?? { title: p.id, description: "" };
          output.push(`  [${p.id}] ${meta.title.padEnd(14)} ${meta.description}`);
        });

      output.push("", "> Type 'projects --view=<ID>' (e.g., projects --view=1) for details.");
      
      return output;
    },
  },

  // --- DYNAMIC PROJECT DETAILS ---
  ...projectsData.map((project: any) => {
    const meta = projectMeta[project.id] ?? { title: project.id, description: "" };
    
    return {
      name: `projects --view=${project.id}`,
      description: `View details for ${meta.title}`,
      handler: () => [
        meta.title.toUpperCase(),
        "────────────────────────",
        meta.description,
        "",
        formatKV("Stack", project.technologies.join(", ")),
        formatKV("GitHub", project.githubUrl),
        project.demoUrl ? formatKV("Demo", project.demoUrl) : "",
        "",
        "> Type 'projects' to return to list.",
      ],
    };
  }),
];
