import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { BACKGROUND, ICON, RED, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'
import MapSvg from '@/assets/svgs/mapSvg'
import { useNavigation } from '@react-navigation/native'

function Map({ placeholder, data, setData, errorText, width, availablePress }) {
  const [value, setValue] = useState('')
  const navigation = useNavigation()
  return (
    <>
      <Pressable
        onPress={() => navigation.navigate('Map')}
        style={[
          styles.mapInputBlock,
          width
            ? {
                width: RW(width),
                alignSelf: 'center',
                marginLeft: 0,
                justifyContent: 'space-between',
              }
            : null,
        ]}
      >
        {!availablePress ? (
          <Text style={styles.mapInput}>{placeholder}</Text>
        ) : (
          <TextInput
            style={{ ...styles.mapInput, color: WHITE }}
            value={value}
            onChangeText={(ev) => {
              setValue(ev)
              setData({ ...data, addressValue: ev })
            }}
            placeholder={placeholder}
            placeholderTextColor={ICON}
          />
        )}
        <TouchableOpacity>
          <MapSvg />
        </TouchableOpacity>
      </Pressable>
      {errorText && !value ? (
        <Text style={{ ...font('regular', 16, RED, 24), marginLeft: RW(12) }}>{errorText}</Text>
      ) : null}
    </>
  )
}
const styles = StyleSheet.create({
  mapInputBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: RW(11),
    paddingRight: RW(17),
    width: RW(375),
    height: RH(48),
    backgroundColor: BACKGROUND,
    borderRadius: RW(10),
  },
  mapInput: {
    paddingLeft: RW(24),
    color: ICON,
  },
})

export default Map
