export interface IMonoPayUrlRes {
  invoiceId: string;
  pageUrl: string;
}

export interface IMonoPayCheckoutRes {
  invoiceId: string;
  status: string;
  payMethod: string;
  amount: number;
  ccy: number;
  finalAmount: number;
  createdDate: string;
  modifiedDate: string;
  reference: string;
  destination: string;
  paymentInfo: {
    rrn: string;
    approvalCode: string;
    tranId: string;
    terminal: string;
    bank: string;
    paymentSystem: string;
    country: string;
    fee: string;
    paymentMethod: string;
    maskedPan: string;
  };
}
