import { NavLink, Link, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import bits from './assets/University_Logo_AllCampuses.png'

// All tools live on this site, so every link stays on our own deployment.
export const tools = [
  { path: '/crop_yield_prediction', label: 'Crop Yield Prediction' },
  { path: '/early_prediction', label: 'Early Prediction' },
  { path: '/next_crop_cycle', label: 'Next Crop Cycle Prediction' },
  { path: '/multi_horizon_prediction', label: 'Multi Horizon Prediction' },
  { path: '/variability_prediction', label: 'Variability Prediction' },
  { path: '/cyp_with_crop', label: 'CYP with Crop Model' },
  { path: '/farm_level_prediction', label: 'Farm Level Prediction' },
  { path: '/semantic_crop_segmentation', label: 'Semantic Crop Segmentation' },
  { path: '/crop_classification', label: 'Crop Classification' },
]

const sections = [
  { hash: '#consortium', label: 'Consortium' },
  { hash: '#related-projects', label: 'Related Projects' },
  { hash: '#contact', label: 'Contact' },
]

export default function SiteNav() {
  const { pathname } = useLocation()
  const onTool = tools.some((t) => t.path === pathname)

  return (
    <Navbar className='navbar' data-bs-theme='dark' expand='lg' collapseOnSelect>
      <Container fluid className='px-4'>
        <Navbar.Brand as={Link} to='/'>
          <img src={bits} alt='BITS Pilani' height={80} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='site-nav' />
        <Navbar.Collapse id='site-nav'>
          <Nav className='ms-auto site-nav-links'>
            <Nav.Link as={NavLink} to='/' end eventKey='home'>Home</Nav.Link>
            <NavDropdown title='Applications' id='apps-dropdown' active={onTool}>
              {tools.map((t) => (
                <NavDropdown.Item key={t.path} as={NavLink} to={t.path} eventKey={t.path}>
                  {t.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            {sections.map((s) => (
              <Nav.Link key={s.hash} as={Link} to={'/' + s.hash} eventKey={s.hash}>
                {s.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
