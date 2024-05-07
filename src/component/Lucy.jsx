/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from "@react-three/drei"
import glbFile from '../assets/LucyMainChar.glb?url'
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { useEffect } from "react"

const Lucy = ({ anim }) => {
  const { scene, nodes, animations } = useGLTF(glbFile)
  const { actions, mixer } = useAnimations(animations, scene)

  const prevAnim = useRef(null)
  const group = useRef()

  useEffect(()=>{
    //console.log(actions)
    //group.current.rotation.y = Math.PI
  },[])

  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta)=>{
    const updateAnimation = () => {
      if (!anim.current) anim.current = "Idle"
      if (anim.current == prevAnim.current) return
      if (prevAnim.current == null) prevAnim.current = anim.current
      //console.log(prevAnim.current)
      actions[prevAnim.current].fadeOut(0.2)
      actions[anim.current].reset().fadeIn(0.2).play()
    }
    updateAnimation()

  })

  return (
    <group ref={group}>
      <primitive object={scene} dispose={null} />
    </group>
  )
}

export default Lucy

useGLTF.preload(glbFile)