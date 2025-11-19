export function parseResult(text: string) {
  const result: Record<string, string> = {};
  text.split("\n").forEach(line => {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      result[key.trim()] = rest.join(":").trim();
    }
  });
  return result;
}
