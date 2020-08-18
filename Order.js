import React, { useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Firebase from './Firebase';
import { SafeAreaView } from 'react-native-safe-area-context';

const Order = () => {
    let orderData = [];
    const [orders, setOrders] = useState({});
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        AsyncStorage.getItem("user_email").then((value) => {
            Firebase.firestore()
                .collection('orders')
                .where('email', '==', value)
                .get()
                .then(query => {query.docs.map(document => {
                        return (orderData.push(document.data()));
                    });
                    setOrders(orderData);
                });
        });
    }, []);

    const renderItem = (eachElement) => {
        let orderDateString =  month[new Date(eachElement.item.date).getMonth()] + " " + new Date(eachElement.item.date).getDate() + ", " + new Date(eachElement.item.date).getFullYear();
        return(
            <View style={styles.orderItem}>
            
            {/* <View style={styles.orderRow}> */}
                <Text style={styles.orderTitle}>{eachElement.item.order_name}</Text>
            {/* </View> */}
            <View style={styles.orderRow}>
                <Text style={styles.mealTitleList}>SKU: </Text>
                <Text style={styles.mealAmount}>{eachElement.item.sku}</Text>
            </View>
            <View style={styles.orderRow}>
                <Text style={styles.mealTitleList}>Order Completed: </Text>
                <Text style={styles.mealAmount}>{orderDateString}</Text>
            </View>
            <View
           style={styles.orderRow}>
            <Text style={styles.totalText}>Total: </Text>
            <Text style={styles.totalAmount}>${eachElement.item.total}</Text>
        </View>
            </View>
            
        );
    }

    return (
        <SafeAreaView>
            <View style={styles.orderContainer}>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item.sku}
            />
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    orderContainer:{
        padding: 10
    },
    orderTitle:{
        textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      margin:5
    },
    orderRow:{
      display: "flex",
      flexDirection: "row"
  },
    mealTitleList: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 15,
        color: "#212121",
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
    }, trackButton: {
      backgroundColor: "black",
      padding: 10
  },
  buttonText: {
      color:'white', 
      textAlign:'center',
  
      fontWeight: "bold"
  },orderItem:{
        borderWidth: 1,
        borderColor: "#9e9e9e",
        padding: 5,
        margin: 10,
  }
  });
export default Order;