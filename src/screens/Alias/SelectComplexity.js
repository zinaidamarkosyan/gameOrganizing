import { useState } from 'react'
import { RED, WHITE } from '@/theme/colors'
import { useDispatch, useSelector } from 'react-redux'
import { font, RH, RW } from '@/theme/utils'
import { useNavigation } from '@react-navigation/native'
import { setComplexity } from '@/store/Slices/AliasSlice'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import LinearGradient from 'react-native-linear-gradient'
import LightButton from '@/components/buttons/Button'

const SelectComplexity = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [btns, setBtns] = useState([
    { id: 1, name: 'Быстрая игра', complexity: 'Легкий', type: 'easy', check: false },
    { id: 2, name: 'Оптимус', complexity: 'Средний', type: 'average', check: false },
    { id: 3, name: 'Мозговой штурм', complexity: 'Сложный', type: 'difficult', check: false },
    { id: 4, name: 'Рулетка', complexity: 'От простого до сложного', type: 'random', check: false },
  ])
  const [error, setError] = useState(false)
  const handleSubmit = () => {
    if (!btns.filter((elm) => elm.check)?.length) {
      setError(true)
    } else {
      setError(false)
      dispatch(setComplexity(btns.filter((elm) => elm.check)[0]?.type))
      navigation.navigate('Commands')
    }
  }

  const EachBtn = ({ btn }) => {
    return (
      <Pressable
        style={styles.btnContainer}
        onPress={() => {
          setBtns([
            ...btns.map((elm, i) =>
              elm.id == btn.id ? { ...btn, check: true } : { ...elm, check: false },
            ),
          ])
        }}
      >
        {btn.check ? (
          <LinearGradient
            colors={['#7DCE8A', '#4D7CFE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            useAngle={true}
            angle={105}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={{
              width: '100%',
              height: '100%',
              zIndex: -1,
              position: 'absolute',
              opacity: 0.6,
              borderRadius: RW(20),
            }}
          ></LinearGradient>
        ) : (
          <LinearGradient
            colors={['#657AC5', '#657AC5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            useAngle={true}
            angle={105}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={{
              width: '100%',
              height: '100%',
              zIndex: -1,
              position: 'absolute',
              opacity: 0.6,
              borderRadius: RW(20),
            }}
          ></LinearGradient>
        )}
        <View style={styles.colBox}>
          <Text style={styles.btnName}>{btn.name}</Text>
          <Text style={styles.complexityText}>{btn.complexity}</Text>
        </View>
      </Pressable>
    )
  }
  return (
    <ScreenMask>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Уровень сложности</Text>
        <View style={{ alignSelf: 'center' }}>
          {btns.map((btn, i) => {
            return <EachBtn btn={btn} key={i} />
          })}
        </View>
      </View>
      {!!error && <Text style={styles.errorText}>Выберите сложность игры</Text>}
      <View style={styles.nextBtn}>
        <LightButton
          label={'Продолжить'}
          size={{ width: 281, height: 48 }}
          onPress={handleSubmit}
        />
      </View>
    </ScreenMask>
  )
}

export default SelectComplexity

const styles = StyleSheet.create({
  title: {
    ...font('bold', 24, WHITE),
    textAlign: 'center',
  },
  btnContainer: {
    width: RW(378),
    height: RH(78),
    marginTop: RH(12),
  },
  mainContainer: {
    flex: 0.55,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  btnName: {
    ...font('medium', 17, WHITE),
  },
  colBox: {
    flexDirection: 'column',
    height: '90%',
    justifyContent: 'space-around',
    paddingLeft: RW(25),
  },
  complexityText: {
    ...font('regular', 11, WHITE),
  },
  nextBtn: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: RH(60),
  },
  errorText: {
    textAlign: 'center',
    ...font('medium', 18, RED),
  },
})
