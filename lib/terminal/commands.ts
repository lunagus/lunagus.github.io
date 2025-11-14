import { TerminalCommand } from "./types";
import heroData from "@/data/hero.json";
import skillsData from "@/data/skills.json";
import projectsData from "@/data/projects.json";
import contactData from "@/data/contact.json";

// Helper function to extract and pad social link names
const getSocialLinks = () => [
  `🐙 GitHub:   ${contactData.social.github}`,
  `💼 LinkedIn: ${contactData.social.linkedin}`,
  `🐦 Twitter:  ${contactData.social.twitter}`,
  `📧 Email:    ${contactData.social.email}`,
];

// Helper to handle skills proficiency map (moved outside handler for cleaner code)
const levelMap: { [key: string]: string } = {
  'Expert': '██████████ 100%',
  'Advanced': '████████▒▒ 80%',
  'Intermediate': '██████▒▒▒▒ 60%',
  'Native': '██████████ 100%',
  'Fluent': '████████▒▒ 80%'
};

// --- CORE COMMANDS ---
export const commands: TerminalCommand[] = [
  // --- SYSTEM/UTILITY COMMANDS (Clear, Help, Info) ---
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
    description: "Display a line of text (e.g., echo 'Hello').",
    handler: (args: string[]) => args.join(" ") || "",
  },
  {
    name: "help",
    description: "List available commands.",
    handler: () => [
      "═══════════════════════════════════════════════════════════════",
      "🎯 MAIN COMMANDS:",
      "  profile       • Quick professional summary.",
      "  whoami        • Identity and role information.",
      "  social        • Social media links (GitHub, LinkedIn).",
      "  echo          • Display a line of text (e.g., echo 'Hello').",
      "  experience    • Work history timeline.",
      "  projects      • List projects (use --view=<ID> for details).",
      "  skills        • Technical skills (use --level for proficiency).",
      "  stack         • Full technology stack overview.",
      "  resume        • Summary (use --download for PDF link).",
      "  contact       • Contact details and email.",
      "  clear/cls     • Clear screen.",
      "",
      "💡 TIP: Command arguments are handled like 'projects --view=SongSeek'",
      "📧 Contact: hernanagustinluna@gmail.com",
    ],
  },
  {
    name: "whoami",
    description: "Display user information.",
    handler: () => [
      "",
      "🔷 WHOAMI 🔷",
      "═══════════════════════════════════════════════════════════════",
      "",
      `👤 ${heroData.name}`,
      `🎯 ${heroData.title}`,
      `📍 La Banda, Santiago del Estero, Argentina`,
      "",
      "💻 Full-Stack Developer | Open Source Contributor",
    ],
  },
  {
    name: "uptime",
    description: "Show professional statistics.",
    handler: () => [
      "",
      "🔷 PROFESSIONAL UPTIME 🔷",
      "═══════════════════════════════════════════════════════════════",
      "",
      "🚀 Years in Dev: 5+",
      "📈 Active development: Continuous since 2019",
      "🛠️ Technologies mastered: 15+ frameworks & tools",
      "🌟 Projects delivered: 20+ successful applications",
    ],
  },

  // --- CONTENT COMMANDS (Profile, Experience, Contact, Social, Resume) ---
  {
    name: "profile",
    description: "Show full profile information.",
    handler: () => [
      "",
      "🔷 PROFILE 🔷",
      "═══════════════════════════════════════════════════════════════",
      "",
      `👤 Name: ${heroData.name}`,
      `🎯 Role: ${heroData.title}`,
      `📍 Location: La Banda, Santiago del Estero, Argentina`,
      `📧 Email: hernanagustinluna@gmail.com`,
      "",
      `📝 Summary: ${heroData.description}`,
      "",
      "💡 Passionate about technology and continuous learning, always looking for new challenges.",
    ],
  },
  {
    name: "experience",
    description: "Show work experience timeline.",
    handler: () => [
      "",
      "🔷 EXPERIENCE 🔷",
      "═══════════════════════════════════════════════════════════════",
      "",
      "🚀 Full-Stack Software Developer",
      "   📅 2020 - Present | Freelance & Remote",
      "   🎯 Building scalable web applications for global clients.",
      "   🛠️  React, Next.js, Django, Node.js, TypeScript",
      "",
      "💡 Open Source Contributor",
      "   📅 2019 - Present | GitHub",
      "   🎯 Developing tools and libraries for the developer community.",
      "   🛠️  JavaScript, Python, various frameworks",
    ],
  },
  {
    name: "contact",
    description: "Show contact details.",
    handler: () => [
      "",
      "🔷 CONTACT 🔷",
      "═══════════════════════════════════════════════════════════════",
      "",
      `📧 Email: hernanagustinluna@gmail.com`,
      `📍 Location: La Banda, Santiago del Estero, Argentina`,
      `🌐 Website: https://lunagus.github.io/portfolio`,
      "",
      "💼 Open to: Full-time opportunities, freelance projects, and collaboration.",
    ],
  },
  {
    name: "social",
    description: "Show social media links.",
    handler: () => [
      "",
      "🔷 SOCIAL 🔷",
      "═══════════════════════════════════════════════════════════════",
      "",
      ...getSocialLinks(),
      "",
      "🌐 Let's connect! Reach out anytime.",
    ],
  },
  
  // --- RESUME COMMANDS (Consolidated output) ---
  {
    name: "resume",
    description: "Show resume summary.",
    handler: () => [
      "",
      "🔷 RESUME SUMMARY 🔷",
      "═══════════════════════════════════════════════════════════════",
      "",
      "📋 PROFESSIONAL SUMMARY:",
      "   Passionate Software Developer (React, Next.js, Django) focused on",
      "   clean code, performance, and building scalable web applications.",
      "",
      "🎯 KEY ACHIEVEMENTS:",
      "   • Built full-stack music migration platform (SongSeek)",
      "   • Developed government cultural platform (PuntoCultura)",
      "   • Created privacy-focused PDF toolkit (TuPDF)",
      "",
      "🛠️ TECHNICAL EXPERTISE:",
      "   Frontend: React, Next.js, TypeScript, TailwindCSS",
      "   Backend: Django, Node.js, Express, REST APIs",
      "   Tools: Git, Docker, CI/CD, AWS",
      "",
      "📥 Use 'resume --download' for PDF link.",
    ],
  },
  {
    name: "resume --download",
    description: "Get resume download link.",
    handler: () => [
      "",
      "📥 DOWNLOAD RESUME 📥",
      "═══════════════════════════════════════════════════════════════",
      "",
      "🔗 Direct Download Link: /CV.pdf",
      "",
      "💡 Tip: The PDF contains full work history and detailed achievements.",
    ],
  },

  // --- SKILLS COMMANDS (Consolidated output) ---
  {
    name: "skills",
    description: "List skills by category.",
    handler: () => [
      "🔷 TECHNICAL SKILLS 🔷",
      "═══════════════════════════════════════════════════════════════",
      "",
      "💻 LANGUAGES: JavaScript, TypeScript, Python, HTML5, CSS3, SQL",
      "🎨 FRONTEND: React, Next.js, TailwindCSS, TypeScript",
      "⚙️ BACKEND: Django, Node.js, REST APIs, Express",
      "🗄️ DATABASES: PostgreSQL, MongoDB, SQLite",
      "🛠️ DEVOPS: Git, Docker, GitHub Actions, Nginx",
      "🌐 LANGUAGES: Español (Native), English (Fluent)",
      "",
      "💡 Use 'skills --level' for proficiency visualization."
    ],
  },
  {
    name: "skills --level",
    description: "Show skills with proficiency levels.",
    handler: () => [
      "🔷 SKILL PROFICIENCY 🔷",
      "═══════════════════════════════════════════════════════════════",
      "",
      "💻 EXPERT: HTML5, CSS3, VS Code",
      "🔥 ADVANCED: JavaScript, TypeScript, Python, React, Next.js,",
      "           TailwindCSS, Django, REST APIs, Git",
      "📈 INTERMEDIATE: Node.js, Express, PostgreSQL, MongoDB,",
      "               SQLite, Docker, GitHub Actions, Nginx",
      "🌐 LANGUAGES: Español (Native), English (Fluent)",
    ],
  },

  // --- PROJECTS COMMANDS (Consolidated output) ---
  {
    name: "projects",
    description: "List all projects.",
    handler: () => {
      const output = [
        "",
        "🔷 PROJECTS 🔷",
        "═══════════════════════════════════════════════════════════════",
        "",
        "⭐ FEATURED PROJECTS:",
      ];

      projectsData
        .filter((project: any) => project.featured)
        .forEach((project: any) => {
          output.push(`   • ${project.id.padEnd(15)} - ${project.title}`);
        });

      output.push("", "---", "", "📁 ALL PROJECTS:");

      projectsData
        .filter((project: any) => !project.featured)
        .forEach((project: any) => {
          output.push(`   • ${project.id.padEnd(15)} - ${project.title}`);
        });

      output.push("", "💡 Use 'projects --view=<ID>' for detailed information.");
      output.push("   Example: projects --view=SongSeek");

      return output;
    },
  },
  {
    name: "projects --filter=featured",
    description: "List featured projects only.",
    handler: () => {
      const output = [
        "",
        "🔷 FEATURED PROJECTS 🔷",
        "═══════════════════════════════════════════════════════════════",
        ""
      ];

      projectsData
        .filter((project: any) => project.featured)
        .forEach((project: any) => {
          output.push(`⭐ 📁 ${project.title}`);
          output.push(`   ${project.description}`);
          output.push(`   🔗 ${project.githubUrl}`);
          if (project.demoUrl) {
            output.push(`   🌐 ${project.demoUrl}`);
          }
          output.push(`   🛠️  ${project.technologies.join(", ")}`);
          output.push("");
        });

      return output;
    },
  },

  // Dynamic project view commands
  ...projectsData.map((project: any) => ({
    name: `projects --view=${project.id}`,
    description: `Show detailed view of ${project.title}`,
    handler: () => [
      "",
      `🔷 ${project.title.toUpperCase()} 🔷`,
      "═══════════════════════════════════════════════════════════════",
      "",
      `📝 ${project.description}`,
      "",
      "🔗 LINKS:",
      `   🐙 GitHub: ${project.githubUrl}`,
      project.demoUrl ? `   🌐 Live Demo: ${project.demoUrl}` : "",
      "",
      "🛠️ TECHNOLOGIES:",
      `   ${project.technologies.join(", ")}`,
      "",
    ]
  })),

  // --- STACK COMMANDS (Consolidated output) ---
  {
    name: "stack",
    description: "Show your complete tech stack.",
    handler: () => [
      "",
      "🔷 TECH STACK 🔷",
      "═══════════════════════════════════════════════════════════════",
      "",
      "🎨 FRONTEND (Use 'stack --frontend'):",
      "   • React & Next.js, TypeScript, TailwindCSS",
      "",
      "⚙️ BACKEND (Use 'stack --backend'):",
      "   • Django, Node.js/Express, REST APIs",
      "",
      "🗄️ DATABASE:",
      "   • PostgreSQL, MongoDB, SQLite",
      "",
      "🛠️ TOOLS & DEVOPS:",
      "   • Git, Docker, CI/CD, VS Code",
    ],
  },
  {
    name: "stack --frontend",
    description: "Show detailed frontend stack.",
    handler: () => [
      "🎨 FRONTEND STACK DETAILS:",
      "   • **React**: Hooks, Context API, Performance",
      "   • **Next.js**: App Router, Server Components, SSG",
      "   • **TypeScript**: Type safety, Interfaces, Generics",
      "   • **Styling**: TailwindCSS, Chakra UI, Responsive design",
    ],
  },
  {
    name: "stack --backend",
    description: "Show detailed backend stack.",
    handler: () => [
      "⚙️ BACKEND STACK DETAILS:",
      "   • **Django**: REST Framework, ORM, Admin panel",
      "   • **Node.js**: Express.js, Async operations",
      "   • **APIs**: REST APIs, JWT/OAuth authentication",
      "   • **Databases**: PostgreSQL, MongoDB (Optimization, Aggregation)",
    ],
  },
];
