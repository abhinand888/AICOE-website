import './Home.css'

const social = [
  { name: 'YouTube', href: 'https://www.youtube.com/user/BITSpilaniTechMedia/videos' },
  { name: 'LinkedIn', href: 'https://in.linkedin.com/school/birla-institute-of-technology-and-science-pilani/' },
  { name: 'Instagram', href: 'https://www.instagram.com/bitspilaniofficial/' },
  { name: 'X / Twitter', href: 'https://twitter.com/bitspilaniindia' },
  { name: 'Facebook', href: 'https://www.facebook.com/universitybitspilani/' },
]

// Shared footer for every page. The home page passes id='contact' so the
// menu's Contact link can scroll to it.
export default function SiteFooter({ id }) {
  return (
  <footer id={id} className='home-footer'>
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
  )
}
