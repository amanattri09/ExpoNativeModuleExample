import React, { useEffect, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator, 
  TouchableOpacity, 
  Image, 
  TextInput 
} from "react-native";
import { useApi } from "./useApi";
import { UserService } from "./userService";
import { User } from "./userAdapter";

/**
 * ApiServicesDemo displays user profile management.
 * Demonstrates:
 * 1. Abstraction: Direct usage of UserService (no fetch/endpoints visible here).
 * 2. State management: Unified state via useApi custom hooks.
 * 3. Request Abortion: Click "Load (Delay)" then click "Cancel Request" to test aborting.
 */
export default function ApiServicesDemo() {
  const { 
    data: user, 
    loading: fetchLoading, 
    error: fetchError, 
    execute: fetchUser, 
    cancel: cancelFetch,
    setData: setUserData
  } = useApi(UserService.getUser);

  const { 
    loading: saveLoading, 
    error: saveError, 
    execute: saveUser 
  } = useApi(UserService.updateUser);

  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [abortedFeedback, setAbortedFeedback] = useState(false);

  // Load user profile on mount
  useEffect(() => {
    fetchUser("usr-8842");
  }, [fetchUser]);

  // Sync inputs with user data
  useEffect(() => {
    if (user) {
      setEditFirstName(user.firstName);
      setEditLastName(user.lastName);
    }
  }, [user]);

  const handleFetchClick = async () => {
    setAbortedFeedback(false);
    try {
      await fetchUser("usr-8842");
    } catch (err: any) {
      if (err.name === "AbortError" || err.message === "Aborted") {
        setAbortedFeedback(true);
      }
    }
  };

  const handleCancelClick = () => {
    cancelFetch();
    setAbortedFeedback(true);
  };

  const handleSaveClick = async () => {
    if (!user) return;
    
    const updatedModel: User = {
      ...user,
      firstName: editFirstName,
      lastName: editLastName,
    };

    try {
      const savedUser = await saveUser(updatedModel);
      if (savedUser) {
        setUserData(savedUser); // Sync query state with mutation result
        setIsEditing(false);
      }
    } catch (_) {
      // Save errors handled locally by hook
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>API Abstraction Layer</Text>
        <Text style={styles.subtitle}>Reusable Domain Services & Adapters</Text>
      </View>

      {/* Network control pad */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.actionBtn} 
          onPress={handleFetchClick}
          disabled={fetchLoading}
        >
          <Text style={styles.actionText}>Load Profile (1.5s delay)</Text>
        </TouchableOpacity>

        {fetchLoading && (
          <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelClick}>
            <Text style={styles.cancelText}>Cancel In-Flight Request</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Loading state indicator */}
      {fetchLoading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#89b4fa" />
          <Text style={styles.loadingText}>Fetching profile via UserService...</Text>
        </View>
      )}

      {/* Request Cancellation Feedback */}
      {abortedFeedback && !fetchLoading && (
        <View style={[styles.feedbackBox, styles.infoBox]}>
          <Text style={styles.infoText}>🚫 In-flight request was successfully aborted.</Text>
        </View>
      )}

      {/* Error Feedback */}
      {(fetchError || saveError) && (
        <View style={[styles.feedbackBox, styles.errorBox]}>
          <Text style={styles.errorText}>⚠️ {fetchError || saveError}</Text>
        </View>
      )}

      {/* Profile Details Container */}
      {!fetchLoading && user && (
        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            <View>
              <Text style={styles.roleTag}>PRO MEMBER</Text>
              <Text style={styles.joinedText}>
                Joined: {user.joinedDate.toLocaleDateString()}
              </Text>
            </View>
          </View>

          {isEditing ? (
            <View style={styles.form}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                value={editFirstName}
                onChangeText={setEditFirstName}
                placeholderTextColor="#7f849c"
              />
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={editLastName}
                onChangeText={setEditLastName}
                placeholderTextColor="#7f849c"
              />

              <View style={styles.btnRow}>
                <TouchableOpacity 
                  style={[styles.formBtn, styles.saveBtn]} 
                  onPress={handleSaveClick}
                  disabled={saveLoading}
                >
                  {saveLoading ? (
                    <ActivityIndicator size="small" color="#11111b" />
                  ) : (
                    <Text style={styles.saveBtnText}>Save Updates</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.formBtn, styles.discardBtn]} 
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={styles.discardBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.profileBody}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Full Name</Text>
                <Text style={styles.fieldValue}>
                  {user.firstName} {user.lastName}
                </Text>
              </View>
              
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Email Address</Text>
                <Text style={styles.fieldValue}>{user.email}</Text>
              </View>

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Account Status</Text>
                <Text style={[styles.fieldValue, { color: user.isActive ? "#a6e3a1" : "#f38ba8" }]}>
                  {user.isActive ? "Active Verified" : "Suspended"}
                </Text>
              </View>

              <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)}>
                <Text style={styles.editBtnText}>Edit Profile Details</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#11111b",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#313244",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f5e0dc",
  },
  subtitle: {
    fontSize: 13,
    color: "#a6adc8",
    marginTop: 2,
  },
  controls: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: "#89b4fa",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    color: "#11111b",
    fontWeight: "bold",
    fontSize: 12,
  },
  cancelBtn: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 12,
  },
  centerContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#bac2de",
    marginTop: 12,
    fontSize: 13,
  },
  feedbackBox: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  infoBox: {
    backgroundColor: "#f9e2af15",
    borderColor: "#f9e2af40",
  },
  infoText: {
    color: "#f9e2af",
    fontSize: 12,
    fontWeight: "600",
  },
  errorBox: {
    backgroundColor: "#f38ba815",
    borderColor: "#f38ba840",
  },
  errorText: {
    color: "#f38ba8",
    fontSize: 12,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#1e1e2e",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#313244",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#313244",
    paddingBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#89b4fa",
  },
  roleTag: {
    fontSize: 10,
    color: "#89b4fa",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  joinedText: {
    fontSize: 12,
    color: "#a6adc8",
    marginTop: 4,
  },
  profileBody: {
    gap: 12,
  },
  field: {
    backgroundColor: "#11111b",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#181825",
  },
  fieldLabel: {
    fontSize: 11,
    color: "#a6adc8",
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 14,
    color: "#cdd6f4",
    fontWeight: "600",
  },
  editBtn: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#89b4fa",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  editBtnText: {
    color: "#89b4fa",
    fontWeight: "bold",
    fontSize: 12,
  },
  form: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 12,
    color: "#cdd6f4",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#11111b",
    color: "#cdd6f4",
    borderWidth: 1,
    borderColor: "#313244",
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
  },
  btnRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  formBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtn: {
    backgroundColor: "#a6e3a1",
  },
  saveBtnText: {
    color: "#11111b",
    fontWeight: "bold",
    fontSize: 12,
  },
  discardBtn: {
    borderWidth: 1,
    borderColor: "#f38ba8",
  },
  discardBtnText: {
    color: "#f38ba8",
    fontWeight: "bold",
    fontSize: 12,
  },
});
