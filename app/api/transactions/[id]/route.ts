import { NextResponse } from "next/server";
import { transactions } from "@/components/data";
//* GET a transaction by ID

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const transaction = transactions.find((t: { id: number }) => t.id === id);
  if (!transaction) {
    return NextResponse.json(
      { message: "Transaction not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(transaction);
}
