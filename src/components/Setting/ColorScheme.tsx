import { useState } from 'react';
import { useColorScheme } from 'react-native';
import { CheckBox } from '@rneui/themed';

export default function ColorScheme() {
  const colorScheme = useColorScheme();

  const [colorMode, setColorMode] = useState<'auto' | 'dark' | 'light'>(colorScheme ?? 'auto');

  return (
    <>
      <CheckBox
        checked={colorMode === 'auto'}
        onPress={() => {
          setColorMode('auto');
        }}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
      />
      <CheckBox
        checked={colorMode === 'light'}
        onPress={() => {
          setColorMode('light');
        }}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
      />
      <CheckBox
        checked={colorMode === 'dark'}
        onPress={() => {
          setColorMode('dark');
        }}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
      />
    </>
  );
}
