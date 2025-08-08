import { ExpoConfig } from 'expo-config';

export default ({ config }: { config: ExpoConfig }) => ({
  ...config,
  name: 'YourApp',
  slug: 'your-app',
  scheme: 'yourapp',
  ios: { supportsTablet: true },
  android: { adaptiveIcon: { foregroundImage: './assets/images/adaptive-icon.png', backgroundColor: '#FFFFFF' } },
  web: { favicon: './assets/images/favicon.png' },
});
