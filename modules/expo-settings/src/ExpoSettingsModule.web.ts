import { registerWebModule, NativeModule } from 'expo';

class ExpoSettingsModule extends NativeModule<{}> {}

export default registerWebModule(ExpoSettingsModule, 'ExpoSettingsModule');
