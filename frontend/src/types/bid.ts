export interface Bid {
  id: number;
  amount: number;
  User: { id: number; nickname: string };
}

export interface MyBid {
  id: number;
  amount: number;
  Request: {
    id: number;
    title: string;
    budget: number;
    User: { nickname: string };
  };
}
