import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  const POSTS_DISPLAY_LIMIT = 5;

  // Fetch posts from the API on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data.slice(0, POSTS_DISPLAY_LIMIT)); // Limit posts for display
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch posts');
      }
    };
    fetchPosts();
  }, []);

  // Function to pick an image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Function to handle adding or editing a post
  const handlePost = async () => {
    if (postText.trim()) {
      if (isEditing) {
        // Update the post
        const updatedPosts = posts.map((post) =>
          post.id === editingPostId
            ? { ...post, text: postText, image: imageUri }
            : post
        );
        setPosts(updatedPosts);
        setIsEditing(false);
        setEditingPostId(null);
      } else {
        // Create a new post
        const newPost = {
          id: Date.now().toString(),
          text: postText,
          image: imageUri,
          details: `Details about: ${postText}`,
        };
        setPosts([newPost, ...posts]);

        // Optional: Send the post to the server
        try {
          await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost),
          });
        } catch (error) {
          Alert.alert('Error', 'Failed to create post on the server');
        }
      }
      setPostText('');
      setImageUri(null);
    }
  };

  // Function to start editing a post
  const startEditing = (post) => {
    setPostText(post.text);
    setImageUri(post.image);
    setIsEditing(true);
    setEditingPostId(post.id);
  };

  return (
    <View style={styles.container}>
      {/* Blog Post Creation Section */}
      <View style={styles.postInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="What's on your mind?"
          value={postText}
          onChangeText={setPostText}
          multiline
        />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
        <View style={styles.buttonContainer}>
          <Button title="Pick an Image" onPress={pickImage} />
          <Button title={isEditing ? 'Update Post' : 'Post'} onPress={handlePost} />
        </View>
      </View>

      {/* Blog Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postContainer}
            onPress={() => navigation.navigate('PostDetails', { post: item })}
            onLongPress={() => startEditing(item)} // Long press to edit a post
          >
            {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
            <Text style={styles.postText}>{item.text || item.title}</Text>
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
  previewImage: {
    width: '100%',
    height: 150,
    marginVertical: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  postImage: {
    width: '100%',
    height: 150,
    marginBottom: 8,
    borderRadius: 8,
  },
  postText: {
    fontSize: 16,
    color: '#333',
  },
});
