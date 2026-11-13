import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './Home.css'
import SiteNav from './SiteNav'
import hero from './assets/ai_image.png'

// Simple page for an application whose interactive tool is not built yet.
// Fill in `highlights` or replace the body with the real tool later.
export default function AppPage({ title, tag, intro, highlights = [] }) {
  return (
    <>
      <SiteNav />
      <div className='middle'>
        <img src={hero} className='hero-img' alt='AICoE: CoE AI for Agriculture @ BITS Pilani' />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ marginTop: 20, width: '90vw', paddingLeft: '8vw' }}>{title}</h2>
        <Button as={Link} to='/' style={{ height: '2.3rem', width: '5rem' }}>Back</Button>
      </div>

      <section className='home app-page'>
        {tag && <span className='app-tag'>{tag}</span>}
        <p className='app-page-intro'>{intro}</p>
        {highlights.length > 0 && (
          <ul className='app-page-points'>
            {highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        )}
        <p className='app-page-note'>
          The interactive tool for this application is being prepared. For details, please{' '}
          <Link to='/#contact'>contact the AICoE team</Link>.
        </p>
      </section>

      <div className='footer'>
        <div className='ftext'>
          <p>© {new Date().getFullYear()} BITS Pilani</p>
        </div>
      </div>
    </>
  )
}
