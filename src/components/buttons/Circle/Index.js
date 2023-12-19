import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CircleMain from '@/components/buttons/Circle/CircleMain'
import AddSvg from '@/assets/svgs/addSvg'
import HomeSvg from '@/assets/svgs/homeSvg'
import { RW } from '@/theme/utils'
import { TAB_BAR_HEIGHT } from '@/constants'

const CircleButton = ({ isHome, setIsHome, tabBarHidden }) => {
  const navigation = useNavigation()

  const press = () => {
    navigation.navigate(isHome ? 'Game' : 'Home')
    !isHome && setIsHome(!isHome)
  }

  return (
    <View style={[styles.circleContainer, { display: tabBarHidden ? 'none' : 'flex' }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={press}>
        <CircleMain size={64} label={isHome ? <AddSvg /> : <HomeSvg />} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  circleContainer: {
    width: RW(78),
    height: RW(78),
    bottom: TAB_BAR_HEIGHT - RW(78) / 2,
    padding: RW(8),
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: RW(39),
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default CircleButton
