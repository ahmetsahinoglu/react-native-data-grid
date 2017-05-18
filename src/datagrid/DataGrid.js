import React, {Component} from "react";
import {Alert, StyleSheet,Text} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import CheckBox from "../checkbox/CheckBox";
import DataForm from "../dataform/DataForm";
import DataGridToolbar from "./DataGridToolbar";
import DataGridHeader from "./DataGridHeader";

const styles = StyleSheet.create({
    col: {
        borderWidth: 0.5,
        borderColor: 'lightblue'
    }
});
export default class DataGrid extends Component {

    static propTypes = {
        ajaxConfig: React.PropTypes.object,
        checkBox: React.PropTypes.bool,
        checkedImage: React.PropTypes.element,
        checkColumnSize: React.PropTypes.number,
        defaultGridData: React.PropTypes.array,
        fields: React.PropTypes.array.isRequired,
        formFields: React.PropTypes.array,
        onClickCheck: React.PropTypes.func,
        style: React.PropTypes.object,
        toolbar: React.PropTypes.bool,
        unCheckedImage: React.PropTypes.element,
        url: React.PropTypes.string
    };
    static defaultProps = {
        checkBox: true,
        toolbar: true,
        checkColumnSize: 1,
        style: {marginLeft: 10, marginRight: 10},
        ajaxConfig: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

    };

    constructor(props) {
        super(props);
        this.state = {
            gridData: undefined,
            selectedRows: [],
            checked: undefined,
            showForm: false
        }
    };

    render() {
        let {...newProps} = this.props;
        if (this.state.showForm && this.props.toolbar) {
            return (this.__renderForm());
        } else {
            return (

                <Grid {...newProps}>
                    {this.__renderToolbar()}
                    {this.__renderHeader()}
                    {this.__renderRow()}
                </Grid>
            );
        }
    }

    __renderToolbar = () => {
        if (this.props.toolbar) {
            return (<DataGridToolbar onEditClick={this.__onEditClick}
                                     onNewClick={this.__onNewClick}
                                     onDeleteClick={this.__onDeleteClick}/> );
        }
    };

    __renderHeader = () => {
        return (<DataGridHeader fields={this.props.fields}
                                checked={this.state.checked}
                                checkBox={this.props.checkBox}
                                checkedImage={this.props.checkedImage}
                                unCheckedImage={this.props.unCheckedImage}
                                onCheckClick={this.__onCheckClick}
                                checkColumnSize={this.props.checkColumnSize}/>);
    };

    __renderForm = () => {
        return (<DataForm fields={this.props.formFields}
                          onSubmit={this.__onSubmit}
                          onCancel={this.__onCancel}/>);
    };

    __onSubmit = () => {
        Alert.alert("submit");
        this.setState({showForm: false});
    };

    __onCancel = () => {
        Alert.alert("cancel");
        this.setState({showForm: false});
    };


    __onNewClick = () => {
        this.setState({showForm: true});
    };

    __onEditClick = () => {
        if (this.__validationLength()) {
            console.log("başarılı")
        }
    };

    __onDeleteClick = () => {
        if (this.__validationLength()) {
            Alert.alert(
                'Are you sure ?',
                "The selected entry will be deleted. This can not be undone.",
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'OK', onPress: () => console.log('OK Pressed!')},
                ]);
        }
    };

    __validationLength = () => {
        let length = this.state.selectedRows.length;
        if (length === 0) {
            Alert.alert("Please select one row for update.");
            return false;
        } else if (length > 1) {
            Alert.alert("You can select one row");
            return false;
        } else {
            return true;
        }
    };


    __renderRow = () => {
        if (!this.props.defaultGridData && !this.state.gridData) {
            return null;
        }
        else {
            let gridData = this.props.defaultGridData || this.state.gridData;
            let fields = this.props.fields;
            let rows = [];
            let cols = [];
            for (let i = 0; i < gridData.length; i++) {
                if (this.props.checkBox) {
                    cols.push(
                        <Col key={`rowCheck-${i}`} size={this.props.checkColumnSize} style={styles.col}>
                            <CheckBox checked={this.state.checked}
                                      checkedImage={this.props.checkedImage}
                                      unCheckedImage={this.props.unCheckedImage}
                                      style={{alignSelf: 'center'}}
                                      onClick={this.__onCheckClick.bind(this, gridData[i])}/>
                        </Col>);
                }
                for (let j = 0; j < fields.length; j++) {
                    if (gridData[i].hasOwnProperty(fields[j].name)) {
                        cols.push(
                            <Col key={`rowValue-${j}`} size={fields[j].size || 1} style={styles.col}>
                                <Text style={{textAlign: 'center', marginTop: 10}}>{gridData[i][fields[j].name]}</Text>
                            </Col>);
                    } else {
                        cols.push(
                            <Col key={`rowValue-${j}`} size={fields[j].size || 1} style={styles.col}>
                                <Text style={{textAlign: 'center'}}/>
                            </Col>);
                    }
                }
                rows.push(
                    <Row key={`row-${i}`} style={styles.col}>
                        {cols}
                    </Row>);
                cols = [];
            }

            return (rows);
        }
    };

    __onCheckClick = (row) => {
        let selectedRows = this.state.selectedRows;

        if (row === 'parent') {
            this.setState((prevState) => {
                return {checked: !prevState.checked};
            });
            setTimeout(function () {
                if (this.props.onClickCheck && this.state.checked) {
                    this.props.onClickCheck(this.state.gridData);
                    this.setState({selectedRows: this.state.gridData});
                }
                if (this.props.onClickCheck && !this.state.checked) {
                    this.setState({selectedRows: []});
                    setTimeout(function () {
                        this.props.onClickCheck(this.state.selectedRows);
                    }.bind(this), 0);


                }
            }.bind(this), 0);
        } else {
            if (selectedRows.length === 0) {
                selectedRows.push(row);
            } else {
                if (!this.__removeFromSelectedRows(selectedRows, row)) {
                    selectedRows.push(row);
                }
            }
            setTimeout(function () {
                if (this.props.onClickCheck) {
                    this.props.onClickCheck(selectedRows);
                }
            }.bind(this), 0);
        }
    };

    __removeFromSelectedRows = (selectedRows, row) => {
        for (let i = selectedRows.length; i--;) {
            if (selectedRows[i] === row) {
                selectedRows.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    __readData = (url, ajaxConfig) => {
        fetch(url, ajaxConfig).then((res) => res.json()).then((response) => {
            console.log(response);
            this.setState({gridData: response});
        }).catch((error) => {
            console.log(error);
        });
    };

    componentDidMount() {
        this.props.url ? this.__readData(this.props.url, this.props.ajaxConfig) : null;
    }

}
