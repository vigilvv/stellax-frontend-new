import { getBalances } from "@/stellar-functions/get-balances";
import { sendPathPayment } from "@/stellar-functions/path-payment";
import { tool } from "ai";
import { z } from "zod";

export const pathPaymentTool = tool({
  description:
    "Send payment to another user from the current user's wallet. The payment can be between two assets. In this case the user sends in XLM (native asset) and the receiver receives in XRP (also called XRPTEST). If the users asks to send as any other asset politely inform that at this point user can only send from XLM to XRP (XRPTEST), other assets will be added soon.",

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
        "The asset type to send. Can be 'XRP' or 'XRPTEST'. Always convert as 'XRP' even in mentioned as 'XRPTEST'."
      ),
  }),
  execute: async ({ destination, amount, asset }) => {
    const source = localStorage.getItem("publicKey");
    const privateKey = localStorage.getItem("privateKey");

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
    // const transactionId = await sendPayment(
    //   source,
    //   destination,
    //   amountStr,
    //   asset
    // );
    const finalBalances = await getBalances(source);

    const transactionId = await sendPathPayment(
      privateKey,
      destination,
      amountStr
    );

    return {
      message: !transactionId
        ? `Transaction failed`
        : `${asset} sent successfully to ${destination} with a transaction id of ${transactionId}.`,
      initialBalances,
      finalBalances,
    };
  },
});
