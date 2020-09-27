import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import colors from '../styles/colors'
import { useNavigation } from '@react-navigation/native';
import { BoldAppText, MediumAppText } from '../styles/text'

function Footer () {

  const navigationRef = React.useRef(null);
  const navigation = useNavigation();
  const state = navigationRef.current?.getCurrentRoute();
  const state1 = navigationRef.current?.getRootState();

  console.log(state)
  console.log(state1)
// TODO add highlights, opacity etc. depending on which navigation state you are in

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable style={styles.icon} onPress={() => navigation.navigate('Home')}>
          <Image style={styles.icon} source={require('../assets/homelightgrey.png')}/>
        </Pressable>
        <BoldAppText style={styles.text} onPress={() => navigation.navigate('Home')}>Home</BoldAppText>
      </View>
      <View style={styles.wrapper}>
        <Pressable style={styles.icon}>
          <Image style={styles.icon} source={require('../assets/dashboardlightgrey.png')}/>
        </Pressable>
        <BoldAppText style={styles.text} onPress={() => navigation.navigate('Summary')}>Summary</BoldAppText>
      </View>
      <View style={styles.wrapper}>
        <Pressable onPress={() => navigation.navigate('Calendar')}>
          <Image style={styles.icon} source={require('../assets/datelightgrey.png')}/>
        </Pressable>
        <BoldAppText style={styles.text} onPress={() => navigation.navigate('Calendar')}>Calendar</BoldAppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.orange,
    position: 'absolute',
    width: '100%',
    height: 65,
    elevation:2,
    bottom: 0,
    borderTopColor: 'white',
    borderTopWidth: 2,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: colors.cosmicLatte
  },
  icon: {
    height: 25,
    width: 25,
  },
});

export default Footer;