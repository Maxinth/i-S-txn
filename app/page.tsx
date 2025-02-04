"use client";
import { useEffect, useState } from "react";
const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch("/api/transactions");
      const data = await response.json();
      console.log({ data });
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>P2P Transaction Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender Name</th>
            <th>Receiver Name</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(
            (transaction: {
              id: string | number;
              sender: string;
              receiver: string;
              amount: number;
              status: string;
            }) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.sender}</td>
                <td>{transaction.receiver}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.status}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
