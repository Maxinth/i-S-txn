"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Skeleton, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export interface Transaction {
  id: number;
  sender: string;
  receiver: string;
  amount: number;
  status: string;
  timestamp?: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTransaction, setNewTransaction] = useState<
    Omit<Transaction, "id" | "timestamp">
  >({
    sender: "",
    receiver: "",
    amount: 0,
    status: "Pending",
  });

  const router = useRouter();

  const handleNavigate = (id: number) => {
    router.push(`/transaction/${id}`);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch("/api/transactions");
      const dataFromResponse: Transaction[] = await response.json();
      const data = await new Promise<Transaction[]>(
        (resolve) =>
          setTimeout(() => {
            resolve(dataFromResponse);
            setLoading(false);
          }, 2000) // Simulate a delay
      );
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

  //* Filtered transactions based on the selected filter
  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((transaction) => transaction.status === filter);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoadingSubmit(true);
    e.preventDefault();
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });

    if (response.ok) {
      router.refresh();
      setLoading(true);
      setTimeout(async () => {
        setLoadingSubmit(false);
        setLoading(false);
        const addedTransaction: Transaction = await response.json();
        setTransactions((prev) => {
          const updatedTransactions = [...prev, addedTransaction];
          localStorage.setItem(
            "transactions",
            JSON.stringify(updatedTransactions)
          );
          return updatedTransactions;
        });
        setNewTransaction({
          sender: "",
          receiver: "",
          amount: 0,
          status: "Pending",
        }); // Reset form
      }, 1000);
    }
  };

  const statusLookUp = {
    Pending: "bg-yellow-100",
    Completed: "bg-green-100",
    Failed: "bg-red-100",
  };

  return (
    <div className="container mx-auto p-4 my-12 ">
      <div className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-2">
        <h1 className="text-2xl font-bold mb-4 flex-1">
          P2P Transaction Dashboard
        </h1>
        <div className="mb-4 flex items-center justify-end w-full flex-1">
          <label className="mr-2">Filter by Status:</label>
          <select
            value={filter}
            disabled={loading || loadingSubmit}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="my-8 ">
        <div className="flex flex-wrap gap-4 lg:gap-2">
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

          <Button
            type="submit"
            variant={"surface"}
            disabled={loadingSubmit || loading}
            className={`${
              !loadingSubmit && !loading
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300"
            } rounded p-2 px-4 `}
          >
            {!loadingSubmit ? "Add Transaction" : "Adding..."}
          </Button>
        </div>
      </form>

      <div className="overflow-x-auto">
        {loading ? (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700 !font-bold">
                <th className="py-2 px-4 border-b ">ID</th>
                <th className="py-2 px-4 border-b">Sender Name</th>
                <th className="py-2 px-4 border-b">Receiver Name</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 2 }).map((_, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    <Skeleton height="5" />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Skeleton height="5" />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Skeleton height="5" />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Skeleton height="5" />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Skeleton height="5" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700 !font-bold">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Sender Name</th>
                <th className="py-2 px-4 border-b">Receiver Name</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions?.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleNavigate(transaction.id)}
                >
                  <td className="py-2 px-4 border-b text-center">
                    {transaction.id}
                  </td>

                  <td className="py-2 px-4 border-b text-center">
                    {transaction.sender}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {transaction.receiver}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {transaction.amount}
                  </td>
                  <td className={"py-2 px-4 border-b text-center"}>
                    <span
                      className={`px-4 py-2 rounded-lg ${
                        statusLookUp[
                          transaction.status as keyof typeof statusLookUp
                        ]
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
