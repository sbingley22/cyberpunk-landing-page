/* eslint-disable react/no-unknown-property */
import { Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const Dancing = () => {
  const rightRef = useRef()
  const leftRef = useRef()
  const upRef = useRef()
  const downRef = useRef()

  const timerRef = useRef(0)
  const waveRef = useRef(0)

  useFrame((state,delta) => {
    timerRef.current += delta

    if (Math.floor(timerRef.current) != waveRef.current) {
      waveRef.current = Math.floor(timerRef.current)

      const dist = 2

      const chance = Math.floor(Math.random() * 4)
      if (chance == 0) {
        if (rightRef.current.position.z < -998) {
          rightRef.current.position.z = dist
        }
      } else if (chance == 1) {
        if (leftRef.current.position.z < -998) {
          leftRef.current.position.z = dist
        }
      } else if (chance == 2) {
        if (upRef.current.position.z < -998) {
          upRef.current.position.z = dist
        }
      } else if (chance == 3) {
        if (downRef.current.position.z < -998) {
          downRef.current.position.z = dist
        }
      }
    }

    // Move marker
    rightRef.current.position.z -= delta * 2
    if (rightRef.current.position.z < 0.0) {
      rightRef.current.position.z = -999
    } else if (rightRef.current.position.z < 0.5) {
      rightRef.current.color = "white"
    } else {
      rightRef.current.color = "red"
    }

    leftRef.current.position.z -= delta * 2
    if (leftRef.current.position.z < 0.0) {
      leftRef.current.position.z = -999
    } else if (leftRef.current.position.z < 0.5) {
      leftRef.current.color = "white"
    } else {
      leftRef.current.color = "red"
    }

    upRef.current.position.z -= delta * 2
    if (upRef.current.position.z < 0.0) {
      upRef.current.position.z = -999
    } else if (upRef.current.position.z < 0.5) {
      upRef.current.color = "white"
    } else {
      upRef.current.color = "red"
    }

    downRef.current.position.z -= delta * 2
    if (downRef.current.position.z < 0.0) {
      downRef.current.position.z = -999
    } else if (downRef.current.position.z < 0.5) {
      downRef.current.color = "white"
    } else {
      downRef.current.color = "red"
    }

  })

  const handleClick = (arrow) => {
    if (arrow == "left") {
      if (leftRef.current.position.z < 0.5 && leftRef.current.position.z > 0.0) {
        console.log("left")
      }
    } else if (arrow == "right") {
      if (rightRef.current.position.z < 0.5 && rightRef.current.position.z > 0.0) {
        console.log("right")
      }
    } else if (arrow == "up") {
      if (upRef.current.position.z < 0.5 && upRef.current.position.z > 0.0) {
        console.log("up")
      }
    } else if (arrow == "down") {
      if (downRef.current.position.z < 0.5 && downRef.current.position.z > 0.0) {
        console.log("down")
      }
    }

  }

  return (
    <group
      position={[-2,-.5,5]}
    >
      <group
      >
        <Text
          ref={rightRef}
          position={[-1,0,-999]}
          color={"red"}
        >
          {"<"}
        </Text>
        <Text
          ref={leftRef}
          position={[1,0,-999]}
          color={"red"}
        >
          {">"}
        </Text>
        <Text
          ref={upRef}
          position={[0,1,-999]}
          color={"red"}
        >
          {"^"}
        </Text>
        <Text
          ref={downRef}
          position={[0,-1,-999]}
          color={"red"}
        >
          {"v"}
        </Text>
      </group>

      <group
      >
        <Text
          position={[-1,0,0]}
          color={"yellow"}
          onClick={()=>handleClick("right")}
        >
          {"<"}
        </Text>
        <Text
          position={[1,0,0]}
          color={"yellow"}
          onClick={()=>handleClick("left")}
        >
          {">"}
        </Text>
        <Text
          position={[0,1,0]}
          color={"yellow"}
          onClick={()=>handleClick("up")}
        >
          {"^"}
        </Text>
        <Text
          position={[0,-1,0]}
          color={"yellow"}
          onClick={()=>handleClick("down")}
        >
          {"v"}
        </Text>
      </group>
    </group>
  )
}

export default Dancing
