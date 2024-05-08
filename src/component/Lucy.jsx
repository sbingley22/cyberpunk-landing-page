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
  const gunRef = useRef(null)

  // Initial setup
  useEffect(()=>{
    //console.log(actions)
    //console.log(nodes)

    Object.keys(nodes).forEach( (nodeName) => {
      const node = nodes[nodeName]
      node.frustumCulled = false

      if (nodeName == "Pistol") {
        gunRef.current = node
        node.visible = false
      }
      if (nodeName == "Ana") node.castShadow

    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // Mixer
  useEffect(()=>{
    const oneShots = [
      "Pistol Fire", 
      "DancingRight", 
      "DancingLeft", 
      "DancingUp", 
      "DancingDown", 
      "DancingTwirl"
    ]

    oneShots.forEach( (shot) => {
      actions[shot].repetitions = 1
      actions[shot].clampWhenFinished = true
    })

    mixer.addEventListener('finished', () => {
      if (anim.current == "Pistol Fire") anim.current = "Pistol Aim"
      else if (anim.current == "DancingLeft") anim.current = "Dancing"
      else if (anim.current == "DancingRight") anim.current = "Dancing"
      else if (anim.current == "DancingUp") anim.current = "Dancing"
      else if (anim.current == "DancingDown") anim.current = "Dancing"
    })

    return () => mixer.removeEventListener('finished')

  }, [actions, mixer, anim])

  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta)=>{
    const updateAnimation = () => {
      if (!anim.current) anim.current = "Idle"
      if (anim.current == prevAnim.current) return
      if (prevAnim.current == null) prevAnim.current = anim.current

      //console.log(prevAnim.current)
      actions[prevAnim.current].fadeOut(0.2)
      actions[anim.current].reset().fadeIn(0.2).play()

      prevAnim.current = anim.current
    }
    updateAnimation()

    const updateModel = () => {
      if (!gunRef.current) return

      if (anim.current.includes("Pistol")) gunRef.current.visible = true
      else gunRef.current.visible = false
    }
    updateModel()

  })

  return (
    <group ref={group} position-x={0.5}>
      <primitive object={scene} dispose={null} />
    </group>
  )
}

export default Lucy

useGLTF.preload(glbFile)