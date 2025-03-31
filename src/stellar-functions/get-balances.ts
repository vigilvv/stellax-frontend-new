import * as StellarSdk from "@stellar/stellar-sdk";

export function showBalance(acc: StellarSdk.Horizon.AccountResponse) {
  console.log(`${acc.accountId().substring(0, 5)}: ${acc.balances[0].balance}`);
}
