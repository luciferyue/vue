import React from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import GirdBtn from "components/gird-btn";

function Gird() {
  const [isSingle, setIsSingle] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const onChange = (id) => {
    if (isSingle) {
      setSelected([id]);
    } else {
      //合并，去重，设置新选中数组
      setSelected([...new Set(selected.concat(id))])
    }
  }

  const switchChange = () => {
    setSelected([]);  //重置
    setIsSingle(!isSingle); //反选
  }
  //暗号：明确状态归属，合理切分组件
  return (
    <>
      <View style={styles.innerContainer}>
        <Text>单选</Text>
        <Switch
          style={{ marginLeft: 10 }}
          value={isSingle}
          onValueChange={switchChange}
        />
      </View>
      <View style={styles.innerContainer}>
        {
          [...new Array(9)].map((_, i) => {
            return <GirdBtn key={i} index={i} selected={selected.includes(i)} onChange={onChange} />;
          })
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: 100,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

export default Gird;
