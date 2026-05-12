import '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js primitives
      mesh: any
      group: any
      points: any
      
      // Geometries
      bufferGeometry: any
      boxGeometry: any
      planeGeometry: any
      sphereGeometry: any
      circleGeometry: any
      torusGeometry: any
      icosahedronGeometry: any
      
      // Materials
      meshBasicMaterial: any
      meshStandardMaterial: any
      meshPhysicalMaterial: any
      meshNormalMaterial: any
      pointsMaterial: any
      
      // Lights
      ambientLight: any
      pointLight: any
      spotLight: any
      directionalLight: any
      hemisphereLight: any
      
      // Buffer attributes
      bufferAttribute: any
    }
  }
}

export {}
