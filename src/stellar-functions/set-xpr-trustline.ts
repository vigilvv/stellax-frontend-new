import * as StellarSdk from "@stellar/stellar-sdk";

// ASSETS
// XRPTEST --> Issuer: GDTRVMLLRY3B5UWR747O4AUCV2PUPFGSK6CYN3H7UVSHQ5B7JPFGGX45
//

const server = new StellarSdk.Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

export async function setXrpTrustline(
  walletSecret: string,
  assetCode: string,
  issuerPublicKey: string
) {
  try {
    const walletKeypair = StellarSdk.Keypair.fromSecret(walletSecret);
    const walletAccount = await server.loadAccount(walletKeypair.publicKey());

    // Create the asset object
    const asset = new StellarSdk.Asset(assetCode, issuerPublicKey);

    // Build the transaction
    const transaction = new StellarSdk.TransactionBuilder(walletAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.changeTrust({
          asset: asset,
          //   limit: "1000000", // Set the trust limit (optional)
        })
      )
      .setTimeout(30)
      .build();

    // Sign and submit the transaction
    transaction.sign(walletKeypair);
    const response = await server.submitTransaction(transaction);
    console.log("✅ Trustline added successfully:", response);
    return true;
  } catch (error) {
    // console.error("❌ Error adding trustline:", error.response?.data || error);
    console.error("❌ Error adding trustline:", error);
    return undefined;
  }
}
