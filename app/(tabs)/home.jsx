import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // For image uploading

export default function HomeScreen({ navigation }) {
  const [postText, setPostText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [posts, setPosts] = useState([]);
  const POSTS_DISPLAY_LIMIT = 5;

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

  // Function to add a new post
  const addPost = () => {
    if (postText.trim() || imageUri) {
      setPosts([
        {
          id: Date.now().toString(),
          text: postText,
          image: imageUri,
          details: `Details about: ${postText}`,
        },
        ...posts,
      ]);
      setPostText('');
      setImageUri(null);
    }
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
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        )}
        <View style={styles.buttonContainer}>
          <Button title="Pick an Image" onPress={pickImage} />
          <Button title="Post" onPress={addPost} />
        </View>
      </View>

      {/* Blog Posts List */}
      <FlatList
        data={posts.slice(0, POSTS_DISPLAY_LIMIT)} // Limit displayed posts
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postContainer}
            onPress={() => navigation.navigate('PostDetails', { post: item })}
          >
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            )}
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
