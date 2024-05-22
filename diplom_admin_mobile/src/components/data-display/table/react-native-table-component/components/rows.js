import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Cell } from './cell';
import { sum } from '../utils';
import { Display, Entry } from '../../../..';
import tw from '../../../../../tailwind';

export class Row extends Component {
  static propTypes = {
    style: PropTypes.array,
    textStyle: PropTypes.array,
  };

  render() {
    const {
      data,
      style,
      widthArr,
      height,
      flexArr,
      textStyle,
      cellTextStyle,
      tableHeader,
      ...props
    } = this.props;
    const {onCheckRow, rowData} = this.props;
    let width = widthArr ? sum(widthArr) : 0;
    let rowValues = rowData;
    return data ? (
      <View style={[height && {height}, width && {width}, styles.row, style]}>
        {data.map((item, i) => {
          const flex = flexArr && flexArr[i];
          const wth = widthArr && widthArr[i];

          if(this.props?.isShowCheckBox){
            if(i === 0){
              item = 'checkbox';
              rowValues = {...rowData, isChecked: rowData?.amst === 'Y'};
            }
            if(i === 7){
              item = 'checkbox';
              rowValues = {...rowData, isChecked: rowData?.iast === 'Y'};
            }
          }
          if(this.props?.isShowCheckBoxOther){
            
            if(i === 0){
              item = 'checkbox';
              rowValues = {...rowData, isChecked: rowData?.amst === 'Y'};
            }
            if(i === 5){
              item = 'checkbox';
              rowValues = {...rowData, isChecked: rowData?.iast === 'Y'};
            }
          }
          return (
            <Cell
              {...this.props}
              key={`${i}-${item}`}
              data={item}
              width={wth}
              height={height}
              flex={flex}
              rowData={rowValues}
              isChecked={rowValues?.isChecked}
              textStyle={[
                cellTextStyle && cellTextStyle(item),
                textStyle,
                tw`py-1.5`,
              ]}
            />
          );
        })}
      </View>
    ) : null;
  }
}

export class Rows extends Component {
  static propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object
  };

  render() {
    const { data, style, widthArr, heightArr, flexArr, textStyle, ...props } = this.props;
    const flex = flexArr ? sum(flexArr) : 0;
    const width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[flex && { flex }, width && { width }]}>
        {data.map((item, i) => {
          const height = heightArr && heightArr[i];
          return (
            <Row
              key={`${i}-${item}`}
              data={item}
              widthArr={widthArr}
              height={height}
              flexArr={flexArr}
              style={style}
              textStyle={textStyle}
              {...props}
            />
          );
        })}
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
});