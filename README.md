# GUM Premium Consultation

React Native / Expo implementation of the GUM Premium Consultation screen.

## Requirements

- Node.js 20+
- npm
- Expo Go or a configured iOS/Android simulator

## Setup

```bash
npm install
```

## Run

```bash
npx expo start -c
```

Then open the app with Expo Go, or press `i` / `a` in the Expo CLI to launch an iOS or Android simulator.

## Verification

```bash
npx tsc --noEmit
npx expo install --check
```

## Mock Specialist Loading States

Specialists are intentionally loaded through a repository abstraction so the hardcoded source can be replaced by a CMS/API later.

To demo the inline specialist error state, update:

```ts
// src/config/specialistMockConfig.ts
export const specialistMockConfig = {
  shouldFail: true,
  delayMs: 350,
} as const;
```

To demo a longer loading state, increase `delayMs`.

Remember to set `shouldFail` back to `false` before normal testing.

## Notes

- The bottom service-hours and CTA area uses `@gorhom/bottom-sheet` and is locked to a fixed snap point to match the requirement that it persists at the bottom of the page.
- The booking button opens the SimplyBook page in an in-app browser by default, with an option to open externally.
- The WhatsApp URL uses a localized prefilled message based on the device language.
