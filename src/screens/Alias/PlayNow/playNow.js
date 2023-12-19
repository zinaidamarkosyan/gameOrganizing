import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import { font, RH } from '@/theme/utils'
import { ICON } from '@/theme/colors'
import LightButton from '@/components/buttons/Button'
import { useNavigation } from '@react-navigation/native'
import User from '@/components/User/user'
import { useDispatch, useSelector } from 'react-redux'
import { setStart, startAliasGame } from '@/store/Slices/AliasSlice'

const PlayNow = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { aliasGameId, allTeams, playersInGame } = useSelector(({ alias }) => alias)
  return (
    <ScreenMask>
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.commandsConatainer}>
            {allTeams?.map((elm, i) => {
              return (
                <View key={i}>
                  <Text style={styles.commandName}>{elm?.value}</Text>
                  <View style={styles.eachCommandBox}>
                    {playersInGame.map((player, id) => {
                      if (allTeams[i].members.includes(player?._id)) {
                        return (
                          <View key={id}>
                            <User
                              size={70}
                              onPressItem={{
                                item: <User size={390} pressedUser={player} />,
                                modalClose: false,
                              }}
                              pressedUser={player}
                            />
                          </View>
                        )
                      }
                    })}
                  </View>
                </View>
              )
            })}
          </View>
        </ScrollView>
        <View>
          <View style={{ position: 'absolute', bottom: RH(50), alignSelf: 'center' }}>
            <LightButton
              size={{ width: 281, height: 48 }}
              label={'Продолжить'}
              white={'white'}
              background={'#7DCE8A'}
              bgColor={'#4D7CFE'}
              onPress={() => {
                dispatch(startAliasGame(aliasGameId))
                dispatch(setStart(true))
                navigation.navigate('GameStart')
              }}
            />
          </View>
        </View>
      </View>
    </ScreenMask>
  )
}

const styles = StyleSheet.create({
  commandName: {
    ...font('medium', 20, ICON),
    textAlign: 'left',
  },
  mainContainer: {
    flex: 1,
  },
  commandsConatainer: {
    paddingTop: RH(100),
  },
  eachCommandBox: {
    flexDirection: 'row',
    paddingVertical: RH(10),
  },
})
export default PlayNow
