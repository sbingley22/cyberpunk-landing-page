/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Html } from '@react-three/drei'
import HeroPage from './HeroPage'
import AboutPage from './AboutPage'

const HeroHtml = ({ page, setPage, isMobile }) => {
  const xStyle = {
    textAlign: "right",
    position: "absolute",
    border: "1px solid green",
    color: "green",
    top: 0,
    left: 0,
  }

  if (!page) return
  if (page == "target") return
  if (page == "dance") return

  return (
    <group position={isMobile ? [3.0, 8.0, 9] : [0,8,9]}>
      <Html className={isMobile ? 'hero-html mobile' : 'hero-html'}>
        <button 
          onClick={()=>setPage(null)}
          style={xStyle}
        >
          X
        </button>

        { page == "hero" && <HeroPage /> }

        { page == "about" && <AboutPage /> }

      </Html>
    </group>
  )
}

export default HeroHtml
