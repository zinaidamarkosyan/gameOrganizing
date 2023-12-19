import React, { useRef, useState } from 'react'
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RH, RW, font } from '@/theme/utils'
import Modal from '@/components/modal'
import DeleteIconSVg from '@/assets/svgs/DeleteIconSVG'
import { _storageUrl } from '@/constants'
import LightButton from '@/components/buttons/Button'
import DarkButton from '@/components/buttons/DarkButton'
import { deleteMemberChat, deleteOrganizerChat } from '@/store/Slices/ChatsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setTookPartGames } from '@/store/Slices/AuthSlice'
import { deletePlayerFromTeam, setMyTeams } from '@/store/Slices/TeamSlice'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import { DARK_BLUE, ICON, LIGHT_GRAY, LIGHT_RED, WHITE } from '@/theme/colors'

function ChatItem({ id, item, type, playersLength }) {
  const navigation = useNavigation()
  const [animation] = useState(new Animated.Value(RW(95)))
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [back, setBack] = useState(false)

  const { user } = useSelector(({ auth }) => auth)
  const { myTeams } = useSelector(({ teams }) => teams)
  const dispatch = useDispatch()
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 2)
      },

      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 86) {
          setSwipeDirection('right')
        } else {
          setSwipeDirection('left')
        }
        animation.setValue(gestureState.dx)
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.moveX < 160) {
          setDeleting(true)
          Animated.timing(animation, {
            toValue: 20,
            duration: 200,
            useNativeDriver: true,
          }).start()
        } else {
          Animated.timing(animation, {
            toValue: 20,
            duration: 200,
            useNativeDriver: true,
          }).start()
        }
      },
    }),
  ).current

  return (
    <View style={styles.layer}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          width: RW(372),
          zIndex: -33,
        }}
      >
        <View style={{ width: '80%' }}></View>
        <TouchableOpacity
          style={{ width: '20%' }}
          onPress={() => {
            setDeleting(true)
          }}
        >
          <DeleteIconSVg />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.containerr,
          { transform: [{ translateX: swipeDirection == 'right' ? RW(95) : animation }] },
        ]}
        {...panResponder.panHandlers}
      >
        <Pressable
          onPressIn={() => {
            setBack(true)
          }}
          onPressOut={() => {
            setBack(false)
          }}
          onPress={() =>
            navigation.navigate('PrivateChat', {
              id: item._id,
              type: type,
              playersLength: playersLength,
            })
          }
          style={styles.chatItemBlock}
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
                width: '130%',
                height: '150%',
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
                width: '130%',
                height: '150%',
                zIndex: -1,
                alignSelf: 'center',
                position: 'absolute',
                opacity: 0.8,
                borderRadius: RW(10),
              }}
            ></LinearGradient>
          )}

          <FastImage
            style={styles.chatItemImg}
            resizeMode="contain"
            source={{ uri: _storageUrl + (item?.img || item?.game?.img) }}
          />
          <Text style={styles.itemData}>
            {`${item?.createdAt?.substring(0, 10)} ${new Date(item?.createdAt)
              .toTimeString()
              .substring(0, 5)} ${item?.address_name || item?.game?.name}`}
          </Text>
          <Text style={styles.time}>1:01</Text>
        </Pressable>
      </Animated.View>
      {deleting && (
        <Modal
          modalVisible={deleting}
          setIsVisible={setDeleting}
          btnClose={false}
          item={
            <View style={styles.modalBlock}>
              <Text style={styles.modalText}>Вы точно хотите удалить игру и чат?</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                  paddingVertical: RW(20),
                  alignSelf: 'center',
                }}
              >
                <LightButton
                  onPress={() => {
                    if (type == 'Участник') {
                      dispatch(deleteMemberChat(item?._id, setDeleting))
                      dispatch(
                        setTookPartGames(
                          user?.took_part_games?.filter((elm) => elm._id !== item?._id),
                        ),
                      )
                    } else if (type == 'Командный') {
                      dispatch(deletePlayerFromTeam(item?.id, () => setDeleting(false)))
                      dispatch(setMyTeams(myTeams?.filter((elm) => elm._id !== item?._id)))
                    }
                  }}
                  size={{ width: 100, height: 36 }}
                  label={'Да'}
                />
                <DarkButton
                  onPress={() => setDeleting(false)}
                  size={{ width: 100, height: 36 }}
                  label={'Нет'}
                />
              </View>
            </View>
          }
        />
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: RH(56),
    alignItems: 'center',
  },
  containerr: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: '103%',
    height: '101%',
    right: RW(279),
    overflow: 'visible',
  },
  layer: {
    width: RW(368),
    alignSelf: 'center',
    marginBottom: RH(9),
    overflow: 'visible',
    backgroundColor: LIGHT_RED,
    borderRadius: RW(10),
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },

  modalBlock: {
    width: RW(260),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: RW(10),
    backgroundColor: DARK_BLUE,
  },
  modalText: {
    padding: RH(20),
    textAlign: 'center',
    ...font('regular', 21, WHITE, 26),
  },
  title: {
    ...font('bold', 24, LIGHT_GRAY, 29),
    marginBottom: RW(27),
  },
  chatItemImg: {
    width: RW(42),
    height: RH(43),
    borderRadius: RH(22),
  },
  chatItemBlock: {
    backgroundColor: ICON,
    width: '100%',
    borderRadius: RW(10),
    paddingLeft: RW(13),
    paddingTop: RH(17),
    paddingBottom: RH(17),
    paddingRight: RW(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  itemData: {
    ...font('bold', 18, WHITE, 20),
    width: RW(245),
  },
  time: {
    ...font('regular', 14, WHITE, 20),
    marginBottom: RH(20),
    marginRight: RW(10),
  },
})

export default ChatItem
