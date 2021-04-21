import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Button} from 'react-native-paper';

//This component changes the sorting category of stories
export default function FilterBar({sort, setSort}) {
  return (
    <View style={styles.bar}>
      <Button
        icon="arrow-up"
        color={sort === 'top' ? 'gold' : 'white'}
        onPress={() => setSort('top')}>
        Top
      </Button>
      <Button
        icon="fire"
        color={sort === 'best' ? 'gold' : 'white'}
        onPress={() => setSort('best')}>
        Best
      </Button>
      <Button
        icon="timer-sand-empty"
        color={sort === 'new' ? 'gold' : 'white'}
        onPress={() => setSort('new')}>
        New
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#111',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
});
