import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';

type PrimaryButtonProps = {
  label: string;
};

export function PrimaryButton({ label }: PrimaryButtonProps) {
  return (
    <View style={styles.button}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: theme.sizes.buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.action,
    borderRadius: theme.radii.button,
    marginTop: theme.spacing.xl,
  },
  label: {
    ...theme.typography.button,
    color: theme.colors.text.inverse,
  },
});
