import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';

type SpecialistCardProps = {
  name: string;
};

export function SpecialistCard({ name }: SpecialistCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.avatarPlaceholder} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: theme.sizes.specialistCardHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    paddingHorizontal: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    ...theme.shadows.card,
  },
  avatarPlaceholder: {
    width: theme.sizes.avatar,
    height: theme.sizes.avatar,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.avatarPlaceholder,
  },
  name: {
    color: theme.colors.text.muted,
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 26,
  },
});
