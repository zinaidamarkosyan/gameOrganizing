import { StyleSheet } from 'react-native'
import React from 'react'
import CrocodileLoader from '../components/CrocodileLoader'
import ScreenMask from '@/components/wrappers/screen'

const WaitPlayers = () => {
  return (
    <ScreenMask>
      <CrocodileLoader />
    </ScreenMask>
  )
}

export default WaitPlayers

const styles = StyleSheet.create({})
