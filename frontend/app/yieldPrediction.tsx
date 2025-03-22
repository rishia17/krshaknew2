import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

export default function CropEstimation() {
  const [district, setDistrict] = useState('');
  const [crop, setCrop] = useState('');
  const [area, setArea] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!district || !crop || !area) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/estimation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dist: district, crop, area }),
      });

      const prediction = await response.text();
      console.log(prediction);

      router.push({
        pathname: '/result',
        params: { prediction },
      });

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error connecting to the server');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🌾 Crop Estimation</Text>

      <View style={styles.card}>
        {/* District Picker */}
        <Text style={styles.label}>Select District:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={district}
            onValueChange={(itemValue) => setDistrict(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Choose..." value="" />
            <Picker.Item label="Adilabad" value="63" />
            <Picker.Item label="Hyderabad" value="55" />
            <Picker.Item label="Karimnagar" value="62" />
            <Picker.Item label="Medak" value="57" />
            <Picker.Item label="Mahbubnagar" value="58" />
            <Picker.Item label="Nalgonda" value="59" />
            <Picker.Item label="Nizamabad" value="56" />
            <Picker.Item label="Khammam" value="61" />
            <Picker.Item label="Warangal" value="60" />
          </Picker>
        </View>

        {/* Crop Picker */}
        <Text style={styles.label}>Select Crop:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={crop}
            onValueChange={(itemValue) => setCrop(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Choose..." value="" />
            <Picker.Item label="Paddy" value="1" />
            <Picker.Item label="Sorghum" value="2" />
            <Picker.Item label="Arhar" value="3" />
            <Picker.Item label="Groundnut" value="4" />
            <Picker.Item label="Sesamum" value="5" />
          </Picker>
        </View>

        {/* Area Input */}
        <Text style={styles.label}>Planned Area for Cultivation (acres):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter area"
          keyboardType="numeric"
          value={area}
          onChangeText={setArea}
          placeholderTextColor="#666"
        />

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} color="#1E90FF" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E90FF',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  label: {
    color: '#000',
    marginBottom: 8,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#000',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    color: '#000',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
