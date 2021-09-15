import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Color';
import FavoritesScreen from '../screens/FavoritesScreen';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Platform, Text } from 'react-native';
import FiltersScreen from '../screens/FiltersScreen';
import { color } from 'react-native-reanimated';


const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Colors.primaryColor
    },
    headerTitleStyle :{
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: 'white',
    headerTitle: 'A Screen'
}


const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen
        },
        CategoryMeals: {
            screen: CategoryMealsScreen
        },
        MealDetail: MealDetailScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.primaryColor
            },
            headerTintColor: 'white',
            headerTitle: 'A Screen'
        }
    }
);

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen
    }, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: 'orange'
        },
        headerTintColor: 'white',
        headerTitle: 'A Screen'
    },
    
    
    }
);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (<Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
                );
            },
            tabBarOptions: {
                style: {
                    backgroundColor: Colors.primaryColor,
                }
            },
            //tabBarLabel:<Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> 

        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            //tabBarLabel: 'Favorites!', For change the name
            tabBarIcon: (tabInfo) => {
                return (<Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
                );
            },
            tabBarOptions: {
                style: {
                    backgroundColor: 'orange',
                }
            }
        }
    },
};

const MealsFavTabNavigator = Platform.OS === 'android' ?
    createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true
    })
    : createBottomTabNavigator(
        tabScreenConfig, {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans'
            },
            activeTintColor: 'white'
        }
    });

    const FiltersNavigator = createStackNavigator({
        Filters: FiltersScreen
    },{
        // navigationOptions:{
        //     drawerLabel: 'Filters!!'
        // },
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.primaryColor
            },
            headerTintColor: 'white',
            headerTitle: 'A Screen'
        }
    });

const MainNavigator = createDrawerNavigator({
    MealsFavs:{ screen: MealsFavTabNavigator, 
        navigationOptions: {
        drawerLable: 'Meals',
    }},
    Filters: FiltersNavigator
},{
    contentOptions: {   
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
        
    }
}
);

export default createAppContainer(MainNavigator);
