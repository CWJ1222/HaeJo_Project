import { Bid } from "./bid";

export interface RequestItem {
  id: number;
  title: string;
  budget: number;
  amount: number;
  status: string;
  selectedBid?: { id: number; amount: number; User: { nickname: string } };
  Bids: Bid[];
}
