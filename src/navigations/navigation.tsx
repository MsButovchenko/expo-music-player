import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { PlayerMusic } from '../screens/playerMusic';
import { PlayList } from '../screens/playList';
import { EScreens } from '../constants/navigation.constant';
import { MyMusics } from '../screens/myMusics';

const Tab = createBottomTabNavigator();

export const Navigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={EScreens.MyMusic}
        component={MyMusics}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="headset" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.Player}
        component={PlayerMusic}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="compact-disc" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.PlayList}
        component={PlayList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="library-music" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
