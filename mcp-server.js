import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fs from "fs";
import path from "path";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { fileURLToPath } from "url";
import * as z from "zod/v4";

// NOTE: This project currently stores the key directly in code.
// Prefer moving it to an env var in production.
const API_KEY = "AIzaSyDS4MSUVQMT6EQiUz4tOoLBUIYZY6DNyik";

const DEFAULT_MODEL = "gemini-pro";
const OUTPUT_DIR = path.join(process.cwd(), "assets/icons/crops");

const CROP_SPECS_BY_SLUG = {
  cotton:
    "Draw 2-3 cotton bolls (off-white fill) on a single brown stem with 2-3 green leaves. Use a thick dark outline; cotton bolls should look fluffy using a few simple blob circles/paths (not gradients).",
  wheat:
    "Draw a simple wheat head: 10-14 slender grains (yellow fill) on a single short stalk. Use thick dark outline, with small curved/angled grain shapes (no gradients).",
  "bajra-pearl-millet":
    "Draw pearl millet: a small vertical millet ear with compact rounded seeds (gold/yellow fill). Use thick dark outline; keep grains simplified.",
  rice:
    "Draw a rice grain cluster: 3-5 rice grains (light tan fill) arranged vertically with a small dark outline stalk.",
  "maize-corn":
    "Draw corn cob and husk leaves: a simple corn cob (golden fill) with 4-6 kernel rows (slight darker flat fill), plus 1-2 green husk leaves behind.",
  "groundnut-peanut":
    "Draw groundnut: 1-2 peanut pods (brown fill) and 2-3 peanuts (off-beige fill) with simple outlines.",
  mustard:
    "Draw mustard plant: 1 small sprig with 3 leaves and a few tiny seed/flower pods or seed dots (yellow fill accents). Thick outline, flat fills.",
  sugarcane:
    "Draw sugarcane stalk: 2-3 vertical stalk segments (green fill) with 4-6 simple node bands (slightly darker green). Include a thin leaf at the top.",
  onion:
    "Draw an onion bulb: layered semicircles (light purple/cream fills) with 2-3 thin curved rings and a small dark root tip. Thick outline, flat fills.",
  potato:
    "Draw a potato: an oval potato (brown fill) with 3-5 simple surface lines/eyes (darker brown), plus a tiny green sprout if space allows.",
};

export function slugify(input) {
  const value = String(input ?? "")
    .toLowerCase()
    .replace(/\(([^)]+)\)/g, "$1") // remove parens, keep their content
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return value || "crop";
}

function extractFirstSvg(text) {
  if (!text) return "";
  // Handle:
  // - Full root tags: <svg>...</svg> (may contain nested self-closing elements like <circle ... />)
  // - Code fences: ```svg ... ```
  const withoutFences = text.replace(/```[a-zA-Z]*\s*([\s\S]*?)\s*```/g, "$1");

  const start = withoutFences.indexOf("<svg");
  if (start === -1) return "";

  // Prefer extracting up to the root closing tag to avoid truncation at inner "/>".
  const end = withoutFences.lastIndexOf("</svg>");
  if (end !== -1 && end > start) {
    return withoutFences.slice(start, end + "</svg>".length);
  }

  // Fallback: only accept a self-closing root if it's the entire svg (no closing tag exists).
  const singleTagMatch = withoutFences.slice(start).match(/^<svg\b[\s\S]*?\/>/);
  return singleTagMatch?.[0] ?? "";
}

export async function listGeminiModels() {
  const fetchFn = globalThis.fetch;
  if (!fetchFn) {
    throw new Error("Global fetch is not available in this Node runtime.");
  }

  const versions = ["v1beta", "v1"];
  let lastErr = null;

  for (const version of versions) {
    try {
      const res = await fetchFn(
        `https://generativelanguage.googleapis.com/${version}/models?key=${API_KEY}`
      );
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`ListModels failed (${version}) ${res.status}: ${body.slice(0, 200)}`);
      }
      return await res.json();
    } catch (err) {
      lastErr = err;
    }
  }

  throw lastErr ?? new Error("ListModels failed");
}

export async function generateIconSvg(displayCrop, { model } = {}) {
  const crop = String(displayCrop ?? "").trim();
  if (!crop) {
    throw new Error("generateIconSvg: missing crop argument.");
  }

  const fetchFn = globalThis.fetch;
  if (!fetchFn) {
    throw new Error("Global fetch is not available in this Node runtime.");
  }

  const safeSlug = slugify(crop);
  const cropSpec = CROP_SPECS_BY_SLUG[safeSlug]
    ? CROP_SPECS_BY_SLUG[safeSlug]
    : `Draw a simple flat icon for: ${crop}.`;

  const prompt = `
Create a lightweight 40x40 flat CARTOON SVG icon (transparent background) for crop: ${crop}
Style (match my cotton PNG look): thick dark outline, simple shapes, flat fills only, no gradients, no shadows, no filters.
Design rules:
- Must return ONLY a complete <svg ...>...</svg> element (no markdown, no backticks).
- Include width="40" height="40" and viewBox="0 0 40 40" on the root <svg>.
- No gradient, no pattern, no filter, no opacity hacks, no external references.
- Keep it simple: 10-30 SVG elements max, use basic shapes like <path>, <circle>, <rect>, <line>, <g>.
- Use outline color close to "#1F2937" (dark gray) with stroke-width around 2 where applicable.
Crop design:
${cropSpec}
Important: include the final </svg> closing tag. Avoid truncation.
`.trim();

  const chosenModel = model || process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const apiVersion = process.env.GEMINI_API_VERSION || "v1beta";

  const res = await fetchFn(
    `https://generativelanguage.googleapis.com/${apiVersion}/models/${chosenModel}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!res.ok) {
    const bodyText = await res.text().catch(() => "");
    throw new Error(`Gemini request failed (${res.status}): ${bodyText.slice(0, 500)}`);
  }

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    data?.candidates?.[0]?.output ??
    "";

  const svg = extractFirstSvg(text);
  if (!svg) {
    throw new Error(
      `Gemini did not return parseable SVG for: ${crop}. ` +
        `Gemini text preview: ${String(text).slice(0, 400)}`
    );
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const safeName = slugify(crop);
  const filePath = path.join(OUTPUT_DIR, `${safeName}.svg`);
  fs.writeFileSync(filePath, svg);

  return { crop, filePath, safeName };
}

// Only start the MCP server when this file is executed directly.
const isMain =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  const mcpServer = new McpServer({
    name: "agri-icons",
    version: "1.0.0",
  });

  mcpServer.registerTool(
    "generate_icon",
    {
      description: "Generate a flat SVG crop icon and save it to assets/icons/crops/",
      inputSchema: {
        crop: z.string().describe("Crop name (e.g., Cotton, Wheat, Onion)"),
      },
    },
    async ({ crop }) => {
      try {
        const { filePath } = await generateIconSvg(crop);
        return {
          content: [{ type: "text", text: `Icon created at ${filePath}` }],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to create icon: ${err?.message ?? String(err)}`,
            },
          ],
        };
      }
    }
  );

  const transport = new StdioServerTransport();
  // Keep the process alive so the transport can serve requests.
  await mcpServer.connect(transport);
  console.log("MCP server is running (agri-icons)...");
}