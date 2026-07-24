# API Abstraction & Reusable Services (Interview Guide)

This directory demonstrates a production-ready **API Abstraction Layer** built in React Native. 

Abstracting API requests is one of the most common architecture design requirements in coding interviews. It addresses the decoupling of core UI views from raw network calls.

---

## 🚀 Architectural Benefits

### 1. Library Decoupling
* **The Problem**: If you import `axios` or call `fetch` directly in 50 components, switching to another client (e.g., `ky`, `wretch`, or native module calls) requires editing 50 files.
* **The Solution**: Wrap all network calls in a unified `BaseApiClient` class. The rest of the app only calls this client, making library swaps trivial.

### 2. Request & Response Interceptors (Middleware)
* **Auth Injection**: Append headers (like Bearer tokens) automatically on every outgoing request.
* **Global Error Interception**: Detect specific status codes globally (e.g., redirecting to Login on `401 Unauthorized`, or logging metrics to Sentry on `500 Server Error`).
* **Token Refresh**: Automatically pause failing requests, request a new auth token, and retry them seamlessly.

### 3. Data Adaptation (Adapter Pattern)
* **The Problem**: Backend APIs often output `snake_case` properties (e.g., `first_name`, `created_at`). Components in React/TypeScript standardly use `camelCase`. Mixing casing in components is messy and creates type maintenance headaches.
* **The Solution**: Domain-specific Services parse backend payloads through an **Adapter** (or Serializer) to normalize data shapes on retrieval, and serialize them on mutation.

### 4. Hook Encapsulation & Request Cancellation
* Direct fetch calls inside components can lead to memory leaks (updating unmounted states) and race conditions (e.g., Search Query B returning before Search Query A completes).
* **The Solution**: A custom network hook (`useApi`) tracks states (`data`, `loading`, `error`) and manages cancellation via standard `AbortController` configurations.

---

## 🛠️ Files & Design Roles

- [apiClient.ts](file:///Users/amanattri/Desktop/ReactNativeWorkspace/ExpoNativeModuleExample/src/app/interview/api-services/apiClient.ts): Custom HTTP Fetch wrapper with headers, timeouts, and request/response interceptor queues.
- [userAdapter.ts](file:///Users/amanattri/Desktop/ReactNativeWorkspace/ExpoNativeModuleExample/src/app/interview/api-services/userAdapter.ts): Maps raw JSON payloads to frontend model formats.
- [userService.ts](file:///Users/amanattri/Desktop/ReactNativeWorkspace/ExpoNativeModuleExample/src/app/interview/api-services/userService.ts): User business domain service encapsulating API calls.
- [useApi.ts](file:///Users/amanattri/Desktop/ReactNativeWorkspace/ExpoNativeModuleExample/src/app/interview/api-services/useApi.ts): Generic fetch hook with `loading`/`error` states, trigger mutation executables, and abort signals.
- [ApiServicesDemo.tsx](file:///Users/amanattri/Desktop/ReactNativeWorkspace/ExpoNativeModuleExample/src/app/interview/api-services/ApiServicesDemo.tsx): Screen displaying user details, editing them, and testing request cancel behaviors.
