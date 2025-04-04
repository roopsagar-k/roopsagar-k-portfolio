import { load } from "cheerio";
import { createLowlight } from "lowlight";
import { common } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import { toHtml } from "hast-util-to-html";

// Initialize lowlight (same as in your editor)
const lowlight = createLowlight(common);
lowlight.register("javascript", js);
lowlight.register("typescript", ts);

export async function processBlogHtml(html: string): Promise<string> {
  const $ = load(html);

  // Process each code block
  $("pre code").each((_, element) => {
    const $code = $(element);
    const language = $code.attr("class")?.replace("language-", "") || "text";
    const code = $code.text();

    try {
      const highlighted = lowlight.highlight(language, code);
      $code.html(toHtml(highlighted));
    } catch (error) {
      // Fallback to plain text if highlighting fails
      $code.text(code);
    }

    // Add hljs class for proper styling
    $code.addClass("hljs");
  });

  return $.html();
}
