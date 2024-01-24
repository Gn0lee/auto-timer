import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { Text, View } from '@components/Themed';

export default function UserGuide() {
  return (
    <View style={styles.getStartedContainer}>
      <Text style={styles.getStartedText}>기기의 움직임을 감지하는 타이머입니다.</Text>
      <Text style={styles.getStartedText}>
        해당 기능을 사용하기 위해서는 Motion 감지 기능을 허용해야 합니다.
      </Text>
      <Text style={styles.getStartedText}>
        또한 해당 기능 사용중에는 기기가 잠금 모드로 전환되지 않습니다.
      </Text>
      <Text style={styles.getStartedText}>
        따라서 배터리 잔량이 {Platform.OS === 'ios' ? '20% 미만일때' : '부족할 때'} 타이머가
        자동으로 정지됩니다.
      </Text>
      <Text style={styles.getStartedText}>기기를 충전하며 사용하는 것을 권장드립니다.</Text>
      <Text style={styles.getStartedText}>
        재생 버튼 클릭 후 화면을 뒤집으면 타이머가 시작됩니다.
      </Text>
      <Text style={styles.getStartedText}>
        타이머 동작중 화면이 전방으로 움직이면 타이머가 일시정지 되며 다시 뒤집으면 타이머가 재동작
        합니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    gap: 20,
  },

  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
  },
});
