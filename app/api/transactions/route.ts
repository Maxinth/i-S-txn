import { NextResponse } from "next/server";
import { transactions } from "@/components/data";

//* Get all transactions
export async function GET() {
  return NextResponse.json(transactions);
}
//* ADD a new transaction
export async function POST(req: Request) {
  const { sender, receiver, amount, status } = await req.json();
  const newTransaction = {
    id: transactions.length + 1,
    sender,
    receiver,
    amount,
    status,
    timestamp: new Date().toISOString(),
  };

  transactions.push(newTransaction);

  return NextResponse.json(newTransaction, { status: 201 });
}
