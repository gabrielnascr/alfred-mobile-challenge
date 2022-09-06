import React from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import colors from '../../global/styles/colors';

function Loading() {
  return (
    <View
      style={[
        {
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff7f',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      <ActivityIndicator
        color={colors.red}
        animating
        size={Platform.OS == 'ios' ? 'large' : 60}
      />
    </View>
  );
}

export default Loading;
