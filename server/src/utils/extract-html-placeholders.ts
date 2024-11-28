import fs from "fs";
import path from "path";

export const extractHTMLPlaceholders = (filePath: string) => {
  try {
    // Read the file content
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Regex to match placeholders like {{PLACEHOLDER}}
    const placeholderRegex = /{{\s*([\w\d_]+)\s*}}/g;

    // Extract all matches
    const matches = [];
    let match;
    while ((match = placeholderRegex.exec(fileContent)) !== null) {
      matches.push(match[1]); // Add only the placeholder name
    }

    // Return unique placeholders (just in case of duplicates)
    return [...new Set(matches)];
  } catch (error) {
    return [];
  }
};
