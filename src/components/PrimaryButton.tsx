import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../../theme';

interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
}

export function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
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
