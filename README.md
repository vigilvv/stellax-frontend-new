
### Installation

- `pnpm i`
- `pnpm run dev`

### Main pages

- `src/pages/LandingPage` - landing page
- `src/pages/AppPage` - chat app page

### Main Dirctories

- `src/stellar-functions` - Stellar related functions
- `src/agent-tools` - Tools for the LLM

### Description

StellaX AI Wallet is a native Stellar network wallet developed using the Stellar SDK.

**Vision:** Onboard the next Billion users onto the Stellar network with ease.

**Why now?**

With AI capabilities advancing rapidly there will be a huge push by major blockchain networks to enhance the usability and reach of their networks with the use of AI. Now, with the StellaX AI wallet, Stellar is a step ahead of the rest. As of 2025 it is well established that the capabilities of LLMs (Large Language Models) are improving exponentially, while the cost is decreasing exponentially. This creates a perfect storm for the pioneers to lead the field and create path breaking solutions that help the general public to use the network seamlessly. In this case, pioneers win by capturing the market fast. The next Billion users are the native language speakers who might not appreciate the underlying complexity or utility of blockchains, but want their day-to-day activities like sending and receiving payments to happen seamlessly. This is were StellaX AI is perfectly poised to help the Stellar network to be a pioneer in this new era.

**What?**

* Allows users to send payments without any knowledge of blockchains or the complexities of a payment app
* Supports multiple payment options like sending the native currency, and also other assets throughs path payments (complexity is completely hidden from the end user)
* Supports multiple languages (about 168 in the chat interface and 3 natively throughout the app - as of now)

**How?**

* Uses OpenAI Gpt-4o LLM model for the chat interface.
* It has agentic capabilities with "check-balances", "send-payment", and "send-path-payment" tools.

**Currently supported functions:**

* Checking account balance (self)
* Sending payment to a wallet in xlm - returns transaction id
* Sending path payment from xlm to xrp (testnet sample asset) to a wallet

**Tech Stack:** React, Vite, TypeScript, Supabase Auth, Supabase Postgres, OpenAI, AI SDK (from Vercel)

I used stellar lab ([https://lab.stellar.org](https://lab.stellar.org/)) to test functionalities before coding them.

I created a liquidity pool for the Stellar AMM with XLM and XRPTEST. Pool Id: ff73bfc5d459b609dc76ecf52589d8895700c0b9f355daf422909764540f91f9

Distributor wallet for XRPTEST: GCGPIBEHXSWBVKQIOJF6F3JLM5FIFD6A7GO52UBNCU6T2GJIAN236Q3W

 **Improvements & Future Ideas** :

* Create Muxed accounts (CAP-0027) to allow for a hybrid wallet approach
* Allow users adding trustlines
* Allow users creating liqudity pools on the native AMM
* Voice mode interaction
* Allow swaps between various assets
* Smart contract integration
