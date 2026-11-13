import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import bits from './assets/University_Logo_AllCampuses.png'

// All tools live on this site, so every link stays on our own deployment.
export const tools = [
  { path: '/', label: 'Crop Yield Prediction' },
  { path: '/cyp_with_crop', label: 'CYP with Crop' },
  { path: '/early_prediction', label: 'Early Prediction' },
  { path: '/variability_prediction', label: 'Variability Prediction' },
  { path: '/next_crop_cycle', label: 'Next Crop Cycle' },
]

export default function SiteNav() {
  return (
    <Navbar className='navbar' data-bs-theme='dark' expand='lg'>
      <Container fluid className='px-4'>
        <Navbar.Brand as={NavLink} to='/'>
          <img src={bits} alt='BITS Pilani' height={80} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='site-nav' />
        <Navbar.Collapse id='site-nav'>
          <Nav className='ms-auto site-nav-links'>
            {tools.map((t) => (
              <Nav.Link key={t.path} as={NavLink} to={t.path} end>
                {t.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
