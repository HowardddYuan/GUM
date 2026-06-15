import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getLocales } from 'expo-localization';
import * as WebBrowser from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  Linking,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PrimaryButton } from './src/components/PrimaryButton';
import { SpecialistListError } from './src/components/SpecialistListError';
import { SpecialistCard } from './src/components/SpecialistCard';
import { getWhatsappUrl, links } from './src/constants/links';
import { useSpecialists } from './src/hooks/useSpecialists';
import type { Locale } from './src/shared/i18n/translation';
import { theme } from './theme';

const heroImage = require('./assets/hero.png') as ImageSourcePropType;
const leftAccessoryImage = require('./assets/left-accessory.png') as ImageSourcePropType;
const locale: Locale = getLocales()[0]?.languageCode === 'zh' ? 'zh' : 'en';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PremiumConsultationScreen />
    </QueryClientProvider>
  );
}

function PremiumConsultationScreen() {
  const bottomSheetSnapPoints = useMemo(() => ['27%'], []);
  const specialistsQuery = useSpecialists();

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

  const handleWhatsappPress = async () => {
    try {
      await Linking.openURL(getWhatsappUrl(locale));
    } catch {
      Alert.alert('Unable to open WhatsApp');
    }
  };

  const handlePhonePress = async () => {
    try {
      await Linking.openURL(links.contactPhoneUrl);
    } catch {
      Alert.alert('Unable to open dialer');
    }
  };

  const handleEmailPress = async () => {
    try {
      await Linking.openURL(links.contactEmailUrl);
    } catch {
      Alert.alert('Unable to open mail app');
    }
  };

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
          ListEmptyComponent={
            specialistsQuery.isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={theme.colors.text.primary} />
                <Text style={styles.loadingText}>Loading specialists...</Text>
              </View>
            ) : specialistsQuery.isError ? (
              <SpecialistListError
                onRetry={() => {
                  void specialistsQuery.refetch();
                }}
              />
            ) : null
          }
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.eyebrow}>Got more questions?</Text>
              <Text style={styles.title}>GUM Specialists are here!</Text>
              <Text style={styles.subtitle}>
                We provide professional, impartial advice to help you find
                what's best for you
              </Text>
            </View>
          }
          ListFooterComponent={
            <View>
              <View style={styles.contactBlock}>
                <Text style={styles.contactText}>
                  For general enquiries, please feel free to reach out to us
                  using the method below:
                </Text>
                <Text style={styles.contactText}>
                  Hotline:{' '}
                  <Text style={styles.linkText} onPress={handlePhonePress}>
                    +852 2893 4402
                  </Text>
                </Text>
                <Text style={styles.contactText}>
                  Email address:{' '}
                  <Text style={styles.linkText} onPress={handleEmailPress}>
                    memberservice@gumhk.com
                  </Text>
                </Text>
              </View>

              <View style={styles.agreementBox}>
                <View style={styles.infoIcon}>
                  <Text style={styles.infoIconText}>i</Text>
                </View>
                <Text style={styles.agreementText}>
                  Your use of our appointment service or communication via
                  WhatsApp constitutes your agreement to our collection and use
                  of personal data as outlined in our privacy policy.
                </Text>
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
          <Text style={styles.serviceHoursTitle}>Service Hours:</Text>
          <Text style={styles.serviceHoursText}>
            Monday - Friday: 9:30am - 5:30pm
          </Text>
          <Text style={styles.serviceHoursText}>
            Saturday, Sunday & Public Holidays: Closed
          </Text>

          <PrimaryButton
            label="Book appointment"
            onPress={handleBookAppointmentPress}
          />
          <PrimaryButton label="WhatsApp us" onPress={handleWhatsappPress} />
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
    height: theme.sizes.heroHeight,
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
  contactBlock: {
    marginTop: theme.spacing.section,
  },
  contactText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  linkText: {
    color: theme.colors.link,
    fontWeight: '600',
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
    color: theme.colors.text.inverse,
    fontSize: 11,
    fontWeight: '800',
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
    color: theme.colors.text.primary,
    fontSize: 11,
    marginBottom: theme.spacing.xxs,
  },
  serviceHoursText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
});
