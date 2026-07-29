// Joins items into a natural-language list: "A", "A & B", "A, B & C".
function formatList(items) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} & ${items[items.length - 1]}`;
}

export default formatList;
