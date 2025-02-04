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
  {
    id: 3,
    sender: "Eve",
    receiver: "Frank",
    amount: 75,
    status: "Failed",
    timestamp: "2025-02-01T09:45:00Z",
  },
  {
    id: 4,
    sender: "Grace",
    receiver: "Hannah",
    amount: 200,
    status: "Completed",
    timestamp: "2025-01-30T18:20:00Z",
  },
  {
    id: 5,
    sender: "Isaac",
    receiver: "Jack",
    amount: 30,
    status: "Pending",
    timestamp: "2025-01-29T22:10:00Z",
  },
  {
    id: 6,
    sender: "Karen",
    receiver: "Leo",
    amount: 150,
    status: "Completed",
    timestamp: "2025-01-28T14:55:00Z",
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
