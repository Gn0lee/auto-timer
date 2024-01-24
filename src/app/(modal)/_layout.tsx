import { Stack, useRouter } from 'expo-router';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

type HeaderLeftProps = {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  pressableProps?: PressableProps;
  tintColor?: string;
};

function HeaderLeft({ name, pressableProps, tintColor }: HeaderLeftProps) {
  const router = useRouter();

  return (
    <Pressable
      {...pressableProps}
      onPress={() => {
        router.back();
      }}
    >
      {({ pressed }) => (
        <MaterialIcons
          name={name}
          size={25}
          color={tintColor}
          style={[styles.headerLeft, pressed ? styles.pressed : styles.default]}
        />
      )}
    </Pressable>
  );
}

export default function ModalLayout() {
  const { theme } = useTheme();

  const { t } = useTranslation(['common']);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme?.colors.white,
        },
        headerTitleStyle: {
          color: theme?.colors.black,
        },
        headerTintColor: theme?.colors.black,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerLeft: (props) =>
          HeaderLeft({
            name: 'keyboard-backspace',
            ...props,
          }),
        headerTitle: t('modal.title_notice'),
      }}
    >
      <Stack.Screen name="basic" options={{ presentation: 'modal' }} />
      <Stack.Screen name="motion" options={{ presentation: 'modal' }} />
      <Stack.Screen name="face" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 0,
  },
  pressed: {
    opacity: 0.5,
  },
  default: {
    opacity: 1,
  },
});
