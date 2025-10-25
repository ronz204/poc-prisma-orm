export type RetrieveCustomerResponse = {
  id: number;
  name: string;
  phone: string;
  country: string;
  contracts: {
    id: number;
    price: number;
    service: string;
  }[];
};
