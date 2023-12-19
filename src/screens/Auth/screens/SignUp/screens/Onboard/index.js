import React, { useRef, useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import { RH, RW, shadow } from '@/theme/utils'
import OnBoardingItem from './components/item'
import Logo from '@/assets/imgs/LogoSvg'
import SignUpLogoSvg from '@/assets/svgs/SignUpLogoSvg'
import Button from '@/components/buttons/Button'
import { BACKGROUND, ICON } from '@/theme/colors'
import Row from '@/components/wrappers/row'
import LeftArrowSvg from './assets/LeftArrowSvg'

const ITEMS = [
  {
    image: require('@/assets/imgs/registrSlide/loginSlideImageSearch.png'),
    description: 'Хотите поиграть, но не можете найти себе компанию?',
  },
  {
    image: require('@/assets/imgs/registrSlide/loginSlideImageBall.png'),
    description: 'Ваши друзья не готовы сорваться и приехать через час поиграть с Вами в футбол?',
  },
  {
    image: require('@/assets/imgs/registrSlide/loginSlideImageEvent.png'),
    description: 'Вы собрались компанией в кафе и внезапно решили поиграть в мафию?',
  },
  {
    image: require('@/assets/imgs/registrSlide/loginSlideImageEssy.png'),
    description: 'Что может быть \n проще?',
  },
  {
    image: '',
    description: '',
    svg: <SignUpLogoSvg />,
  },
]

const Onboard = ({ navigation }) => {
  const scrollRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <ScreenMask>
      <View style={{ flex: 1 }}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <View style={styles.flatListContainer}>
          <Pressable
            onPress={() => {
              if (scrollRef.current) {
                if (currentIndex >= 1) {
                  scrollRef.current.scrollToIndex({
                    index: currentIndex - 1,
                    animated: true,
                  })
                }
              }
            }}
            style={[styles.arrowContainer, { left: RW(20) }]}
          >
            <LeftArrowSvg />
          </Pressable>

          <FlatList
            ref={scrollRef}
            style={{ width: '100%' }}
            data={ITEMS}
            renderItem={({ item }) => <OnBoardingItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={1}
            snapToInterval={RW(382)}
            decelerationRate="fast"
            onScroll={() => {
              const { offset } = scrollRef.current._listRef._getScrollMetrics()
              setCurrentIndex(Math.round(offset / RW(382)))
            }}
          />
          <Row wrapper={styles.indicatorContainer}>
            {ITEMS.map((val, index) => {
              return (
                <View
                  key={index}
                  style={[styles.normalDot, index == currentIndex && { backgroundColor: ICON }]}
                />
              )
            })}
          </Row>
          <Pressable
            onPress={() => {
              if (scrollRef.current) {
                if (currentIndex <= 3) {
                  scrollRef.current.scrollToIndex({
                    index: currentIndex + 1,
                    animated: true,
                  })
                }
              }
            }}
            style={[styles.arrowContainer, { right: RW(20), transform: [{ rotate: '180deg' }] }]}
          >
            <LeftArrowSvg />
          </Pressable>
        </View>
        <View style={styles.next}>
          <Button
            size={{ width: 171, height: 36 }}
            label={'Далее>>'}
            onPress={() => navigation.push('Preferences')}
          />
        </View>
      </View>
    </ScreenMask>
  )
}

export default Onboard

const styles = StyleSheet.create({
  flatListContainer: {
    ...shadow,
    width: RW(382),
    height: RH(568),
    alignItems: 'center',
    borderRadius: RW(20),
    paddingVertical: RH(18),
    backgroundColor: BACKGROUND,
  },
  arrowContainer: {
    position: 'absolute',
    top: (RH(568) - RW(28)) / 2,
    zIndex: 99,
  },
  logo: {
    alignItems: 'center',
    marginTop: RH(20),
    marginBottom: RH(30),
  },
  next: {
    flex: 1,
    width: RW(382),
    marginBottom: RH(30),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  indicatorContainer: {},
  normalDot: {
    width: RW(10),
    height: RW(10),
    borderColor: ICON,
    borderWidth: 1,
    borderRadius: RW(5),
    marginHorizontal: RW(4),
  },
})
