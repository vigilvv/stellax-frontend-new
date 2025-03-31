import * as StellarSdk from "@stellar/stellar-sdk";

export async function sendPayment(
  source: string,
  dest: string,
  amount: string,
  asset: string = "XLM"
) {
  //   console.log(source, dest, amount, asset);

  //   console.log(typeof source);
  //   console.log(typeof dest);
  //   console.log(typeof amount);
  //   console.log(typeof asset);
  const server = new StellarSdk.Horizon.Server(
    "https://horizon-testnet.stellar.org"
  );

  const privateKey = localStorage.getItem("privateKey");

  // Create a Keypair from private key so that it can sign
  const keypair = StellarSdk.Keypair.fromSecret(privateKey);

  return server.loadAccount(source).then(async (accountBeforePayment) => {
    // showBalance(accountBeforePayment);

    const payment = StellarSdk.Operation.payment({
      source: source,
      destination: dest,
      asset:
        asset === "XLM"
          ? StellarSdk.Asset.native()
          : new StellarSdk.Asset(
              asset,
              "GDTRVMLLRY3B5UWR747O4AUCV2PUPFGSK6CYN3H7UVSHQ5B7JPFGGX45"
            ),
      amount,
    });

    const tx = new StellarSdk.TransactionBuilder(accountBeforePayment, {
      networkPassphrase: StellarSdk.Networks.TESTNET,
      fee: StellarSdk.BASE_FEE,
    })
      .addOperation(payment)
      .setTimeout(30)
      .build();

    tx.sign(keypair);
    // return server.submitTransaction(tx);
    const response = await server.submitTransaction(tx);

    console.log("Transaction successful! ID:", response.hash);
    return response.hash; // Returning the transaction ID
  });
}
