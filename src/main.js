import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Landmark Global Ventures</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    @font-face {
      font-family: "Ethnocentric";
      font-style: normal;
      font-weight: 400;
      src: local("Ethnocentric"), local("Arial"), local("sans-serif");
    }
    @font-face {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 400;
      src: local("Poppins"), local("Arial"), local("sans-serif");
    }
    @font-face {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 500;
      src: local("Poppins"), local("Arial"), local("sans-serif");
    }
    @font-face {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      src: local("Poppins"), local("Arial"), local("sans-serif");
    }
  </style>
</head>
<body class="bg-[#000000] text-white overflow-hidden">
  <div class="relative min-h-screen">
    <div class="absolute left-0 top-0 h-[856px] w-[1920px]">
      <img
        src="https://www.figma.com/api/mcp/asset/02fe5f3f-550f-49c7-891c-fa5e5c0f00ec"
        alt="Hero background"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.36) 0%, rgba(0,0,0,0) 24.444%), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);"></div>
    </div>

    <header class="absolute left-1/2 top-0 z-30 w-[1920px] -translate-x-1/2 px-[88px] py-[16px] flex items-center justify-between bg-[rgba(0,0,0,0.5)] backdrop-blur-[4px] border-b border-[rgba(255,255,255,0.1)]">
      <div class="h-[61.701px] w-[64.73px]">
        <img
          src="https://www.figma.com/api/mcp/asset/15b71593-dc89-4284-80d7-1b25f4069714"
          alt="Logo"
          class="h-full w-full object-contain"
        />
      </div>
      <nav class="flex items-center gap-[24px]">
        <button class="flex items-center gap-[8px] text-white font-[Poppins] font-semibold text-[18px] leading-[24px] whitespace-nowrap">
          What We Do
          <img src="https://www.figma.com/api/mcp/asset/db321208-3be8-4b76-8a0f-87b0ad40c5f1" alt="down" class="h-[20px] w-[20px]" />
        </button>
        <button class="flex items-center gap-[8px] text-white font-[Poppins] font-semibold text-[18px] leading-[24px] whitespace-nowrap">
          Who We Are
          <img src="https://www.figma.com/api/mcp/asset/db321208-3be8-4b76-8a0f-87b0ad40c5f1" alt="down" class="h-[20px] w-[20px]" />
        </button>
      </nav>
      <a href="#partner" class="relative inline-flex h-[56px] min-w-[276px] items-center justify-center rounded-[8px] bg-[#65D15B] text-[#1F1F31] text-[16px] leading-[24px] font-[Poppins] font-medium">
        Partner With Us
      </a>
    </header>

    <main class="absolute left-[calc(50%-0.5px)] top-[calc(50%+47px)] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-[44px] text-center w-full">
      <div class="flex flex-col items-center gap-[16px] max-w-[1100px]">
        <h1 class="font-[Ethnocentric] text-[60px] leading-[52px] tracking-[0.01em] text-white">
          GLOBAL TRADE.<br />
          MANUFACTURING PRECISION.
        </h1>
        <p class="font-[Poppins] text-[20px] leading-[30px] max-w-[760px]">
          Bridging the gap between Indian manufacturing excellence and Global distribution.
          We are Landmark Global Ventures—your integrated partner for Chemicals, Plastics, and Metals.
        </p>
      </div>

      <div class="flex items-center gap-[24px]">
        <a class="relative inline-flex h-[56px] min-w-[276px] items-center justify-center rounded-[8px] bg-white text-[#1F1F31] text-[16px] leading-[24px] font-[Poppins] font-medium">
          <span class="absolute left-0 top-0 h-[56px] w-[27.5px] bg-[#65D15B] rounded-l-[8px]"></span>
          <span class="relative">Explore Our Capabilities</span>
        </a>

        <a class="relative inline-flex h-[56px] min-w-[276px] items-center justify-center rounded-[8px] bg-[#65D15B] text-[#1F1F31] text-[16px] leading-[24px] font-[Poppins] font-medium">
          <span class="absolute left-0 top-0 h-[56px] w-[27.5px] bg-[#1F1F31] opacity-10 rounded-l-[8px]"></span>
          <span class="relative">Partner With Us</span>
        </a>
      </div>
    </main>
  </div>
</body>
</html>

`

setupCounter(document.querySelector('#counter'))
