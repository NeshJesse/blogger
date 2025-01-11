import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PostDetails({ route }) {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      {/* Display the title */}
      <Text style={styles.title}>{post.title}</Text>
      {/* Display the body/details */}
      <Text style={styles.body}>{post.body}</Text>
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
  body: {
    fontSize: 16,
    color: '#333',
  },
});

