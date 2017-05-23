import React, {Component} from "react";
import {ScrollView} from "react-native";
import {DataGrid} from 'react-native-data-grid';
import Model from "./SampleModelForDataGrid.json";
import GridData from "./Response.json";


export default class DataGridSample extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <ScrollView>
                <DataGrid toolbar
                          checkBox={false}
                          fields={Model.fields}
                          formFields={Model.fields}
                          defaultGridData={GridData}
                          style={{marginLeft: 10, marginRight: 10, marginTop: 40}}/>
            </ScrollView>
        );
    }
}