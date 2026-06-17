import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';

interface ContactCopyBase {
  hotline: string;
  email: string;
}

interface EnglishContactCopy extends ContactCopyBase {
  variant: 'en';
  description: string;
  hotlineLabel: string;
  emailLabel: string;
}

interface ChineseContactCopy extends ContactCopyBase {
  variant: 'zh';
  descriptionPrefix: string;
  descriptionMiddle: string;
  descriptionSuffix: string;
}

export type ContactCopy = EnglishContactCopy | ChineseContactCopy;

interface ContactBlockProps {
  contact: ContactCopy;
  onEmailPress: () => void;
  onPhonePress: () => void;
}

export function ContactBlock({
  contact,
  onEmailPress,
  onPhonePress,
}: ContactBlockProps) {
  if (contact.variant === 'zh') {
    return (
      <View style={styles.contactBlock}>
        <Text style={styles.contactText}>
          {contact.descriptionPrefix}
          <Text style={styles.linkText} onPress={onPhonePress}>
            {contact.hotline}
          </Text>
          {contact.descriptionMiddle}
          <Text style={styles.linkText} onPress={onEmailPress}>
            {contact.email}
          </Text>
          {contact.descriptionSuffix}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.contactBlock}>
      <Text style={styles.contactText}>{contact.description}</Text>
      <Text style={styles.contactText}>
        {contact.hotlineLabel}{' '}
        <Text style={styles.linkText} onPress={onPhonePress}>
          {contact.hotline}
        </Text>
      </Text>
      <Text style={styles.contactText}>
        {contact.emailLabel}{' '}
        <Text style={styles.linkText} onPress={onEmailPress}>
          {contact.email}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contactBlock: {
    marginTop: theme.spacing.section,
  },
  contactText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  linkText: {
    ...theme.typography.link,
    color: theme.colors.link,
  },
});
