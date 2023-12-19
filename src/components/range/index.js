import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider'
import CircleSlide from '@/assets/imgs/CircleSlide.png'
import { RH, RW, font } from '@/theme/utils'
import { WHITE } from '@/theme/colors'
import { setCountWords } from '@/store/Slices/AliasSlice'
import { useDispatch, useSelector } from 'react-redux'

function Index({
  maxValue = 90,
  minValue = 10,
  count,
  step,
  value,
  setValue,
  containerStyle = {},
}) {
  const dispatch = useDispatch()
  const { countWords } = useSelector(({ alias }) => alias)
  const renderScaleLabels = () => {
    const labels = () => {
      let newArr = []
      for (let i = 1; i <= maxValue / count; i++) {
        newArr.push(i * count)
      }
      return newArr
    }
    return labels().map((label, index) => (
      <Text
        key={index}
        style={[
          styles.scaleLabel,
          { left: label == 80 && index == 1 ? '-45%' : 0 },
          containerStyle,
        ]}
      >
        {label}
      </Text>
    ))
  }

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={minValue}
          maximumValue={maxValue}
          step={step}
          value={value}
          minimumTrackTintColor="#4d7cfe"
          maximumTrackTintColor="#ccc"
          thumbImage={CircleSlide}
          onValueChange={(newValue) => {
            setValue(newValue), dispatch(setCountWords(newValue))
          }}
        />
      </View>
      <View style={styles.scaleLabelsContainer}>{renderScaleLabels()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  sliderContainer: {
    width: '100%',
    height: RH(50),
    justifyContent: 'center',
  },
  slider: {
    width: '105%',
    alignSelf: 'center',
    height: RH(20),
  },
  scaleLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '95%',
  },
  scaleLabel: {
    ...font('regular', 12, WHITE),
    color: WHITE,

    paddingHorizontal: RW(28),
  },
  selectedValue: {
    marginTop: RH(10),
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default Index
