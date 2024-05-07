import { Canvas } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import Lucy from "./Lucy"
import { Environment, OrbitControls } from "@react-three/drei"
import ShadowCatcher from "./ShadowCatcher"

const Game = () => {
  const lucyAnim = useRef("Idle")
  
  return (
    <div className="container">
      <Canvas
        className="canvas"
        shadows
        dpr={0.2}
      >
        <Suspense>
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

          </group>

        </Suspense>
      </Canvas>
    </div>
  )
}

export default Game
