import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, LinkProps } from 'expo-router';
import { Pressable, useColorScheme, ColorSchemeName, StyleSheet } from 'react-native';

import Colors from '@const/Colors';

type TabBarIconProps = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
};

function TabBarIcon({ name, color }: TabBarIconProps) {
  return <FontAwesome name={name} size={28} color={color} style={styles.tabBarIcon} />;
}

type HeaderRightProps = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  href: LinkProps<string>['href'];
  colorScheme: ColorSchemeName;
};

function HeaderRight({ name, href, colorScheme }: HeaderRightProps) {
  return (
    <Link href={href} asChild>
      <Pressable>
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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Basic',
          tabBarIcon: ({ color }) => TabBarIcon({ name: 'code', color }),
          headerRight: (props) =>
            HeaderRight({
              name: 'info-circle',
              href: '/(modal)/basic',
              colorScheme,
              ...props,
            }),
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="motion"
        options={{
          title: 'Motion',
          tabBarIcon: ({ color }) => TabBarIcon({ name: 'code', color }),
          unmountOnBlur: true,
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
