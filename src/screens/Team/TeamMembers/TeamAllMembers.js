import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import BgMyTem from '@/assets/bgMyTem'
import { useDispatch, useSelector } from 'react-redux'
import { RH, RW } from '@/theme/utils'
import { WHITE } from '@/theme/colors'
import EachMember from './EachMember'
const SearchMemberResult = () => {
  const dispatch = useDispatch()
  const { members } = useSelector(({ teams }) => teams)

  return (
    <ScrollView style={{ flex: 1 }}>
      {members?.map((member, i) => {
        return <EachMember member={member} key={i} />
      })}
    </ScrollView>
  )
}

export default SearchMemberResult

const styles = StyleSheet.create({})
