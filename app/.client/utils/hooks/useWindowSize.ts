import { useEffect, useState } from 'react'

/**
 * If this hook is used in an embedded app, it will calculate the width of the embedded page's viewport.
 * Otherwise, it will calculate the actual size of the browser
 *
 * Please use this with caution since most pages of our app is embedded.
 */
export default function useWindowSize() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    function updateSize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', updateSize)

    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}
