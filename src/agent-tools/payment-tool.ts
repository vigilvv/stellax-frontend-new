// import { getBalances } from "@/stellar-functions/get-balances";
// import { sendPayment } from "@/stellar-functions/send-payment";
// import { tool } from "ai";
// import { z } from "zod";

// export const paymentTool = tool({
//   description:
//     "Send payment to another user from the current users walelt. The payment can be in XLM (native asset) or XRP (another asset). If the user does not provide another users wallet addresss starting with G... or proper email address, inform the user politely. If the user does not provide the amount or the asset type (XLM or XRP) ask them to specify that too.",
//   parameters: z.object({}), // No parameters required
//   execute: async () => {
//     const wallet = localStorage.getItem("publicKey");
//     const balances = await sendPayment(source, dest);
//     return { balances };
//   },
// });

import { getBalances } from "@/stellar-functions/get-balances";
import { sendPayment } from "@/stellar-functions/send-payment";
import { tool } from "ai";
import { z } from "zod";

export const paymentTool = tool({
  description:
    "Send payment to another user from the current user's wallet. The payment can be in XLM (native asset) or XRP (another asset). If the user does not provide another user's wallet address starting with G..., inform the user politely. If the user does not provide the amount or the asset type (XLM or XRP), ask them to specify that too. After sucess give the user the trasaction id that was returned.",
  //   parameters: z.object({
  //     destination: z.string().min(1, "Destination address is required"),
  //     amount: z.string().regex(/^\d+(\.\d+)?$/, "Amount must be a valid number"),
  //     asset: z.enum(["XLM", "XRP"], { required_error: "Asset type is required" }),
  //   }),

  parameters: z.object({
    destination: z
      .string()
      .describe(
        "The recipient's wallet address (starting with 'G...') or a valid email."
      ),
    amount: z
      .string()
      .describe("The amount to send. It must be a positive number."),
    asset: z
      .string()
      .describe(
        "The asset type to send. Can be 'XLM' (native asset) or 'XRP'."
      ),
  }),
  execute: async ({ destination, amount, asset }) => {
    const source = localStorage.getItem("publicKey");

    if (!source) {
      throw new Error("User's wallet address not found in localStorage.");
    }

    if (!destination || typeof destination !== "string") {
      throw new Error(
        "Invalid destination. Please provide a valid wallet address or email."
      );
    }

    if (!amount || isNaN(Number(amount))) {
      throw new Error("Invalid amount. Please enter a valid number.");
    }

    if (!asset || (asset !== "XLM" && asset !== "XRP")) {
      throw new Error("Invalid asset type. Please specify 'XLM' or 'XRP'.");
    }

    if (!destination.startsWith("G")) {
      throw new Error("Please provide a valid wallet address.");
    }

    // Convert amount to string (if it's mistakenly a number)
    const amountStr = String(amount);

    const initialBalances = await getBalances(source);
    const transactionId = await sendPayment(
      source,
      destination,
      amountStr,
      asset
    );
    const finalBalances = await getBalances(source);

    return {
      message: `Payment of ${amount} ${asset} sent successfully to ${destination} with transaction id ${transactionId}.`,
      initialBalances,
      finalBalances,
    };
  },
});
