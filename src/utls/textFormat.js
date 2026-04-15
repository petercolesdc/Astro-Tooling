// Normalize input safely
const toString = (value) => (value ?? "").toString();

export const smartQuotes = (str) => {
  const value = toString(str);
  let result = "";
  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    const prev = i > 0 ? value[i - 1] : "";
    const next = i < value.length - 1 ? value[i + 1] : "";
    if (char === '"') {
      const opening =
        i === 0 || /[\s\(\[\{<\u2014\u2018\u201C"'“”‘’]/.test(prev);
      result += opening ? '“' : '”';
      continue;
    }
    if (char === "'") {
      const isApostrophe = /[A-Za-z0-9]/.test(prev) && /[A-Za-z0-9]/.test(next);
      if (isApostrophe) {
        result += '’';
        continue;
      }
      const opening =
        i === 0 || /[\s\(\[\{<\u2014\u2018\u201C"'“”‘’]/.test(prev);
      result += opening ? '‘' : '’';
      continue;
    }
    result += char;
  }
  return result;
};

// --- Basic transforms ---
export const ucase = (str) =>
  toString(str).toUpperCase();

export const lcase = (str) =>
  toString(str).toLowerCase();

export const trim = (str) =>
  toString(str).trim();

export const stripWhitespace = (str) =>
  toString(str).replace(/\s+/g, "");

export const scase = (str) => {
  const s = toString(str).toLowerCase().trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// --- Named transforms ---
export const slugify = (str) =>
  toString(str)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

export const safe = (str) =>
  format(str, trim, smartQuotes);

export const slugger = (str) =>
  format(str, trim, lowercase, slugify);

export const uppercase = (str) =>
  format(str, trim, smartQuotes, ucase);

export const lowercase = (str) =>
  format(str, trim, smartQuotes, lcase);

export const sentenceCase = (str) =>
  format(str, trim, smartQuotes, scase);

// --- Advanced: pipeline composer ---
export const format = (value, ...transforms) => {
  return transforms.reduce((acc, fn) => fn(acc), value);
};