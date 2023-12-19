import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { BACKGROUND, ICON } from '@/theme/colors'
import SearchSvg from '@/assets/svgs/searchSvg'
import { RH, RW } from '@/theme/utils'

function Map(props) {
  const [value, setValue] = useState('')
  const { width } = props
  return (
    <>
      <View
        style={[
          styles.mapInputBlock,
          width
            ? {
                alignSelf: 'center',
                marginLeft: 0,
                justifyContent: 'space-between',
              }
            : null,
        ]}
      >
        <TextInput
          style={{ ...styles.mapInput, width: width }}
          value={value}
          onChangeText={(ev) => {
            setValue(ev)
          }}
          placeholder={'Поиск'}
          placeholderTextColor={ICON}
        />
        <TouchableOpacity>
          <SearchSvg />
        </TouchableOpacity>
      </View>
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
