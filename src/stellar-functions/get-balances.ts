import * as StellarSdk from "@stellar/stellar-sdk";

export async function getBalances(wallet: string) {
  const server = new StellarSdk.Horizon.Server(
    "https://horizon-testnet.stellar.org"
  );

  const acc = await server.loadAccount(wallet);

  const balanceObj = {};

  acc.balances.forEach((balance) => {
    // console.log(`${balance.asset_type}: ${balance.balance}`);
    if (balance.asset_type === "native") {
      balanceObj["XLM"] = balance.balance;
    } else if (balance.asset_type === "credit_alphanum12") {
      balanceObj["XRP"] = balance.balance;
    }
    // else if (balance.asset_type === "liquidity_pool_shares") {
    //   balanceObj["XLM-XRP"] = balance.balance;
    // }
  });

  return balanceObj;
}
