import React, { useState, useEffect } from 'react';
import {Text, View, Image, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import AsyncStorage from '@react-native-community/async-storage';
import Firebase from './Firebase';

const MealDetail = ({route, navigation}) => {
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [tipAmount, setTipAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [subTotalAmount, setSubTotalAmount] = useState(route.params.mealDetail.price);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(()=>{
        const sbtotal = route.params.mealDetail.price;
        setSubTotalAmount(sbtotal);
        const tax = sbtotal * 0.13;
        setTaxAmount(tax);
        const tip = sbtotal * 0.10;
        setTipAmount(tip);
        let total = 0;
        total =  parseFloat(sbtotal)+parseFloat(tip)+parseFloat(tax);
        total = total.toFixed(2);
        setTotalAmount(total);
        AsyncStorage.getItem("user_email").then((value) => {
            setUserEmail(value);
        });
    }, []);

    const skuStringGenerator = (length) => {
        let alphaNum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return [...Array(length)].map(_ => alphaNum[~~(Math.random()*alphaNum.length)]).join('');
    }

    const placeOrderAction = () => {
        const skuValue = skuStringGenerator(8);
        Firebase.firestore()
            .collection('orders')
            .add({
                email: userEmail,
                order_name: route.params.mealDetail.name,
                sku: skuValue,
                status: "Active",
                subtotal: subTotalAmount,
                tip: tipAmount,
                total: totalAmount,
                date: Date()
            })
            .then(() => {
                console.log('order saved!');
            });
        navigation.push('MealReciept', {mealDetail:{
            email: userEmail,
            order_name: route.params.mealDetail.name,
            sku: skuValue,
            status: "Active",
            subtotal: subTotalAmount,
            tip: tipAmount,
            total: totalAmount,
            date: Date()
        }})
    }

    const calTotal = tip => {
        setTotalAmount((parseFloat(tip)+parseFloat(subTotalAmount)+parseFloat(taxAmount)).toFixed(2));
    }

  return (
    <View  style={styles.listItem}>
        <View style={styles.touchableItem}>
        <Image style={styles.mealImage} source={{uri:`https://vedangyagnik.github.io/MealDeliveryApp/${route.params.mealDetail.photo}.jpg`}}/>
        <View style={styles.mealTitleContainer}>
            <Text style={styles.mealTitle}>{route.params.mealDetail.name}</Text>
            <Text style={styles.mealCalories}>{route.params.mealDetail.calorie_count} Cals</Text>
        </View>
        </View>
        <Text style={styles.mealDescription}>{route.params.mealDetail.detail}</Text>
        <View
            style={styles.tipContainer}
        />
        <Text style={styles.tipTitle}>Add a tip to say thanks</Text>
        <SegmentedControl
            values={['10%', '15%', '20%', 'Edit']}
            selectedIndex={selectedIndex}
            onChange={(event) => {
                let tip;
                switch(event.nativeEvent.selectedSegmentIndex) {
                    case 0:
                        tip = subTotalAmount * 0.10;
                        setTipAmount(tip);
                        calTotal(tip);
                        break;
                    case 1:
                        tip = subTotalAmount * 0.15;
                        setTipAmount(tip);
                        calTotal(tip);
                        break;
                    case 2:
                        tip = subTotalAmount * 0.20;
                        setTipAmount(tip);
                        calTotal(tip);
                        break;
                    case 3:
                        Alert.prompt(
                            "Custom Tip",
                            "Enter tip amount",
                            [
                                {
                                    text: "OK",
                                    onPress: tipValue => {
                                        if(tipValue === ""){
                                            tipValue = 0;
                                        }
                                        setTipAmount(parseInt(tipValue));
                                        calTotal(parseInt(tipValue));
                                    },
                                }
                            ],
                            "plain-text"
                        );
                        break;
                }
            }}
        />
        <View
            style={styles.tipRow}>
        <Text style={styles.mealTitleList}>Subtotal: </Text>
        <Text style={styles.mealAmount}>${subTotalAmount}</Text>
        </View>
        <View style={styles.tipRow}>
        <Text style={styles.mealTitleList}>Service fees: </Text>
        <Text style={styles.mealAmount}>$0.00</Text>
        </View>
        <View style={styles.tipRow}>
            <Text style={styles.mealTitleList}>Taxes: </Text>
            <Text style={styles.mealAmount}>${taxAmount}</Text>
        </View>
        <View
           style={styles.tipRow}>
        <Text style={styles.mealTitleList}>Tip: </Text>
            <Text style={styles.mealAmount}>${tipAmount}</Text>
            </View>
            <View
           style={styles.tipRow}>
        <Text style={styles.totalText}>Total: </Text>
            <Text style={styles.totalAmount}>${totalAmount}</Text>
        </View>
        
        <TouchableOpacity style={styles.orderButton} onPress={placeOrderAction}>
            <Text style={styles.buttonText}>Place Order - Pick Up</Text>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    mealListContainer:{
        padding: 10
    },
    listItem: {
        display: "flex",
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },touchableItem:{
        flexShrink: 0,
    },mealImage:{
        width: "100%",
        height: 150,
        flexShrink: 0
    },
    mealTitle: {
        paddingTop: 5,
        paddingBottom: 10,
        fontSize: 20,
        color: "#212121",
        fontWeight: "bold",
        flex: 3
    },
    mealCalories: {
        flex:1,
        textAlign: "right",
        paddingTop: 5,
        paddingBottom: 10,
        fontSize: 20,
        color: "#212121",
        fontWeight: "bold"
    },
    mealTitleContainer:{
        display: "flex",
        flexDirection: "row"
    },mealDescription:{
        fontSize: 15
    },tipContainer:{
        padding: 10,
    },
    tipTitle:{
        fontSize: 16,
        marginBottom: 5
    },tipRow:{
        display: "flex",
        flexDirection: "row"
    },
    mealTitleList: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 15,
        color: "#212121",
        flex: 3
    },
    mealAmount: {
        flex:1,
        justifyContent: "flex-end",
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 15,
        color: "#212121",
        textAlign: "right",
        fontWeight: "bold",
        marginRight: 10
    },
    totalAmount: {
        flex:1,
        justifyContent: "flex-end",
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 20,
        color: "#212121",
        textAlign: "right",
        fontWeight: "bold",
        marginRight: 10
    }, totalText: {
        paddingTop: 5,
        paddingBottom: 10,
        fontSize: 20,
        color: "#212121",
        fontWeight: "bold",
        flex: 3
    },
    orderButton: {
        backgroundColor: "black",
        padding: 10
    },
    buttonText: {
        color:'white', 
        textAlign:'center',

        fontWeight: "bold"
    }
  });

export default MealDetail;