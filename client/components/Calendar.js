import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Calendar } from 'react-native-calendars'
import { useSelector, useDispatch } from "react-redux";

function CalendarDH() {

  const dispatch = useDispatch();
  const now = useSelector((state) => state.helper.now)

  return (
    <View style={styles.container}>
      <Calendar
      current={now}
      minDate={'2019-05-10'}
      maxDate={now}
  // Handler which gets executed on day press. Default = undefined
      onDayPress={(day) => {
        dispatch({
        type: 'SELECT_DATE',
        payload: day.timestamp
      })
      }}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={'MMMM yyyy'}
  // Hide month navigation arrows. Default = false
    hideArrows={false}
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
    renderArrow={(direction) => (<Text>Go</Text>)}
    hideExtraDays={false}
    disableMonthChange={true}
    firstDay={1}
    hideDayNames={false}
    showWeekNumbers={false}
  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
    onPressArrowLeft={subtractMonth => subtractMonth()}
  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
    onPressArrowRight={addMonth => addMonth()}
    disableArrowLeft={false}
    disableArrowRight={false}
    disableAllTouchEventsForDisabledDays={true}
  // Replace default month and year title with custom one. the function receive a date as parameter.
    enableSwipeMonths={true}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    height: 500,
    width: 300,
    flex: 1,
    alignSelf: 'center',
  },
});

export default CalendarDH;