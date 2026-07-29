/* eslint-disable react/prop-types */
import { defaultColor } from '../constants';
import usePrefersReducedMotion from '../Hooks/usePrefersReducedMotion';

const LINES = [
  { command: 'whoami', output: 'Tanvir Imam Mitul' },
  { command: 'cat role.txt', output: 'Full Stack Engineer · DevOps' },
  {
    command: 'cat status.txt',
    output: 'Building Kagoj.ai, Jiggasha.ai & TAS',
    links: [
      { text: 'Kagoj.ai', href: 'https://kagoj.ai/' },
      { text: 'Jiggasha.ai', href: 'https://jiggasha.ai/' },
      { text: 'TAS', href: 'https://tas.bangla.gov.bd/' },
    ],
  },
  { command: 'cat stack.txt', output: 'Next.js · NestJS · Docker · Nginx' },
];

const CHAR_DURATION_S = 0.045;
const MIN_LINE_DURATION_S = 0.6;
const LINE_GAP_S = 0.5;

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const renderOutput = (text, links) => {
  if (!links || links.length === 0) return text;

  const pattern = new RegExp(
    `(${links.map((link) => escapeRegExp(link.text)).join('|')})`,
    'g'
  );

  return text.split(pattern).map((part, index) => {
    const link = links.find((candidate) => candidate.text === part);
    if (!link) return part;

    return (
      <a
        key={`${part}-${index}`}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-dotted underline-offset-2 hover:text-gray-900 dark:hover:text-white"
      >
        {part}
      </a>
    );
  });
};

const TerminalIntro = ({ color = defaultColor }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  let cumulativeDelay = 0;

  return (
    <div
      className="game-card-subtle w-full min-w-0 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0d1117] shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden"
      style={{ '--term-accent': color, '--tile-accent': color }}
      role="group"
      aria-label="Terminal status panel"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03]">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-amber-400/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
          tanvir@portfolio:~
        </span>
      </div>

      <div className="p-4 sm:p-5 font-mono text-[clamp(0.7rem,2.6vw,1rem)] space-y-3 min-w-0">
        {LINES.map((line) => {
          const duration = Math.max(
            MIN_LINE_DURATION_S,
            line.output.length * CHAR_DURATION_S
          );
          const delay = cumulativeDelay;
          cumulativeDelay += duration + LINE_GAP_S;

          return (
            <div key={line.command}>
              <div
                className="flex gap-2"
                style={{ color: 'var(--term-accent)' }}
              >
                <span aria-hidden="true">$</span>
                <span>{line.command}</span>
              </div>
              <p
                className={`pl-4 text-gray-800 dark:text-gray-200 whitespace-nowrap overflow-hidden ${
                  prefersReducedMotion ? '' : 'terminal-typewriter'
                }`}
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        '--typewriter-width': `${line.output.length}ch`,
                        '--typewriter-duration': `${duration}s`,
                        '--typewriter-delay': `${delay}s`,
                      }
                }
              >
                {renderOutput(line.output, line.links)}
              </p>
            </div>
          );
        })}
        <span
          className="inline-block w-2 h-4 terminal-cursor"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default TerminalIntro;
