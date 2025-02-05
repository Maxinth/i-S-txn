"use client";
import { useEffect, useState } from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";
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
    <Box
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      className="max-w-2xl mx-auto my-48"
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        color="teal.600"
        className="text-center"
      >
        Transaction Details
      </Text>

      <Box my={4} height="1px" bg="gray.200" />
      <VStack alignItems="start">
        <Text fontSize="lg">
          <strong>ID:</strong> {transaction.id}
        </Text>
        <Text fontSize="lg">
          <strong>Sender:</strong> {transaction.sender}
        </Text>
        <Text fontSize="lg">
          <strong>Receiver:</strong> {transaction.receiver}
        </Text>
        <Text fontSize="lg">
          <strong>Amount:</strong> ${transaction.amount.toFixed(2)}
        </Text>
        <Text fontSize="lg">
          <strong>Status:</strong>{" "}
          <span
            style={{
              color: transaction.status === "Completed" ? "green" : "red",
            }}
          >
            {transaction.status}
          </span>
        </Text>
        <Text fontSize="lg">
          <strong>Timestamp:</strong>{" "}
          {transaction.timestamp
            ? new Date(transaction.timestamp).toLocaleString()
            : "N/A"}
        </Text>
      </VStack>
      <Box className="w-full flex items-center justify-center">
        {" "}
        <Button
          mt={6}
          colorScheme="teal"
          onClick={handleBackNavigation}
          className="text-center bg-teal-500 px-6 py-2 text-white font-medium hover:bg-white hover:text-teal-600 border border-transparent hover:border-teal-600 duration-300 ease-in-out "
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionDetails;
