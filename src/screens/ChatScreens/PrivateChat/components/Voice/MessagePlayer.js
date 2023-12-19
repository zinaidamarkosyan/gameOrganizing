import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Row from '@/components/wrappers/row'
import { font, RH, RW, shadow } from '@/theme/utils'
import { BACKGROUND, BLACK, ICON } from '@/theme/colors'
import PouseSvg from './Assets/PouseSvg'
import PlaySvg from './Assets/PlaySvg'
import { _storageUrl } from '@/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setPausedMessageId, setPlayMessageId } from '@/store/Slices/ChatsSlice'

const screenWidth = Dimensions.get('screen').width

const audioRecorderPlayer = new AudioRecorderPlayer()
audioRecorderPlayer.setSubscriptionDuration(0.05)
const MessagePlayer = ({ messageId, path, duration = '00:00:00' }) => {
  const [playTime, setPlayTime] = useState('00:00:00')
  const [playWidth, setPlayWidth] = useState(0)
  const [stoped, setStoped] = useState(true)

  const dispatch = useDispatch()
  const { playMessageId, pausedMessageId } = useSelector(({ chats }) => chats)

  const onStartPlay = async () => {
    if (pausedMessageId == messageId) {
      setStoped(false)
      await audioRecorderPlayer.resumePlayer()
      dispatch(setPausedMessageId(null))
    } else {
      setPlayWidth(0)
      if (!stoped) {
        await audioRecorderPlayer.stopPlayer()
        setStoped(true)
      }

      dispatch(setPlayMessageId(messageId))
      setStoped(false)
      await audioRecorderPlayer.startPlayer(_storageUrl + path)
      try {
        audioRecorderPlayer.addPlayBackListener(async (e) => {
          setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
          setPlayWidth((e.currentPosition / e.duration) * (screenWidth - 180))
          if (e.currentPosition == e.duration) {
            audioRecorderPlayer.removePlayBackListener()
            dispatch(setPlayMessageId(null))
            if (!stoped) {
              await audioRecorderPlayer.stopPlayer()
              setStoped(true)
            }
          }
        })
      } catch (err) {
        console.log('startPlayer error', err)
      }
    }
  }
  const onStopPlay = async () => {
    setStoped(true)
    await audioRecorderPlayer.pausePlayer()
    dispatch(setPausedMessageId(messageId))
    dispatch(setPlayMessageId(messageId))
  }

  return (
    <Row wrapper={styles.container}>
      {playMessageId == messageId && pausedMessageId != messageId ? (
        <Pressable
          onPress={() => {
            onStopPlay()
          }}
        >
          <PouseSvg fill={ICON} />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            onStartPlay()
          }}
        >
          <PlaySvg fill={ICON} />
        </Pressable>
      )}

      <View style={{ height: '100%', justifyContent: 'space-between' }}>
        <Pressable style={styles.viewBarWrapper}>
          <View style={styles.viewBar}>
            <View
              style={[styles.viewBarPlay, { width: playMessageId == messageId ? playWidth : 0 }]}
            />
          </View>
        </Pressable>
        <Text style={styles.txtCounter}>
          {`${playMessageId == messageId ? playTime : '00:00:00'} / ${duration}`}
        </Text>
      </View>
    </Row>
  )
}

export default MessagePlayer

const styles = StyleSheet.create({
  container: {
    ...shadow,
    height: RH(55),
    shadowColor: BLACK,
    paddingLeft: RW(8),
    paddingRight: RW(8),
    flexDirection: 'row',
    borderRadius: RW(12),
    alignItems: 'center',
    paddingVertical: RH(10),
    backgroundColor: BACKGROUND,
    justifyContent: 'space-between',
  },
  viewBarWrapper: {
    width: screenWidth - 180,
  },
  viewBar: {
    backgroundColor: ICON,
    height: 6,
    borderRadius: 3,
    alignSelf: 'stretch',
    width: screenWidth - 180,
    marginBottom: 6,
  },
  viewBarPlay: {
    backgroundColor: 'rgba(10, 13, 58, 1)',
    height: 6,
    borderRadius: 3,
    width: 0,
  },
  txtCounter: {
    ...font('regular', 16, ICON, 16),
  },
})
