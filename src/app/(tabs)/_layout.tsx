import React from 'react';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Link, Tabs, LinkProps } from 'expo-router';
import { Pressable, StyleSheet, PressableProps } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

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
  pressableProps?: PressableProps;
  tintColor?: string;
};

function HeaderRight({ name, href, pressableProps, tintColor }: HeaderRightProps) {
  return (
    <Link href={href} asChild>
      <Pressable {...pressableProps}>
        {({ pressed }) => (
          <FontAwesome
            name={name}
            size={25}
            color={tintColor}
            style={[styles.headerRight, pressed ? styles.pressed : styles.default]}
          />
        )}
      </Pressable>
    </Link>
  );
}

export default function TabLayout() {
  const { theme } = useTheme();

  const { t } = useTranslation(['common']);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme?.colors.black,
        tabBarStyle: {
          backgroundColor: theme?.colors.white,
          borderTopColor: theme?.colors.grey5,
        },
        headerStyle: {
          backgroundColor: theme?.colors.white,
          borderBottomColor: theme?.colors.grey5,
          shadowColor: theme?.colors.grey5,
        },
        headerTitleStyle: {
          color: theme?.colors.black,
        },
        headerTintColor: theme?.colors.black,
        headerTitleAlign: 'center',
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
        name="settings"
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
    marginRight: 15,
  },
  pressed: {
    opacity: 0.5,
  },
  default: {
    opacity: 1,
  },
});
