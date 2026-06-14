import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';
import { PrimaryButton } from './PrimaryButton';

type SpecialistListErrorProps = {
  onRetry: () => void;
};

export function SpecialistListError({ onRetry }: SpecialistListErrorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>i</Text>
      </View>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>
        Oops! Something went wrong. Please close the app and try again.
      </Text>
      <PrimaryButton label="Retry" onPress={onRetry} />
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
    color: theme.colors.text.inverse,
    fontSize: 28,
    fontWeight: '800',
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: theme.spacing.md,
  },
  message: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
});
