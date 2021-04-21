import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Linking,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {Button} from 'react-native-paper';

const loaderColor = 'gold';

const ListItem = function (props) {

  const openLink = async function (url) {
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Cannot Open this url: ${url}`);
    }
  };

  //All the data to be displayed is passed through the props , this is a stateless component
  return (
    <TouchableOpacity
      onPress={() => openLink(props.data.url)}
      style={styles.container}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText} numberOfLines={1}>
          {props.data.title}
        </Text>

        <Text style={styles.about}>Posted by {props.data.by}</Text>

        <View style={styles.iconRow}>
          <Text style={styles.about}>
            {new Date(props.data.time * 1000).toLocaleString()}
          </Text>

          <View style={styles.iconWrapper}>
            <Button icon={'chevron-triple-up'} color="gold" style={{paddin: 0}}>
              {props.data.score}
            </Button>
            <Button
              icon={'comment-multiple-outline'}
              color="gold"
              style={{paddin: 0}}>
              {props.data.descendants}
            </Button>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 0,
    marginBottom: 10,
    borderWidth: 0.5,
  },
  listItemView: {
    paddingTop: 7,
    paddingBottom: 7,
    width: '100%',

    padding: 20,
    borderRadius: 7,
    borderColor: '#ddd',

    // backgroundColor: '#1c3c63',
    backgroundColor: '#333',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  iconRow: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  listItemText: {
    color: '#1c3c63',
    fontSize: 15,
    fontFamily: 'MavenPro-ExtraBold',
    fontWeight: '400',
    color: '#ddd',
  },

  iconStyle: {
    fontSize: 12,
  },

  about: {
    color: '#ccc',
    fontFamily: 'Roboto-BoldItalic',
    fontSize: 12,
  },

  iconWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // borderRadius: 20,
    // borderColor: 'gold',
    // borderWidth: 1,
  },
});
export default ListItem;
