import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './Home.css'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import hero from './assets/ai_image.png'
import consortium from './assets/consortium.webp'
import img_crop_yield from './assets/apps/crop_yield.webp'
import img_early from './assets/apps/early.webp'
import img_next_cycle from './assets/apps/next_cycle.webp'
import img_variability from './assets/apps/variability.webp'
import img_crop_model from './assets/apps/crop_model.webp'
import img_farm_level from './assets/apps/farm_level.webp'
import img_segmentation from './assets/apps/segmentation.webp'
import img_classification from './assets/apps/classification.webp'
import overview from './assets/smart_agriculture_india.webp'

// Images that live on the BITS Pilani website. To host them yourself, put the
// files in src/assets/ and swap these URLs for imports.
const BITS = 'https://www.bits-pilani.ac.in/wp-content/uploads/'
const remote = {
  farm: BITS + 'farmlevel-1.jpg',
  segmentation: BITS + 'crop-segmentation-1.jpg',
  classification: BITS + 'crop-classification-1.jpg',
}

const applications = [
  {
    to: '/crop_yield_prediction',
    img: img_crop_yield,
    label: '01 / PREDICTION',
    title: 'Crop Yield Prediction',
    text: 'Estimate crop productivity using satellite-derived signals and contextual data.',
  },
  {
    to: '/early_prediction',
    img: img_early,
    label: '02 / EARLY INSIGHT',
    title: 'Early Prediction',
    text: 'Generate useful yield estimates before the end of the growing season.',
  },
  {
    to: '/next_crop_cycle',
    img: img_next_cycle,
    label: '03 / NEXT SEASON',
    title: 'Next Crop Cycle Prediction',
    text: 'Support forward-looking analysis for planning the next crop cycle.',
  },
  {
    to: '/multi_horizon_prediction',
    img: null, // no photo yet: card shows a blank square
    label: '04 / MULTI-YEAR',
    title: 'Multi Horizon Prediction',
    text: 'Predict crop yields for multiple future years.',
  },
  {
    to: '/variability_prediction',
    img: img_variability,
    label: '05 / VARIABILITY',
    title: 'Variability Prediction',
    text: 'Study differences in crop outcomes across locations and growing conditions.',
  },
  {
    to: '/cyp_with_crop',
    img: img_crop_model,
    label: '06 / CROP MODELS',
    title: 'CYP with Crop Model',
    text: 'Explore approaches that connect AI with process-based crop modelling.',
  },
  {
    to: '/farm_level_prediction',
    img: img_farm_level,
    pos: 'center 30%',
    label: '07 / FARM SCALE',
    title: 'Farm Level Prediction',
    text: 'Bring crop analytics closer to individual farms and field-level needs.',
  },
  {
    to: '/semantic_crop_segmentation',
    img: img_segmentation,
    label: '08 / COMPUTER VISION',
    title: 'Semantic Crop Segmentation',
    text: 'Use computer vision to distinguish crop regions in satellite imagery.',
  },
  {
    to: '/crop_classification',
    img: img_classification,
    pos: 'center 12%',
    label: '09 / COMPUTER VISION',
    title: 'Crop Classification',
    text: 'Use computer vision to identify which crop is grown in each field.',
  },
]

const relatedProjects = [
  'BITS Pilani: AI-intervened tribal development for water conservation, livelihood, and health (Ministry of Tribal Affairs)',
  'BITS Pilani: Sensor data augmentation for large-scale agronomic semantic segmentation of farmland (DST-SERB)',
  'Ongoing research project “An automatic multi-modal learning system for image/video analytics” (CRG-SERB)',
  'ISU: AIIRA ($20M) and COALESCE ($7M) NSF grants',
  'IIIT Hyderabad: eSAGU and Crop Darpan',
  'IFFCO-KISAN: Krishi Dev Gyan (KDG)',
]


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
              <span className='app-thumb'>
                {a.img && <img src={a.img} alt='' loading='lazy' style={a.pos ? { objectPosition: a.pos } : undefined} />}
                <span className='app-badge'>{a.label}</span>
              </span>
              <span className='app-body'>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <span className='app-cta'>Explore application <span aria-hidden='true'>↗</span></span>
              </span>
            </Link>
          ))}
        </div>

      </section>

      <section className='home-overview'>
        <img src={overview} alt='Smart agriculture across India: AI, a map of Indian states, and drone imaging over rice fields' />
      </section>

      <section id='consortium' className='home-section'>
        <h2 className='section-title'>Consortium</h2>
        <img className='consortium-img' src={consortium} loading='lazy'
          alt='AICoE consortium: BITS Pilani at the centre with IARI (crop omics and wet labs), IIIT Hyderabad (environmental sustainability, GIS and ICT for agriculture), Indian Statistical Institute (HSI analytics), Pixxel (HSI and satellite data), SAC (satellite technology and environmental science), IFFCO Kisan (experimental farms, digital twin, outreach), Iowa State University (AI, experimental farms, digital twin) and Wadhwani AI (AI and social connect)' />
      </section>

      <section id='related-projects' className='home-section'>
        <h2 className='section-title'>Other Information</h2>
        <h3 className='sub-title'>Related Projects/Initiatives of the consortium</h3>
        <ol className='related-list'>
          {relatedProjects.map((r) => <li key={r}>{r}</li>)}
        </ol>
      </section>

      <SiteFooter id='contact' />
    </div>
  )
}
