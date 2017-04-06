import React, {Component} from 'react';
import {DataGrid} from 'react-native-data-grid';
import {Content} from "native-base";
import Model from './SampleModelForDataGrid.json';
import GridData from './Response.json';

const fields = [
    {
        "name": "Name",
        "field": "name"
    },
    {
        "name": "Surname",
        "field": "surname"
    },
    {
        "name": "Age",
        "field": "age"
    }
];


export default class FilesWaitingAtTheCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <Content>
                <DataGrid fields={Model.fields} formFields={fields} defaultGridData={GridData} style={{marginLeft: 10, marginRight: 10, marginTop: 40}}/>
            </Content>
        );
    }
}