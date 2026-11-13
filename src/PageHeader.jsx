import { Link } from 'react-router-dom'
import hero from './assets/ai_image.png'

// Compact header used on every tool page in place of the full banner.
export default function PageHeader({ title, subtitle }) {
  return (
    <header className='page-header'>
      <div className='page-header-art' style={{ backgroundImage: `url(${hero})` }} aria-hidden='true' />
      <div className='page-header-inner'>
        <nav className='crumbs' aria-label='Breadcrumb'>
          <Link to='/'>Home</Link>
          <span aria-hidden='true'>/</span>
          <Link to='/#applications'>Applications</Link>
          <span aria-hidden='true'>/</span>
          <span aria-current='page'>{title}</span>
        </nav>
        <div className='page-header-row'>
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <Link to='/' className='btn-back'>
            <span aria-hidden='true'>←</span> Back to Home
          </Link>
        </div>
      </div>
    </header>
  )
}
