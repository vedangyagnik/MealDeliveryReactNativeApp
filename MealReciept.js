import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const MealReciept = ({route, navigation}) => {

    const trackOrderAction = () => {
        navigation.push('OrderTrack');
    }

  return (
    <View style={styles.mealListContainer}>
        <Text style={styles.orderTitle}>{route.params.mealDetail.order_name} ({route.params.mealDetail.sku})</Text>
        <View
            style={styles.tipRow}>
        <Text style={styles.mealTitleList}>Subtotal: </Text>
        <Text style={styles.mealAmount}>${route.params.mealDetail.subtotal}</Text>
        </View>
        <View style={styles.tipRow}>
        <Text style={styles.mealTitleList}>Service fees: </Text>
        <Text style={styles.mealAmount}>$0.00</Text>
        </View>
        <View style={styles.tipRow}>
            <Text style={styles.mealTitleList}>Taxes: </Text>
            <Text style={styles.mealAmount}>${route.params.mealDetail.subtotal * 0.13}</Text>
        </View>
        <View
           style={styles.tipRow}>
        <Text style={styles.mealTitleList}>Tip: </Text>
            <Text style={styles.mealAmount}>${route.params.mealDetail.tip}</Text>
            </View>
            <View
           style={styles.tipRow}>
        <Text style={styles.totalText}>Total: </Text>
            <Text style={styles.totalAmount}>${route.params.mealDetail.total}</Text>
        </View>
        <TouchableOpacity style={styles.trackButton} onPress={trackOrderAction}>
            <Text style={styles.buttonText}>Track Order</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mealListContainer:{
      padding: 10
  },
  orderTitle:{
    fontSize: 20,
    fontWeight: "bold"
  },
  tipRow:{
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
  }, trackButton: {
    backgroundColor: "black",
    padding: 10
},
buttonText: {
    color:'white', 
    textAlign:'center',

    fontWeight: "bold"
}
});

export default MealReciept;