const FIGMA_ASSETS = {
  background:
    'https://www.figma.com/api/mcp/asset/02fe5f3f-550f-49c7-891c-fa5e5c0f00ec',
  logo: 'https://www.figma.com/api/mcp/asset/15b71593-dc89-4284-80d7-1b25f4069714',
}

const NAV_ITEMS = ['What We Do', 'Who We Are']

function createChevron() {
  return `
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d="M5.589 7.244a.833.833 0 0 1 1.178 0L10 10.476l3.232-3.232a.833.833 0 1 1 1.178 1.178l-3.821 3.82a.833.833 0 0 1-1.178 0L5.589 8.422a.833.833 0 0 1 0-1.178Z"
        fill="currentColor"
      />
    </svg>
  `
}

function createNavButtons() {
  return NAV_ITEMS.map(
    (item) => `
      <button class="nav-link" type="button">
        <span>${item}</span>
        <span class="nav-link__chevron">${createChevron()}</span>
      </button>
    `,
  ).join('')
}

/**
 * Create the homepage hero matching the Figma-derived marketing design.
 * Remote image assets are preserved from the existing implementation.
 */
export function createLandingHero() {
  const root = document.createElement('main')
  root.className = 'landing-shell'
  root.innerHTML = `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__media" aria-hidden="true">
        <img
          class="hero__background"
          src="${FIGMA_ASSETS.background}"
          alt=""
          loading="eager"
          decoding="async"
        />
        <div class="hero__overlay"></div>
      </div>

      <header class="site-header">
        <a class="site-brand" href="/" aria-label="Landmark Global Ventures home">
          <img
            class="site-brand__mark"
            src="${FIGMA_ASSETS.logo}"
            alt="Landmark Global Ventures logo"
            loading="eager"
            decoding="async"
          />
          <span class="site-brand__copy">
            <span class="site-brand__title">Landmark</span>
            <span class="site-brand__subtitle">Global Ventures</span>
          </span>
        </a>

        <nav class="site-nav" aria-label="Primary navigation">
          ${createNavButtons()}
        </nav>

        <a class="button button--accent site-header__cta" href="#partner">
          <span class="button__label">Partner With Us</span>
        </a>
      </header>

      <div class="hero__content">
        <div class="hero__text">
          <h1 class="hero__title" id="hero-title">
            GLOBAL TRADE.<br />
            MANUFACTURING PRECISION.
          </h1>
          <p class="hero__copy">
            Bridging the gap between Indian manufacturing excellence and Global
            distribution. We are Landmark Global Ventures, your integrated
            partner for Chemicals, Plastics, and Metals.
          </p>
        </div>

        <div class="hero__actions">
          <a class="button button--light button--stripe" href="#capabilities">
            <span class="button__label">Explore Our Capabilities</span>
          </a>
          <a class="button button--accent button--stripe-muted" href="#partner">
            <span class="button__label">Partner With Us</span>
          </a>
        </div>
      </div>
    </section>
  `

  return root
}
