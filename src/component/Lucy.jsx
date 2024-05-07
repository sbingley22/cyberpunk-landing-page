/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from "@react-three/drei"
import glbFile from '../assets/LucyMainChar.glb?url'
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const Lucy = ({ anim }) => {
  const { scene, nodes, animations } = useGLTF(glbFile)
  const { actions, mixer } = useAnimations(animations, scene)
  const prevAnim = useRef(null)

  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta)=>{
    const updateAnimation = () => {
      if (anim.current == prevAnim.current) return
      
    }
    updateAnimation()

  })

  return (
    <>
      <primitive object={scene} dispose={null} />
    </>
  )
}

export default Lucy

useGLTF.preload(glbFile)