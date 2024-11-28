import { TEMPLATES } from "@/content/templates";
import fs from "fs";
import path from "path";
import { extractHTMLPlaceholders } from "./extract-html-placeholders";
import { sendMail } from "./send-mail";

type Props = {
  template: keyof typeof TEMPLATES;
  variables: Record<string, string>;
  email: string;
};

export const sendHTMLMail = async (config: Props) => {
  const templatePath = path.join(
    __dirname,
    `../../src/content/templates/${TEMPLATES[config.template]}`
  );
  const variables = extractHTMLPlaceholders(templatePath);
  // check if all placeholders are provided
  const missingVariables = variables.filter(
    (variable) => !Object.keys(config.variables).includes(variable)
  );
  if (missingVariables.length) {
    throw new Error(
      `Missing variables: ${missingVariables.join(", ")} in template: ${
        config.template
      }`
    );
  }

  // Read the template file
  let html = fs.readFileSync(templatePath, "utf-8");

  let subject = html.match(/<title>(.*?)<\/title>/)?.[1] || "";

  console.log(subject);

  // Replace all placeholders with actual values
  Object.entries(config.variables).forEach(([key, value]) => {
    html = html.replaceAll(new RegExp(`{{\\s*${key}\\s*}}`, "g"), value);
    subject = subject.replaceAll(new RegExp(`{{\\s*${key}\\s*}}`, "g"), value);
  });

  // send mail
  await sendMail({
    html,
    subject,
    to: config.email,
  });
};
