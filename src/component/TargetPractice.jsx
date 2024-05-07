/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react"
import Target from "./Target"
import { Text } from "@react-three/drei"


const TargetPractice = () => {
  const [startTime, setStartTime] = useState(null)
  const [timeTaken, setTimeTaken] = useState(null)
  const [targets, setTargets] = useState([])

  //Spawn targets
  useEffect(()=>{
    if (targets.length > 0) return

    const time = new Date().getTime()
    setStartTime(time)

    if (startTime) {
      const timeElapsed = time-startTime
      setTimeTaken(timeElapsed)
    }

    const tempTargets = []

    for (let index = 0; index < 5; index++) {
      let tx = 0
      let ty = 0

      const d = 4
      if (index == 1) {
        tx = d * 2
        ty = -d
      } else if (index == 2) {
        tx = -d * 2
        ty = -d
      } else if (index == 3) {
        tx = d * 2
        ty = d
      } else if (index == 4) {
        tx = -d * 2
        ty = d
      }

      const rx = (Math.random() - 0.5) * 3
      const ry = (Math.random() - 0.5) * 3

      tx += rx
      ty += ry

      tempTargets.push({
        id: "t" + index,
        x: tx,
        y: ty
      })      
    }

    setTargets(tempTargets)
    //console.log(tempTargets)

  }, [startTime, targets])

  const removeTarget = (id) => {
    const tempTargets = targets.filter((target) => (target.id != id))
    setTargets(tempTargets)
  }

  return (
    <group position={[0,0,15]}>
      { targets.map( (target) => (
        <Target key={target.id} id={target.id} x={target.x} y={target.y} removeTarget={removeTarget} />
      ))}

      { timeTaken && 
        <Text
          position-y={5}
          rotation={[0, Math.PI, 0]}
          color={"red"}
        >
          Time: {Math.floor(timeTaken /10)/100}s
        </Text>
      }
    </group>
  )
}

export default TargetPractice
