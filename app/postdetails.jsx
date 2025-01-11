import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PostDetails({ route }) {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.text}</Text>
      <Text style={styles.details}>{post.details}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    color: '#333',
  },
});

