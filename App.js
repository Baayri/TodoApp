import {StatusBar} from 'expo-status-bar';
import HomeScreen from "./src/screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DetailsScreen from "./src/screens/DetailsScreen";

export default function App() {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <StatusBar style={'dark'}/>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />

                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
