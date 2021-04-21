import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import AppBar from './components/AppBar';
import {loadMore} from './components/utils/newsFeed';
import ListItem from '../screens/components/ListItem';
import FilterBar from './components/FilterBar';

const loaderColor = 'gold';
// import {Ionicons} from '@expo/vector-icons';
export default function ArticlesScreen({navigation}) {
  const [stories, setStories] = useState(null);

  const [content, setContent] = useState({stories: []});

  const [loading, setLoading] = useState(null);

  const [sort, setSort] = useState('top'); //Sort by top;
  const controller = new AbortController();
  const {signal} = controller;
  useEffect(async () => {
    setContent({stories: []}); //Start the loading screen when changing sort types
    //This function loads the list of all storyIds
    setLoading(null);
    const req = await fetch(
      `https://hacker-news.firebaseio.com/v0/${sort}stories.json?print=pretty`,
      {
        method: 'GET',
        signal,
      },
    )
      .then(r => r)
      .catch(err => {
        throw err;
      });

    if (req.status !== 200) return alert('Some thing went wrong');

    const res = await req.json();

    // setStories(res.slice(0, 20));

    setStories(res);

    let temp = [];

    await Promise.all(
      res.slice(0, 10).map(async id => {
        let request = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
          {
            method: 'GET',
            signal,
          },
        )
          .then(r => r)
          .catch(err => {
            throw err;
          });

        if (request.status === 200) {
          let response = await request.json();

          temp.push(response);
        }
      }),
    );

    setContent({count: res.length - 1, stories: temp, current: 9});

    // return () => controller.abort();
  }, [sort]);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 10;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  useEffect(() => {
    setLoading(null);
  }, [sort]);

  return (
    <View style={{width: '100%', height: '100%', flex: 1}}>
      <AppBar />

      <FilterBar sort={sort} setSort={setSort} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent}) => {
          //function isCloseToBottom  checks if the scoll end had been reached
          if (isCloseToBottom(nativeEvent)) {
            //Setting loading = true to provide debouncing to prevent calling
            //load more before prevoius load is complete before load is complete
            // loader becomes visible with this variable
            setLoading(true);

            if (!loading) {
              //If not loadig currently then we call for loading next set
              // of stories from the list
              //Load more function needs all the states and state-setters
              loadMore(
                content,
                setContent,
                stories,
                setStories,
                loading,
                setLoading,
                controller,
              );
            }
          }
        }}>
        {/*Map function rendering the loaded stories*/}

        {/* If content is loaded show the list  */}
        {content.stories.length > 0 ? (
          <View style={styles.container}>
            {content.stories.map(s => (
              <ListItem key={s.id} data={s} />
            ))}
          </View>
        ) : (
          <View style={{...styles.loaderView}}>
            <ActivityIndicator size="large" color={loaderColor} />
          </View>
        )}

        {/* If content is not loaded yet show the loader  */}

        {/*Show this when lazy loading starts  */}

        {loading && (
          <View
            style={{
              ...styles.listItemView,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#111',
            }}>
            <ActivityIndicator size="large" color={loaderColor} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 0.9,
    backgroundColor: '#111',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  text: {
    color: '#E39B1E',
    fontSize: 17,
    letterSpacing: 2,
  },

  loaderView: {
    flex: 1,

    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },

  listItemView: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    // borderWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    padding: 20,
    borderRadius: 10,
    // borderColor: '#ddd',

    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
