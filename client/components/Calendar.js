import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Calendar } from 'react-native-calendars'
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';

function CalendarDH() {

  const dispatch = useDispatch();
  const now = useSelector((state) => state.helper.now)
  const selectedDate = useSelector((state) => state.helper.selectedDate)

  const navigation = useNavigation();

  const pressHandler = (arg) => {
    dispatch({
      type: 'SELECT_DATE',
      payload: arg
    });
    navigation.navigate('History');
  }


  return (
    <View style={styles.container}>
      <Calendar
        current={now}
        minDate={'2019-05-10'}
        maxDate={now}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {pressHandler(day.timestamp)}}
        monthFormat={'MMMM yyyy'}
          hideArrows={false}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={(direction) => (<Text>Go</Text>)}
        hideExtraDays={false}
        disableMonthChange={true}
        firstDay={1}
        hideDayNames={false}
        showWeekNumbers={false}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableArrowLeft={false}
        disableArrowRight={false}
        disableAllTouchEventsForDisabledDays={true}
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