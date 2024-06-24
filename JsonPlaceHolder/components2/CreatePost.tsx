import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { createPost } from '../services/api';
import tw from "twrnc";
interface CreatePostProps {
  onPostCreated: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState("");
  const [body, setBody] = useState('');

  const handleCreatePost = async () => {
    try {
      await createPost(title, body);
      Alert.alert('Success', 'Post created successfully');
      setTitle('');
      setBody('');
      onPostCreated();
    } catch (error) {
      Alert.alert('Error', (error as any).response?.data?.error || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
       {error && <Text style={tw`text-red-500 mb-2`}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        onBlur={() => {
          // Last name validation logic here
          if (title.length < 3 || title.trim() === "") {
              // Handle invalid last name input here
              setError(
                  "Title must be at least 3 characters long and not empty"
              );
              setTimeout(() => {
                  setError("");
                }, 1000);
          } else {
              setError("");
          }
      }}
      />
      <TextInput
        style={styles.input}
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        onBlur={() => {
          // Last name validation logic here
          if (body.length < 3 || body.trim() === "") {
              // Handle invalid last name input here
              setError(
                  "Title must be at least 3 characters long and not empty"
              );
              setTimeout(() => {
                  setError("");
                }, 1000);
          } else {
              setError("");
          }
      }}
        multiline
      />
      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});