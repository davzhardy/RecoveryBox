import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Calendar } from 'react-native-calendars'
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';

function CalendarDH() {

  const dispatch = useDispatch();
  const now = useSelector((state) => state.helper.now);
  const historicalData = useSelector((state) => state.historicalData);

  const datesToMark = ['2020-09-16'];
  let markedDatesObj = {};

  const navigation = useNavigation();

  datesToMark.forEach((day) => {
    markedDatesObj[day] = {
        dotColor: colors.green,
        marked: true
    };
  });

  const pressHandler = (arg) => {
    dispatch({
      type: 'SELECT_DATE',
      payload: arg
    });
    navigation.navigate('History');
  }

//TODO finish the function which maps through dates where there are entries, converts them and marks them with dots

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
        renderArrow={(direction) => {
          if (direction==='right') return <Image style={styles.image} source={require('../assets/forward.png')}/>
          if (direction==='left') return <Image style={styles.image} source={require('../assets/back.png')}/>
          }}
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
        theme={{
          textDayFontFamily: 'Montserrat_500Medium',
          textMonthFontFamily: 'Montserrat_700Bold',
          textDayHeaderFontFamily: 'Montserrat_700Bold',
          textDayFontSize: 14,
          textMonthFontSize: 18,

        }}
        markedDates={markedDatesObj}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    alignSelf: 'center',
  },
  image: {
    height: 20,
    width:20,
  },
});

export default CalendarDH;