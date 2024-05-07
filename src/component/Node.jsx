/* eslint-disable react/prop-types */
import { Text } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"

const Node = ({ name, label, setPage, position }) => {
  const [hovered, setHovered] = useState(false)
  const ref = useRef()

  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer'
    return () => (document.body.style.cursor = 'auto')
  }, [hovered])

  return (
    <Text 
      ref={ref}
      color={hovered ? "white" : "black"} 
      anchorX="center"
      anchorY="middle"
      fontSize={.5}
      position={position}
      onClick={()=>setPage(name)}
      onPointerEnter={()=>setHovered(true)}
      onPointerLeave={()=>setHovered(false)}
    >
      {label}
    </Text>
  )
}

export default Node
