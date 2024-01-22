import { Text as DefaultText, View as DefaultView } from 'react-native';
import { ThemeConsumer } from '@rneui/themed';

export type TextProps = DefaultText['props'];
export type ViewProps = DefaultView['props'];

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <DefaultText style={[{ color: theme.colors.black }, style]} {...otherProps} />
      )}
    </ThemeConsumer>
  );
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <DefaultView
          style={[{ backgroundColor: theme.colors.background }, style]}
          {...otherProps}
        />
      )}
    </ThemeConsumer>
  );
}
