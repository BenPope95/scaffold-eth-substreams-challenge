# Substreams Powered Subgraph Challenge

🌊 Substreams are a powerful way to process blockchain data efficiently, allowing developers
to stream, transform, and analyze large volumes of on-chain data in real time.

📚 This challenge is meant for developers with a basic understanding of Rust 🦀, Web3, a basic familiarity with [subgraphs](https://thegraph.com/docs/en/about/).

<details markdown='1'><summary>Prerequisites</summary>

**1. Rust**

Don’t know Rust? Complete the following:

- [ ] 🤓 Read chapters 1-9 in [The Book](https://doc.rust-lang.org/book/index.html).
- [ ] 🚵‍♀️ As you read, complete the corresponding [Rustlings](https://rustlings.cool/) exercises.

**2. Basic Substreams Architecture**

🍹 For a basic introduction to Substreams watch this [video](https://www.youtube.com/watch?v=fogh2D-vpzg&t=2122s) from 14:10 to 35:00.

<!-- 🧱 Substreams are composed of two types of WASM modules:

1. **Map modules** take inputs and have outputs much like **pure function**.
2. **Store modules** are key value pairs that let you aggregate values from maps.

Modules pass information to each other in the form of protobufs, but cannot modify each other's data. This allows two things:

- They can be run in parallel, making them very fast.
- They can be tested and debugged individually.

🚰 Substreams are outputted into Sinks

[Sinks](https://substreams.streamingfast.io/reference-and-specs/manifests#sink-type) are anything that consumes the Substreams data, for our challenge we will be using a Subgraph as a sink.

The docs mention databases and subgraphs, which are the most common, but you can also build your own sink. -->

</details>

### Challenge Overview:

1️⃣ You’ll use a template Substreams to filter through blockchain data and index the transfer volume of certain NFT collections. 🙈

2️⃣ Then you’ll be outputting the target data into a subgraph.

3️⃣ Finally, you’ll query the subgraph in a template frontend to display the data with swag. 😎

> 🕺 Complete the challenge however you want, as long as your result looks the same as ours.

> 🎣 Our goal (as authors) is not to give you fish but to teach you to fish.

> 🚧 It’s a challenge, not a tutorial. But the goal is that you’ll learn more from this challenge than any tutorial could teach.

**😇 Support 👋**

The [Streamingfast Discord](https://discord.gg/mYPcRAzeVN) has quick and quality support.

You can also join a smaller, more focused Telegram channel for help: [Substreams Challenge Help](https://t.me/+-d5ZcCZidWcwNjc5)

---

# Checkpoint 0: 📦 Environment 📚

Before you begin, you need to install the following tools:

(for Scaffold-ETH)

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

(for Substreams)

- [Rust, Buf, and Substreams CLI](https://substreams.streamingfast.io/documentation/consume/installing-the-cli#dependency-installation)
- [Authentication and API key](https://app.streamingfast.io/dashboard)

> To set your API key more easily:

```sh
export STREAMINGFAST_KEY=server_YOUR_KEY_HERE
function sftoken {
export SUBSTREAMS_API_TOKEN=$(curl https://auth.streamingfast.io/v1/auth/issue -s --data-binary '{"api_key":"'$STREAMINGFAST_KEY'"}' | jq -r .token)
echo "Token set on in SUBSTREAMS_API_TOKEN"
}
```

Then you can obtain your key with `sftoken`, it will make life easier 🤙

> 1. Clone this repo onto your machine

> 2. Install Scaffold-ETH with

```sh
yarn install

```

> 3. In the same terminal, start your local network (a local instance of a blockchain):

```sh
yarn chain
```

> 4. In a second terminal window, 🛰 deploy your contract (locally):

```sh
yarn deploy
```

> 5. In a third terminal window, start your 📱 frontend:

```sh
yarn start
```

This challenge only uses these commands for Scaffold-ETH to display a frontend, there is no smart contract involved.

# Checkpoint 1: 🤖 ABI

To generate Rust types related to specific contract events and functions, you need to provide an ABI in the `substreams_challenge > abi > contract.abi.json`.

We have provided the Bored Ape Yatch Club ABI for you to paste in `contract.abi.json`.

<details markdown='1'><summary>ABI (toggle)</summary>

```json
[
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "maxNftSupply",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "saleStart",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "BAYC_PROVENANCE",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_APES",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "REVEAL_TIMESTAMP",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "apePrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "baseURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "emergencySetStartingIndexBlock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "flipSaleState",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxApePurchase",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "numberOfTokens",
        "type": "uint256"
      }
    ],
    "name": "mintApe",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reserveApes",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "saleIsActive",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "baseURI",
        "type": "string"
      }
    ],
    "name": "setBaseURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "provenanceHash",
        "type": "string"
      }
    ],
    "name": "setProvenanceHash",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "revealTimeStamp",
        "type": "uint256"
      }
    ],
    "name": "setRevealTimestamp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "setStartingIndex",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startingIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startingIndexBlock",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

</details>

For our challenge, you'll only be using one event. However you have access to all the types generated by the ABI.

> If you choose to use `substreams init` to start your own project in the future, you'll be prompted to enter an address where the ABI will be fetched for you from Etherscan.

## 🔨 Makefile

- [ ] Open your `Makefile` and look through the commands.

> These are the commands you will use to build and test your substreams as you go.

- [ ] After pasting the ABI in the `contract.abi.json`, run `make build`.

> `make build` will generate your Rust types from the ABI.

---

# 🌎 Checkpoint 1: map_apes 🐵

Your first module will be a map module.

[map modules](https://substreams.streamingfast.io/documentation/develop/manifest-modules#map-modules) are how you will retrieve and filter your data.

## 1.1 Making a Protobuf 💪

- Protobufs are a language-agnostic way to serialize structured data.
- Substreams use protobufs to carry data through their modules, so we need to define our protobufs according to the data we want.
- [Protobufs](https://substreams.streamingfast.io/documentation/develop/creating-protobuf-schemas#protobuf-definition-for-substreams) from the Streamingfast docs.
- In `substreams > proto > contract.proto`, paste the following into the file:

```proto

message Transfer {
string address = 1;
string name = 2;
string symbol = 3;
}

message Transfers {
repeated Transfer transfers = 1;
}

```

In this challenge, your first map module will return a protobuf called `Transfers`. 🚚 🚚 🚚

Your `Transfers` protobuf has a `transfers` field that contains a vector of `Transfer` protobufs.

🗃️ Substreams map modules can only return a single protobuf in their output, so to return a vector of transfers in a block, we need to return a single protobuf that holds a list of transfers.

## 🪴 Generating the protobuf

After defining them, you’ll need to run a command to generate the protobufs

- [ ] 👐 Generate your protobufs by running: `make protogen`

## 🍠 1.2 Updating the Yaml

🏙️ In `substreams_challenge > substreams.yaml`, you’ll find the outline of the project structure.
When adding new modules, you’ll need to specify its structure in the `substreams.yaml`.

The map module has mostly been filled out.

- [ ] For the name field, put `map_apes`
- [ ] For the kind field put `map`.

- Your first module will take in `eth::Block`, so the `inputs` field needs `- source: sf.ethereum.type.v2.Block`.
  > Your first module can additionally take in `params` or `clock`, but it will always take in `block`.

⤵️ Downstream, your modules can take in any of the following [inputs](https://substreams.streamingfast.io/documentation/develop/manifest-modules/inputs#inputs-overview).

🏆 It is best practice to only take in `sf.ethereum.type.v2.Block` in your first module so you’re only iterating over the block once.

- The `output:` is `type: proto:contract.v1.Transfers` which is the `Transfers` protobuf.

## 1.3 🏗️ Building the Map Module

- [ ] Go to `substreams_challenge > src > lib.rs`.

> Every module needs a handler above it: `#[substreams::handlers::(map or store)]` so that your yaml finds the module.

### 🖊️ What is filled out:

- Your `map_apes` module takes in `blk: eth::Block` (block).
- The module returns: `Result<Transfers, substreams::errors::Error>`.
  > Most of the time, you'll see map modules return [Result Types](https://doc.rust-lang.org/rust-by-example/error/result.html). They can also return Option Types or the protobuf directly.
- `token_meta` is a helper we made that makes RPC calls to fetch token `name` and `symbol`.
  > Take a look at rpc.rs if you’re curious about how RPC calls work.
- The `Transfer` protobuf is instantiated for you with `name` and `symbol` populated from `token_meta`. In the `address` field `Hex::Encode()` is provided to conveniently convert the address (most likely a `Vec<u8>`) to a hexadecimal string.
- The `Transfers` protobuf (what the module returns) has also been instantiated.
- At the top of the file, we have imported the `TransferEvent` type for you to use.

## 🥅 Goal of the module

The module should search the block for all ERC721 transfer events, filter by name, populate the `Transfer` protobuf with the event address, and populate 👫 the `Transfers` protobuf with a vector of `Transfer` protobufs.

## 🎖️ Your Goals

- [ ] Look at the [available methods](https://docs.rs/substreams-ethereum/latest/substreams_ethereum/pb/eth/v2/struct.Block.html#implementations) on the Block Struct

  > `transactions()`, `reciepts()`, `logs()`, `calls()`, and `events()`, will allow you to iterate over the block’s data.

- [ ] Look at the [Event Trait](https://docs.rs/substreams-ethereum/latest/substreams_ethereum/trait.Event.html) for helpful methods to deal with events.

- [ ] TODO 1: Search 🔍 the block to find all events that match the `TransferEvent`.

- [ ] TODO 2: Pass the address that emitted the event 🎇 into `token_meta` so token_meta can make the calls to the correct address.

- [ ] TODO 3: Add a check that the name field on `token_meta` contains "Ape".

- [ ] TODO 4: Populate the `address` field on the protobuf with the event address.

- [ ] TODO 5: Assign the `transfers` field 🧑‍🌾 on the `Transfers` protobuf the vector of `Transfer` protobufs.

## 🧪 Testing your map module

- [ ] Go back to your Makefile

- [ ] Assign the `MODULE` variable `map_apes`

**In the terminal running the following commands will do:**

🏃 `make run` will run your chosen module and all modules upstreams, displaying the output in the terminal block by block

🍱 `make gui` will run your substreams and allow you to jump to the outputs of specific blocks. You can also look at the outputs of individual modules

🚧 For `make run` and `gui`, the `START_BLOCK` needs to be the same as in the `substreams.yaml`

> The STOP_BLOCK 🚫 will be how many blocks you run

🚧 Your API key has a certain limit 🤯 so don’t test on a block range that is too large!

- [ ] Use `make run` to see what the module returns for each block.

- ✅ Check that block #15,000,002 looks like:

<details markdown='1'><summary>this (toggle)</summary>

```
{
  "@module": "map_apes",
  "@block": 15000002,
  "@type": "contract.v1.Transfers",
  "@data": {
    "transfers": [
      {
        "address": "2ee6af0dff3a1ce3f7e3414c52c48fd50d73691e",
        "name": "Bored Ape Yacht Club",
        "symbol": "BAYC"
      },
      {
        "address": "2ee6af0dff3a1ce3f7e3414c52c48fd50d73691e",
        "name": "Bored Ape Yacht Club",
        "symbol": "BAYC"
      },
      {
        "address": "2ee6af0dff3a1ce3f7e3414c52c48fd50d73691e",
        "name": "Bored Ape Yacht Club",
        "symbol": "BAYC"
      },
      {
        "address": "2ee6af0dff3a1ce3f7e3414c52c48fd50d73691e",
        "name": "Bored Ape Yacht Club",
        "symbol": "BAYC"
      },
      {
        "address": "47f3a38990ca12e39255e959f7d97fbe5906afd4",
        "name": "Ape Reunion",
        "symbol": "APE_REUNION"
      }
    ]
  }
}

```

</details>

## 🪵 Logging and Debugging 🐛

If your block 15,000,002 does't look like ours, you made a mistake somewhere and you'll need to debug. Luckily the substreams library has a [tool](https://docs.rs/substreams/latest/substreams/log/index.html) for logging.

```rust
substreams::log::info!("{:?}", value);
```

You will probably be using this a lot when building your own substreams after this challenge.

---

🎊 If it does, you’ve completed the map module correctly, congratulations! 🎊

🕰️ Now it’s time to aggregate the `Transfers` with a store_module!

---

# Checkpoint 2: 🏪 store_transfer_volume 🔊

The next module you’ll be building is a store_module.
[store_modules](https://substreams.streamingfast.io/documentation/develop/manifest-modules#store-modules) are used to aggregate and store values through the use of key value pairs. 🗝️

## 🍠 2.1 Updating the yaml (again)

- [ ] Go back to the substreams.yaml 🔙

This time, we only filled out the `initialBlock`. 📥

- [ ] Fill out the `name` with `store_transfer_volume`
- [ ] Fill out the `kind` with `store`
- [ ] Look at the [updatePolicy](https://substreams.streamingfast.io/documentation/develop/manifest-modules/types#updatepolicy-property) 👀 property
  > These are the available options for `updatePolicy`
- [ ] Look at the [valueType](https://substreams.streamingfast.io/documentation/develop/manifest-modules/types#valuetype-property) 👀 property
  > These are the available options for `valueType`
- [ ] Look at the [stores](https://docs.rs/substreams/latest/substreams/store/index.html#structs) 👀 in the substreams docs.

  🚧 Notice: Most of the stores are a combination of an `updatePolicy` and a `valueType`.

  You will be using `StoreAddInt64`.

> NOTE: the [substreams](https://docs.rs/substreams/latest/substreams/index.html).rs library is a different library than the [substreams-ethereum](https://docs.rs/substreams-ethereum/latest/substreams_ethereum/index.html).rs library that you used for the map modules.

- [ ] ✏️ Now fill out `updatePolicy` and `valueType` appropriately

> 🔄 store_modules take in the same inputs as map modules.

> 🚫 Unlike map modules, store modules do not have outputs.

- [ ] Under `inputs` fill in the `-map` field with the name of our map module

## 🏪 2.2 Building the Store Module

- [ ] Go to `substreams_challenge > src > lib.rs`.

### 🖊️ What is filled out:

- Your `store_transfer_volume` module takes in the `transfers: Transfers` protobuf outputted by `map_apes`, as the first argument.
- At the top of the file we have imported the `StoreAddInt64` type, along with `StoreAdd` and `StoreNew` traits.
  > You need to import the corresponding traits (such as `StoreAdd` and `StoreNew` for `StoreAddInt64`) to use the store's methods.

### 🥅 The Goal of the module

The module should iterate over the `Transfers` and increment the store value by 1 for each unique address.

### 🎖️ Your Goals

- [ ] TODO 1: Pass in the appropriate store type as the second argument
- [ ] TODO 2: ♻️ Iterate over transfers
- [ ] Look at the available methods on Docs.rs 👀 for your store under the Trait Implementation section
- [ ] TODO 3: Use the `.add()` method on the store you passed in
  > The first argument for `.add()` is ord ([ordinal](https://substreams.streamingfast.io/documentation/develop/manifest-modules/writing-module-handlers#ordinal)). We won’t be using ordinals, so put 0 for that argument.

🚧 You cannot use `make run` or `make gui` to test your store_module because they don’t have outputs

However in the next module, you'll be able to see if you've built your store module correctly.

---

# 📈 Checkpoint 3: graph_out 🛵

[graph_out](https://substreams.streamingfast.io/documentation/consume/subgraph) builds `EntityChanges` that will be outputted into your subgraph.

🚧 Notice the handler above `graph_out`, indicates that graph_out is a map module.

## 🍠 3.1 Updating the yaml (again)

- [ ] With your new-found .yaml experience, fill out the rest of the substreams.yaml for graph_out

## 3.2 schema.graphql

📘 Your subgraph needs a schema to define the entities you'll query.

🤓 Read more about how to make your own [schema](https://graphql.org/learn/schema/) here.

We’ve provided the following for you to paste in `substreams_challenge > schema.graphql`:

```graphql
type transfer_volume @entity {
  id: ID!
  name: String!
  symbol: String!
  address: String!
  volume: BigInt!
}
```

## 3.3 Building the graph_out

### 🥅 Goal of the module

It should iterate ♻️ over the `Transfers`, and for each `Transfer`, it should retrieve 🏃 the `volume` from the store, then build the `transfer_volume` entity. 👽

### 🖊️ What is filled out:

- The module_returns `Result<EntityChanges, substreams::errors::Error>`
- The `EntityChanges` container has been initialized
- The `Ok` variant returning the `EntityChanges`

### 🎖️ Your Goals

Because stores don’t have outputs, you must import a new store type to access the storage values. 🏘️

[Stores](https://substreams.streamingfast.io/documentation/develop/manifest-modules/types#store-modes) have two modes for retrieving data. You will be using “get mode” for this module.

- [ ] TODO 1: Look at the library 📚 and import the appropriate store type along with the corresponding trait to use the store’s methods
- [ ] TODO 2: Pass in the store 🏪 as the first function argument
- [ ] TODO 3: Pass in the second argument (look at your yaml)
- [ ] TODO 4: Iterate over the `transfers`
- [ ] TODO 5: Get the volume from the store

  > `EntityChanges` has been imported for you from the [substreams_entity_change](https://docs.rs/substreams-entity-change/latest/substreams_entity_change/index.html).rs library. You will need to use the `tables` module to access:

  > 1. `createRow()` on the `Tables` struct to build the entity
  > 2. `set()` on the `Row` struct to set the entity’s fields

- [ ] TODO 6: Create a row on the table for each entity and set the value of each field
- [ ] Check your `schema.graphql` to make sure you’re populating the entities exactly like the schema

  > The compiler won’t catch if the entity you’re building matches the schema, so double-check for spelling and capitalization.

## 🧪 Testing your graph_out

- [ ] In your `Makefile`, change the `STOP_BLOCK` from `+10` to `+100`.
- [ ] Test your graph_out module with `make gui` and remember to update the `MODULE` variable
- [ ] Use "TAB" to navigate to the "Output" tab.

- [ ] Use "u" and "i" to switch between modules

- [ ] Go to the `store_transfer_volume`

- [ ] Use "o" and "p" to scroll accross the blocks, and make sure that the values are always incrementing by 1.

- [ ] Now switch to the `graph_out` and make sure block #15,000,082 looks like:

<details markdown='1'><summary>this (toggle)</summary>

```

{
  "entityChanges": [
    {
      "entity": "transfer_volume",
      "id": "2ee6af0dff3a1ce3f7e3414c52c48fd50d73691e",
      "ordinal": "0",
      "operation": "CREATE",
      "fields": [
        {
          "name": "symbol",
          "newValue": {
            "string": "BAYC"
          }
        },
        {
          "name": "volume",
          "newValue": {
            "bigint": "192"
          }
        },
        {
          "name": "address",
          "newValue": {
            "string": "2ee6af0dff3a1ce3f7e3414c52c48fd50d73691e"
          }
        },
        {
          "name": "name",
          "newValue": {
            "string": "Bored Ape Yacht Club"
          }
        }
      ]
    }
  ]
}

```

</details>

If it does,

🎊 Congratulations, you have built your first Substreams!!! 🎊

# Checkpoint 4: 🤖 Deploying the Subgraph

1. Run `make pack` to make your substreams package (.spkg)

2. Go to [subgraph studio](https://thegraph.com/studio/)

3. Connect your wallet

4. Click "Create a Subgraph" on the right and give it a name

5. On the right-hand side under "AUTH & DEPLOY", copy the command under "authenticate in CLI". Run this command in your terminal.

6. Then copy and run the command under "deploy subgraph" and follow the instructions in the terminal

7. Once that's done, the subgraph should be deployed. If you go back to the subgraph page on the studio, the subgraph should be syncing.

While we let the subgraph sync, we'll get started on the front end.

# 🪝 Checkpoint 5: Hooking the frontend up to the subgraph

We are using [Apollo Client](https://www.apollographql.com/docs/react/) to make things easier.

1. Go to `packages > nextjs > app > page.tsx`

2. Paste the following in the Home function:

```ts
const client = new ApolloClient({
  uri: "",
  cache: new InMemoryCache(),
});
```

3. Go back to your subgraph in the studio.

4. In the "details" tab, under "development query URL - latest version", copy the link.

5. Paste this link in the empty quotes for the uri field in the `client` variable.

6. 📰 Wrap the returned HTML in:

```ts
<ApolloProvider client={client}></ApolloProvider>
```

7. Now go to the `Content.tsx` file under `nextjs > components > Content.tsx`

8. Before the `return` statement paste in the following:

```ts
const { loading, error, data } = useQuery();

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;
```

9. The `Table` component accepts a prop of `data`, so pass in the `data` returned from `useQuery()` into the `<Table data={} />`

10. 🪨 Now let's give you a query to pass into `useQuery()`:

```ts
const query = gql`
  {
    transferVolumes(orderBy: volume, orderDirection: desc) {
      name
      symbol
      address
      volume
    }
  }
`;
```

11. Save everything and check your front end!

![Apes](/packages/nextjs/public/ape-together-strong.png)

## 😁 Wrapping up 🕰️

We hope after completing this challenge, you have everything you need to build your own substreams and incorporate them into your builds! 🏗️

🦀 We (the authors Ben and Aye Chan) learned Rust for the sole purpose of building substreams.

🤒 Because of the lack of resources about substreams, there was a lot of trial and error for us, and we wanted to make the whole proccess easier for developers.

👨‍🏫 We didn't want to make a tutorial but rather teach the process of building substreams so that people have the tools and thinking frameworks to build on their own.

Luckily we had the [Streamingfast Discord](https://discord.gg/mYPcRAzeVN) for quick and quality support.

You can also join a smaller, more focused Telegram channel for help: [Substreams Challenge Help](https://t.me/+-d5ZcCZidWcwNjc5)

Written by:

[Ben Pope](https://github.com/BenPope95) & [Aye Chan San Tun](https://github.com/ayechanst)
