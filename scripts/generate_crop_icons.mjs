import { generateIconSvg } from "../mcp-server.js";

const crops = [
  "Cotton",
  "Wheat",
  "Bajra (Pearl Millet)",
  "Rice",
  "Maize (Corn)",
  "Groundnut (Peanut)",
  "Mustard",
  "Sugarcane",
  "Onion",
  "Potato",
];

for (const crop of crops) {
  // eslint-disable-next-line no-await-in-loop
  const { filePath } = await generateIconSvg(crop);
  console.log(`Created: ${filePath}`);
}

