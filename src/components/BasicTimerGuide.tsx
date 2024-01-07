import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@components/Themed';

export default function BasicTimerGuide() {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          기본적인 형태의 타이머입니다.
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          재생 버튼 클릭 시 타이머가 동작합니다.
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          일시정지 버튼 클릭 시 타이머가 일시정지합니다.
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          일시정지 상태에서 정지 버튼 클릭 시 타이머가 초기화 됩니다.
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          일시정지 상태에서 재생 버튼 클릭 시 타이머가 재시작합니다.
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          앱을 종료하거나 기기 전원이 꺼질 경우 시간이 기록되지 않습니다.
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
