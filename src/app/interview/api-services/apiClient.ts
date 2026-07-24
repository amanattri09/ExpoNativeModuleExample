export interface ApiRequestConfig extends RequestInit {
  timeout?: number;
}

type RequestInterceptor = (config: ApiRequestConfig) => ApiRequestConfig | Promise<ApiRequestConfig>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

/**
 * BaseApiClient abstracts fetch requests.
 * Features:
 * 1. Request & Response Interceptors (Middleware).
 * 2. Timeout support via AbortController.
 * 3. Unified error handling wrapper.
 */
export class BaseApiClient {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(private baseUrl: string, private defaultTimeout = 8000) {
    // Add default request interceptor: inject Auth Bearer token
    this.addRequestInterceptor((config) => {
      const headers = new Headers(config.headers || {});
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", "Bearer mock-oauth2-jwt-token-12345");
      return { ...config, headers };
    });
  }

  // Register request interceptor
  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  // Register response interceptor
  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  // Primary request executor
  async request<T>(path: string, config: ApiRequestConfig = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    let requestConfig = { ...config };

    // 1. Run request interceptors sequentially
    for (const interceptor of this.requestInterceptors) {
      requestConfig = await interceptor(requestConfig);
    }

    // 2. Handle Timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, requestConfig.timeout || this.defaultTimeout);

    // Merge abort signals if user passed one
    const originalSignal = requestConfig.signal;
    const signal = controller.signal;

    if (originalSignal) {
      originalSignal.addEventListener("abort", () => controller.abort());
    }

    requestConfig.signal = signal;

    try {
      // 3. Fire fetch
      let response = await fetch(url, requestConfig);
      clearTimeout(timeoutId);

      // 4. Run response interceptors sequentially
      for (const interceptor of this.responseInterceptors) {
        response = await interceptor(response);
      }

      // 5. Handle HTTP error status codes
      if (!response.ok) {
        let errorData = "";
        try {
          errorData = await response.text();
        } catch (_) {}
        
        throw new Error(
          `API Error: [${response.status}] ${response.statusText || ""} - ${errorData}`
        );
      }

      // 6. Decode response JSON (handles empty responses safely)
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === "AbortError") {
        throw new Error("Request timed out or cancelled by user");
      }
      throw error;
    }
  }

  // Convenience methods
  get<T>(path: string, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(path, { ...config, method: "GET" });
  }

  post<T>(path: string, body?: any, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(path, { 
      ...config, 
      method: "POST", 
      body: body ? JSON.stringify(body) : undefined 
    });
  }

  put<T>(path: string, body?: any, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(path, { 
      ...config, 
      method: "PUT", 
      body: body ? JSON.stringify(body) : undefined 
    });
  }

  delete<T>(path: string, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(path, { ...config, method: "DELETE" });
  }
}

// Instantiate a shared global client pointing to a mock URL base
export const apiClient = new BaseApiClient("https://api.mockuserstore.local/v1");
