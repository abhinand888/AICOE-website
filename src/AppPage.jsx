import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './Home.css'
import SiteNav from './SiteNav'
import PageHeader from './PageHeader'
import SiteFooter from './SiteFooter'

// Simple page for an application whose interactive tool is not built yet.
// Fill in `highlights` or replace the body with the real tool later.
export default function AppPage({ title, tag, intro, highlights = [] }) {
  return (
    <>
      <SiteNav />
      <PageHeader title={title} subtitle={tag} />

      <section className='home app-page'>
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

      <SiteFooter />
    </>
  )
}
