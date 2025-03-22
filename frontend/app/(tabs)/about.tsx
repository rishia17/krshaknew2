import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>About Krshak-Saathee</Text>
        <Image
        source={{ uri: 'https://images.unsplash.com/photo-1620901433789-1d2f85a93653?q=80&w=1935&auto=format&fit=crop' }}
        style={styles.image}
        resizeMode="cover"
      />
        <Text style={styles.description}>
          Krshak-Saathee is an agriculture support app designed to empower Indian farmers by providing crop recommendations,
          fertilizer suggestions, and market analysis. It uses AI and data analytics to help farmers make informed decisions,
          improve yields, and reduce losses.
        </Text>
        <Text style={styles.description}>
          Our mission is to assist farmers in adopting sustainable and profitable farming practices. With features like crop prediction,
          disease detection, and real-time weather updates, Krshak-Saathee is a true companion for every farmer.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff', // White background
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 26,
    color: '#000000', // Black text
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#000000', // Black text
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 15,
  },
});
