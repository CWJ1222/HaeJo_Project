import { Bid } from "./bid";

export interface RequestItem {
  id: number;
  title: string;
  budget: number;
  amount: number;
  status: string;
  User?: { id: number; nickname: string }; // ✅ `id` 포함하도록 수정
  selectedBid?: { id: number; amount: number; User: { nickname: string } };
  Bids: Bid[];
}
