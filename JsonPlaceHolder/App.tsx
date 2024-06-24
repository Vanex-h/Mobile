import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text, TouchableOpacity } from "react-native";

import { Signup } from "./components2/Signup";
import { Login } from "./components2/Login";
import { PostDetails } from "./components2/PostDetails";
import { CreatePost } from "./components2/CreatePost";
import { PostList } from "./components2/PostList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc'
interface Post {
  id: string;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setIsLoggedIn(!!userToken);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setShowSignup(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };

  const handleRefresh = () => {
    setSelectedPost(null);
  };

  if (!isLoggedIn) {
    return (
      <View style={tw`w-full flex flex-col justify-center`}>
        {showSignup ? (
          <>
            <Signup onSignup={handleSignup} />
            <TouchableOpacity style={tw`self-center  text-blue-500 py-2 px-4 rounded-md text-center`} onPress={() => setShowSignup(false)}>
              <Text style={tw` text-blue-500 h-6`}>Already have an account? Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} />
            <TouchableOpacity style={tw`self-center  text-blue-500 py-2 px-4 rounded-md text-center`} onPress={() => setShowSignup(true)}>
              <Text style={tw` text-blue-500 h-6`}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
      {selectedPost ? (
        <>
          <PostDetails postId={selectedPost.id} />
          <Button title="Back to Posts" onPress={() => setSelectedPost(null)} />
        </>
      ) : (
        <>
          <CreatePost onPostCreated={handleRefresh} />
          <PostList onPostPress={setSelectedPost} onRefresh={handleRefresh} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default App;