import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Calendar } from 'react-native-calendars'
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import { DateTime } from 'luxon'
import _ from 'lodash'

function CalendarDH() {

  const dispatch = useDispatch();
  const now = useSelector((state) => state.helper.now);
  const historicalData = useSelector((state) => state.historicalData);
  const dateData = _.map(historicalData, el => el.date)
  const formattedDateData = dateData.map(date => DateTime.fromMillis(date).toFormat('yyyy-LL-dd'))

  let markedDatesObj = {};
   
  formattedDateData.forEach((day) => {
    markedDatesObj = {
      ...markedDatesObj, [day]:{
        dotColor: colors.green,
        marked: true
      }
    }
  });

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
        onDayPress={(day) => {pressHandler(day.timestamp)}}
        monthFormat={'MMMM yyyy'}
          hideArrows={false}
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