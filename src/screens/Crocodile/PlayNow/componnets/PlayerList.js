import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import User from '@/components/User/user'
import { font, RH, RW } from '@/theme/utils'
import { WHITE } from '@/theme/colors'

function PlayerList({ players, isSelected = false, activePlayers = [], setActivePlayers }) {
  const handlerActiveUser = (id) => {
    if (isSelected) {
      if (activePlayers.includes(id)) {
        const temp = activePlayers.filter((item, i) => item !== id)
        setActivePlayers(temp)
      } else {
        setActivePlayers([...activePlayers, id])
      }
    }
  }
  return (
    <View style={styles.container}>
      {players.map((item, i) => (
        <TouchableOpacity
          onPress={() => handlerActiveUser(item.id)}
          key={i}
          style={styles.activeItem}
        >
          <User
            size={70}
            user={item}
            onPressItem={
              !isSelected
                ? {
                    item: <User user={item} size={390} />,
                    modalClose: false,
                  }
                : null
            }
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  activeItem: {
    padding: RW(3),
    marginTop: RH(5),
  },
})

export default PlayerList
