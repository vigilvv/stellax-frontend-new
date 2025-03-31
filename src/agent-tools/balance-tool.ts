import { getBalances } from "@/stellar-functions/get-balances";
import { tool } from "ai";
import { z } from "zod";

export const balanceTool = tool({
  description: "Retrieve the user's current account balance.",
  parameters: z.object({}), // No parameters required
  execute: async () => {
    const wallet = localStorage.getItem("publicKey");
    const balances = await getBalances(wallet);
    return { balances };
  },
});
