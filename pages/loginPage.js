const colors = require("../colors.json")
import authHac from "../procedures/authHac.mjs"
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard, Platform, Alert, Pressable, ActivityIndicator } from 'react-native';
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.selectionColor = '#800080'


export const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  let RETURN;
  
  const [attemptingLogin, setAttemptingLogin] = useState(true)
  
  
  const handleTextChangeNumericUsername = (inputText) => {
    // Remove any non-numeric characters using regular expression 
    const numericText = inputText.replace(/[^0-9]/g, '')
    setUsername(numericText);
  };
  const handleTextChangePassword = (inputText) => {
    setPassword(inputText)
  }
  if(attemptingLogin)
    {
    RETURN = (
      <TouchableWithoutFeedback onPress={Platform.OS == "ios" || Platform.OS == "android" ? Keyboard.dismiss : {}}> 
      
      <View style={styles.container}>
      <StatusBar style={colors.lightStatusBar ? "light" : "dark"}/>
      <View style={styles.loginDiv}>
      <Text style={styles.loginHeader}>Graded</Text>
      <TextInput  style={styles.usernameBox}
      keyboardType='numeric' 
      maxLength={6} 
      id="username"
      value={username} 
      onChangeText={handleTextChangeNumericUsername}
      placeholder="Username" 
      placeholderTextColor={colors.placeholderTextColor}></TextInput>
      
      
      <TextInput style={styles.passwordBox}  
      placeholder="Password" 
      placeholderTextColor={colors.placeholderTextColor}
      secureTextEntry 
      value={password}
      onChangeText={handleTextChangePassword}
      textContentType={'password'}></TextInput>
      
      <Pressable style={styles.appButtonContainer} onPress={async () => {

        authHac.getData(username, password).then((data) => {
          if(data.hasOwnProperty("message"))
            {

            Alert.alert("Invalid Login. Please try again.")
            if(Platform.OS == "web") alert("Invalid Login, please try again.")
              setAttemptingLogin(true)
          }
          else
          {
            setAttemptingLogin(false)
            setTimeout(function(){navigation.navigate('Grades', {token: data})}.bind(this), 1000)
          }
        })


      }}>
      <Text style={styles.appButtonText}>Login</Text>
      </Pressable>
      </View>
      </View>
      
      </TouchableWithoutFeedback>
    );
  }
  else
  {
    
    RETURN = (
      <View style={styles.container}>
      <StatusBar style={colors.lightStatusBar ? "light" : "dark"}/>
      <View style={styles.loginDiv}>
      <Text style={styles.loadingHeader}>
      Loading..
      </Text>
      <ActivityIndicator size="large" color={colors.progressColor} />
      </View>
      </View>
    );
  }
  return RETURN
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginDiv: {
    backgroundColor: colors.primaryColor,
    width: Platform.OS == 'ios' || Platform.OS == 'android' ? '80%' : '400px',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingDiv:
  {
    backgroundColor: colors.primaryColor,
    width:Platform.OS == 'ios' || Platform.OS == 'android' ? '40%' : '0px',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginHeader:{
    fontSize: 30,
    color: colors.headerColor,
    marginBottom: 20,
  },
  loadingHeader:{
    fontSize:30,
    color:colors.headerColor,
    marginBottom: 20
  },
  usernameBox:{
    backgroundColor: colors.secondaryColor,
    borderColor: "#000",
    width: '100%',
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    color: colors.textColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  passwordBox:{
    backgroundColor: colors.secondaryColor,
    borderColor: '#000',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    color: colors.textColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  appButtonContainer: {
    backgroundColor: colors.disabledButtonColor,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width:"40%",
  },
  appButtonText: {
    fontSize: 18,
    color: colors.textColor,
    alignSelf: "center",
  }
});

module.exports = { LoginPage }
