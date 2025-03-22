import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

export default function Statistics() {
  const [crop, setCrop] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!crop) {
      alert('Please select a crop');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:5000/statistics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crop }),
      });
  
      const result = await response.json();
      console.log(result); // Example: { prediction: "Your Crop Stats Data" }
  
      // Navigate to graph screen with result if needed
      router.push({ pathname: '/result', params: { data: result.prediction } });
  
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch crop statistics');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Current Crop Statistics</Text>

      {/* Crop Selection */}
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

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} color="#007bff" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    color: '#17c1e8',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    color: '#000',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
