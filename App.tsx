import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './src/nav';
import {AuthNavigator} from './src/nav';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';

enableScreens();
export default function App() {
  const Stack = createStackNavigator();

  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(false);
      setIsLogin(false);
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
          {loading ? (
            <Stack.Screen name="Splash" component={Splash} />
          ) : isLogin ? (
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
          ) : (
            <Stack.Screen name="AuthNavigation" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {flex: 1},
});
