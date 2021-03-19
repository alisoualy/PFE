import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem,DrawerItemList
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles'

export function SideBar(props) {

   
    return (
        <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={{flexDirection:'row',marginTop: 15}}>
                        <Avatar.Image 
                            source={{
                                uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                            }}
                            size={50}
                        />
                        <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>John Doe</Title>
                            <Caption style={styles.caption}>@j_doe</Caption>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                            <Caption style={styles.caption}>Following</Caption>
                        </View>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                            <Caption style={styles.caption}>Followers</Caption>
                        </View>
                    </View>
                </View>

                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem 
                        
                        label="Home"
                        onPress={() => {props.navigation.navigate('Home')}}
                    />
                    <DrawerItem 
                        
                        label="Profile"
                        onPress={() => {props.navigation.navigate('Profile')}}
                    />
                    <DrawerItem 
                        
                        label="Bookmarks"
                        onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                    />
                    <DrawerItem 
                        
                        label="Settings"
                        onPress={() => {props.navigation.navigate('SettingsScreen')}}
                    />
                    <DrawerItem 
                       
                        label="Support"
                        onPress={() => {props.navigation.navigate('SupportScreen')}}
                    />
                </Drawer.Section>
              
            </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem 
                icon={({color, size}) => (
                    <Icon 
                    name="star" 
                    color={color}
                    size={size}
                    />
                )}
                label="Sign Out"
                onPress={() => {signOut()}}
            />
        </Drawer.Section>
    </View>)
     
}

export default SideBar
