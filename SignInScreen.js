import React,{useContext, useState} from 'react';
import {Text, View, SafeAreaView, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import GlobalState from './GlobalState';
import Firebase from './Firebase';
import AsyncStorage from '@react-native-community/async-storage';

const SignInScreen = ({navigation}) => {
    const [state, setState] = useContext(GlobalState);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signInWithPhoneNumber = () => {
      navigation.push("PhoneAuth");
    }
  
    const signInAction = () => {
      AsyncStorage.setItem('user_email', email);
      Firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => setState(state => ({...state, isLoggedIn:true})))
          .catch(error => alert(error))
    }

    const signUpAction = () => {
        navigation.navigate('SignUp');
    }
    
  return (
    <SafeAreaView>
        <View style={styles.loginContainer}>
        <Text style={styles.text}>Email:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          autoCapitalize = 'none'
          onChangeText={val => setEmail(val)}
        />
        <Text style={styles.text}>Password:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={password}
          autoCapitalize = 'none'
          secureTextEntry = {true}
          onChangeText={val => setPassword(val)}
        />
        <TouchableOpacity style={styles.button} onPress={signInAction}>
          <Text style={{color:'white', textAlign:'center'}}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.accountText}>Doesn't have an account? </Text>
          <TouchableOpacity onPress={signUpAction}>
            <Text style={{color:'blue'}}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={signInWithPhoneNumber}>
          <Text style={{color:'white', textAlign:'center'}}>Sign In With Phone Number</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginContainer:{
      padding: 10
  },
  text: {
    paddingTop: 15,
    fontWeight: "bold",
    color: "#212121",
    paddingBottom: 5
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#bdbdbd",
    color: "#424242",
    borderRadius: 5
  },
  button: {
    color: "white",
    backgroundColor: "#212121",
    padding: 10,
    borderRadius: 5,
    marginTop: 15
  },
  textContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 10
  },
  accountText: {
    textAlign:'center'
  }
});

export default SignInScreen;