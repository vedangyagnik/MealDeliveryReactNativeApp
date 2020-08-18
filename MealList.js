import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Firebase from './Firebase';

const MealList = ({navigation}) => {
    let mealData = [];
    const [meals, setMeals] = useState({});

    useEffect(() => {
        Firebase.firestore()
            .collection('meals')
            .get()
            .then(query => {query.docs.map(document => {
                    return (mealData.push(document.data()));
                });
                setMeals(mealData);
            });
    }, []);

    const goToMealDetails = (meal) => {
        navigation.push('MealDetail', {mealDetail : meal});
    }

    const renderItem = (eachElement) => {
        return(
            <View style={styles.listItem}>
                <TouchableOpacity style={styles.touchableItem} onPress={() => goToMealDetails(eachElement.item)}>
                    <Image style={styles.mealImage} source={{uri:`https://vedangyagnik.github.io/MealDeliveryApp/${eachElement.item.photo}.jpg`}}/>
                    <View style={styles.mealTitleContainer}>
                    <Text style={styles.mealTitle}>{eachElement.item.name}</Text>
                    <Text style={styles.mealAmount}>${eachElement.item.price}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.mealListContainer}>
            <FlatList
                data={meals}
                renderItem={renderItem}
                keyExtractor={item => item.name}
            />
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
        fontSize: 15,
        color: "#212121",
        fontWeight: "bold",
        flex: 7
    },
    mealAmount: {
        flex:1,
        textAlign: "right",
        paddingTop: 5,
        paddingBottom: 10,
        fontSize: 15,
        color: "#212121",
        fontWeight: "bold"
    },
    mealTitleContainer:{
        display: "flex",
        flexDirection: "row"
    }
  });
export default MealList;