import { useEffect, useRef } from 'react'
export const useGameSocketHelper = (socket, callBackFunc) => {
  const isMounted = useRef(false)

  useEffect(() => {
    if (socket && !isMounted.current) {
      isMounted.current = true
      socket.on('message', callBackFunc)
    }
    // return () => {
    //   socket?.off('message')
    // }
  }, [socket])

  return {}
}
