import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

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
      const response = await axios.post('http://127.0.0.1:5000/fertilizer', {
        temp: temperature,
        humidity,
        moisture,
        crop,
        N: n,
        P: p,
        K: k,
      });

      const recommendation = response.data.recommendation;
      console.log(recommendation);
      router.push({ pathname: '/fertilizerResult', params: { recommendation } });

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch recommendation');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌾 Fertilizer Recommendation</Text>

      <View style={styles.card}>
        <InputField label="Temperature (°C)" value={temperature} setValue={setTemperature} />
        <InputField label="Humidity (g/kg)" value={humidity} setValue={setHumidity} />
        <InputField label="Moisture (g/m³)" value={moisture} setValue={setMoisture} />
        <InputField label="Crop Name" value={crop} setValue={setCrop} />
        <InputField label="Nitrogen (N)" value={n} setValue={setN} />
        <InputField label="Phosphorus (P)" value={p} setValue={setP} />
        <InputField label="Potassium (K)" value={k} setValue={setK} />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Get Recommendation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const InputField = ({ label, value, setValue }: any) => (
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
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E8B57',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2E8B57',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
