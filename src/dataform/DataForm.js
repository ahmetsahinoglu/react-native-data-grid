import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, TextInput,ScrollView} from "react-native";

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: "lightblue",
        borderRadius: 0,
        flexDirection: "row"
    }
});


export default class DataForm extends Component {

    static propTypes = {
        fields: React.PropTypes.array,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        onChangeText: React.PropTypes.func,
        formData:React.PropTypes.object
    };
    static defaultProps = {};

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <View>
                {this.__renderForm()}
                {this.__renderActionButton()}
            </View>
        );
    }

    __onSubmit = (name) => {
        if (this.props[name]) {
            this.props[name]();
        }
    };

    __renderForm = () => {
        let fields = this.props.fields;
        if (fields && fields.length > 0) {
            let arr = [];
            fields.map((row) => {
                arr.push(
                    <View>
                        <Text>{row.header}</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            value={this.props.formData[row.name]}
                            onChangeText={(text) => this.__onChangeText(text,row)}/>
                    </View>);
            });
            return (
                <ScrollView>
                    {arr}
                </ScrollView>
            );
        }

    };

    __onChangeText(text, row) {
        this.props.onChangeText ? this.props.onChangeText(text,row) : null;
    };

    __renderActionButton = () => {
        return (
            <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end"}}>
                <TouchableOpacity style={styles.button} onPress={this.__onSubmit.bind(this, "onSubmit")}>
                    <Text style={styles.text}>&nbsp;Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.__onSubmit.bind(this, "onCancel")}>
                    <Text style={styles.text}>&nbsp;Cancel</Text>
                </TouchableOpacity>
            </View>);
    }
}
