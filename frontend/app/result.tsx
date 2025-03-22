import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Result() {
  const { prediction } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result</Text>
      <View style={styles.resultBox}>
        <Text style={styles.resultText}>{prediction}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f0f8ff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1E90FF', marginBottom: 30 },
  resultBox: { backgroundColor: '#e0f7fa', padding: 20, borderRadius: 10 },
  resultText: { fontSize: 20, color: '#333' },
});
