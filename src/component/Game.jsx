/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import Lucy from "./Lucy"
import { Environment, OrbitControls } from "@react-three/drei"
import ShadowCatcher from "./ShadowCatcher"
import HeroHtml from "./HeroHtml"
import Node from "./Node"
import TargetPractice from "./TargetPractice"
import Dancing from "./Dancing"

const Game = () => {
  // eslint-disable-next-line no-unused-vars
  const [lowEndDevice, setLowEndDevice] = useState(false)
  const [page, setPage] = useState(null)

  const lucyAnim = useRef("Idle")
  
  // Click Events
  useEffect(() => {
    const handleClick = () => {
      if (page == "target") {
        lucyAnim.current = "Pistol Fire"
      }

    }
    
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [page])

  // Anim change
  useEffect(() => {
    if (page == "target") {
      lucyAnim.current = "Pistol Fire"
      //console.log("target started")
    } else if (page == "dance") {
      lucyAnim.current = "Dancing"
    } else {
      lucyAnim.current = "Idle"
    }

  }, [page])
  
  return (
    <div className="container">
      <Canvas
        className="canvas"
        shadows
        dpr={lowEndDevice ? 0.2 : 0.6}
      >
        <Suspense fallback={null}>
          <OrbitControls
            minAzimuthAngle={-Math.PI / 8}
            maxAzimuthAngle={Math.PI / 8}
            minPolarAngle={Math.PI * 0.4}
            maxPolarAngle={Math.PI * 0.6}
            enablePan={false}
            minDistance={3}
            maxDistance={4}
          />

          <group position={[0,-2,2]} rotation-y={Math.PI} >
            <Environment preset="sunset" />
            <directionalLight intensity={0.5} position={[0,5,1]} castShadow />

            <ShadowCatcher />

            <Lucy anim={lucyAnim} />

            <HeroHtml page={page} setPage={setPage} />

            { page == "target" &&
              <TargetPractice />
            }

            { page == "dance" &&
              <Dancing />
            }

          </group>

          <Node 
            name={"hero"}
            label={"Hero Page"}
            setPage={setPage}
            position={[-1,3,-2]}
          />

          <Node 
            name={"about"}
            label={"About Page"}
            setPage={setPage}
            position={[3,6,-6]}
          />

          <Node 
            name={"target"}
            label={"Target Practice"}
            setPage={setPage}
            position={[-4,5.8,-5]}
          />

          <Node 
            name={"dance"}
            label={"Dance Dance"}
            setPage={setPage}
            position={[3,3.0,-3]}
          />

        </Suspense>
      </Canvas>
    </div>
  )
}

export default Game
