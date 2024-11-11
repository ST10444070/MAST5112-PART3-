import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem } from '../types'; 

type AddMenuItemScreenProps = {
  route: {
    params: {
      setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
    };
  };
  navigation: any; 
};

const AddMenuItemScreen: React.FC<AddMenuItemScreenProps> = ({ route, navigation }) => {
  const { setMenuItems } = route.params;
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [course, setCourse] = useState<'Starter' | 'Main' | 'Dessert'>('Starter');
  const [price, setPrice] = useState<string>('');

  const addItem = () => {
    const newItem: MenuItem = { name, description, course, price: parseFloat(price) };
    setMenuItems((prevItems) => [...prevItems, newItem]);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Dish Name</Text>
      <TextInput
        placeholder="Enter dish name"
        onChangeText={setName}
        value={name}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Text>Description</Text>
      <TextInput
        placeholder="Enter description"
        onChangeText={setDescription}
        value={description}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Text>Course</Text>
      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue)}
        style={{ height: 50, width: '100%', marginBottom: 10 }}
      >
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <Text>Price</Text>
      <TextInput
        placeholder="Enter price"
        keyboardType="numeric"
        onChangeText={setPrice}
        value={price}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Button title="Add Item" onPress={addItem} />
    </View>
  );
};

export default AddMenuItemScreen;
