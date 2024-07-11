export type Feature = {
  toggle: boolean;
};

export type Invoices = {
  name: string;
  taxId: string;
  amount: number;
  status: string;
  invoiceId: string;
};

export type Transfers = {
  name: string;
  taxId: string;
  amount: number;
  status: string;
  invoiceId: string;
};
