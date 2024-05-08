/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const Dancing = ({ lucyAnim, reloadRef }) => {
  const rightRef = useRef()
  const leftRef = useRef()
  const upRef = useRef()
  const downRef = useRef()

  const comboRef = useRef()
  const comboCount = useRef(0)

  const timerRef = useRef(0)
  const waveRef = useRef(0)

  useFrame((state,delta) => {
    timerRef.current += delta

    const dist = 2
    const range = 1.5

    if (Math.floor(timerRef.current) != waveRef.current) {
      waveRef.current = Math.floor(timerRef.current)

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
    rightRef.current.position.z -= delta * dist
    if (rightRef.current.position.z < 0.0) {
      rightRef.current.position.z = -999
    } else if (rightRef.current.position.z < range) {
      rightRef.current.color = "white"
    } else {
      rightRef.current.color = "red"
    }

    leftRef.current.position.z -= delta * dist
    if (leftRef.current.position.z < 0.0) {
      leftRef.current.position.z = -999
    } else if (leftRef.current.position.z < range) {
      leftRef.current.color = "white"
    } else {
      leftRef.current.color = "red"
    }

    upRef.current.position.z -= delta * dist
    if (upRef.current.position.z < 0.0) {
      upRef.current.position.z = -999
    } else if (upRef.current.position.z < range) {
      upRef.current.color = "white"
    } else {
      upRef.current.color = "red"
    }

    downRef.current.position.z -= delta * dist
    if (downRef.current.position.z < 0.0) {
      downRef.current.position.z = -999
    } else if (downRef.current.position.z < range) {
      downRef.current.color = "white"
    } else {
      downRef.current.color = "red"
    }

  })

  const handleClick = (arrow) => {
    const range = 1.5

    let success = false

    if (arrow == "left") {
      if (leftRef.current.position.z < range && leftRef.current.position.z > 0.0) {
        //console.log("left")
        lucyAnim.current = "DancingLeft"
        leftRef.current.position.z = -999
        success = true
      }
    } else if (arrow == "right") {
      if (rightRef.current.position.z < range && rightRef.current.position.z > 0.0) {
        //console.log("right")
        lucyAnim.current = "DancingRight"
        rightRef.current.position.z = -999
        success = true
      }
    } else if (arrow == "up") {
      if (upRef.current.position.z < range && upRef.current.position.z > 0.0) {
        //console.log("up")
        lucyAnim.current = "DancingUp"
        upRef.current.position.z = -999
        success = true
      }
    } else if (arrow == "down") {
      if (downRef.current.position.z < range && downRef.current.position.z > 0.0) {
        //console.log("down")
        lucyAnim.current = "DancingDown"
        downRef.current.position.z = -999
        success = true
      }
    }

    if (success) {
      //console.log(comboRef.current)
      comboCount.current += 1
      comboRef.current.text = "Combo: " + comboCount.current

      reloadRef.current.currentTime = 0
      reloadRef.current.play()

      if (comboCount.current % 5 == 0) lucyAnim.current = "DancingTwirl"
    } else {
      comboCount.current = 0
      comboRef.current.text = "Combo: " + comboCount.current
    }
  }

  const pointerEnter = () => {
    document.body.style.cursor = 'pointer'
  }
  const pointerLeave = () => {
    document.body.style.cursor = 'auto'
  }
  
  const spacing = 0.75

  return (
    <group
      position={[-1,-.5,5]}
    >
      <Text
        ref={comboRef}
        position={[0, 3, 0]}
        rotation-y={Math.PI}
        color={"blue"}
        fontSize={.5}
      >
        Combo:
      </Text>
      <group
      >
        <Text
          ref={rightRef}
          position={[-spacing,0,-999]}
          color={"red"}
        >
          {"<"}
        </Text>
        <Text
          ref={leftRef}
          position={[spacing,0,-999]}
          color={"red"}
        >
          {">"}
        </Text>
        <Text
          ref={upRef}
          position={[0,spacing,-999]}
          color={"red"}
        >
          {"^"}
        </Text>
        <Text
          ref={downRef}
          position={[0,-spacing,-999]}
          color={"red"}
        >
          {"v"}
        </Text>
      </group>

      <group
      >
        <Text
          position={[-spacing,0,0]}
          color={"yellow"}
          onClick={()=>handleClick("right")}
          onPointerEnter={pointerEnter}
          onPointerLeave={pointerLeave}
        >
          {"<"}
        </Text>
        <Text
          position={[spacing,0,0]}
          color={"yellow"}
          onClick={()=>handleClick("left")}
          onPointerEnter={pointerEnter}
          onPointerLeave={pointerLeave}
        >
          {">"}
        </Text>
        <Text
          position={[0,spacing,0]}
          color={"yellow"}
          onClick={()=>handleClick("up")}
          onPointerEnter={pointerEnter}
          onPointerLeave={pointerLeave}
        >
          {"^"}
        </Text>
        <Text
          position={[0,-spacing,0]}
          color={"yellow"}
          onClick={()=>handleClick("down")}
          onPointerEnter={pointerEnter}
          onPointerLeave={pointerLeave}
        >
          {"v"}
        </Text>
      </group>
    </group>
  )
}

export default Dancing
