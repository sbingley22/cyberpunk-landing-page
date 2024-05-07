import { Canvas } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import Lucy from "./Lucy"
import { Environment, OrbitControls } from "@react-three/drei"

const Game = () => {
  const lucyAnim = useRef("Idle")
  
  return (
    <div className="container">
      <Canvas
        className="canvas"
        shadows
      >
        <Suspense>
          <OrbitControls
            minAzimuthAngle={-Math.PI / 4} // Limit horizontal rotation to -45 degrees
            maxAzimuthAngle={Math.PI / 4} // Limit horizontal rotation to 45 degrees
            minPolarAngle={Math.PI / 6} // Limit vertical rotation to 30 degrees
            maxPolarAngle={Math.PI - Math.PI / 6} // Limit vertical rotation to 150 degrees
          />

          <Environment preset="sunset" />

          <Lucy anim={lucyAnim} />

        </Suspense>
      </Canvas>
    </div>
  )
}

export default Game
