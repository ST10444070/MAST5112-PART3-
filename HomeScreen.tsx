import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { MenuItem } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  AddMenuItem: { setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>> };
  FilterScreen: { menuItems: MenuItem[] };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, menuItems, setMenuItems }) => {
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>(menuItems);

  useEffect(() => {
    setFilteredMenuItems(menuItems);
  }, [menuItems]);

  const getAveragePrice = (course: string) => {
    const filteredItems = filteredMenuItems.filter(item => item.course === course);
    const total = filteredItems.reduce((acc, item) => acc + item.price, 0);
    return filteredItems.length > 0 ? (total / filteredItems.length).toFixed(2) : 'N/A';
  };

  const removeItem = (index: number) => {
    setMenuItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Menu</Text>
      <Text>Total items: {filteredMenuItems.length}</Text>
      <Text>Average Price per Course:</Text>
      <Text>Starters: ${getAveragePrice('Starter')}</Text>
      <Text>Main Courses: ${getAveragePrice('Main')}</Text>
      <Text>Desserts: ${getAveragePrice('Dessert')}</Text>

      <FlatList
        data={filteredMenuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Course: {item.course}</Text>
            <Text>Price: ${item.price.toFixed(2)}</Text>
            
            <TouchableOpacity onPress={() => removeItem(index)}>
              <Text style={{ color: 'red', marginTop: 10 }}>Remove Item</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Button
        title="Add New Menu Item"
        onPress={() => navigation.navigate('AddMenuItem', { setMenuItems })}
      />
      <Button
        title="Filter by Course"
        onPress={() => navigation.navigate('FilterScreen', { menuItems })}
      />
    </View>
  );
};

export default HomeScreen;
