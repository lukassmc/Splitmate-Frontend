import type { GroupMember } from "./groupmember";

export interface GroupDetail{
    id: number,
    name: string,
    members: GroupMember[],
    balances: BalanceDTO,
    pendingSplits: ExpenseSplitDTO[]
}   

export interface BalanceDTO {
    username: string;
    totalPaid: number;
    totalOwed: number;
    balance: number;
}
export interface ExpenseSplitDTO {
    id: number,
    description: string,
    amount: number,
    paidBy: string,
    member: string
}

