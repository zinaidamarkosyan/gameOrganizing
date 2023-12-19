import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RH, RW, font } from '@/theme/utils'
import { BACKGROUND, ICON } from '@/theme/colors'

const CalendarDropDown = ({ setState, activeDate }) => {
  const activeDateYear = new Date()
  return (
    <View style={styles.container}>
      {[
        activeDateYear.getFullYear() - 1,
        activeDateYear.getFullYear(),
        activeDateYear.getFullYear() + 1,
        activeDateYear.getFullYear() + 2,
      ]?.map((year, i) => {
        return (
          <Pressable onPress={() => setState(year)} key={i} style={{ marginVertical: RH(4) }}>
            <Text
              style={[
                styles.settingsText,
                {
                  color: year == activeDate ? '#8B99CA' : ICON,
                },
              ]}
            >
              {year}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export default CalendarDropDown

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 333,
    width: RW(75),
    top: RH(60),
    right: RW(27),
    // flex: 1,
    backgroundColor: BACKGROUND,
    borderRadius: RW(12),
    borderWidth: RW(1),
    borderColor: '#657AC5',
    paddingVertical: RW(5),
    paddingHorizontal: RW(10),
    marginTop: RH(35),
    justifyContent: 'center',
  },
  settingsText: {
    ...font('bold', 14, ICON, 17),
    marginRight: RW(5),
  },
})
