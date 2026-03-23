import fs from "fs";
import path from "path";

const OUTPUT_DIR = path.join(process.cwd(), "assets/icons/crops");

const O = "#1F2937"; // dark outline (match cotton look)
const S = 2; // outline stroke width

function svgRoot(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">${inner}</svg>`;
}

function leaf(cx, cy, w, h, rotDeg, fill) {
  // Simple leaf using an ellipse + center vein.
  // Note: include both fill and stroke so it reads in small sizes.
  return `
    <g transform="translate(${cx} ${cy}) rotate(${rotDeg})">
      <ellipse cx="0" cy="0" rx="${w}" ry="${h}" fill="${fill}" stroke="${O}" stroke-width="${S}" />
      <path d="M 0 ${-h} L 0 ${h}" fill="none" stroke="#166534" stroke-width="1.5" stroke-linecap="round"/>
    </g>
  `;
}

const ICONS = {
  cotton: () => {
    const cotton = `
      <g>
        <circle cx="20" cy="13" r="7.5" fill="#FFFFFF" stroke="${O}" stroke-width="${S}" />
        <circle cx="13.2" cy="21.2" r="6.8" fill="#FFFFFF" stroke="${O}" stroke-width="${S}" opacity="1"/>
        <circle cx="27" cy="21.2" r="6.8" fill="#FFFFFF" stroke="${O}" stroke-width="${S}" />
        <circle cx="20" cy="21.2" r="6.8" fill="#FFFFFF" stroke="${O}" stroke-width="${S}" />
        <path d="M12 21 C12 21 13 34 20 34 C27 34 28 21 28 21 L20 25 L12 21 Z" fill="#795548" stroke="${O}" stroke-width="0"/>
      </g>
    `;
    const stem = `<path d="M20 20V34" stroke="#8B5E3C" stroke-width="3" stroke-linecap="round" fill="none" />`;
    const leaves = `${leaf(14, 24, 8, 4.8, -35, "#2E7D32")}${leaf(26, 24, 8, 4.8, 35, "#2E7D32")}<g transform="translate(20 28) rotate(0)">${leaf(0,0,4,2.6,0,"#2E7D32")}</g>`;
    // Simplify the extra leaf: keep just two main leaves + one small bottom leaf.
    const bottomLeaf = leaf(20, 28, 4, 2.6, 0, "#2E7D32");
    return svgRoot(stem + leaves.replace(/<g transform="translate\(20 28\)[\s\S]*?<\/g>/g, "") + bottomLeaf + cotton);
  },
  wheat: () => {
    const stalk = `<path d="M20 10V32" stroke="#C49A6C" stroke-width="3" stroke-linecap="round" fill="none"/>`;
    const grains = `
      <g fill="#F2C94C" stroke="${O}" stroke-width="${S}" stroke-linejoin="round">
        <path d="M20 8 L18 12 L22 12 Z"/>
        <path d="M16 12 L14 18 L18 18 Z"/>
        <path d="M24 12 L22 18 L26 18 Z"/>
        <path d="M13 16 L11.5 22 L15 21.5 Z"/>
        <path d="M27 16 L25.5 22 L29 21.5 Z"/>
        <path d="M17 19 L15.5 25 L19 24.5 Z"/>
        <path d="M23 19 L21.5 25 L25 24.5 Z"/>
        <path d="M19 22 L18 28 L21 28 Z"/>
      </g>
    `;
    return svgRoot(stalk + grains);
  },
  "bajra-pearl-millet": () => {
    const stalk = `<path d="M20 10V32" stroke="#A16207" stroke-width="3" stroke-linecap="round" fill="none"/>`;
    const ear = `
      <g>
        <path d="M16 12 C16 10 24 10 24 12 V28 C24 30 16 30 16 28 Z" fill="#F6D365" stroke="${O}" stroke-width="${S}" />
        <g fill="#F4C542" stroke="${O}" stroke-width="${1.2}">
          <circle cx="20" cy="16" r="1.4"/>
          <circle cx="18.2" cy="18.5" r="1.3"/>
          <circle cx="21.8" cy="18.5" r="1.3"/>
          <circle cx="19" cy="21.2" r="1.3"/>
          <circle cx="21" cy="21.2" r="1.3"/>
          <circle cx="18.3" cy="23.7" r="1.2"/>
          <circle cx="21.7" cy="23.7" r="1.2"/>
        </g>
      </g>
    `;
    return svgRoot(stalk + ear);
  },
  rice: () => {
    const stalk = `<path d="M20 10V34" stroke="#6B4F2A" stroke-width="3" stroke-linecap="round" fill="none"/>`;
    const grain = (x, y, rot) =>
      `<path d="M ${x} ${y} c -2 -2 -2 -6 1 -7 c 3 1 4 5 1 7 Z" fill="#EED9A6" stroke="${O}" stroke-width="1.8" transform="rotate(${rot} ${x} ${y})"/>`;
    const grains = grain(18, 15, -15) + grain(20, 13.5, 0) + grain(22, 15, 15) + grain(19, 18, -10) + grain(21, 18, 10);
    return svgRoot(stalk + `<g>${grains}</g>`);
  },
  "maize-corn": () => {
    const husk1 = `<path d="M14 16 C10 18 11 25 16 27 C18 22 18 19 14 16 Z" fill="#2E7D32" stroke="${O}" stroke-width="${S}" stroke-linejoin="round"/>`;
    const husk2 = `<path d="M26 16 C30 18 29 25 24 27 C22 22 22 19 26 16 Z" fill="#2E7D32" stroke="${O}" stroke-width="${S}" stroke-linejoin="round"/>`;
    const cob = `<path d="M18 12 C18 11 22 11 22 12 V30 C22 31 18 31 18 30 Z" fill="#F2C94C" stroke="${O}" stroke-width="${S}" stroke-linejoin="round"/>`;
    const kernels = `
      <g fill="#E0B84A" stroke="none">
        ${[0, 2, 4, 6].map((i) => `<rect x="${19 + i * 0.75}" y="14" width="1.2" height="14" rx="0.6" />`).join("")}
      </g>
      <g fill="none" stroke="${O}" stroke-width="1.2">
        ${[0, 1, 2, 3, 4].map((i) => `<path d="M${18.5 + i * 0.9} 12 V30"/>`).join("")}
      </g>
    `;
    const stalk = `<path d="M20 26V34" stroke="#8B5E3C" stroke-width="3" stroke-linecap="round" fill="none"/>`;
    return svgRoot(husk1 + husk2 + cob + kernels + stalk);
  },
  "groundnut-peanut": () => {
    const pod1 = `<path d="M14 18 C12 15 14 12 18 12 C23 12 25 15 23 19 C21 23 16 23 14 18 Z" fill="#C49A6C" stroke="${O}" stroke-width="${S}" />`;
    const pod2 = `<path d="M18 22 C16 19 18 16 22 16 C27 16 29 19 27 23 C25 27 20 27 18 22 Z" fill="#B8895F" stroke="${O}" stroke-width="${S}" />`;
    const peanuts = `
      <ellipse cx="17" cy="15.5" rx="4" ry="2.7" fill="#EED9A6" stroke="${O}" stroke-width="1.8"/>
      <ellipse cx="22.5" cy="20.5" rx="4.2" ry="2.8" fill="#E6C99A" stroke="${O}" stroke-width="1.8"/>
      <path d="M16.2 14.7 C17.5 15.5 18.8 15.6 20.2 15" fill="none" stroke="#8B5E3C" stroke-width="1.4" stroke-linecap="round"/>
    `;
    const stalk = `<path d="M20 24V34" stroke="#6B4F2A" stroke-width="3" stroke-linecap="round" fill="none"/>`;
    return svgRoot(pod1 + pod2 + peanuts + stalk);
  },
  mustard: () => {
    const stem = `<path d="M20 10V34" stroke="#2E7D32" stroke-width="3" stroke-linecap="round" fill="none"/>`;
    const l1 = leaf(15.5, 20.5, 7, 3.8, -25, "#2E7D32");
    const l2 = leaf(24.5, 20.5, 7, 3.8, 25, "#2E7D32");
    const l3 = leaf(20, 27, 4.8, 2.6, 0, "#2E7D32");
    const seeds = `
      <g fill="#F4D03F" stroke="${O}" stroke-width="1.2">
        <circle cx="20" cy="14" r="1.4"/>
        <circle cx="18.5" cy="16" r="1.2"/>
        <circle cx="21.5" cy="16" r="1.2"/>
        <circle cx="19" cy="18" r="1.1"/>
        <circle cx="21" cy="18" r="1.1"/>
      </g>
    `;
    return svgRoot(stem + l1 + l2 + l3 + seeds);
  },
  sugarcane: () => {
    const stalks = `
      <rect x="17" y="10" width="6" height="22" rx="3" fill="#48A24E" stroke="${O}" stroke-width="${S}"/>
      <rect x="22" y="12" width="5.5" height="20" rx="2.8" fill="#3E8E41" stroke="${O}" stroke-width="${S}"/>
      <g fill="none" stroke="#2E7D32" stroke-width="2" stroke-linecap="round">
        ${[14, 18, 22, 26].map((y) => `<path d="M${17} ${y} H ${23}"/>`).join("")}
      </g>
    `;
    const leafTop = `<path d="M20 10 C16 6 13 7 12 9 C15 12 18 13 20 10 Z" fill="#2E7D32" stroke="${O}" stroke-width="${S}" stroke-linejoin="round"/>`;
    return svgRoot(stalks + leafTop);
  },
  onion: () => {
    const bulb = `
      <path d="M20 6 C27 6 34 13 34 20 C34 27 27 36 20 36 C13 36 6 27 6 20 C6 13 13 6 20 6 Z"
        fill="#F3D7C1" stroke="${O}" stroke-width="${S}"/>
      <path d="M20 9 C25 9 30 14 30 20 C30 26 25 31 20 31 C15 31 10 26 10 20 C10 14 15 9 20 9 Z"
        fill="#E7C6A8" stroke="${O}" stroke-width="${S}"/>
      <path d="M20 12 C24 12 27 15 27 20 C27 25 24 28 20 28 C16 28 13 25 13 20 C13 15 16 12 20 12 Z"
        fill="#F0D2B8" stroke="${O}" stroke-width="${S}"/>
      <path d="M20 6 L20 3" stroke="${O}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M18 6 L16 4" stroke="${O}" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M22 6 L24 4" stroke="${O}" stroke-width="1.8" stroke-linecap="round"/>
    `;
    return svgRoot(bulb);
  },
  potato: () => {
    const sprout = `<path d="M22 11 C21 8 18 8 17 11 C18 12 20 13 22 11 Z" fill="#2E7D32" stroke="${O}" stroke-width="${S}" stroke-linejoin="round"/>`;
    const body = `<path d="M20 7 C26 7 32 13 32 20 C32 27 26 34 20 34 C14 34 8 27 8 20 C8 13 14 7 20 7 Z"
      fill="#C08A5A" stroke="${O}" stroke-width="${S}"/>`;
    const eyes = `
      <g fill="none" stroke="#8B5E3C" stroke-width="2" stroke-linecap="round">
        <path d="M14 20 Q16 18 18 20 Q16 22 14 20 Z" />
        <path d="M20 22 Q22 20 24 22 Q22 24 20 22 Z" />
        <path d="M18 16 Q20 14 22 16 Q20 18 18 16 Z" />
        <path d="M23 19 Q25 17 26 19 Q25 21 23 19 Z" />
      </g>
    `;
    const lines = `
      <path d="M12 18 C15 16 18 15 20 15" fill="none" stroke="${O}" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M20 15 C24 15 27 16 30 19" fill="none" stroke="${O}" stroke-width="1.5" stroke-linecap="round"/>
    `;
    return svgRoot(body + lines + eyes + sprout);
  },
};

const CROP_FILES = [
  ["cotton", "cotton.svg"],
  ["wheat", "wheat.svg"],
  ["bajra (Pearl Millet)", "bajra-pearl-millet.svg"],
  ["rice", "rice.svg"],
  ["maize (corn)", "maize-corn.svg"],
  ["groundnut (peanut)", "groundnut-peanut.svg"],
  ["mustard", "mustard.svg"],
  ["sugarcane", "sugarcane.svg"],
  ["onion", "onion.svg"],
  ["potato", "potato.svg"],
];

function getKeyByFile(fileName) {
  const map = {
    "cotton.svg": "cotton",
    "wheat.svg": "wheat",
    "bajra-pearl-millet.svg": "bajra-pearl-millet",
    "rice.svg": "rice",
    "maize-corn.svg": "maize-corn",
    "groundnut-peanut.svg": "groundnut-peanut",
    "mustard.svg": "mustard",
    "sugarcane.svg": "sugarcane",
    "onion.svg": "onion",
    "potato.svg": "potato",
  };
  return map[fileName];
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

for (const [, fileName] of CROP_FILES) {
  const key = getKeyByFile(fileName);
  const svg = ICONS[key]();
  const filePath = path.join(OUTPUT_DIR, fileName);
  fs.writeFileSync(filePath, svg);
  console.log(`Wrote: ${filePath}`);
}

