import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './Home.css'
import SiteNav from './SiteNav'
import hero from './assets/ai_image.png'
import overview from './assets/Project OverviewOne-Pager Professional Docs Banner in Black White Sleek Monochrome Style.png'

// Images that live on the BITS Pilani website. To host them yourself, put the
// files in src/assets/ and swap these URLs for imports.
const BITS = 'https://www.bits-pilani.ac.in/wp-content/uploads/'
const remote = {
  farm: BITS + 'farmlevel-1.jpg',
  segmentation: BITS + 'crop-segmentation-1.jpg',
  classification: BITS + 'crop-classification-1.jpg',
  consortium: BITS + 'Pictures.jpg',
}

const applications = [
  {
    to: '/crop_yield_prediction',
    title: 'Crop Yield Prediction',
    text: 'District-level yield prediction for Wheat (SaTran foundation model) and Corn (CropYieldNet) from Landsat-8 imagery.',
    tag: 'Wheat · Corn',
    icon: 'M3 20h18M6 16v-5M10 16V8M14 16v-6M18 16V5',
  },
  {
    to: '/early_prediction',
    title: 'Early Prediction',
    text: 'Yield forecasts up to 8 weeks before harvest, showing how accuracy improves week by week.',
    tag: 'Wheat · Rice',
    icon: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  },
  {
    to: '/next_crop_cycle',
    title: 'Next Crop Cycle Prediction',
    text: 'Predicts the coming season’s yield and gives district-wise advisories to plan ahead.',
    tag: 'Wheat · Rice',
    icon: 'M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4',
  },
  {
    to: '/variability_prediction',
    title: 'Variability Prediction',
    text: 'Yield prediction that accounts for within-district variability, compared against the standard model.',
    tag: 'Wheat · Rice',
    icon: 'M3 17l5-6 4 4 5-7 4 5M3 21h18',
  },
  {
    to: '/cyp_with_crop',
    title: 'CYP with Crop Model',
    text: 'Hybrid model combining the SaTran foundation model with the APSIM crop simulation model.',
    tag: 'Hybrid Model',
    icon: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3',
  },
]

const upcoming = [
  { title: 'Farm Level Prediction', img: remote.farm },
  { title: 'Semantic Crop Segmentation', img: remote.segmentation },
  { title: 'Crop Classification', img: remote.classification },
]

const relatedProjects = [
  'BITS Pilani: AI-intervened tribal development for water conservation, livelihood, and health (Ministry of Tribal Affairs)',
  'BITS Pilani: Sensor data augmentation for large-scale agronomic semantic segmentation of farmland (DST-SERB)',
  'Ongoing research project “An automatic multi-modal learning system for image/video analytics” (CRG-SERB)',
  'ISU: AIIRA ($20M) and COALESCE ($7M) NSF grants',
  'IIIT Hyderabad: eSAGU and Crop Darpan',
  'IFFCO-KISAN: Krishi Dev Gyan (KDG)',
]

const social = [
  { name: 'YouTube', href: 'https://www.youtube.com/user/BITSpilaniTechMedia/videos' },
  { name: 'LinkedIn', href: 'https://in.linkedin.com/school/birla-institute-of-technology-and-science-pilani/' },
  { name: 'Instagram', href: 'https://www.instagram.com/bitspilaniofficial/' },
  { name: 'X / Twitter', href: 'https://twitter.com/bitspilaniindia' },
  { name: 'Facebook', href: 'https://www.facebook.com/universitybitspilani/' },
]

function Icon({ d }) {
  return (
    <svg viewBox='0 0 24 24' width='28' height='28' fill='none' stroke='currentColor'
      strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
      <path d={d} />
    </svg>
  )
}

// Hide a remote image (and show the fallback styling) if it fails to load.
const hideOnError = (e) => { e.currentTarget.style.display = 'none' }

export default function Home() {
  const { hash } = useLocation()

  // Scroll to #section when arriving from another page's menu.
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    const el = document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <div className='home'>
      <SiteNav />

      <header className='middle'>
        <img src={hero} className='hero-img' alt='AICoE: CoE AI for Agriculture @ BITS Pilani' />
      </header>

      <section className='home-mission'>
        <p className='eyebrow'>AICoE · BITS Pilani</p>
        <h1>Ensuring Food Security through AI &amp; Satellite Imaging Technology Assisted Robust Agriculture at Scale.</h1>
      </section>

      <section id='applications' className='home-section'>
        <h2 className='section-title'>Applications</h2>
        <div className='app-grid'>
          {applications.map((a) => (
            <Link key={a.to} to={a.to} className='app-card'>
              <span className='app-icon'><Icon d={a.icon} /></span>
              <span className='app-tag'>{a.tag}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <span className='app-cta'>Open tool →</span>
            </Link>
          ))}
        </div>

        <h3 className='sub-title'>Coming soon</h3>
        <div className='upcoming-grid'>
          {upcoming.map((u) => (
            <div key={u.title} className='upcoming-card'>
              <img src={u.img} alt={u.title} loading='lazy' onError={hideOnError} />
              <span>{u.title}</span>
            </div>
          ))}
        </div>
      </section>

      <section className='home-overview'>
        <img src={overview} alt='AI for agriculture: satellite imaging across India' />
      </section>

      <section id='consortium' className='home-section'>
        <h2 className='section-title'>Consortium</h2>
        <img className='consortium-img' src={remote.consortium} alt='AICoE consortium partners'
          loading='lazy' onError={hideOnError} />
      </section>

      <section id='related-projects' className='home-section'>
        <h2 className='section-title'>Other Information</h2>
        <h3 className='sub-title'>Related Projects/Initiatives of the consortium</h3>
        <ol className='related-list'>
          {relatedProjects.map((r) => <li key={r}>{r}</li>)}
        </ol>
      </section>

      <footer id='contact' className='home-footer'>
        <div className='footer-cols'>
          <div>
            <h4>AICoE</h4>
            <p>Ensuring Food Security through AI &amp; Satellite Imaging Technology Assisted Robust Agriculture at Scale.</p>
            <div className='social'>
              {social.map((s) => (
                <a key={s.name} href={s.href} target='_blank' rel='noreferrer'>{s.name}</a>
              ))}
            </div>
          </div>
          <div>
            <h4>BITS Pilani Campus</h4>
            <p>Birla Institute of Technology &amp; Science, Pilani<br />Pilani Campus<br />
              Vidya Vihar, Pilani<br />Rajasthan - 333031, India</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p><strong>Chief Project Manager:</strong> Prof. Navneet Goyal<br />
              <strong>Project Manager:</strong> Prof. Poonam Goyal<br />
              Department of Computer Science,<br />BITS Pilani, Pilani Campus</p>
          </div>
        </div>
        <div className='footer-bottom'>
          <p>An Institution Deemed to be University estd. vide Sec.3 of the UGC Act,1956 under notification # F.12-23/63.U-2 of Jun 18,1964</p>
          <p>© {new Date().getFullYear()} BITS Pilani</p>
        </div>
      </footer>
    </div>
  )
}
