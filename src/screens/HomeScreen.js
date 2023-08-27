import React, {useEffect, useState} from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {db} from "../../firebaseConfig";

export default function HomeScreen({navigation, route}) {

    const database = db.collection('todo')
    const [input, setInput] = useState('');
    const [todo, setTodo] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false)
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        getTodo().then((data) => setTodo(data));
    },[reloadData,route])

    async function getTodo() {
        let _todos = []
        //getAll
        const snapshot = await db.collection('todo').get();
        snapshot.forEach((doc) => {
            _todos.push({id: doc.id, name: doc.data().name, status: doc.data().status});
        });
        return _todos;
    }

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
    }

    function addTask() {
        database.add({name: input, status: isEnabled}).then(() => setInput(''))
        setReloadData(!reloadData)
    }

    function goToDetails(item) {
        navigation.navigate('Details',{id: item.id, name: item.name, status: item.status})
    }

    return (
        <View style={{width: '100%', gap: 20, paddingHorizontal: 20,paddingVertical:20}}>

            <Text style={styles.header}>My Task ({input})</Text>

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

                <TouchableOpacity style={styles.button} onPress={() => addTask()}>
                    <Text style={{fontSize: 18, color: 'white'}}>Add Task</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.divider}/>

            <Text style={styles.header}>Task List</Text>

            <FlatList
                data={todo}
                renderItem={({item}) => (
                    <View>
                        <TouchableOpacity style={styles.list} onPress={() => goToDetails(item)}>
                            <Text style={styles.listText}>{item.name}</Text>
                            <Image width={40} height={40}
                                   source={{uri: item.status ? 'https://cdn-icons-png.flaticon.com/128/2794/2794680.png' : 'https://cdn-icons-png.flaticon.com/128/1008/1008927.png'}}/>
                        </TouchableOpacity>
                        <View style={styles.divider}/>
                    </View>
                )}
                keyExtractor={item => item.id}
                style={{maxHeight: '60%'}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontWeight: '700',
        fontSize: 30,
    },
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
    },
    divider: {
        height: 2,
        backgroundColor: '#ddd'
    },
    list: {
        backgroundColor: '#f8f8f8',
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    listText: {
        fontSize: 18
    },
});