import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from AsyncStorage
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No user data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Placeholder for profile picture */}
      <Image
        style={styles.profilePicture}
        source={{ uri: 'https://via.placeholder.com/150' }}
      />

      <Text style={styles.infoText}>
        <Text style={styles.label}>Full Name: </Text>
        {user.firstName} {user.lastName}
      </Text>
      
      <Text style={styles.infoText}>
        <Text style={styles.label}>Email: </Text>
        {user.email}
      </Text>

      <Text style={styles.infoText}>
        <Text style={styles.label}>Date of Birth: </Text>
        {formatDate(user.dob)}
      </Text>

      <Text style={styles.infoText}>
        <Text style={styles.label}>Gender: </Text>
        {user.gender ? 'Male' : 'Female'}
      </Text>

      <Text style={styles.infoText}>
        <Text style={styles.label}>Role: </Text>
        {user.roles.join(', ')}
      </Text>

      <Text style={styles.infoText}>
        <Text style={styles.label}>Account Status: </Text>
        {user.isActive ? 'Active' : 'Inactive'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginVertical: 8,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default Profile;