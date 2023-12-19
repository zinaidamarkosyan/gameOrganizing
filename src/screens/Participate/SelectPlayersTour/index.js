import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import Modal from '@/components/modal'
import User from '@/components/User/user'
import Button from '@/components/buttons/Button'
import { RH, RW } from '@/theme/utils'
import { LIGHT_LABEL } from '@/theme/colors'
import FastImage from 'react-native-fast-image'

function Index({ route, navigation }) {
  const [isVisible, setIsVisible] = useState(false)
  const [user, setUser] = useState([])
  const { item, isTeam } = route.params

  const handlerActiveUser = (id) => {
    if (user.includes(id)) {
      const temp = user.filter((item, i) => item !== id)
      setUser(temp)
    } else {
      setUser([...user, id])
    }
  }
  const handleSubmit = () => {
    if (user.length > 0) {
      if (isTeam === 'Индивидуальный') {
        navigation.navigate('DataGame', { isTeam })
      } else {
        navigation.navigate('DataGameTeam', { isTeam })
      }
    } else {
      setIsVisible(true)
    }
  }

  return (
    <ScreenMask>
      <View style={styles.titleBlock}>
        <View style={styles.imageBlock}>
          <FastImage style={styles.image} resizeMode="contain" source={{ uri: item.image }} />
        </View>
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.container}>
          {[1, 2, 3, 4].map((item, i) => (
            <TouchableOpacity
              onPress={() => handlerActiveUser(item.id)}
              key={i}
              style={user.includes(item.id) ? styles.activeItem : styles.item}
            >
              <User size={90} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.btn}>
        <Button
          onPress={() => navigation.navigate('TournamentTicket')}
          size={{ width: 281, height: 48 }}
          label={'Подтвердить'}
        />
      </View>
      <View style={{ position: 'absolute' }}>
        <Modal
          modalClose={false}
          modalVisible={isVisible}
          setIsVisible={setIsVisible}
          item={
            <View style={styles.secondTicketModalBlock}>
              <Text style={styles.text}>
                Необходимо утвердить состав игроков команды {'\n'} на игру!
              </Text>
            </View>
          }
        />
      </View>
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
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
  text: {
    ...font('regular', 16, WHITE, 25),
    width: RW(200),
    textAlign: 'center',
    marginTop: RH(49),
    marginBottom: RH(31),
  },

  btn: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: RH(85),
  },
  titleBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBlock: {
    width: RW(50),
    height: RW(50),
    borderRadius: RW(50),
    marginRight: RW(15),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: RW(50),
  },
  title: {
    textAlign: 'center',
    ...font('bold', 24, WHITE),
    marginVertical: RH(30),
  },
  scroll: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: RW(310),
    height: RH(600),
    flexGrow: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },

  item: {
    padding: RW(3),
    marginTop: RH(30),
  },
  activeItem: {
    padding: RW(3),
    marginTop: RH(30),
    borderWidth: 1,
    borderColor: '#7DCE8A',
    borderRadius: RW(15),
  },
})

export default Index
