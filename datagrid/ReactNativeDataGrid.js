import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Col, Grid, Row, Text} from 'native-base';
import CheckBox from '../checkbox/CheckBox';

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
        checkSize: React.PropTypes.number,
        defaultGridData: React.PropTypes.array,
        fields: React.PropTypes.array.isRequired,
        onClickRow: React.PropTypes.func,
        style: React.PropTypes.object,
        unCheckedImage: React.PropTypes.element,
    };
    static defaultProps = {
        checkBox: false,
        style: {marginLeft: 10, marginRight: 10}
    };

    constructor(props) {
        super(props);
        this.state = {
            gridData: undefined,
            selectedRows: [],
            checked: undefined
        };
    };

    render() {
        let {...newProps} = this.props;
        return (
            <Grid {...newProps}>
                {this.__renderHeader()}
                {this.__renderRow()}
            </Grid>

        );
    }

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
                    cols.push(<Col key={i + 'check'} size={this.props.checkSize || 1} style={styles.col}><CheckBox checked={this.state.checked}
                                                                                                                   checkedImage={this.props.checkedImage}
                                                                                                                   unCheckedImage={this.props.unCheckedImage}
                                                                                                                   style={{alignSelf: 'center'}}
                                                                                                                   onClick={this.__onCheckClick.bind(this, gridData[i])}/></Col>);
                }
                for (let j = 0; j < fields.length; j++) {
                    if (gridData[i].hasOwnProperty(fields[j].name)) {
                        cols.push(<Col key={j} size={fields[j].size || 1} style={styles.col}><Text style={{textAlign: 'center', marginTop: 10}}>{gridData[i][fields[j].name]}</Text></Col>);
                    } else {
                        cols.push(<Col key={j} size={fields[j].size || 1} style={styles.col}><Text style={{textAlign: 'center'}}/></Col>);
                    }
                }
                rows.push(
                    <Row key={i + 10} style={styles.col}>
                        {cols}
                    </Row>);
                cols = [];
            }

            return (rows);
        }
    };

    __renderHeader = () => {
        let fields = this.props.fields;
        let headers = [];
        if (this.props.checkBox) {
            headers.push(<Col key={"parentCheck"} style={styles.col}><CheckBox checked={this.state.checked} style={{alignSelf: 'center'}} onClick={this.__onCheckClick.bind(this, 'parent')}/></Col>);
        }
        for (let i = 0; i < fields.length; i++) {
            headers.push(<Col key={i} size={this.props.checkSize || 1} style={styles.col}><Text style={{textAlign: 'center', marginTop: 10, fontWeight: 'bold'}}>{fields[i].header}</Text></Col>);
        }
        return (
            <Row key={"headerRow"} style={styles.col}>
                {headers}
            </Row>
        );
    };

    __onCheckClick = (row, clicked) => {
        let selectedRows = this.state.selectedRows;

        if (row === 'parent') {
            this.setState((prevState) => {
                return {checked: !prevState.checked};
            });
            setTimeout(function () {
                if (this.props.onClickRow && this.state.checked) {
                    this.props.onClickRow(this.state.gridData);
                    this.setState({selectedRows: this.state.gridData});
                }
                if (this.props.onClickRow && !this.state.checked) {
                    this.setState({selectedRows: []});
                    setTimeout(function () {
                        this.props.onClickRow(this.state.selectedRows);
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
                if (this.props.onClickRow) {
                    this.props.onClickRow(selectedRows);
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

    __readData = (config) => {
        fetch(config.url, config.body).then((res) => res.json()).then((response) => {
            console.log(response);
            this.setState({gridData: response});
        }).catch((error) => {
            console.log(error);
        });
    };

    componentDidMount() {
        this.props.ajaxConfig ? this.__readData(this.props.ajaxConfig) : null;
    }

}
