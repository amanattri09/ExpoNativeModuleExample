import ExpoModulesCore

public class ExpoSettingsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoSettings")
    // Syncronous - Read from Userdefault
      Function("getValue"){(key : String) -> String? in
         return  UserDefaults.standard.string(forKey: key)
      }
    // Asyncrounous - Write to userdefaults
      AsyncFunction("setValue"){ (key : String , value : String) in
          UserDefaults.standard.set(value, forKey: key)
          UserDefaults.standard.synchronize() // Optional ; generally not needed
      }
      
  }
    
}
