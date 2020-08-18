import React, { useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MealList from './MealList';
import MealDetail from './MealDetail';
import MealRecipet from './MealReciept';
import OrderTrack from './OrderTrack';

const Stack = createStackNavigator();

const Home = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="MealList" component={MealList} />
      <Stack.Screen name="MealDetail" component={MealDetail} />
      <Stack.Screen name="MealReciept" component={MealRecipet} />
      <Stack.Screen name="OrderTrack" component={OrderTrack} />
    </Stack.Navigator>
  );
}

export default Home;