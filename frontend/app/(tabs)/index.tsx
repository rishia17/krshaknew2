import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  const features = [
    // {
    //   title: 'Current Statistics',
    //   desc: 'Data visualizations about crop statistics.',
    //   image: 'https://www.pngitem.com/pimgs/m/11-115579_dashboard-monitoring-icon-png-transparent-png.png',
    //   route: '/statistics',
    //   buttonText: 'View Graph',
    // },
    {
      title: 'Crop Registration',
      desc: 'Register your crops for better market visibility.',
      image: 'https://www.bajajallianz.com/blog/wp-content/uploads/2022/07/pmfby-crop-insurance-quick-overview.png',
      route: '/cropRegistration',
      buttonText: 'Register Crop',
    },
    {
      title: 'Yield Prediction',
      desc: 'Predict the crop yield based on conditions.',
      image: 'https://www.fertilux.lu/wp-content/uploads/2020/06/rendements-agricoles-1024x683.jpg',
      route: '/yieldPrediction',
      buttonText: 'Predict Now',
    },
    {
      title: 'Fertilizer Recommendation',
      desc: 'Get recommended fertilizers based on your land.',
      image: 'https://i0.wp.com/grenadinegas.com/wp-content/uploads/2020/04/cropped-fertilizer.jpg?resize=750%2C539&ssl=1',
      route: '/fertilizerRecommendation',
      buttonText: 'Get Recommendation',
    },
    {
      title: 'Crop Recommendation',
      desc: 'Find the best crops to grow based on your soil and weather.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqrg2qKUTP3paK53TCknQx4ZfflKG7KKXRBQ&s',
      route: '/cropRecommendation',
      buttonText: 'Recommend Crop',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.title}>Krish Uttam Vikalp</Text>
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/chat')}>
            <Text style={styles.navText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards Section */}
      <View style={styles.cardContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: feature.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{feature.title}</Text>
            <Text style={styles.cardDesc}>{feature.desc}</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push(feature.route)}>
              <Text style={styles.buttonText}>{feature.buttonText}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>


    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  navbar: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#2c3e50' },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  navLinks: { flexDirection: 'row' },
  navText: { color: '#fff', marginHorizontal: 10, fontSize: 16 },
  cardContainer: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 12 },
  cardDesc: { fontSize: 14, marginVertical: 10, color: '#555' },
  button: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  footer: { backgroundColor: '#2c3e50', padding: 16, alignItems: 'center' },
  footerText: { color: '#fff', fontSize: 14 },
});
