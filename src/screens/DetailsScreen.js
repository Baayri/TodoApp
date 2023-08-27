import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from "react-native";
import {db} from "../../firebaseConfig";

export default function DetailsScreen({route, navigation}) {

    const [input, setInput] = useState(route.params.name)
    const [isEnabled, setIsEnabled] = useState(route.params.status)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => deleteTask()}
                    style={styles.headerButton}
                >
                    <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/542/542724.png'}} width={20} height={20}/>
                </TouchableOpacity>
            ),
        })
    }, []);

    function updateTask() {
        db.collection('todo').doc(route.params.id).set({
            name: input,
            status: isEnabled,
        }).then(() => {
            navigation.navigate('Home', {update: true})
        });
    }

    function deleteTask() {
        db.collection('todo').doc(route.params.id).delete().then(() => {
            navigation.navigate('Home', {delete: true})
        });
    }

    function toggleSwitch() {
        setIsEnabled(!isEnabled)
    }

    return (
        <View style={{width: '100%', gap: 20, paddingHorizontal: 20, paddingVertical: 20}}>

            <TextInput
                style={styles.input}
                placeholder={'Enter Your Task'}
                onChangeText={setInput}
                keyboardType={'default'}
                keyboardAppearance={'dark'}
                value={input}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Switch
                    trackColor={{false: '#767577', true: '#4CAF50'}}
                    thumbColor={'white'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />

                <TouchableOpacity style={styles.button} onPress={() => updateTask()}>
                    <Text style={{fontSize: 18, color: 'white'}}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderRadius: 7,
        padding: 10,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#4caf50',
        width: 120,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        alignSelf: 'flex-end'
    },
    headerButton:{
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 35,
        backgroundColor: '#fa5151',
        borderRadius: 8,

    },
})