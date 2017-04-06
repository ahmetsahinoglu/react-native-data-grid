/**
 * react-native-check-box
 * Checkbox component for react native, it works on iOS and Android
 * https://github.com/crazycodeboy/react-native-check-box
 * Email:crazycodeboy@gmail.com
 * Blog:http://jiapenghui.com
 * @flow
 */

import React, {Component} from "react";
import {Image, StyleSheet, View} from "react-native";
import {Button} from "native-base";

export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked
        }
    }

    static propTypes = {
        ...View.propTypes,
        checkedImage: React.PropTypes.element,
        unCheckedImage: React.PropTypes.element,
        onClick: React.PropTypes.func.isRequired,
        isChecked: React.PropTypes.bool

    };
    static defaultProps = {
        isChecked: false,
    };

    _renderImage() {
        if (this.state.isChecked) {
            return this.props.checkedImage
                ? this.props.checkedImage
                : this.genCheckedImage();
        } else {
            return this.props.unCheckedImage
                ? this.props.unCheckedImage
                : this.genCheckedImage();
        }
    }

    genCheckedImage() {
        let source = this.state.isChecked
            ? require('./img/ic_check_box.png')
            : require('./img/ic_check_box_outline_blank.png');

        return (<Image source={source}/>)
    }

    onClick() {
        this.setState({
            isChecked: !this.state.isChecked
        });
        setTimeout(function () {
            this.props.onClick(this.state.isChecked);
        }.bind(this), 0);
    }

    render() {
        return (
            <Button
                title=""
                transparent={true}
                style={this.props.style}
                onPress={() => this.onClick()}
                underlayColor='transparent'>
                <View style={styles.container}>
                    {this._renderImage()}
                </View>
            </Button>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isChecked: nextProps.checked})
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});