import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';

import Sidebar from './src/components/sidebar';
import Todo from './src/pages/Todo';
import Stats from './src/pages/Stats';
import Historic from './src/pages/Historic';
import User from './src/pages/User';
import Home from './src/pages/Home';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            header: (props) => <Sidebar {...props} />
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Todo" component={Todo} />
          <Stack.Screen name="Historic" component={Historic} />
          <Stack.Screen name="Stats" component={Stats} />
          <Stack.Screen name="User" component={User} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default App;

