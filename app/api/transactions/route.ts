const transactions = [
  {
    id: 1,
    sender: "Alice",
    receiver: "Bob",
    amount: 50,
    status: "Pending",
    timestamp: "2025-02-03T12:00:00Z",
  },
  {
    id: 2,
    sender: "Charlie",
    receiver: "David",
    amount: 100,
    status: "Completed",
    timestamp: "2025-02-02T15:30:00Z",
  },
];

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(transactions);
}

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
