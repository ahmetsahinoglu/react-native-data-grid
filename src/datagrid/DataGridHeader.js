import React, {Component} from "react";
import {StyleSheet,Text} from "react-native";
import {Col, Row} from "react-native-easy-grid";
import CheckBox from "../checkbox/CheckBox";

const styles = StyleSheet.create({
    col: {
        borderWidth: 0.5,
        borderColor: 'lightblue'
    }
});


export default class DataGridHeader extends Component {

    static propTypes = {

        checkedImage: React.PropTypes.element,
        checkColumnSize: React.PropTypes.number,
        checkBox: React.PropTypes.bool,
        fields: React.PropTypes.array.isRequired,
        onCheckClick: React.PropTypes.func,
        unCheckedImage: React.PropTypes.element,
        checked:React.PropTypes.bool

    };
    static defaultProps = {
        checkBox: false,
        checkColumnSize:1,
        checked:false
    };


    render() {
        let fields = this.props.fields;
        let headers = [];
        if (this.props.checkBox) {
            headers.push(
                <Col key={"parentCheck"} size={this.props.checkColumnSize} style={styles.col}>
                    <CheckBox checked={this.props.checked}
                              style={{alignSelf: 'center'}}
                              onClick={this.__onCheckClick.bind(this, 'parent')}/>
                </Col>);
        }
        for (let i = 0; i < fields.length; i++) {
            headers.push(
                <Col key={`headerColumn-${i}`} size={fields[i].size} style={styles.col}>
                    <Text style={{textAlign: 'center', marginTop: 10, fontWeight: 'bold'}}>{fields[i].header}</Text>
                </Col>);
        }
        return (
            <Row key={"headerRow"} style={styles.col}>
                {headers}
            </Row>
        );
    }

    __onCheckClick=(row)=>{
        this.props.onCheckClick ? this.props.onCheckClick(row) : null;
    }

}