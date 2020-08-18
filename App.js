import React, {useState, useContext} from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './Home';
import Order from './Order';
import Account from './Account';
import SignInScreen from './SignInScreen';
import GlobalState from './GlobalState';
import SignUpScreen from './SignUpScreen';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import PhoneNumberAuth from './PhoneNumberAuth';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {

  const [state, setState] = useState({isLoggedIn:false});
  return (
    <ActionSheetProvider>
    <GlobalState.Provider value={[state, setState]}>
      <NavigationContainer>
        {!state.isLoggedIn ? (
          // No token found, user isn't signed in
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                title: 'Sign Up',
              }}
            />
            <Stack.Screen
              name="PhoneAuth"
              component={PhoneNumberAuth}
              options={{
                title: 'Sign In With Phone Number',
              }}
            />
          </Stack.Navigator>
        ) : (
          // User is signed in
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  const iconColor = focused ? 'black' : 'grey';
                  const iconSize = 30;
                  if (route.name === 'Home') {
                    return <FontAwesome name="home" size={iconSize} color={iconColor} />;
                  } else if (route.name === 'Orders') {
                    return <MaterialCommunityIcons name="file-document-box-outline" size={iconSize} color={iconColor} />;
                  } else if (route.name === 'Account') {
                    return <MaterialCommunityIcons name="account" size={iconSize} color={iconColor} />;
                  }
                },
              })}
              tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
              }}
            >
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Orders" component={Order} />
              <Tab.Screen name="Account" component={Account} />
            </Tab.Navigator>
          
        )}
      </NavigationContainer>
    </GlobalState.Provider>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;