import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddMenuItemScreen from './screens/AddMenuItemScreen';
import FilterScreen from './screens/FilterScreen';
import { MenuItem } from './types';

type RootStackParamList = {
  Home: undefined;
  AddMenuItem: { setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>> };
  FilterScreen: { menuItems: MenuItem[] };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} menuItems={menuItems} setMenuItems={setMenuItems} />}
        </Stack.Screen>
        <Stack.Screen name="AddMenuItem">
          {(props) => <AddMenuItemScreen {...props} setMenuItems={setMenuItems} />}
        </Stack.Screen>
        <Stack.Screen name="FilterScreen">
          {(props) => <FilterScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
