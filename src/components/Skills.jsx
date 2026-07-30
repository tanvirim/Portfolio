/* eslint-disable react/prop-types */
import { BsFillBootstrapFill } from "react-icons/bs";
import { DiIllustrator } from "react-icons/di";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiMongodb,
  SiExpress,
  SiNestjs,
  SiSocketdotio,
  SiJsonwebtokens,
  SiSwagger,
  SiRedux,
  SiMui,
  SiRender,
  SiReactquery,
  SiNetlify,
  SiVercel,
  SiMysql,
  SiSqlite,
  SiPostgresql,
  SiDocker,
  SiNginx,
  SiLinux,
  SiPm2,
  SiOracle,
  SiGithubactions,
  SiEslint,
  SiPrettier,
  SiVitest,
} from "react-icons/si";
import { BiLogoTailwindCss } from "react-icons/bi";
import {
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaFigma,
  FaServer,
  FaCubes,
} from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { RiGitMergeLine } from "react-icons/ri";
import SectionTitle from "./SectionTitle";
import IconCube from "./IconCube";
import TiltCard from "./TiltCard";

// Each skill's icon paired with that technology's own real brand color —
// not the page's accent color — so every cube is tinted like the actual
// logo instead of a uniform swatch.
const SKILL_ICON_META = {
  Vercel: { icon: SiVercel, color: "#000000" },
  Netlify: { icon: SiNetlify, color: "#00C7B7" },
  Render: { icon: SiRender, color: "#46E3B7" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Python: { icon: SiPython, color: "#3776AB" },
  "React.js": { icon: SiReact, color: "#61DAFB" },
  NodeJs: { icon: FaNodeJs, color: "#339933" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  "Express.js": { icon: SiExpress, color: "#000000" },
  NestJS: { icon: SiNestjs, color: "#E0234E" },
  "Socket.io": { icon: SiSocketdotio, color: "#010101" },
  "JWT / OAuth": { icon: SiJsonwebtokens, color: "#000000" },
  "REST / Swagger": { icon: SiSwagger, color: "#85EA2D" },
  Redux: { icon: SiRedux, color: "#764ABC" },
  "Redux Toolkit": { icon: SiRedux, color: "#764ABC" },
  Zustand: { icon: FaCubes, color: "#F0A202" },
  "Shadcn/UI": { icon: FaCubes, color: "#18181B" },
  "Next.Js": { icon: TbBrandNextjs, color: "#000000" },
  HTML5: { icon: FaHtml5, color: "#E34F26" },
  CSS3: { icon: FaCss3Alt, color: "#1572B6" },
  MUI: { icon: SiMui, color: "#007FFF" },
  Git: { icon: RiGitMergeLine, color: "#F05032" },
  GitHub: { icon: FaGithub, color: "#181717" },
  Figma: { icon: FaFigma, color: "#F24E1E" },
  "Tailwind CSS": { icon: BiLogoTailwindCss, color: "#38BDF8" },
  Bootstrap: { icon: BsFillBootstrapFill, color: "#7952B3" },
  "Adobe Illustrator": { icon: DiIllustrator, color: "#FF9A00" },
  "React Query": { icon: SiReactquery, color: "#FF4154" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  SQLite: { icon: SiSqlite, color: "#003B57" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Nginx: { icon: SiNginx, color: "#009639" },
  Linux: { icon: SiLinux, color: "#FCC624" },
  PM2: { icon: SiPm2, color: "#2B037A" },
  "VPS / Production Servers": { icon: FaServer, color: "#64748B" },
  "Oracle Cloud": { icon: SiOracle, color: "#F80000" },
  "GitHub Actions": { icon: SiGithubactions, color: "#2088FF" },
  ESLint: { icon: SiEslint, color: "#4B32C3" },
  Prettier: { icon: SiPrettier, color: "#F7B93E" },
  Vitest: { icon: SiVitest, color: "#6E9F18" },
};

const Skills = ({ color }) => {
  const skills = [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Python"],
    },
    {
      category: "Frontend",
      items: ["Next.Js", "React.js", "Tailwind CSS", "Redux Toolkit", "Shadcn/UI"],
    },
    {
      category: "Backend",
      items: [
        "NodeJs",
        "Express.js",
        "NestJS",
        "Socket.io",
        "JWT / OAuth",
        "REST / Swagger",
      ],
    },
    { category: "Database", items: ["MongoDB", "MySQL", "SQLite", "PostgreSQL"] },
    {
      category: "State Management",
      items: ["Redux", "React Query", "Zustand"],
    },
    {
      category: "DevOps & Infrastructure",
      items: [
        "Docker",
        "Nginx",
        "Linux",
        "PM2",
        "VPS / Production Servers",
        "Oracle Cloud",
        "GitHub Actions",
      ],
    },
    {
      category: "Tooling & Quality",
      items: ["Git", "GitHub", "ESLint", "Prettier", "Vitest", "Figma"],
    },
    {
      category: "Software Ecosystem",
      items: ["Render", "Vercel", "Netlify", "MUI", "Bootstrap", "Adobe Illustrator"],
    },
  ];

  const getSkillMeta = (item) => SKILL_ICON_META[item] || { icon: null, color };

  return (
    <div className="px-5">
      <SectionTitle
        title="SKILLS"
        subtitle="Languages, frameworks, and infrastructure I use to ship production software."
        color={color}
        className="mb-6"
      />

      <div
        className="game-card-subtle terminal-card"
        style={{ "--tile-accent": color }}
      >
        <div className="terminal-card-header">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
            skills.sh
          </span>
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap justify-center gap-8" style={{ perspective: "1000px" }}>
            {skills.map((category, index) => (
              <TiltCard
                key={index}
                delay={index * 0.08}
                viewport={{ once: true, amount: 0.3 }}
                className="game-card flex flex-col items-center rounded-2xl border border-border bg-card/60 px-6 py-5"
              >
                {/* Category Title */}
                <h3 className="text-2xl text-center font-bold border-b-2 pb-2 mb-4">
                  {category.category}
                </h3>

                {/* Skills List */}
                <div className="flex flex-wrap justify-center">
                  {category.items.map((item, itemIndex) => {
                    const meta = getSkillMeta(item);
                    return (
                      <div
                        key={itemIndex}
                        className="flex flex-col items-center text-center mx-5 my-2 transition-transform duration-200 hover:scale-125 hover:-translate-y-1"
                      >
                        <div className="mb-2">
                          <IconCube icon={meta.icon} color={meta.color} size={36} />
                        </div>
                        <div className="text-lg">{item}</div>
                      </div>
                    );
                  })}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
