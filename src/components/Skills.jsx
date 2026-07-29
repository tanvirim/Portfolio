/* eslint-disable no-unused-vars */
/* eslint-disable no-duplicate-case */
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
import { motion } from "framer-motion";

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

  const getIcon = (item) => {
    switch (item) {
      case "Vercel":
        return <SiVercel />;
      case "Netlify":
        return <SiNetlify />;
      case "Render":
        return <SiRender />;
      case "JavaScript":
        return <SiJavascript />;
      case "TypeScript":
        return <SiTypescript />;
      case "Python":
        return <SiPython />;
      case "React.js":
        return <SiReact />;
      case "NodeJs":
        return <FaNodeJs />;
      case "MongoDB":
        return <SiMongodb />;
      case "Express.js":
        return <SiExpress />;
      case "NestJS":
        return <SiNestjs />;
      case "Socket.io":
        return <SiSocketdotio />;
      case "JWT / OAuth":
        return <SiJsonwebtokens />;
      case "REST / Swagger":
        return <SiSwagger />;
      case "Redux":
        return <SiRedux />;
      case "Redux Toolkit":
        return <SiRedux />;
      case "Zustand":
        return <FaCubes />;
      case "Shadcn/UI":
        return <FaCubes />;
      case "Next.Js":
        return <TbBrandNextjs />;
      case "HTML5":
        return <FaHtml5 />;
      case "CSS3":
        return <FaCss3Alt />;
      case "MUI":
        return <SiMui />;
      case "Git":
        return <RiGitMergeLine />;
      case "GitHub":
        return <FaGithub />;
      case "Figma":
        return <FaFigma />;
      case "Tailwind CSS":
        return <BiLogoTailwindCss />;
      case "Bootstrap":
        return <BsFillBootstrapFill />;
      case "Adobe Illustrator":
        return <DiIllustrator />;
      case "React Query":
        return <SiReactquery />;
      case "MySQL":
        return <SiMysql />;
      case "SQLite":
        return <SiSqlite />;
      case "PostgreSQL":
        return <SiPostgresql />;
      case "Docker":
        return <SiDocker />;
      case "Nginx":
        return <SiNginx />;
      case "Linux":
        return <SiLinux />;
      case "PM2":
        return <SiPm2 />;
      case "VPS / Production Servers":
        return <FaServer />;
      case "Oracle Cloud":
        return <SiOracle />;
      case "GitHub Actions":
        return <SiGithubactions />;
      case "ESLint":
        return <SiEslint />;
      case "Prettier":
        return <SiPrettier />;
      case "Vitest":
        return <SiVitest />;
      default:
        return null;
    }
  };

  return (
    <div className="px-5">
      <div className="title-text-style mb-6">SKILLS</div>

      <div
        className="game-card-subtle rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0d1117] shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden"
        style={{ "--tile-accent": color }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03]">
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className="game-card flex flex-col items-center rounded-2xl border border-border bg-card/60 px-6 py-5"
              >
                {/* Category Title */}
                <h3 className="text-2xl text-center font-bold border-b-2 pb-2 mb-4">
                  {category.category}
                </h3>

                {/* Skills List */}
                <div className="flex flex-wrap justify-center">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex flex-col items-center text-center mx-5 my-2 transition-transform duration-200 hover:scale-125 hover:-translate-y-1"
                    >
                      <div
                        className="text-3xl mb-2 text-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                        style={{ color }}
                      >
                        {getIcon(item)}
                      </div>
                      <div className="text-lg">{item}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
