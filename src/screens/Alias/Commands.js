import { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { font, RH, RW } from '@/theme/utils'
import { sendAliasSettings, setTeams } from '@/store/Slices/AliasSlice'
import { useNavigation } from '@react-navigation/native'
import { BACKGROUND, ICON, RED, WHITE } from '@/theme/colors'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import DeleteIconSVG from '@/assets/svgs/DeleteIconSVG'
import CircleAdd from '@/components/buttons/circleAdd'
import ScreenMask from '@/components/wrappers/screen'
import LightButton from '@/components/buttons/Button'

const Commands = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { countWords, allTeams, complexity, time, penalty } = useSelector(({ alias }) => alias)
  const [error, setError] = useState(false)
  // const [input, setInput] = useState(`Команда ${elm.command}`)

  const handleSubmit = async () => {
    let error = false
    setError(false)
    for (let elem of allTeams) {
      if (!elem.value) {
        setError(true)
        error = true
      }
    }
    if (!error) {
      setError(false)
      dispatch(setTeams(allTeams))
      dispatch(
        sendAliasSettings(
          {
            number_of_words: countWords,
            round_time: time,
            pass_fee: penalty,
            type: complexity,
            teams: allTeams.map((elm) => elm.value),
          },
          allTeams,
        ),
      )
      navigation.navigate('QrCode')
    }
  }
  return (
    <ScreenMask>
      <View
        style={{
          justifyContent: 'center',
          flex: 0.8,
        }}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.myCommands}>Мои команды</Text>
          <View>
            {allTeams.map((elm, i) => {
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }} key={i}>
                  <View style={styles.inputBlock}>
                    <TextInput
                      style={styles.priceInputText}
                      placeholder={`Команда ${elm.command}`}
                      // value={`Команда ${elm.command}`}
                      onChangeText={(e) => {
                        dispatch(
                          setTeams([
                            ...allTeams.map((elm, ind) => {
                              return i == ind ? { ...elm, value: e } : elm
                            }),
                          ]),
                        )
                      }}
                      placeholderTextColor={ICON}
                    />
                  </View>
                  {allTeams.length !== 2 ? (
                    <Pressable
                      onPress={() =>
                        allTeams.length !== 1
                          ? allTeams.length == 3
                            ? dispatch(
                                setTeams([
                                  { command: 1, value: 'Команда 1', members: [], points: 0 },
                                  { command: 2, value: 'Команда 2', members: [], points: 0 },
                                ]),
                              )
                            : dispatch(setTeams([...allTeams.filter((elem) => elm !== elem)]))
                          : null
                      }
                    >
                      <DeleteIconSVG />
                    </Pressable>
                  ) : null}
                </View>
              )
            })}
          </View>
          {allTeams.length !== 5 ? (
            <Pressable
              style={styles.addCommandBox}
              onPress={() =>
                dispatch(
                  setTeams([
                    ...allTeams,
                    {
                      command: allTeams[allTeams.length - 1].command + 1,
                      value: `Команда ${allTeams[allTeams.length - 1].command + 1}`,
                      members: [],
                      points: 0,
                    },
                  ]),
                )
              }
            >
              <CircleAdd />
              <Text style={styles.addCommandText}>Добавить еще</Text>
            </Pressable>
          ) : null}
          {error && <Text style={styles.errorText}>Заполните все поля</Text>}
          <View style={{ paddingTop: RH(30) }}>
            <LightButton
              label={'Продолжить'}
              size={{ width: 310, height: 45 }}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>
    </ScreenMask>
  )
}

export default memo(Commands)

const styles = StyleSheet.create({
  myCommands: {
    ...font('regular', 24, WHITE),
    textAlign: 'center',
    paddingVertical: RH(30),
  },
  mainContainer: {
    width: RW(310),
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  inputBlock: {
    backgroundColor: BACKGROUND,
    width: '100%',
    flexDirection: 'column',
    borderRadius: RW(8),
    marginVertical: RH(10),
    alignItems: 'center',
  },
  priceInputText: {
    color: ICON,
    width: '80%',
    height: RH(48),
    marginLeft: RW(15),
    fontSize: RW(16),
  },

  addCommandBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '47%',
    paddingVertical: RH(15),
    justifyContent: 'space-between',
  },
  addCommandText: {
    ...font('regular', 12, WHITE),
  },
  errorText: {
    ...font('regular', 17, RED, 24),
  },
})
