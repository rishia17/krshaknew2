import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function CropRecommendation() {
  const [n, setN] = useState('');
  const [p, setP] = useState('');
  const [k, setK] = useState('');
  const [temperature, setTemperature] = useState('');
  const [ph, setPh] = useState('');
  const [rain, setRain] = useState('');
  const [humidity, setHumidity] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!n || !p || !k || !temperature || !ph || !rain || !humidity) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/recommend', {
        n,
        p,
        k,
        temp: temperature,
        ph,
        rain,
        h: humidity,
      });

      const prediction = response.data.prediction;
      console.log(prediction);
      router.push({ pathname: '/result', params: { prediction } });

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch recommendation');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌾 Crop Recommendation</Text>

      <View style={styles.formCard}>
        <FormField label="Nitrogen (mg/kg)" value={n} setValue={setN} />
        <FormField label="Phosphorus (mg/kg)" value={p} setValue={setP} />
        <FormField label="Potassium (mg/kg)" value={k} setValue={setK} />
        <FormField label="Temperature (°C)" value={temperature} setValue={setTemperature} />
        <FormField label="pH" value={ph} setValue={setPh} />
        <FormField label="Rainfall (mm/year)" value={rain} setValue={setRain} />
        <FormField label="Humidity (g/kg)" value={humidity} setValue={setHumidity} />

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
      keyboardType="numeric"
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
    backgroundColor: '#f9f9f9',
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
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
