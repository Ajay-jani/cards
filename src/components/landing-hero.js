const NAV_ITEMS = ['What We Do', 'Who We Are']

function createNavButtons() {
  return NAV_ITEMS.map(
    (item) => `
      <button class="nav-link" type="button">
        <span>${item}</span>
        <span class="nav-link__chevron" aria-hidden="true"></span>
      </button>
    `,
  ).join('')
}

export function createLandingHero() {
  const root = document.createElement('main')
  root.className = 'landing-shell'
  root.innerHTML = `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__media" aria-hidden="true">
        <div class="hero__backdrop"></div>
        <div class="hero__glow hero__glow--left"></div>
        <div class="hero__glow hero__glow--right"></div>
        <div class="hero__grid"></div>
      </div>

      <header class="site-header">
        <a class="site-brand" href="/" aria-label="Landmark Global Ventures home">
          <span class="site-brand__badge" aria-hidden="true">LGV</span>
          <span class="site-brand__wordmark">
            <span class="site-brand__eyebrow">Landmark</span>
            <span class="site-brand__name">Global Ventures</span>
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
        <div class="hero__eyebrow">Export strategy. Manufacturing reach. Global scale.</div>

        <div class="hero__text">
          <h1 class="hero__title" id="hero-title">
            GLOBAL TRADE.<br />
            MANUFACTURING PRECISION.
          </h1>
          <p class="hero__copy">
            Bridging the gap between Indian manufacturing excellence and global
            distribution. Landmark Global Ventures is your integrated partner
            for chemicals, plastics, and metals.
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

      <div id="capabilities" class="hero__anchor" aria-hidden="true"></div>
      <div id="partner" class="hero__anchor" aria-hidden="true"></div>
    </section>
  `

  return root
}
