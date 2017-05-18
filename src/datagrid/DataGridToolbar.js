import React, {Component} from "react";
import {View,StyleSheet, Text, Button, TouchableOpacity, TouchableNativeFeedback} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: "lightblue",
        borderRadius: 0,
        flexDirection:"row",
        marginRight:5
    },
    test:{
        alignSelf:"center"
    },
    icon:{
        alignSelf:"center"
    }
});


export default class DataGridToolbar extends Component {


    static propTypes = {
        onNewClick: React.PropTypes.func,
        onEditClick: React.PropTypes.func,
        onDeleteClick: React.PropTypes.func
    };

    render() {
        return (
            <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", marginBottom: 2}}>
                <TouchableOpacity style={styles.button} onPress={this.__onClickToolbar.bind(this, "onNewClick")}>
                    <Icon style={styles.icon} size={20} name="md-add"/>
                    <Text style={styles.text}>&nbsp;New</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.__onClickToolbar.bind(this, "onEditClick")}>
                    <Icon style={styles.icon} size={20} name="md-add"/>
                    <Text style={styles.text}>&nbsp;Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.__onClickToolbar.bind(this, "onDeleteClick")}>
                    <Icon style={styles.icon} size={20} name="md-add"/>
                    <Text style={styles.text}>&nbsp;Delete</Text>
                </TouchableOpacity>
                </View>
        );
    }

    __onClickToolbar = (name) => {
        this.props[name] ? this.props[name]() : null;
    }

}