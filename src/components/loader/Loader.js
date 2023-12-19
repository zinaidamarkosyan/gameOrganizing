import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { WHITE } from '@/theme/colors'
import { useSelector } from 'react-redux'

const Loader = ({ children }) => {
  const pending = useSelector(({ auth }) => auth.pending)
  return (
    <View style={{ flex: 1 }}>
      {pending && (
        <ActivityIndicator
          size="large"
          style={{
            position: 'absolute',
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.6)',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          color={WHITE}
        />
      )}

      {children}
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})
