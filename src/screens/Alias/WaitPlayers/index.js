import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AliasLoader from '../components/AliasLoader'
import ScreenMask from '@/components/wrappers/screen'

const WaitPlayers = () => {
  return (
    <ScreenMask>
      <AliasLoader />
    </ScreenMask>
  )
}

export default WaitPlayers

const styles = StyleSheet.create({})
