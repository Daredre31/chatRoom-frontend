export interface Worker {
  _id: string;
  name: string;
  email: string;
  serviceId?: string;
}

export interface WorkerLoginPayload {
  email: string;
  password: string;
}

export interface WorkerLoginResponse {
  token: string;
  worker: Worker;
}

export interface RefreshTokenResponse {
  token: string;
}

// signup does not log the worker in, no token comes back
export interface WorkerRegisterPayload {
  name: string;
  email: string;
  password: string;
  serviceId: string;
}

export interface WorkerRegisterResponse {
  worker: Worker;
}