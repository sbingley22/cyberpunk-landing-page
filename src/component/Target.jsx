/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import { Sphere } from "@react-three/drei"

const Target = ({ id, x, y, removeTarget }) => {

  const handleClick = () => {
    removeTarget(id)
  }
  
  return (
    <>
      <group
        position={[x,y,0]}
      >
        <Sphere 
          castShadow
          receiveShadow
          onClick={handleClick}
        ><meshStandardMaterial color={"red"} /></Sphere>
      </group>
    </>
  )
}

export default Target
