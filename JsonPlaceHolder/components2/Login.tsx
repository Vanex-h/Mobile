import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { login } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,

} from "react-native";
import { Toast } from "react-native-toast-notifications";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { authService } from "../authService/authService";

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      await AsyncStorage.setItem('userToken', response.data.token);
      onLogin();
    } catch (error) {
      Alert.alert('Error', (error as any).response?.data?.error || 'An error occurred');
    }
  };


    return (
      <View style={tw`items-center p-4 bg-white`}>
        <Image
          source={require("./style/Login-amico.png")}
          resizeMode="cover"
          style={tw`items-center h-1/2 w-full p-4 bg-white`}
        />
  
        <View style={tw`justify-center items-center  w-full`}>
          <Text style={tw`text-2xl font-bold mb-4`}>Log In</Text>
          {error && <Text style={tw`text-red-500 mb-2`}>{error}</Text>}
          <View
            style={tw`flex flex-row items-center w-full px-3 py-2 border border-gray-300 rounded-md mb-4 h-12`}
          >
            <AntDesign name="mail" size={24} color="black" />
  
            <TextInput
              style={tw`w-full px-3 py-2`}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              // autoCompleteType="email"
              onBlur={() => {
                // Email validation logic here
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                  // Handle invalid email input here
                  setError1("Invalid email");
                  setTimeout(() => {
                    setError("");
                  }, 1000);
                } else {
                  setError1("");
                }
              }}
            />
          </View>
          {error1 && <Text style={tw`text-red-500 mb-2`}>{error1}</Text>}
          <View
            style={tw`flex flex-row items-center w-full px-3 py-2 border border-gray-300 rounded-md mb-4 h-12`}
          >
            <MaterialIcons name="password" size={24} color="black" />
  
            <TextInput
              style={tw`w-full px-3 py-2 `}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={tw`w-full bg-blue-500 text-white py-2 px-4 rounded-md text-center`}
            onPress={handleLogin}
          >
            <Text style={tw`text-white text-base m-auto font-bold`}>Log In</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={tw`mt-4 hover:text-blue-400`}
            onPress={() => navigation.push("Signup")}
          >
            <Text>
              Don't have an account? <Text style={tw`text-blue-500`}>SignUp</Text>
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
};
