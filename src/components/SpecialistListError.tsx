import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';
import { PrimaryButton } from './PrimaryButton';

interface SpecialistListErrorCopy {
  error: string;
  retry: string;
}

interface SpecialistListErrorProps {
  copy: SpecialistListErrorCopy;
  onRetry: () => void;
}

export function SpecialistListError({
  copy,
  onRetry,
}: SpecialistListErrorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>i</Text>
      </View>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>{copy.error}</Text>
      <PrimaryButton label={copy.retry} onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xxxl,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: theme.radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  iconText: {
    ...theme.typography.errorIcon,
    color: theme.colors.text.inverse,
  },
  title: {
    ...theme.typography.errorTitle,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  message: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
});
