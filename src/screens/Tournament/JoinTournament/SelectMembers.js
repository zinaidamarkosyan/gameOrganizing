import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { RH, RW, font } from '@/theme/utils'
import { WHITE } from '@/theme/colors'
import { _storageUrl } from '@/constants'
import LightButton from '@/components/buttons/Button'
import User from '@/components/User/user'
import BorderGradient from '@/assets/svgs/BorderGradiend'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

const SelectMembers = ({ route }) => {
  const props = route?.params
  const navigation = useNavigation()
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [reservedUsers, setReservedUsers] = useState([])
  const handleClick = (user) => {
    if (!reservedUsers.includes(user)) {
      setReservedUsers([...reservedUsers, user])
    } else {
      setReservedUsers(reservedUsers.filter((elm) => elm !== user))
    }
  }
  const handleSubmit = () => {
    navigation.navigate('EachTournament', { data: props })
  }
  const EachUser = ({ user }) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: RW(5),
        }}
      >
        <BorderGradient height={142} width={105} opacity={reservedUsers.includes(user) ? 1 : 0} />
        <Pressable
          style={{
            position: 'absolute',
            zIndex: 65,
          }}
          onPress={() => handleClick(user)}
        >
          <User
            size={100}
            zoom={true}
            onPressItem={{
              item: <User size={390} />,
              modalClose: false,
              onClickFunc: () => handleClick(user),
            }}
          />
        </Pressable>
      </View>
    )
  }
  console.log(props.command)
  return (
    <ScreenMask>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={styles.header}>
          <View style={styles.headerChild}>
            <FastImage
              source={{ uri: _storageUrl + props?.command?.img }}
              style={styles.commandImg}
              resizeMode="cover"
            />
            <Text style={styles.teamName}>{props?.command?.name}</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.usersContainer}>
            {test.map((user, i) => {
              return <EachUser key={i} user={user} />
            })}
          </View>
        </ScrollView>
        <View style={{ alignSelf: 'center', paddingBottom: RH(50) }}>
          <LightButton
            label={'Подтвердить'}
            size={{ width: 280, height: 43 }}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScreenMask>
  )
}

export default SelectMembers

const styles = StyleSheet.create({
  commandImg: {
    width: RW(40),
    height: RH(40),
    borderRadius: RW(20),
    right: '20%',
    borderWidth: 2,
    borderColor: WHITE,
  },
  headerChild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingTop: '5%',
  },
  teamName: {
    ...font('medium', 20, WHITE),
  },
  usersContainer: {
    width: '96%',
    paddingTop: '11%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
})
