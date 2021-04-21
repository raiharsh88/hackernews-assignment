import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import ArticlesScreen from './screens/ArticlesScreen';

import {
  Provider as PaperProvider,
} from 'react-native-paper';

const Stack = createStackNavigator();


const MyStack = () => {
  return (
    
    <PaperProvider //Adding paper provider for passing material ui themes aross the component tree
    >
      {/* Stack navigator */}
      <NavigationContainer>  
        <Stack.Navigator>
          <Stack.Screen
            name="ArticleScreen"
            component={ArticlesScreen}
            options={{title: 'Article', headerShown: false}}
          />

        {/* Optiona; secondary screen  */}
        {/* NOT FUNCTIONAL AS OF NOW */}
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              title: 'lassan',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default MyStack;
