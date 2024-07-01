import {ProgressBar} from "react-native-web";

const { LoginPage } = require("./pages/loginPage.js")

import React, { useState } from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';



const colors = require("./colors.json")
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Alert,
    Pressable,
    ActivityIndicator,
    FlatList
} from 'react-native';
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.selectionColor = '#800080'

const Grade = props => {
    return (
        <View style={styles.gradeBox}>

            <Text style={styles.grade}>{props.class.className.match("  (.*?)S[12].*?$", 'mg')[1]}</Text>
            {console.log(props.class.className.match("  (.*?)S[12].*?$", 'mg')[1])}
            <CircularProgress value={props.class.grade} radius={20}  ></CircularProgress>

        </View>
    );
};

const GradesPage = ({navigation, route}) =>
{
    const token = route.params.token
    const [currentViewingQuarter, setViewingQuarter] = useState(token.classes.currentQuarter)

    return (
        <View style={styles.container}>
            <StatusBar style={colors.lightStatusBar ? "light" : "dark"}/>

            <View style={styles.mainBox}>

                {token.classes.quarters[0].map((item, index) => {
                    return ( <Grade key={index} class={token.classes.quarters[0][index]}/> )
                })}


            </View>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colors.textColor,
        alignSelf: 'right',
        justifyContent: 'right',
    },
    mainBox: {
        backgroundColor: colors.primaryColor,
        width: Platform.OS === 'ios' || Platform.OS === 'android' ? '80%' : '90%',
        padding: 45,
        borderRadius: 10,
        alignItems: 'center',
    },
    grade:
        {
            fontSize:15,
            color:colors.textColor,
        },
    gradeBox: {
        backgroundColor: colors.secondaryColor,
        width: Platform.OS === 'ios' || Platform.OS === 'android' ? '100%' : '90%',
        marginBottom:10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent:"center",
        flexDirection: 'row',
        paddingRight:5,
        paddingVertical:5

    },
    loadingDiv: {
        backgroundColor: colors.primaryColor,
        width: Platform.OS === 'ios' || Platform.OS === 'android' ? '40%' : '0px',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginHeader: {
        fontSize: 30,
        color: colors.headerColor,
        marginBottom: 20,
    },
    loadingHeader: {
        fontSize: 30,
        color: colors.headerColor,
        marginBottom: 20
    },
    usernameBox: {
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
    passwordBox: {
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
        width: "40%",
    },
    appButtonText: {
        fontSize: 18,
        color: colors.textColor,
        alignSelf: "center",
    }
});


const testToken = require("./procedures/testToken.json").token


const Stack = createNativeStackNavigator();

export default function App() {



    // const [appStage, setAppStage] = useState("login")
    const [token, setToken] = useState(testToken)


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginPage}
                />
                <Stack.Screen
                    name="Grades"
                    component={GradesPage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )


    /*
      switch(appStage)
      {
        case "login":
          console.log('lgoin')
          return loginPage(setToken, setAppStage)
        case "home":
          return
        case "grades":
          console.log('grades')
          return gradesPage(token)
      }
      */


}



