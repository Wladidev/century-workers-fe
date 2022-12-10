import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {NativeBaseProvider} from 'native-base';
import Login from './src/scenes/login';
import {store} from './src/store';
import WaiterHome from './src/scenes/waiter/home';
import Table from './src/scenes/waiter/table';
import Kitchen from './src/scenes/kitchen';
import Storage from './src/scenes/Storage';

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              options={{gestureEnabled: false}}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{gestureEnabled: false}}
              name="WaiterHome"
              component={WaiterHome}
            />
            <Stack.Screen name="TableInfo" component={Table} />
            <Stack.Screen
              name="Kitchen"
              screenOptions={{headerShown: false}}
              component={Kitchen}
            />
            <Stack.Screen
              name="Storage"
              screenOptions={{headerShown: false}}
              component={Storage}
            />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
