import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import PostCard from "./PostCard";


export default class Feed extends Component {

    renderItem = ({ item: post }) => {
        return <PostCard post={post} navigation={this.props.navigation}/>;
      };

      
  componentDidMount() {
    this.fetchUser();
  }

      fetchUser = () => {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", snapshot => {
            theme = snapshot.val().current_theme;
            this.setState({ light_theme: theme === "light" });
          });
      };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>
                    <View style={styles.container}>
                        <SafeAreaView style={styles.droidSafeArea}/>
                        <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image
                            source={ require("../assets/logo.png")}
                            style={tyles.iconImage}
                            ></Image>
                        </View>
                        <View style={styles.appTitleTextContainer}>
                            <Text style = {styles.appTitleText}>Espectagram</Text>
                        </View>
                        </View>
                        <View style={styles.cardContainer}>
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={posts}
                            renderItem={this.renderItem}/>
                        </View>
                    </View>
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex:1,
        backgroundColor: "black"
    },
    droidSafeArea: {
        marginTop: Plataform.OS === "android" ? StatusBar.currentHeigh : RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: " row"
    },
    appIcon: {
        flex: 0.2,
        justifyContent: "center",
        alightItems: "center"
    },
    iconImage: {
        widht: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.8,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28),
    },
    cardContainer: {
        flex: 0.85
    }
}) 