import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {Display, Entry} from '../../../..';
import tw from '../../../../../tailwind';

export class Cell extends Component {
  static propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.array,
    borderStyle: PropTypes.object,
  };

  handleRowCheck = (e, row) => {
    this.props.onCheckRow?.({...row, isChecked: e});
  };

  render() {
    const {
      data,
      width,
      height,
      flex,
      style,
      textStyle,
      rowData,
      isChecked,
      borderStyle,
      ...props
    } = this.props;
    const textAlign = {style: ''};

    
    // console.log('%c Line:34 🥐', 'color:#93c0a4', this.props?.tableHeader);

    let textDom = React.isValidElement(data) ? (
      data
    ) : (
      <Text numberOfLines={props?.isHeader ? 1 : undefined} style={[textStyle, tw`items-center`]}>{data}</Text>
    );
    const borderTopWidth = (borderStyle && borderStyle.borderWidth) || 1;
    const borderRightWidth = borderTopWidth;
    const borderColor = (borderStyle && borderStyle.borderColor) || '#d1d5db';

    // numnber
    if (typeof data === 'number') {
      textDom = (
        <Display.Number
          value={data === 0 ? '' : data}
          isshowsymbol={false}
          style={tw`text-right`}
        />
      );
    }
    // checkbox
    if (data === 'checkbox') {
      return (
        <View
          style={[
            {
              borderTopWidth,
              borderRightWidth,
              borderColor,
            },
            styles.cell,
            width && {width},
            style,
          ]}>
          <Entry.Checkbox
            value={isChecked}
            onChangeValue={e => this.handleRowCheck?.(e, rowData)}
          />
        </View>
      );
    }

    return (
      <View
        style={[
          {
            borderTopWidth,
            borderRightWidth,
            borderColor,
          },
          styles.cell,
          width && {width},
          style,
        ]}>
        {textDom}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell: {justifyContent: 'center', paddingHorizontal: 3},
  // text: { backgroundColor: 'transparent' }
});
