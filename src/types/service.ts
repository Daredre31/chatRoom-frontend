// a single service shown as a button on the portfolio page
// also used to populate the service dropdown during worker signup
export interface Service {
  _id: string;
  serviceName: string;
  slug: string;
  workerId?: string; // present once a worker has claimed this service
}

export interface CreateServicePayload {
  serviceName: string;
  slug: string;
}