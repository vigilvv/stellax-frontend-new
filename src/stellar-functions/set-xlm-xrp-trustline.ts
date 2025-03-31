// Add liquidity pool trustline
import * as StellarSdk from "@stellar/stellar-sdk";

export async function setXlmXrpTrustline(
  walletSecret: string,
  assetCode: string,
  issuerPublicKey: string
) {
  try {
    const server = new StellarSdk.Horizon.Server(
      "https://horizon-testnet.stellar.org"
    );

    const walletKeypair = StellarSdk.Keypair.fromSecret(walletSecret);
    const walletAccount = await server.loadAccount(walletKeypair.publicKey());

    const poolAsset = new StellarSdk.LiquidityPoolAsset(
      StellarSdk.Asset.native(), // XLM
      new StellarSdk.Asset(assetCode, issuerPublicKey),
      StellarSdk.LiquidityPoolFeeV18
    );

    const transaction = new StellarSdk.TransactionBuilder(walletAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.changeTrust({
          asset: poolAsset, // Trust the liquidity pool asset
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(walletKeypair);
    await server.submitTransaction(transaction);
    console.log("✅ Trustline added for the Liquidity Pool!");
    return true;
  } catch (error) {
    // console.error("❌ Error adding trustline:", error.response?.data || error);
    console.error("❌ Error adding trustline:", error);
    return undefined;
  }
}
