import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);
  const POSTS_DISPLAY_LIMIT = 5;

  const addPost = () => {
    if (postText.trim()) {
      setPosts([{ id: Date.now().toString(), text: postText, details: `Details about: ${postText}` }, ...posts]);
      setPostText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.postInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="What's on your mind?"
          value={postText}
          onChangeText={setPostText}
          multiline
        />
        <Button title="Post" onPress={addPost} />
      </View>

      <FlatList
        data={posts.slice(0, POSTS_DISPLAY_LIMIT)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postContainer}
            onPress={() => navigation.navigate('PostDetails', { post: item })}
          >
            <Text style={styles.postText}>{item.text}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  postInputContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textInput: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  flatListContainer: {
    padding: 16,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  postText: {
    fontSize: 16,
    color: '#333',
  },
});
