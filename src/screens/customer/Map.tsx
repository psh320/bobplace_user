import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native-paper';

const Map = () => {
  const title = 'Map';
  return (
    <View style={[styles.flex]}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});

export default Map;