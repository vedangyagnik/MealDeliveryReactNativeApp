import React,{useContext, useState} from 'react';
import {Text, TouchableOpacity, SafeAreaView, StyleSheet, View} from 'react-native';
import GlobalState from './GlobalState';
import Firebase from './Firebase';
import AsyncStorage from '@react-native-community/async-storage';

const Account = () => {
    const [state, setState] = useContext(GlobalState);
    const [username, setUsername] = useState("");

    useState(() => {
      AsyncStorage.getItem('user_email').then((val)=>{
        setUsername(val);
      });
    }, []);
    const LogoutAction = async () => {
        try {
            await Firebase.auth().signOut();
            setState(state => ({...state, isLoggedIn:false}));
        } catch (e) {
            alert(e);
        }
    }
  return (
    <SafeAreaView>
      <View style={styles.accountContainer}>
        <Text style={styles.username}>{username}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={LogoutAction}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  accountContainer:{
      padding: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%"
  }, username:{
    fontSize: 20,
    margin: 10
  },logoutButton: {
    backgroundColor: "black",
    padding: 10
  },
  buttonText: {color:'white', textAlign:'center', fontWeight: "bold"}
});

export default Account;