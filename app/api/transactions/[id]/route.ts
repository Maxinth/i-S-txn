import { NextRequest, NextResponse } from "next/server";
import { transactions } from "@/components/data";

export async function GET(request: NextRequest) {
  const paramsId = request.nextUrl.pathname.split("/")[3];

  const transactionId = parseInt(paramsId, 10);
  const transaction = transactions.find((t) => t.id === transactionId);

  if (!transaction) {
    return NextResponse.json(
      { message: "Transaction not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(transaction);
}
