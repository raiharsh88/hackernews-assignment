import React from 'react';
import {View, Text, StyleSheet} from 'react-native';



// Custom navbar for the app No Functionality as of now

export default function AppBar() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>HackerNews</Text>
      </View>
    </View>

 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.08,
    width: '100%',
    height: 'auto',
    paddingTop: 10,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    backgroundColor: '#e4e8ed',
    backgroundColor: '#111',
  },

  innerContainer: {
    width: '94%',
    padding: 5,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 40,
    backgroundColor: '#444',
    backgroundColor: 'rgba(200, 200, 200, 0)',

    // width: '90%',
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
  },

  title: {
    fontSize: 25,
    textAlign: 'center',
    color: '#1c3c63',
    fontFamily: 'Roboto-Bold',
    margin: 0,
    fontWeight: '900',
    color: '#eee',
  },
});
