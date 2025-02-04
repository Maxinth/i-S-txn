"use client";

import { useState, useEffect } from "react";
import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
interface Transaction {
  id: number;
  sender: string;
  receiver: string;
  amount: number;
  status: string;
}

interface StatusFilterProps {
  transactions: Transaction[];
  setFilteredTransactions: (transactions: Transaction[]) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  transactions,
  setFilteredTransactions,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  useEffect(() => {
    // Filter transactions based on the selected status
    if (selectedStatus === "All") {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(
        (transaction) => transaction.status === selectedStatus
      );
      setFilteredTransactions(filtered);
    }
  }, [selectedStatus, transactions, setFilteredTransactions]);

  // Handle value change for the select component
  const handleValueChange = (details: { value: string[] }) => {
    setSelectedStatus(details.value[0]); // Update the selected status
  };

  return (
    <SelectRoot
      collection={statuses}
      size="sm"
      width="320px"
      onValueChange={handleValueChange} // Use the new handler
    >
      <SelectTrigger>
        <SelectValueText placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {statuses.items.map((status) => (
          <SelectItem item={status} key={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
const statuses = createListCollection({
  items: [
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
    { label: "Failed", value: "Failed" },
  ],
});
