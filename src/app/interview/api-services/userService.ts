import { apiClient } from "./apiClient";
import { User, UserAdapter, RawApiUser } from "./userAdapter";

// Local mock database in memory to support interactive CRUD operations
let mockUserDb: RawApiUser = {
  user_id: "usr-8842",
  first_name: "Aman",
  last_name: "Attri",
  email_address: "aman.attri@example.com",
  is_active: true,
  avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  created_at: "2025-06-15T08:30:00.000Z",
};

/**
 * UserService encapsulates user-related API requests.
 * Components do not know how user data is fetched or formatted.
 * In a real app, it calls:
 * `const raw = await apiClient.get<RawApiUser>(`/users/${id}`, { signal });`
 */
export class UserService {
  
  // Retrieve User Profile (supports cancellation signal)
  static async getUser(id: string, signal?: AbortSignal): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        // Return structured data resolved from the local database
        resolve(UserAdapter.toFrontend(mockUserDb));
      }, 1500); // 1.5s latency to test loading UI

      // Handle cancellation manually for this mock simulation
      signal?.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new DOMException("Aborted", "AbortError"));
      });
    });
  }

  // Update User Profile
  static async updateUser(user: User, signal?: AbortSignal): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        // 10% chance to simulate a network mutation failure
        if (Math.random() < 0.1) {
          reject(new Error("Unable to save profile (HTTP 500 Internal Server Error)"));
          return;
        }

        const rawUpdated = UserAdapter.toBackend(user);
        mockUserDb = rawUpdated; // Commit to mock database
        
        resolve(UserAdapter.toFrontend(rawUpdated));
      }, 1500);

      signal?.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new DOMException("Aborted", "AbortError"));
      });
    });
  }
}
