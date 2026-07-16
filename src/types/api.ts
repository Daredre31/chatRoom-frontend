// shared shape every backend response follows
// success tells us if the call worked, data holds the actual payload

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// used when a request fails validation (400) and backend sends field errors
export interface ApiErrorDetails {
  [field: string]: string;
}

// the shape we throw around the app when something goes wrong
export interface ApiError {
  status: number;
  message: string;
  details?: ApiErrorDetails;
}