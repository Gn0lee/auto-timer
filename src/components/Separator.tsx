import { useTheme } from '@rneui/themed';
import { StyleSheet } from 'react-native';

import { View, ViewProps } from '@components/Themed';

export default function Separator({ style, ...props }: ViewProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.separator, { backgroundColor: theme?.colors.grey5 }, style]} {...props} />
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
