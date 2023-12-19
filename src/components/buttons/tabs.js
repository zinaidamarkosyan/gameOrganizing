import React, { useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import ProfileActiveIcon from '@/assets/imgs/ProfileActiveIcon'
import { TAB_BAR_COLOR, TRANSPARENT } from '@/theme/colors'
import ChatActiveIcon from '@/assets/imgs/ChatActiveIcon'
import ProfileIcon from '@/assets/imgs/ProfileIcon'
import { TAB_BAR_HEIGHT } from '@/constants'
import { RH, RW, font, shadow } from '@/theme/utils'
import ChatIcon from '@/assets/imgs/ChatIcon'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

const TabBarButton = ({ state, descriptors, navigation, setIsHome, tabBarHidden }) => {
  const messagesCount = useSelector(({ app }) => app.messagesCount)
  useEffect(() => {
    setIsHome(state.index === 0)
  }, [state.index])

  return (
    <View style={{ ...styles.tabBar, display: tabBarHidden ? 'none' : 'flex' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const isFocused = state.index === index
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            // The merge: true option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        let TabIcon
        if (route.name === 'Profile') {
          TabIcon = isFocused ? ProfileActiveIcon : ProfileIcon
        } else if (route.name === 'Chat') {
          TabIcon = isFocused ? ChatActiveIcon : ChatIcon
        }

        if (!TabIcon || state.index === 4) return null

        return (
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            key={index?.toString()}
            onLongPress={onLongPress}
            accessibilityRole="button"
            testID={options.tabBarTestID}
            style={{ alignItems: 'center' }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            {route.name === 'Chat' && messagesCount ? (
              <LinearGradient
                style={styles.notificationCount}
                colors={['#7DCE8A', '#4D7CFE']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.notificationCountText}>{messagesCount}</Text>
              </LinearGradient>
            ) : null}
            <TabIcon height={RH(27)} width={RH(27)} />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default TabBarButton

const styles = StyleSheet.create({
  tabBar: {
    alignItems: 'center',
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT,
    paddingVertical: RH(20),
    borderTopColor: TRANSPARENT,
    justifyContent: 'space-around',
    backgroundColor: TAB_BAR_COLOR,
    ...shadow,
  },
  notificationCount: {
    width: RW(12),
    height: RW(12),
    borderRadius: RW(8),
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCountText: font('bold', 8, '#1A2848'),
})
