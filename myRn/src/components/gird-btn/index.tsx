import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');
const cellWidth = width * 0.3;

function GirdBtn({ selected, onChange, index }) {
  return (
    <TouchableOpacity
      onPress={() => onChange(index)}
      style={[styles.cell, selected && { backgroundColor: 'blue' }]}
    />
  );
}

const styles = StyleSheet.create({
  cell: {
    width: cellWidth,
    height: cellWidth,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default GirdBtn;


//暗号：明确状态归属，合理切分组件