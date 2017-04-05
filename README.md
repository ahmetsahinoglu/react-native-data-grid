# react-native-data-grid

![ios.gif](docs/ios.gif)  ![docs/android.gif](docs/android.gif)

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

  <DataGrid fields={Model.fields} url="YOUR_URL_PUT_HERE"/>
  
  <DataGrid fields={Model.fields} defaultGridData={YOUR_DEFAULT_GRID_DATA}/>
```

### Properties

| Property | Type | Default | Description|
|---------------|------------|------------|----------------------------------------------------------------|
| ajaxConfig         | `object  ` |            |                                        |
| checkBox           | `bool`     |            |                                        |
| checkedImage       | `element`  |            |                                        |
| unCheckedImage     | `element ` | optional   |                                        |
| checkSize          | `number`   |            |                                        |
| defaultGridData    | `array`    |            |                                        |
| fields             | `array`    | optional   |                                        |
| onClickRow         | `function` | optional   |                                        |
| style              | `object`   | optional   |                                        |


## License

MIT

Copyright (c) 2017 Ahmet Sahinoglu.

