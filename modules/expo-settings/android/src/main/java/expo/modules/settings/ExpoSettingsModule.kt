package expo.modules.settings

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.Context

class ExpoSettingsModule : Module() {

    private val context: Context
        get() = requireNotNull(appContext.reactContext)

    private val sharedPreferences
        get() = context.getSharedPreferences("expo.module.settings", Context.MODE_PRIVATE)

    override fun definition() = ModuleDefinition {
        Name("ExpoSettings")

        // Synchronous read from sharedprefrence
        // Read from shared prefrence
        Function("getValue") { key: String ->
            return@Function sharedPreferences.getString(key, null)
        }

        // Asynchrounous read from sharedprefrence
        AsyncFunction("setValue"){ key : String , value : String ->
            sharedPreferences.edit().putString(key , value).apply()
        }
    }
}
