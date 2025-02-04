"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

interface Transaction {
  id: number;
  sender: string;
  receiver: string;
  amount: number;
  status: string;
  timestamp?: string; // Optional if you don't need it in the dashboard
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransaction, setNewTransaction] = useState<
    Omit<Transaction, "id" | "timestamp">
  >({
    sender: "",
    receiver: "",
    amount: 0,
    status: "Pending",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch("/api/transactions");
      const data: Transaction[] = await response.json();
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });

    if (response.ok) {
      const addedTransaction: Transaction = await response.json();
      setTransactions((prev) => [...prev, addedTransaction]);
      setNewTransaction({
        sender: "",
        receiver: "",
        amount: 0,
        status: "Pending",
      }); // Reset form
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">P2P Transaction Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            name="sender"
            placeholder="Sender Name"
            value={newTransaction.sender}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 flex-1"
          />
          <input
            type="text"
            name="receiver"
            placeholder="Receiver Name"
            value={newTransaction.receiver}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 flex-1"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 flex-1"
          />
          <select
            name="status"
            value={newTransaction.status}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 flex-1"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          >
            Add Transaction
          </button>
        </div>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Sender Name</th>
              <th className="py-2 px-4 border-b">Receiver Name</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{transaction.id}</td>
                <td className="py-2 px-4 border-b">{transaction.sender}</td>
                <td className="py-2 px-4 border-b">{transaction.receiver}</td>
                <td className="py-2 px-4 border-b">{transaction.amount}</td>
                <td className="py-2 px-4 border-b">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
