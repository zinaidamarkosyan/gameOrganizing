import React, { memo, useEffect } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import { getGames } from '@/store/Slices/GamesSlice'
import { useDispatch, useSelector } from 'react-redux'
import ListItem from './components/ListItem'
import { _storageUrl } from '@/constants'
import { clearInitialState } from '@/store/Slices/GameCreatingSlice'
const Index = ({ route }) => {
  const { list, fromTournament = null, gameWithQr } = route.params
  const { width } = Dimensions.get('window')
  const games = useSelector(({ games }) => games.games)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGames())
    dispatch(clearInitialState())
  }, [])

  return (
    <ScreenMask style={{ paddingHorizontal: 0 }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={true}
        pagingEnabled
        scrollEnabled
        decelerationRate={0.2}
        snapToAlignment="center"
        alwaysBounceHorizontal={false}
        horizontal
      >
        {games
          ?.filter((elem) => {
            if (
              gameWithQr &&
              (elem?.name == 'Элиас' || elem?.name == 'Крокодил' || elem?.name == 'Мафия')
            ) {
              return elem
            } else if (elem?.category?.name == list && !gameWithQr) {
              return elem
            }
          })
          ?.map((elem, index) => {
            return (
              <View
                key={elem._id}
                style={{
                  width: width,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ListItem
                  game={elem}
                  pressable={true}
                  qrGame={gameWithQr}
                  fromTournament={fromTournament}
                />
              </View>
            )
          })}
      </ScrollView>
    </ScreenMask>
  )
}

export default memo(Index)
