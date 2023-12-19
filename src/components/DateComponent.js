import React from 'react'
import { Text, View, StyleSheet, Platform, Pressable } from 'react-native'
import Row from './wrappers/row'
import { font, RH, RW } from '@/theme/utils'
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { BACKGROUND, ICON } from '@/theme/colors'
import DateSvg from '@/assets/svgs/dateSvg'
import TimeSvg from '../assets/svgs/timeSvg'

function DateComponent({
  title,
  dateValue = new Date(),
  timeValue = new Date(),
  setDate = () => {},
  setTime = () => {},
  containerStyle = {},
  dateAndroidStyle = {},
  titleStyle,
  showTime = true,
  editable = true,
  rowStyle,
  minDate,
  maxDate,
}) {
  let dateLocalizaded = dateValue.toLocaleDateString().substring(0, 10)
  let textDate = `${dateLocalizaded.split('/')[1]}/${dateLocalizaded.split('/')[0]}/${
    dateLocalizaded.split('/')[2]
  }`
  return (
    <View style={[containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <Row wrapper={[styles.row, rowStyle]}>
        {Platform.OS == 'ios' ? (
          <View
            style={[
              styles.dateButton,
              { width: RW(166), height: RH(41), justifyContent: 'center' },
            ]}
          >
            <RNDateTimePicker
              value={dateValue}
              // value={new Date()}
              placeholderText="ДД/ММ/ГГГГ"
              locale="ru-RU"
              mode="date"
              textColor={ICON}
              style={{ marginRight: RW(20) }}
              accentColor={ICON}
              themeVariant="dark"
              minimumDate={minDate}
              maximumDate={maxDate}
              onChange={(_, changedDate) => {
                setDate(changedDate)
              }}
              disabled={!editable}
            />
          </View>
        ) : (
          <View
            style={[
              styles.dateButton,
              dateAndroidStyle,
              Platform.OS == 'android'
                ? { backgroundColor: BACKGROUND, borderRadius: RW(10) }
                : null,
            ]}
          >
            <Pressable
              style={styles.dateButtonText}
              onPress={() => {
                if (editable)
                  DateTimePickerAndroid.open({
                    dataFormat: 'YYYY-MM-DD',
                    display: 'default',
                    mode: 'date',
                    locale: 'ru-RU',
                    placeholderText: 'ДД/ММ/ГГГГ',
                    minimumDate: minDate,
                    maximumDate: maxDate,
                    value: dateValue,
                    onChange: (_, changedDate) => {
                      setDate(changedDate)
                    },
                  })
              }}
            >
              <DateSvg style={styles.dateSvg} />
              <Text style={styles.dateText}>{textDate}</Text>
            </Pressable>
          </View>
        )}

        {showTime && (
          <>
            {Platform.OS == 'ios' ? (
              <View
                style={[
                  styles.dateButton,
                  {
                    width: RW(78),
                    height: RH(41),
                    justifyContent: 'center',
                    paddingRight: 10,
                    marginLeft: RW(20),
                    backgroundColor: editable ? BACKGROUND : null,
                  },
                ]}
              >
                <RNDateTimePicker
                  value={timeValue}
                  placeholderText="ДД/ММ/ГГГГ"
                  locale="ru-RU"
                  mode="time"
                  textColor={ICON}
                  accentColor={ICON}
                  themeVariant="dark"
                  is24Hour={true}
                  onChange={(_, changedTime) => {
                    setTime(changedTime)
                  }}
                  disabled={!editable}
                />
              </View>
            ) : (
              <View
                style={[
                  styles.dateButton,
                  {
                    width: RW(125),
                    backgroundColor: BACKGROUND,
                    marginLeft: RW(15),
                  },
                ]}
              >
                <Pressable
                  style={styles.dateButtonText}
                  onPress={() => {
                    if (editable)
                      DateTimePickerAndroid.open({
                        textColor: 'black',
                        dataFormat: 'YYYY-MM-DD',
                        display: 'default',
                        mode: 'time',
                        value: timeValue,
                        onChange: (_, changedTime) => {
                          setTime(changedTime)
                        },
                      })
                  }}
                >
                  <TimeSvg style={styles.dateSvg} />
                  <Text style={styles.dateText}>{timeValue.toLocaleTimeString().slice(0, -3)}</Text>
                </Pressable>
              </View>
            )}
          </>
        )}
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
  },
  containerStyle: {
    width: RW(354),
  },
  title: {
    ...font('regular', 16, ICON, 24),
    marginBottom: RH(9),
  },

  dateText: {
    ...font('regular', 18, ICON, 19),
    letterSpacing: 1.5,
    color: '#657AC5',
  },
  dateButtonText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  dateSvg: {
    // marginLeft: RW(24),
  },
  dateButton: {
    width: RW(185),
    height: RH(40),
    borderRadius: RW(10),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
})
export default DateComponent
