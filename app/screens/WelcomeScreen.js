import React from 'react';

import {View, Button, ImageBackground, StyleSheet} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/welcome.jpg')}>
      <Button
        style={styles.button}
        onPress={() => {
          //   alert('Pressed');
          navigation.replace('ArticleScreen');
        }}
        title="Articles"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  button: {
    textTransform: 'capitalize',
  },
});
export default WelcomeScreen;
