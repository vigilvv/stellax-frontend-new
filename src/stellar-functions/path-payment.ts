// Path payment strict send

import {
  Keypair,
  //   Server,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  Horizon,
} from "@stellar/stellar-sdk";

const server = new Horizon.Server("https://horizon-testnet.stellar.org");

// Define assets
const XLM = Asset.native();
const XRPPTEST = new Asset(
  "XRPTEST", // Asset code
  "GDTRVMLLRY3B5UWR747O4AUCV2PUPFGSK6CYN3H7UVSHQ5B7JPFGGX45" // Issuer
);

export async function sendPathPayment(
  senderSecret: string,
  recipientPublic: string,
  sendAmount: string
) {
  const senderKeypair = Keypair.fromSecret(senderSecret);
  const senderPublic = senderKeypair.publicKey();

  try {
    const senderAccount = await server.loadAccount(senderPublic);

    // Find the best path
    const path = await server
      .strictSendPaths(XLM, sendAmount, [XRPPTEST])
      .call();
    if (!path.records.length) {
      throw new Error("No path found for the given payment");
    }

    const bestPath = path.records[0];
    const minReceiveAmount = bestPath.destination_amount;

    const transaction = new TransactionBuilder(senderAccount, {
      fee: (await server.fetchBaseFee()).toString(),
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.pathPaymentStrictSend({
          sendAsset: XLM,
          sendAmount: sendAmount,
          destination: recipientPublic,
          destAsset: XRPPTEST,
          destMin: minReceiveAmount,
          //   destMin: "1",
          path: bestPath.path.map(
            (p) => new Asset(p.asset_code, p.asset_issuer)
          ),
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(senderKeypair);

    const response = await server.submitTransaction(transaction);
    console.log("Transaction successful!", response);
    return response.hash;
  } catch (error) {
    console.error("Transaction failed:", error);
    return undefined;
  }
}
