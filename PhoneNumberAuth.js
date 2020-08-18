import React, {useState, useRef, useContext} from 'react';
import {Text, View, Button, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import GlobalState from './GlobalState';
import AsyncStorage from '@react-native-community/async-storage';

const PhoneNumberAuth = () => {
    const [state, setState] = useContext(GlobalState);
    const recaptchaVerifier = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState();
    const [verificationId, setVerificationId] = useState();
    const [verificationCode, setVerificationCode] = useState();
    const firebaseConfig = {
        apiKey: "AIzaSyBNvhbi-nAwQgK4sLrCXcbPeJTeQ1HXCYU",
        authDomain: "mealdeliveryapp-bfbed.firebaseapp.com",
        databaseURL: "https://mealdeliveryapp-bfbed.firebaseio.com",
        projectId: "mealdeliveryapp-bfbed",
        storageBucket: "mealdeliveryapp-bfbed.appspot.com",
        messagingSenderId: "908471658082",
        appId: "1:908471658082:web:eab3229aeae5553b2b133b"
    };
    const [message, showMessage] = useState((!firebaseConfig || Platform.OS === 'web')
    ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
    : undefined);

    return (
        <View style={styles.phoneAuthContainer}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <Text style={styles.text}>Enter phone number</Text>
            <TextInput
                style={styles.textInput}
                placeholder="+1 999 999 9999"
                autoFocus
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />
            <TouchableOpacity
                style={styles.button}
                disabled={!phoneNumber}
                onPress={async () => {
                    try {
                        const phoneProvider = new firebase.auth.PhoneAuthProvider();
                        const verificationId = await phoneProvider.verifyPhoneNumber(
                            phoneNumber,
                            recaptchaVerifier.current
                        );
                        setVerificationId(verificationId);
                        showMessage({
                            text: "Verification code has been sent to your phone.",
                        });
                    } catch (err) {
                        showMessage({ text: `Error: ${err.message}`, color: "red" });
                    }
                }}
            >
                <Text style={styles.buttonText}>Send Verification Code</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Enter Verification code</Text>
            <TextInput
                style={styles.textInput}
                editable={!!verificationId}
                placeholder="123456"
                onChangeText={setVerificationCode}
            />
            <TouchableOpacity
                style={styles.button}
                disabled={!verificationId}
                onPress={() => {
                    try {
                        const credential = firebase.auth.PhoneAuthProvider.credential(
                            verificationId,
                            verificationCode
                        );
                        firebase.auth().signInWithCredential(credential).then(() => {
                            setState(state => ({...state, isLoggedIn:true}));
                            AsyncStorage.setItem('user_email', phoneNumber);
                        });
                    } catch (err) {
                        showMessage({ text: `Error: ${err.message}`, color: "red" });
                    }
                }}
            >
                <Text style={styles.buttonText}>Confirm Verification Code</Text>
            </TouchableOpacity>
            {message ? (
                <TouchableOpacity
                    style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: "center" }]}
                    onPress={() => showMessage(undefined)}>
                    <Text style={{color: message.color || "blue", fontSize: 17, textAlign: "center", margin: 20, }}>
                    {message.text}
                    </Text>
                </TouchableOpacity>
            ) : undefined}
        </View>
    );
}


const styles = StyleSheet.create({
    phoneAuthContainer:{
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
    },signupStr:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color:'white', 
        textAlign:'center'
    }
  });

export default PhoneNumberAuth;
  