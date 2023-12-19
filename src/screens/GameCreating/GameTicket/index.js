import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import Ticket from './ticket'
import { font, RH, RW } from '@/theme/utils'
import EditSvg from '@/assets/svgs/editSvg'
import CheckedCheckbox from '@/assets/svgs/checkedCheckbox'
import ShareSvg from '@/assets/svgs/shareSvg'
import { useNavigation } from '@react-navigation/native'
import { LIGHT_LABEL, WHITE } from '@/theme/colors'
import { useDispatch } from 'react-redux'
import { createGame } from '@/store/Slices/GameCreatingSlice'

function Index({ route }) {
  const navigation = useNavigation()
  const { game, data, initialState, name, dates } = route?.params?.params
  const dispatch = useDispatch()
  return (
    <ScreenMask style={{ paddingHorizontal: 0 }}>
      <View>
        <Ticket data={data} game={game} initialState={initialState} name={name} dates={dates} />
      </View>
      <View style={styles.gameTicketButtonsBlock}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('GameCreating', { screen: 'GameCreating', params: { game, name } })
          }}
        >
          <EditSvg />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <ShareSvg />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(
              createGame(
                {
                  ...initialState,
                  start_date: dates?.[0],
                  end_date: dates?.[1],
                },
                () => navigation.navigate('Home'),
              ),
            )
          }}
        >
          <CheckedCheckbox />
        </TouchableOpacity>
      </View>
    </ScreenMask>
  )
}

const styles = StyleSheet.create({
  gameTicketButtonsBlock: {
    width: '100%',
    height: RH(65),
    paddingHorizontal: RW(84),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: LIGHT_LABEL,
    position: 'absolute',
    bottom: 0,
  },
  shareButton: {
    position: 'absolute',
    bottom: '50%',
    left: '68%',
  },
  firstTicketModalBlock: {
    width: RW(306),
    height: RH(300),
    backgroundColor: LIGHT_LABEL,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: RW(20),
    alignItems: 'center',
  },
  text: {
    ...font('regular', 16, WHITE, 25),
    width: RW(200),
    textAlign: 'center',
    marginTop: RH(49),
    marginBottom: RH(31),
  },
  secondTicketModalBlock: {
    width: RW(306),
    height: RH(191),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_LABEL,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: RW(20),
  },
})

export default Index
