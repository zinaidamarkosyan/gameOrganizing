import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Row from '@/components/wrappers/row'
import { font, RH, RW, shadow } from '@/theme/utils'
import { BACKGROUND, BLACK, ICON } from '@/theme/colors'
import PouseSvg from './Assets/PouseSvg'
import PlaySvg from './Assets/PlaySvg'
import { _storageUrl } from '@/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setPausedMessageId, setPlayMessageId, setVoiceDuration } from '@/store/Slices/ChatsSlice'
import DeleteSvg from './Assets/DeleteSvg'
import Video from 'react-native-video'

const screenWidth = Dimensions.get('screen').width

const audioRecorderPlayer = new AudioRecorderPlayer()
audioRecorderPlayer.setSubscriptionDuration(0.05)
const InputPlayer = ({ voicePath, onPressDelete, stop, setStop }) => {
  const [playTime, setPlayTime] = useState('00:00:00')
  const [playWidth, setPlayWidth] = useState(0)
  const [stoped, setStoped] = useState(true)

  const dispatch = useDispatch()
  const { playMessageId, pausedMessageId, voiceDuration } = useSelector(({ chats }) => chats)

  useEffect(() => {
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
  }, [voicePath])

  const onStartPlay = async () => {
    if (pausedMessageId == 'input') {
      setStop(false)
      await audioRecorderPlayer.resumePlayer()
      dispatch(setPausedMessageId(null))
    } else {
      if (!stoped) {
        await audioRecorderPlayer.stopPlayer()
        setStoped(true)
      }
      dispatch(setPlayMessageId('input'))
      setPlayWidth(0)
      setStop(false)
      await audioRecorderPlayer.startPlayer(voicePath)

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
    dispatch(setPausedMessageId('input'))
    dispatch(setPlayMessageId('input'))
  }
  const onPressDeleteFunc = () => {
    onStopPlay()
    setStoped(true)
    onPressDelete()
    dispatch(setPlayMessageId(null))
    dispatch(setPausedMessageId(null))
  }

  useEffect(() => {
    if (playMessageId == 'stop') {
      console.log('useEffect stop')
      onStopPlay()
    }
  }, [playMessageId])

  async function formatSeconds(seconds) {
    const roundedNum = Math.floor(seconds * 100) / 100
    const splitNums = roundedNum.toString().split('.')
    if (+splitNums[0] < 60) {
      const seconds = splitNums[0].length == 2 ? splitNums[0] : '0' + splitNums[0]
      return '00:' + seconds + ':' + splitNums[1]
    } else {
      const minutes =
        Math.floor(+splitNums[0] / 60).toString().length == 2
          ? Math.floor(+splitNums[0] / 60)
          : '0' + Math.floor(+splitNums[0] / 60)
      const seconds =
        (+splitNums[0] % 60).toString().length == 2
          ? +splitNums[0] % 60
          : '0' + (+splitNums[0] % 60)
      return minutes + ':' + seconds + ':' + splitNums[1]
    }
  }

  useEffect(() => {
    if (stop) {
      onStopPlay()
      setStop(false)
    }
  }, [stop])

  return (
    <Row wrapper={styles.container}>
      {playMessageId == 'input' && pausedMessageId != 'input' ? (
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
              style={[styles.viewBarPlay, { width: playMessageId == 'input' ? playWidth : 0 }]}
            />
          </View>
        </Pressable>
        <Text style={styles.txtCounter}>
          {(playMessageId == 'input' ? `${playTime} / ` : '00:00:00 / ') + voiceDuration}
        </Text>
      </View>
      <Pressable onPress={onPressDeleteFunc}>
        <DeleteSvg fill={ICON} />
      </Pressable>
      <Video
        source={{ uri: voicePath }}
        onLoad={async (data) => {
          dispatch(setVoiceDuration(await formatSeconds(data.duration)))
        }}
      />
    </Row>
  )
}

export default InputPlayer

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
