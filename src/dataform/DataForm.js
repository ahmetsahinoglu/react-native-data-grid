import React, {Component} from "react";
import {View} from "react-native";
import {Button, Form, Input, Item, Label, Text} from "native-base";

export default class DataForm extends Component {

    static propTypes = {
        fields: React.PropTypes.array,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func
    };
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
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
        if (this.props[name] || this.props[name]) {
            this.props[name]();
        }
    };

    __renderForm = () => {
        let fields = this.props.fields;
        if (fields && fields.length > 0) {
            let arr = [];
            fields.map(function (item) {
                arr.push(
                    <Form>
                        <Item label={""} floatingLabel>
                            <Label>{item.name}</Label>
                            <Input />
                        </Item>
                    </Form>
                );
            });
            return (<Form>{arr}</Form>);
        }
    };

    __renderActionButton = () => {
        return (
            <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end"}}>
                <Button small light
                        onPress={this.__onSubmit.bind(this, "onSubmit")}
                        title={"Submit"}
                        style={{borderWidth: 1, borderColor: "lightblue", borderRadius: 0}}><Text>Submit</Text></Button>
                <Button small light
                        onPress={this.__onSubmit.bind(this, "onCancel")}
                        title={"Cancel"}
                        style={{borderWidth: 1, borderColor: "lightblue", borderRadius: 0}}><Text>Cancel</Text></Button>
            </View>);
    }
}
