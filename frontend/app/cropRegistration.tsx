import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

const CropRegistrationScreen: React.FC = () => {
  const [district, setDistrict] = useState('');
  const [crop, setCrop] = useState('');
  const [userName, setUserName] = useState('');
  const [area, setArea] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const payload = { district, crop, userName, area };

    try {
      const response = await fetch('http://127.0.0.1:5000/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      const prediction = result.prediction;
      console.log(prediction);
      router.push({ pathname: '/result', params: { prediction } });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to register crop');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌱 Crop Registration</Text>

      <View style={styles.formCard}>
        <Text style={styles.label}>Select District</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={district}
            onValueChange={(value) => setDistrict(value)}
            style={styles.picker}
            dropdownIconColor="#000"
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

        <Text style={styles.label}>Select Crop</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={crop}
            onValueChange={(value) => setCrop(value)}
            style={styles.picker}
            dropdownIconColor="#000"
          >
            <Picker.Item label="Choose..." value="" />
            <Picker.Item label="Paddy" value="1" />
            <Picker.Item label="Sorghum" value="2" />
            <Picker.Item label="Arhar" value="3" />
            <Picker.Item label="Groundnut" value="4" />
            <Picker.Item label="Sesamum" value="5" />
          </Picker>
        </View>

        <Text style={styles.label}>Your Name</Text>
        <TextInput
          placeholder="Enter your name"
          value={userName}
          onChangeText={setUserName}
          style={styles.input}
          placeholderTextColor="#555"
        />

        <Text style={styles.label}>Area of Cultivation (in acres)</Text>
        <TextInput
          placeholder="Enter area"
          value={area}
          onChangeText={setArea}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#555"
        />

        <View style={styles.submitButton}>
          <Button title="Submit" onPress={handleSubmit} color="#1E90FF" />
        </View>
      </View>
    </ScrollView>
  );
};

export default CropRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E90FF',
    textAlign: 'center',
    marginBottom: 30,
  },
  formCard: {
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
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  picker: {
    color: '#000',
  },
  submitButton: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
