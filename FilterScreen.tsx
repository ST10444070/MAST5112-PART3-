import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem } from '../types';

type FilterScreenProps = {
  route: {
    params: {
      menuItems: MenuItem[];
    };
  };
};

const FilterScreen: React.FC<FilterScreenProps> = ({ route }) => {
  const { menuItems } = route.params;
  const [selectedCourse, setSelectedCourse] = useState<'Starter' | 'Main' | 'Dessert'>('Starter');

  const filteredItems = menuItems.filter((item) => item.course === selectedCourse);

  return (
    <View style={{ padding: 20 }}>
      <Text>Select Course to Filter</Text>
      <Picker
        selectedValue={selectedCourse}
        onValueChange={(itemValue) => setSelectedCourse(itemValue)}
        style={{ height: 50, width: '100%', marginBottom: 10 }}
      >
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - ${item.price.toFixed(2)}</Text>
        )}
      />
    </View>
  );
};

export default FilterScreen;
