import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function FertilizerRecommendation() {
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [moisture, setMoisture] = useState('');
  const [crop, setCrop] = useState('');
  const [n, setN] = useState('');
  const [p, setP] = useState('');
  const [k, setK] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!temperature || !humidity || !moisture || !crop || !n || !p || !k) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/fertilizers', {
        temp: temperature,
        humidity,
        moisture,
        crop,
        N: n,
        P: p,
        K: k,
      });

      const prediction = response.data.prediction;
      console.log(response.data.prediction);
      router.push({ pathname: '/result', params: { prediction } });

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch recommendation');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌿 Fertilizer Recommendation</Text>

      <View style={styles.formCard}>
        <FormField label="Temperature (°C)" value={temperature} setValue={setTemperature} />
        <FormField label="Humidity (g/kg)" value={humidity} setValue={setHumidity} />
        <FormField label="Moisture (g/m³)" value={moisture} setValue={setMoisture} />

        {/* Crop Dropdown */}
        <Text style={styles.label}>Select Crop</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={crop}
            onValueChange={(itemValue) => setCrop(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Choose..." value="" />
            <Picker.Item label="Maize" value="1" />
            <Picker.Item label="Sugarcane" value="2" />
            <Picker.Item label="Cotton" value="3" />
            <Picker.Item label="Paddy" value="4" />
            <Picker.Item label="Wheat" value="6" />
          </Picker>
        </View>

        <FormField label="Nitrogen (N)" value={n} setValue={setN} />
        <FormField label="Phosphorus (P)" value={p} setValue={setP} />
        <FormField label="Potassium (K)" value={k} setValue={setK} />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Get Recommendation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const FormField = ({ label, value, setValue }: any) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      keyboardType="default"
      value={value}
      onChangeText={setValue}
      placeholder={`Enter ${label}`}
      placeholderTextColor="#999"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#000',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
