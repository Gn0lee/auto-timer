import React from 'react';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Link, Tabs, LinkProps } from 'expo-router';
import {
  Pressable,
  useColorScheme,
  ColorSchemeName,
  StyleSheet,
  PressableProps,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import Colors from '@const/Colors';
import { ASYNC_STORAGE_KEYS, ASYNC_STORAGE_VALUES } from '@const/AsyncStorage';

type TabBarMaterialCommunityIconProps = {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
};

function TabBarMaterialCommunityIcon({ name, color }: TabBarMaterialCommunityIconProps) {
  return <MaterialCommunityIcons name={name} size={28} color={color} style={styles.tabBarIcon} />;
}

type HeaderRightProps = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  href: LinkProps<string>['href'];
  colorScheme: ColorSchemeName;
  pressableProps?: PressableProps;
};

function HeaderRight({ name, href, colorScheme, pressableProps }: HeaderRightProps) {
  return (
    <Link href={href} asChild>
      <Pressable {...pressableProps}>
        {({ pressed }) => (
          <FontAwesome
            name={name}
            size={25}
            color={Colors[colorScheme ?? 'light'].text}
            style={[styles.headerRight, pressed ? styles.pressed : styles.default]}
          />
        )}
      </Pressable>
    </Link>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { t } = useTranslation(['common']);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab.title_basicMode'),
          tabBarIcon: ({ color }) => TabBarMaterialCommunityIcon({ name: 'timer-outline', color }),
          headerRight: (props) =>
            HeaderRight({
              name: 'info-circle',
              href: '/(modal)/basic',
              colorScheme,
              ...props,
            }),
          unmountOnBlur: true,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="motion"
        options={{
          title: '움직임 감지 모드',
          tabBarIcon: ({ color }) => TabBarMaterialCommunityIcon({ name: 'flip-to-back', color }),
          unmountOnBlur: true,
          headerRight: (props) =>
            HeaderRight({
              name: 'info-circle',
              href: '/(modal)/motion',
              colorScheme,
              pressableProps: {
                onPress: async () => {
                  await AsyncStorage.setItem(
                    ASYNC_STORAGE_KEYS.IS_MOTION_GUIDE_OPEN,
                    ASYNC_STORAGE_VALUES.IS_MOTION_GUIDE_OPEN.TRUE
                  );
                },
              },
              ...props,
            }),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="face"
        options={{
          tabBarIcon: ({ color }) =>
            TabBarMaterialCommunityIcon({ name: 'face-recognition', color }),
          unmountOnBlur: true,
          headerRight: (props) =>
            HeaderRight({
              name: 'info-circle',
              href: '/(modal)/face',
              colorScheme,
              pressableProps: {
                onPress: async () => {
                  await AsyncStorage.setItem(
                    ASYNC_STORAGE_KEYS.IS_FACE_GUIDE_OPEN,
                    ASYNC_STORAGE_VALUES.IS_FACE_GUIDE_OPEN.TRUE
                  );
                },
              },
              ...props,
            }),
          tabBarShowLabel: false,
          title: '얼굴 감지 모드',
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          tabBarIcon: ({ color }) => TabBarMaterialCommunityIcon({ name: 'account', color }),
          tabBarShowLabel: false,
          title: t('tab.title_settings'),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
  headerRight: {
    marginRight: 5,
  },
  pressed: {
    opacity: 0.5,
  },
  default: {
    opacity: 1,
  },
});
