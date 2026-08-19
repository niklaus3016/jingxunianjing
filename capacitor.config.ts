import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jingxunianjing.app',
  appName: '静序念经',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  backgroundColor: '#09090b'
};

export default config;
