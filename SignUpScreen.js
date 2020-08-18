import React,{useState, useEffect} from 'react';
import {Text, View, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Firebase from './Firebase';
import { useActionSheet} from '@expo/react-native-action-sheet'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const SignUpScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => {
        if (Constants.platform.ios) {
            Permissions.askAsync(Permissions.CAMERA_ROLL).then(status=>{
                if (status !== 'granted') {
                    console.log('Sorry, we need camera roll permissions to make this work!');
                }
            });
        }
        Permissions.askAsync(Permissions.CAMERA).then(status=>{
            if (status !== 'granted') {
                console.log('Sorry, we need camera permissions to make this work!');
            }
        });
    }, []);

    const signUpAction = () => {
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => navigation.goBack())
            .catch(error => alert(error))
    }

    const signInAction = () => {
        navigation.goBack();
    }

    const uploadProfilePicAction = () => {
        const options = ['Take Photo', 'Choose From Library', 'Cancel'];
        const destructiveButtonIndex = -1;
        const cancelButtonIndex = 2;
        showActionSheetWithOptions(
            {options, destructiveButtonIndex, cancelButtonIndex},
        buttonIndex => {
            if (buttonIndex == 0) {
                ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                }).then(result=>{
                    console.log(result.uri);
                });
            } else if(buttonIndex == 1) {
                ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                }).then(result=>{
                    console.log(result.uri);
                });
            }
          }
        );
    }
  
  return (
    <SafeAreaView>
        <View style={styles.signupContainer}>
            <TouchableOpacity onPress={uploadProfilePicAction}>
                <Image source={require('./assets/user_add_profile.png')} style={{width: 100, height: 100, marginLeft: "35%"}}/>
            </TouchableOpacity>
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
                onChangeText={val => setPassword(val)}
            />
            <Text style={styles.text}>Phone Number:</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Phone Number"
                value={phone}
                autoCapitalize = 'none'
                onChangeText={val => setPhone(val)}
            />
            <TouchableOpacity style={styles.button} onPress={signUpAction}>
                <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.signupStr}>
                <Text style={{textAlign:'center'}}>Already have an account? </Text>
                <TouchableOpacity onPress={signInAction}>
                    <Text style={{color:'blue'}}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    signupContainer:{
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
    signupText: {
        color:'white', 
        textAlign:'center'
    }
  });

export default SignUpScreen;