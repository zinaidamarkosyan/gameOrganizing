import { RH, RW, font } from '@/theme/utils'
import { _storageUrl } from '@/constants'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { getMyTeams, saveTeamDataForCreating } from '@/store/Slices/TeamSlice'
import ScreenMask from '@/components/wrappers/screen'
import Modal from '@/components/modal'
import LightButton from '@/components/buttons/Button'
import DarkButton from '@/components/buttons/DarkButton'
import EachCommand from './EachCommand'
import { LIGHT_LABEL, WHITE } from '@/theme/colors'
import FastImage from 'react-native-fast-image'

function Index({ route }) {
  const props = route.params

  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  const { myTeams } = useSelector(({ teams }) => teams)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyTeams(setModalVisible))
    dispatch(saveTeamDataForCreating({}))
  }, [])

  const ModalItem = () => {
    return (
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>У Вас еще нет своей команды. Создать команду?</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
            paddingVertical: RH(20),
          }}
        >
          <LightButton
            label={'Да'}
            size={{ width: 100 }}
            onPress={() => {
              setModalVisible(false)
              navigation.navigate('CreateTeamTitle')
            }}
          ></LightButton>
          <DarkButton
            label={'Нет'}
            size={{ width: 100 }}
            onPress={() => {
              setModalVisible(false)
              if (props?.navigateFrom == 'RatePlayerModal') {
                navigation.navigate('CreateGameNavigator', {
                  screen: 'RatePlayers',
                  params: { ...route.params.body, navigateFrom: 'MyTeam' },
                })
              } else {
                navigation.navigate('Home')
              }
            }}
          ></DarkButton>
        </View>
      </View>
    )
  }

  return (
    <ScreenMask>
      <View
        style={{
          flex: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}
      >
        <FastImage
          resizeMode="contain"
          style={{ width: RW(360), position: 'absolute', height: RW(360) }}
          source={require('@/assets/bgLogo.png')}
        />
        <View
          style={{
            width: RW(360),
            height: RW(360),
            borderRadius: RW(180),
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Text style={styles.title}>Мои команды</Text>
        {modalVisible && (
          <Modal
            modalVisible={modalVisible}
            setIsVisible={setModalVisible}
            item={<ModalItem />}
            btnClose={false}
            navigationText={'teamStart'}
          />
        )}
        {myTeams?.length ? (
          myTeams?.map((command, i) => <EachCommand data={props} command={command} key={i} />)
        ) : (
          <View style={{ alignSelf: 'center' }}>
            <Text style={styles.text}>Загрузка...</Text>
          </View>
        )}
      </ScrollView>
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    ...font('bold', 20, WHITE),
    marginVertical: RH(15),
  },
  modalContainer: {
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    alignSelf: 'center',
    width: RW(306),
    minHeight: RH(191),
    padding: RW(35),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalText: {
    ...font('bold', 17, WHITE),
    textAlign: 'center',
  },
  text: {
    marginVertical: RH(3),
    ...font('bold', 14, WHITE),
    flexGrow: 1,
    flexWrap: 'nowrap',
    width: '74%',
  },
})

export default Index
