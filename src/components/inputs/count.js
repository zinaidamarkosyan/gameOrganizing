import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { BACKGROUND, ICON } from '@/theme/colors'
import { RH, RW } from '@/theme/utils'
import { useDispatch } from 'react-redux'
import {
  setAge_restrictions_from,
  setAge_restrictions_to,
  setNumber_of_players_from,
  setNumber_of_players_to,
} from '@/store/Slices/GameCreatingSlice'

const Count = ({ placeholder, width, type, value, countType }) => {
  const dispatch = useDispatch()
  return (
    <TextInput
      onChangeText={(number) => {
        if (type === 'player') {
          countType === 'from'
            ? dispatch(setNumber_of_players_from(+number))
            : dispatch(setNumber_of_players_to(+number))
        } else if (type === 'age') {
          countType === 'from'
            ? dispatch(setAge_restrictions_from(+number))
            : dispatch(setAge_restrictions_to(+number))
        }
      }}
      value={value?.toString()}
      keyboardType={'numeric'}
      style={{ ...styles.countInput, width: width || RW(124) }}
      placeholder={placeholder}
      placeholderTextColor={ICON}
    />
  )
}
const styles = StyleSheet.create({
  countInput: {
    height: RH(50),
    backgroundColor: BACKGROUND,
    borderRadius: RW(10),
    paddingLeft: RW(24),
    flexDirection: 'row',
    alignItems: 'center',
    color: ICON,
  },
})

export default Count
