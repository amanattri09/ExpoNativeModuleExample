import { NativeModule, requireNativeModule } from 'expo';

declare class ExpoSettingsModule extends NativeModule<{}> {}

export default requireNativeModule<ExpoSettingsModule>('ExpoSettings');
