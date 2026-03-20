import './style.css'
import { createLandingHero } from './components/landing-hero.js'

const app = document.querySelector('#app')

if (app) {
  app.replaceChildren(createLandingHero())
}
