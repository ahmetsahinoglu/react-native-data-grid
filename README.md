# react-native-data-grid

[![NPM](https://nodei.co/npm/react-native-data-grid.png)](https://nodei.co/npm/react-native-data-grid/)

[![npm version](https://badge.fury.io/js/react-native-data-grid.svg)](https://badge.fury.io/js/react-native-data-grid)

## Sample Demo

| IOS | ANDROID |
|---|---|
|![ios.gif](docs/ios.gif) | ![docs/android.gif](docs/android.gif)|

A component that performs simple CRUD operations.


To build the examples locally, run:

```
$ git clone https://github.com/ahmetMesut/react-native-data-grid.git
cd react-native-data-grid/Example && npm install
react-native run-ios or react-native run-android
```

Then open your emulator.


## Installation

```
npm install react-native-data-grid --save
```


## Usage

First of all you need to give JSON model for grid template.Then you have to give a url or a defaultGridData like Example.

```
import {DataGrid} from 'react-native-data-grid';

  <DataGrid fields={Model.fields} url="YOUR_URL_PUT_HERE"/>   or
  
  <DataGrid fields={Model.fields} defaultGridData={YOUR_DEFAULT_GRID_DATA}/>
```

### Properties

| Property | Type | Default | Description|
|---------------|------------|------------|----------------------------------------------------------------|
| ajaxConfig      | `object  ` | {method: 'GET',headers: {'Accept': 'application/json','Content-Type': 'application/json'} | Read more https://facebook.github.io/react-native/docs/network.html|
| checkBox        | `bool`     | false      |                           |
| checkedImage    | `element`  |            |                           |
| checkColumnSize | `number`   |            |                           |
| defaultGridData | `array`    |            |                           |
| fields          | `array`    |            |                           |
| onClickCheck    | `function` |            |   return selected rows                        |
| style           | `object`   |  {marginLeft: 10, marginRight: 10}     |                          |
| toolbar         | `bool`     |  false     |    default toolbar `new`   `edit`   `delete`                       |
| unCheckedImage  | `element ` |            |                           |


## License

MIT

Copyright (c) 2017 Ahmet Sahinoglu.

