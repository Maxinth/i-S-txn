"use client";
import { useEffect, useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Transaction } from "@/app/page";
import { useParams, useRouter } from "next/navigation";

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const router = useRouter();

  const handleBackNavigation = () => router.push(`/`);
  useEffect(() => {
    if (id) {
      const fetchTransaction = async () => {
        const response = await fetch(`/api/transactions/${id}`);

        if (response.ok) {
          const data = await response.json();
          setTransaction(data);
        }
        setLoading(false);
      };

      fetchTransaction();
    }
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!transaction) {
    return <Text>Transaction not found.</Text>;
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Transaction Details
      </Text>
      <Text mt={2}>
        <strong>ID:</strong> {transaction.id}
      </Text>
      <Text>
        <strong>Sender:</strong> {transaction.sender}
      </Text>
      <Text>
        <strong>Receiver:</strong> {transaction.receiver}
      </Text>
      <Text>
        <strong>Amount:</strong> ${transaction.amount}
      </Text>
      <Text>
        <strong>Status:</strong> {transaction.status}
      </Text>
      <Text>
        <strong>Timestamp:</strong>{" "}
        {transaction.timestamp
          ? new Date(transaction.timestamp).toLocaleString()
          : "N/A"}
      </Text>
      <Button mt={4} onClick={handleBackNavigation}>
        Go Back
      </Button>
    </Box>
  );
};

export default TransactionDetails;
