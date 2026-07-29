const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Splits `text` on any of `links[].text` and wraps those matches in real
// anchor tags — used wherever plain status/output text needs a couple of
// words turned into live links (TerminalIntro's status.txt line, Hero's
// "Currently building..." line) without hand-rolling the split each time.
const renderLinkedText = (text, links, linkClassName) => {
  if (!links || links.length === 0) return text;

  const pattern = new RegExp(
    `(${links.map((link) => escapeRegExp(link.text)).join("|")})`,
    "g"
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
        className={
          linkClassName ||
          "underline decoration-dotted underline-offset-2 hover:text-gray-900 dark:hover:text-white"
        }
      >
        {part}
      </a>
    );
  });
};

export default renderLinkedText;
