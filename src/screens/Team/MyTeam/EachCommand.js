import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { RH, RW, font } from '@/theme/utils'
import { _storageUrl } from '@/constants'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import { WHITE } from '@/theme/colors'

const EachCommand = ({ command, data }) => {
  const [back, setBack] = useState(false)
  const navigation = useNavigation()
  return (
    <Pressable
      style={styles.homeBlock}
      onPressIn={() => {
        setBack(true)
      }}
      onPressOut={() => {
        if (data?.navigateFrom == 'RatePlayerModal') {
          navigation.navigate('CreateGameNavigator', {
            screen: 'RatePlayers',
            params: { ...data.body, navigateFrom: 'MyTeam', inviteCommand: command },
          })
        } else if (data?.fromTournament) {
          navigation.replace('TournamentNavigator', {
            screen: 'SelectMembers',
            params: { command: command, data: data },
          })
          setBack(false)
        } else {
          setBack(false)
          navigation.navigate('MyTeamInfo', { command })
        }
      }}
    >
      {!back ? (
        <LinearGradient
          colors={['#7DCE8A', '#4D7CFE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0 }}
          useAngle={true}
          angle={105}
          angleCenter={{ x: 0.5, y: 0.5 }}
          style={{
            width: '100%',
            height: '100%',
            zIndex: -1,
            alignSelf: 'center',
            opacity: 0.6,
            position: 'absolute',
            borderRadius: RW(10),
          }}
        ></LinearGradient>
      ) : (
        <LinearGradient
          colors={['#7DCE8A', '#4D7CFE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0 }}
          useAngle={true}
          angle={105}
          angleCenter={{ x: 0.5, y: 0.5 }}
          style={{
            width: '100%',
            height: '100%',
            zIndex: -1,
            alignSelf: 'center',
            position: 'absolute',
            opacity: 0.8,
            borderRadius: RW(10),
          }}
        ></LinearGradient>
      )}
      <View
        style={{
          zIndex: 1,
          marginLeft: RW(10),
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={styles.imageBlock}>
          <FastImage
            style={styles.image}
            source={{ uri: _storageUrl + command?.img }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.text}>{command.name}</Text>
          <Text style={styles.text}>{command.address_name}</Text>
          <Text style={styles.text}>{command.id}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  homeBlock: {
    width: RW(395),
    height: RH(111),
    marginVertical: RW(6),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  imageBlock: {
    width: RW(80),
    height: RW(80),
    borderWidth: 1,
    borderRadius: 50,
    borderColor: WHITE,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  image: {
    borderWidth: 1,
    borderRadius: RW(50),
    width: '100%',
    height: '100%',
  },
  text: {
    marginVertical: RH(3),
    ...font('bold', 14, WHITE),
    flexGrow: 1,
    flexWrap: 'nowrap',
    width: '74%',
  },
  textBlock: {
    width: '100%',
    marginLeft: RW(15),
  },
})

export default EachCommand
