import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { Text, View } from '@components/Themed';

export default function UserGuide() {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          사용자의 얼굴을 감지하는 타이머입니다.
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          해당 기능을 사용하기 위해서는 카메라 기능을 허용해야 합니다.
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          또한 해당 기능 사용중에는 기기가 잠금 모드로 전환되지 않습니다.
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          따라서 배터리 잔량이 {Platform.OS === 'ios' ? '20% 미만일때' : '부족할 때'} 타이머가
          자동으로 정지됩니다.
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          기기를 충전하며 사용하는 것을 권장드립니다.
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          재생 버튼 클릭 후 화면을 뒤집으면 타이머가 시작됩니다.
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          타이머 동작중 얼굴이 감지되지 않으면 자동으로 일시정지되며 다시 얼굴이 감지되면 타이머가
          작동됩니다.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    marginHorizontal: 50,
    gap: 20,
  },

  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
  },
});