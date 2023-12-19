import * as React from 'react'
import Svg, { LinearGradient, Stop, Path, Defs } from 'react-native-svg'
import { RH, RW } from '@/theme/utils'
import User from './userIcon'
import { Pressable, View } from 'react-native'
import Modal from '@/components/modal'
import { useState } from 'react'

function SvgComponent({
  setVisibleBorder = () => {},
  visibleBorder = false,
  onPressItem = () => {},
  size = RW(100),
  pressedUser,
  onPressImg,
  zoom,
  user,
}) {
  const width = RW(size < 40 ? 40 : size)
  const [modalVisible, setModalVisible] = useState(false)
  const item = (
    <View
      style={{
        position: 'relative',
        alignItems: 'center',
      }}
    >
      <Svg
        width={width}
        height={width + RH(size < 200 ? 15 : 25)}
        viewBox="0 0 271 414"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M212.754 78.853c0 .9-.015 1.797-.045 2.69 16.157 3.634 32.595 6.303 49.156 8.541 6.17.823 7.686 2.866 7.627 8.613-.197 19.548-.169 39.183-.14 58.836.011 7.019.021 14.039.021 21.059 0 6.858-.037 13.717-.073 20.576v.004c-.073 13.716-.145 27.432.073 41.148.922 50.309-19.862 90.991-56.062 124.927-21.136 19.687-45.6 35.556-72.282 46.885-3.078 1.322-7.612 2.043-10.407.793-44.11-19.43-81.767-46.664-107.501-88.066C8.254 301.212.341 273.939.271 246.096c-.159-26.251-.148-52.511-.138-78.761.01-22.969.019-45.931-.085-68.873 0-5.88 1.858-7.672 7.805-8.466 16.499-2.201 32.876-4.852 48.978-8.462-.03-.89-.044-1.784-.044-2.681C56.787 35.598 91.7.533 134.77.533s77.984 35.065 77.984 78.32Zm45.545 123.443c.033-6.401.066-12.801.066-19.202 0-6.551-.009-13.103-.018-19.653-.027-18.34-.053-36.664.128-54.907.054-5.363-1.338-7.269-7.003-8.038-39.356-5.404-77.947-13.51-113.303-32.918a8.062 8.062 0 0 0-6.634 0c-35.37 19.34-73.961 27.5-113.303 32.836-5.46.741-7.167 2.415-7.167 7.901.096 21.41.087 42.838.079 64.273-.01 24.498-.02 49.004.126 73.503a140.394 140.394 0 0 0 20.981 73.503c23.63 38.637 58.208 64.053 98.71 82.185 2.566 1.166 6.73.494 9.556-.74a227.898 227.898 0 0 0 66.371-43.754c33.24-31.67 52.324-69.635 51.477-116.585-.2-12.801-.133-25.603-.066-38.404Z"
          fill="url(#bronze)"
        />
        <Path
          d="M258.348 183.014c0 19.202-.3 38.404 0 57.606.847 46.95-18.237 84.915-51.477 116.585a227.898 227.898 0 0 1-66.371 43.754c-2.826 1.234-6.99 1.906-9.556.74-40.502-18.132-75.08-43.548-98.71-82.185a140.395 140.395 0 0 1-20.982-73.503c-.273-45.935 0-91.897-.204-137.776 0-5.486 1.706-7.16 7.167-7.901 39.342-5.335 77.933-13.496 113.303-32.836a8.06 8.06 0 0 1 6.634 0c35.356 19.408 73.947 27.514 113.303 32.918 5.665.769 7.057 2.675 7.003 8.038-.246 24.757-.11 49.665-.11 74.56Z"
          fill="url(#blue)"
        />
        <Defs>
          <LinearGradient
            id="bronze"
            x1={-8.993}
            y1={70.048}
            x2={278.372}
            y2={70.048}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="rgb(158,158,158)" />
            <Stop offset={0.058} stopColor="rgb(158,158,158)" />
            <Stop offset={0.276} stopColor="rgb(217,217,217)" />
            <Stop offset={0.485} stopColor="rgb(158,158,158)" />
            <Stop offset={0.708} stopColor="rgb(217,217,217)" />
            <Stop offset={1} stopColor="rgb(217,217,217)" />
          </LinearGradient>
          <LinearGradient
            id="blue"
            x1={4.048}
            y1={190.533}
            x2={258.048}
            y2={188.033}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="rgb(111,111,111)" />
            <Stop offset={0.249} stopColor="rgb(157,157,157)" />
            <Stop offset={0.518} stopColor="rgb(94,94,94)" />
            <Stop offset={0.83} stopColor="rgb(119,119,119)" />
            <Stop offset={1} stopColor="rgb(85,85,85)" />
          </LinearGradient>
        </Defs>
      </Svg>
      <View
        style={{
          position: 'absolute',
        }}
      >
        <User
          size={width}
          size2={size}
          onPressImg={onPressImg}
          pressedUser={pressedUser}
          userProps={user}
        />
      </View>
    </View>
  )

  return onPressItem ? (
    <Pressable
      onPress={() => {
        onPressItem?.onClickFunc ? onPressItem?.onClickFunc() : setModalVisible(true)
      }}
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 100,
      }}
    >
      {item}
      <View
        style={{
          position: 'absolute',
        }}
      >
        {onPressItem.item ? (
          <Modal
            modalVisible={modalVisible}
            modalClose={onPressItem.modalClose}
            item={onPressItem.item}
            setIsVisible={setModalVisible}
          />
        ) : null}
      </View>
    </Pressable>
  ) : (
    <View
      style={{
        zIndex: 10,
      }}
    >
      {item}
    </View>
  )
}

export default SvgComponent
