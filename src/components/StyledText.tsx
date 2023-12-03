import { Text, TextProps } from 'components/Themed';
import { StyleSheet } from 'react-native';

export function MonoText({ ...props }: TextProps) {
  return <Text {...props} style={[props.style, styles.fontFamily]} />;
}

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'SpaceMono',
  },
});
