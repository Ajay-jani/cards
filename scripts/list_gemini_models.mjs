import { listGeminiModels } from "../mcp-server.js";

const data = await listGeminiModels();
const models = data?.models ?? [];

const generateContentModels = models
  .filter((m) => {
    const methods = m?.supportedGenerationMethods ?? m?.supportedGenerationMethods ?? [];
    const arr = Array.isArray(methods) ? methods : [];
    return arr.some((x) => String(x).toLowerCase().includes("generatecontent"));
  })
  .map((m) => m?.name)
  .filter(Boolean);

console.log(`Total models returned: ${models.length}`);
if (generateContentModels.length > 0) {
  console.log(`Models supporting generateContent (sample):`);
  console.log(generateContentModels.slice(0, 30).join("\n"));
} else {
  console.log("No supportedGenerationMethods found; showing first 30 model names:");
  console.log(models.slice(0, 30).map((m) => m?.name).filter(Boolean).join("\n"));
}

