import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { getLocales } from 'expo-localization';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ContactBlock, type ContactCopy } from '../components/ContactBlock';
import { PrimaryButton } from '../components/PrimaryButton';
import { SpecialistCard } from '../components/SpecialistCard';
import { SpecialistListError } from '../components/SpecialistListError';
import { getWhatsappUrl, links } from '../constants/links';
import { useSpecialists } from '../hooks/useSpecialists';
import { translations, type Locale } from '../shared/i18n/translation';
import heroImage from '../../assets/hero.png';
import leftAccessoryImage from '../../assets/left-accessory.png';
import { theme } from '../../theme';

const bottomSheetSnapPoints: Array<string | number> = ['27%'];
const locale: Locale = getLocales()[0]?.languageCode === 'zh' ? 'zh' : 'en';

interface SpecialistListLoadingProps {
  label: string;
}

function SpecialistListLoading({ label }: SpecialistListLoadingProps) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={theme.colors.text.primary} />
      <Text style={styles.loadingText}>{label}</Text>
    </View>
  );
}

export function PremiumConsultationScreen() {
  const specialistsQuery = useSpecialists();
  const copy = translations[locale].premiumConsultation;
  const contactCopy: ContactCopy =
    'descriptionPrefix' in copy.contact
      ? { variant: 'zh', ...copy.contact }
      : { variant: 'en', ...copy.contact };

  const specialists = specialistsQuery.data ?? [];

  const openBookingInApp = async () => {
    try {
      await WebBrowser.openBrowserAsync(links.bookingUrl);
    } catch {
      Alert.alert('Unable to open booking page');
    }
  };

  const openBookingExternally = async () => {
    try {
      await Linking.openURL(links.bookingUrl);
    } catch {
      Alert.alert('Unable to open booking page');
    }
  };

  const handleBookAppointmentPress = () => {
    Alert.alert('Book appointment', 'Choose how to open the booking page.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Open in app',
        onPress: () => {
          void openBookingInApp();
        },
      },
      {
        text: 'Open externally',
        onPress: () => {
          void openBookingExternally();
        },
      },
    ]);
  };

  const openWhatsapp = async () => {
    try {
      await Linking.openURL(getWhatsappUrl(locale));
    } catch {
      Alert.alert('Unable to open WhatsApp');
    }
  };

  const openDialer = async () => {
    try {
      await Linking.openURL(links.contactPhoneUrl);
    } catch {
      Alert.alert('Unable to open dialer');
    }
  };

  const openMailApp = async () => {
    try {
      await Linking.openURL(links.contactEmailUrl);
    } catch {
      Alert.alert('Unable to open mail app');
    }
  };

  const handleWhatsappPress = () => {
    void openWhatsapp();
  };

  const handlePhonePress = () => {
    void openDialer();
  };

  const handleEmailPress = () => {
    void openMailApp();
  };

  const listEmptyComponent = specialistsQuery.isLoading ? (
    <SpecialistListLoading label={copy.specialists.loading} />
  ) : specialistsQuery.isError ? (
    <SpecialistListError
      copy={copy.specialists}
      onRetry={() => {
        void specialistsQuery.refetch();
      }}
    />
  ) : null;

  return (
    <GestureHandlerRootView style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Image source={heroImage} style={styles.heroImage} />
        <Image source={leftAccessoryImage} style={styles.backAccessory} />
      </View>

      <View style={styles.contentPanel}>
        <FlatList
          data={specialists}
          renderItem={({ item }) => <SpecialistCard name={item.name} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          ItemSeparatorComponent={() => <View style={styles.specialistGap} />}
          ListEmptyComponent={listEmptyComponent}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.eyebrow}>{copy.titleLine1}</Text>
              <Text style={styles.title}>{copy.titleLine2}</Text>
              <Text style={styles.subtitle}>{copy.subtitle}</Text>
            </View>
          }
          ListFooterComponent={
            <View>
              <ContactBlock
                contact={contactCopy}
                onEmailPress={handleEmailPress}
                onPhonePress={handlePhonePress}
              />

              <View style={styles.agreementBox}>
                <View style={styles.infoIcon}>
                  <Text style={styles.infoIconText}>i</Text>
                </View>
                <Text style={styles.agreementText}>{copy.agreement}</Text>
              </View>
            </View>
          }
        />
      </View>

      <BottomSheet
        index={0}
        snapPoints={bottomSheetSnapPoints}
        handleComponent={null}
        enableDynamicSizing={false}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
        backgroundStyle={styles.bottomSheetBackground}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <Text style={styles.serviceHoursTitle}>{copy.serviceHours.title}</Text>
          <Text style={styles.serviceHoursText}>{copy.serviceHours.weekday}</Text>
          <Text style={styles.serviceHoursText}>{copy.serviceHours.holiday}</Text>

          <PrimaryButton
            label={copy.actions.bookAppointment}
            onPress={handleBookAppointmentPress}
          />
          <PrimaryButton
            label={copy.actions.whatsappUs}
            onPress={handleWhatsappPress}
          />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    height: theme.sizes.heroHeight,
    backgroundColor: theme.colors.heroBackground,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  backAccessory: {
    position: 'absolute',
    top: 56,
    left: theme.spacing.xxl,
    width: theme.sizes.backAccessoryWidth,
    height: theme.sizes.backAccessoryHeight,
    resizeMode: 'contain',
  },
  contentPanel: {
    flex: 1,
    marginTop: -theme.radii.panel,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radii.panel,
    borderTopRightRadius: theme.radii.panel,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.page,
    paddingTop: 26,
    paddingBottom: theme.sizes.scrollBottomInset,
  },
  listHeader: {
    marginBottom: theme.spacing.xl,
  },
  eyebrow: {
    ...theme.typography.eyebrow,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    maxWidth: 300,
  },
  specialistGap: {
    height: theme.spacing.xl,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.md,
  },
  agreementBox: {
    flexDirection: 'row',
    marginTop: 22,
    borderWidth: 1,
    borderColor: theme.colors.warning.border,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.warning.background,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  infoIcon: {
    width: theme.sizes.icon,
    height: theme.sizes.icon,
    borderRadius: theme.radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.warning.icon,
    marginTop: 1,
    marginRight: theme.spacing.sm,
  },
  infoIconText: {
    ...theme.typography.infoIcon,
    color: theme.colors.text.inverse,
  },
  agreementText: {
    flex: 1,
    ...theme.typography.legal,
    color: theme.colors.text.primary,
    textAlign: 'justify',
  },
  bottomSheetBackground: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radii.footer,
    borderTopRightRadius: theme.radii.footer,
  },
  bottomSheetContent: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xxxl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.sizes.footerPaddingBottom,
  },
  serviceHoursTitle: {
    ...theme.typography.serviceHoursTitle,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xxs,
  },
  serviceHoursText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
});
