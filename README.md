# Substreams Challenge

📚 This challenge is meant for developers with a basic understanding of Rust 🦀 and Web3.

Do you want to use substreams but don’t know Rust? You only need a subset of Rust!

- Just read [The Book](https://doc.rust-lang.org/book/index.html)
  and understand chapters 1-9, maybe 10, plus chapters 13 and 18.
- [Rustlings](https://rustlings.cool/) is a great way to apply your knowledge!

🌊 Substreams are a powerful way to process blockchain data efficiently, allowing developers
to stream, transform, and analyze large volumes of on-chain data in real time.

For a basic introduction to Substreams, we highly recommend watching this [video](https://www.youtube.com/watch?v=fogh2D-vpzg&t=2122s). The whole video is great but 14:10 to 35:00 will help you enourmously through this challege if you don't know anything about substreams yet.

For a quicker, more applicable overview, watch [this](https://www.youtube.com/watch?v=vWYuOczDiAA&t=27s)

For a quick read here's how substreams work:

##### Modules

Substreams are composed of WASM modules, which there are two types: map modules and store modules.

- Map modules take inputs and have outputs, much a like **pure function**.
- Store modules are key value pairs that let you aggregate values from maps.
- Modules pass information to each other in the form of protobufs, but cannot modify each other's data. This allows two things:

1. They can be run in parallel, making them very fast.
2. They can be tested and debugged individually.

##### Sinks

Substreams are outputted into sinks.
[Sinks](https://substreams.streamingfast.io/reference-and-specs/manifests#sink-type) are the service that consume the Substreams data, for our challenge we will be using a Subgraph as a sink.

**Create a simple Substreams powered Subgraph:**

1️⃣ You’ll be using a template Substreams to filter through blockchain data and indexing the transfer volume of NFT collections.

2️⃣ Then you’ll be outputting the target data into a subgraph.

3️⃣ Finally, you’ll query the subgraph in a template frontend to display the data with swag. 😎

---

# Checkpoint 0: 📦 Environment 📚

Before you begin, you need to install the following tools:

(for Scaffold-ETH)

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

(for Substreams)

- [Rust, Buf, and Substreams CLI](https://substreams.streamingfast.io/documentation/consume/installing-the-cli#dependency-installation)
- [Authentication and API key](https://substreams.streamingfast.io/documentation/consume/installing-the-cli#dependency-installation)

> To set your API key more easily:

```sh
export STREAMINGFAST_KEY=server_YOUR_KEY_HERE
function sftoken {
export SUBSTREAMS_API_TOKEN=$(curl https://auth.streamingfast.io/v1/auth/issue -s --data-binary '{"api_key":"'$STREAMINGFAST_KEY'"}' | jq -r .token)
echo "Token set on in SUBSTREAMS_API_TOKEN"
}
```

Then you can obtain your key with `sftoken`, it will make life easier 🤙

> You’ll need to install Scaffold-ETH with

```sh

yarn install

```

## Introduction to the Challenge

🕺 Complete the challenge however you want, as long as your result looks the same as ours.

🛩️ Follow our steps if you want a more guided experience.

🎣 Our goal (as authors) is not to give you fish but to teach you to fish.

🧠 The challenge will require thinking, problem-solving, and trying different things.

🚧 It’s a challenge, not a tutorial. But the goal is that you’ll learn more from this challenge than any tutorial could teach.

## ABI

In order to generate Rust types related to specific contract events and functions, you need to provide an ABI in the `substreams_challenge > abi > contract.abi.json`.

We have provided the Bored Ape Yatch Club ABI for you to paste in `contract.abi.json`.

<details markdown='1'><summary>ABI</summary>

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

For our challenge you will only be using one event, however you have access to all the types generated by the ABI.

## Makefile

- [ ] Open your `Makefile` and take a look through the commands.

> These are the commands you will use to build and test your substreams as you go.

- [ ] After pasting the ABI in the `contract.abi.json`, run `make build`.

> `make build` will generate your Rust types from the ABI.

---

# 🌎 Checkpoint 1: map_events 🎇

Your first module will be a map module.

[map modules](https://substreams.streamingfast.io/documentation/develop/manifest-modules#map-modules) are how you will retrieve and filter your data.

## 1.1 Making a Protobuf 💪

- Protobufs are a language-agnostic way to serialize structured data.
- Substreams use protobufs to carry data through their modules, so we need to define our protobufs according to the data we want.
- [Protobufs](https://substreams.streamingfast.io/documentation/develop/creating-protobuf-schemas#protobuf-definition-for-substreams) from the Streamingfast docs.
- In `substreams > proto > contract.proto`, make sure your file looks like this:

```proto
syntax = "proto3";

import "google/protobuf/timestamp.proto";

package contract.v1;

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

Your `Transfers` protobuf has a field that contains a vector of `Transfer` protobufs.

🗃️ Substreams map modules can only return a single protobuf in their output, so to return a vector of transfers in a block, we need to return a single protobuf that holds a list of transfers.

## Generating the protobuf

You’ll need to run a command to generate the protobufs after defining them.

- [ ] 👐 Generate your protobufs by running: `make protogen`

## 🍠 1.2 Updating the Yaml

In `substreams_challenge > substreams.yaml`, you’ll find the outline of the project structure.
🏙️ When adding new modules, you’ll need to specify its structure in the `substream.yaml`.

The map module has mostly been filled out.

- [ ] For the name field, put `map_events`
- [ ] For the kind field put `map`.

- Your first module will take in block, so the `inputs` field needs `- source: sf.ethereum.type.v2.Block`.
  > Your first module can additionally take in `params` or `clock`, but it will always take in `block`.

⤵️ Downstream, your map module’s `input` field can take in any of the following [inputs](https://substreams.streamingfast.io/documentation/develop/manifest-modules/inputs#inputs-overview).

🏆 It is best practice to only take in `sf.ethereum.type.v2.Block` in your first module so you’re only iterating over the block in one module.

- The `output:` is `type: proto:contract.v1.Transfers` which is the `Transfers` protobuf.

## 1.3 🏗️ Building the Map Module

- [ ] Go to `substreams_challenge > src > lib.rs`.

> Every module needs a handler above it: `#[substreams::handlers::(map or store)]` so that your yaml finds the module.

### 🖊️ What is filled out:

- Your `map_events` module takes in `blk: eth::Block` (block).
- The module returns: `Result<Transfers, substreams::errors::Error>`.
  > Most of the time you will see map modules return [Result Types](https://doc.rust-lang.org/rust-by-example/error/result.html). They can also return Option Types or the protobuf directly.
- `token_meta` is a helper that makes RPC calls to fetch token `name` and `symbol`.
  > Take a look at rpc.rs if you’re curious about how RPC calls work.
- The `Transfer` protobuf is instantiated for you with `name` and `symbol` populated from `token_meta`. In the `address` field `Hex::Encode()` is provided to conveinently convert the address (most likely a `Vec<u8>`) to a hexadecimal string.
- The `Transfers` protobuf (what the module returns) has also been instantiated.
- At the top of file we have imported the `TransferEvent` type for you to use.

## 🥅 Goal of the module

The module should search the block for all ERC721 transfer events, populate the `Transfer` protobuf with the event address, and populate 👫 the `Transfers` protobuf with a vector of `Transfer` protobufs.

## 🎖️ Your Goals

- [ ] Look at the [available methods](https://docs.rs/substreams-ethereum/latest/substreams_ethereum/pb/eth/v2/struct.Block.html#implementations) on the Block Struct

  > `transactions()`, `reciepts()`, `logs()`, `calls()`, and `events()`, these will allow you to iterate over the block’s data.

- [ ] Look at the [Event Trait](https://docs.rs/substreams-ethereum/latest/substreams_ethereum/trait.Event.html) for helpful methods to deal with events.

- [ ] TODO 1: Search 🔍 the block to find all events that match the `TransferEvent`.

- [ ] TODO 2: Pass the address that emmitted the event 🎇 into `token_meta` so it can make the calls to the correct address.

- [ ] TODO 3: Assign 🧑‍🏫 the `address` field on the protobuf the event address.

- [ ] TODO 4: Assign the `transfers` field 🧑‍🌾 on the `Transfers` protobuf the vector of `transfer` protobufs.

## 🧪 Testing your map module

- [ ] Go back to your Makefile

- [ ] Assign the `MODULE` variable the name of the module you want to test

In the terminal running the following commands will do:

🏃 `make run` will run your module and display the output in the terminal block by block

🍱 `make gui` will run your substreams and allow you to jump to the outputs of specific blocks

🚧 For `make run` and `gui`, the `START_BLOCK` needs to be the same as in the `substreams.yaml`

> The STOP_BLOCK 🚫 will be how many blocks you run

🚧 Your API key has a certain limit 🤯 so don’t test on too large of a block range!

- [ ] Run `make gui` and use TAB to navigate to the Output tab

> You can view the output of each block by using “o” and “p” to scroll left and right across blocks

- ✅ Check that block #12,287,507 looks like this:

```

{
“transfers”: [
{
“address”: “890c3b095fb0da2f610f4a3276db0a34591550a2”,
“name”: “ROCKY GATEWAY Open Edition by A$AP Rocky”,
“symbol”: “ROCKYGATEWAYOPENEDITIONBYAAPROCKY”
},
{
“address”: “50b8740d6a5cd985e2b8119ca28b481afa8351d9”,
“name”: “RTFKT”,
“symbol”: “RTFKT”
},
{
“address”: “a7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270”,
“name”: “Art Blocks”,
“symbol”: “BLOCKS”
}
]
}

```

🎊 If it does, you’ve completed the map module correctly, congratulations! 🎊

🕰️ Now it’s time to aggregate the `Transfers` with a store_module!

---

# Checkpoint 2: 🏪 store_transfer_volume 🔊

The next module you’ll be building is a store_module.
[store_modules](https://substreams.streamingfast.io/documentation/develop/manifest-modules#store-modules) are used to aggregate and store values through the use of key value pairs. 🗝️

## 🍠 2.1 Updating the yaml (again)

- [ ] Go back to the substreams.yaml 🔙

This time we only filled out the `initialBlock`. 📥

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

- Your `store_transfer_volume` module takes in the `transfers: Transfers` protobuf outputted by `map_events`, as the first argument.
- At the top of file we have imported the `StoreAddInt64` type, along with `StoreAdd` and `StoreNew` traits.
  > You need to import the corresponding traits (such as `StoreAdd` and `StoreNew` for `StoreAddInt64`) to use the store types.

### 🥅 The Goal of the module

The module should iterate over the `Transfers` and increment the store value by 1 for each unique address.

### 🎖️ Your Goals

- [ ] Pass in the appropriate store type as the second argument
- [ ] ♻️ Iterate over transfers
- [ ] Look at the available methods on Docs.rs 👀 for your store under the Trait Implementation section
- [ ] Use the `.add()` method on the store you passed in
  > The first argument for `.add()` is ord ([ordinal](https://substreams.streamingfast.io/documentation/develop/manifest-modules/writing-module-handlers#ordinal)), we won’t be using ordinals so put 0 for that argument.

🚧 You cannot use `make run` or `make gui` to test your store_module because they don’t have outputs

<!-- But we have provided a map module for the purpose of testing your store_module. -->

---

# 📈 Checkpoint 3: graph_out 🛵

[graph_out](https://substreams.streamingfast.io/documentation/consume/subgraph) builds `EntityChanges` that will be outputted into your subgraph.

🚧 Notice the handler above `graph_out`, indicates that graph_out is a map module.

## 🍠 3.1 Updating the yaml (again)

- [ ] With your new-found .yaml experience, fill out the rest of the substreams.yaml for graph_out

### schema.graphql

📘 Your subgraph needs a schema to define the entities you'll be querying.

🤓 Read more about how to make your own [schema](https://graphql.org/learn/schema/) here.

We’ve provided the following for you:

```graphql
type transfer_volume @entity {
  id: ID!
  name: String!
  symbol: String!
  address: String!
  volume: BigInt!
}
```

### 🥅 goal of the module

It should iterate ♻️ over the `Transfers`, and for each `Transfer`, it should retrieve 🏃 the `volume` from the store, then build the `transfer_volume` entity. 👽

### 🖊️ What is filled out:

- The module_returns `Result<EntityChanges, substreams::errors::Error>`
- The `EntityChanges` container has been initialized
- The `Ok` variant returning the `EntityChanges`

### 🎖️ Your Goals

Because stores don’t have outputs, you’ll need to import a new store type to access the storage values. 🏘️

[Stores](https://substreams.streamingfast.io/documentation/develop/manifest-modules/types#store-modes) have two modes for retrieving data. You will be using “get mode” for this module.

- [ ] Look at the library 📚 and import the appropriate store type
- [ ] Import the corresponding trait to use the store’s methods
- [ ] Pass in the store 🏪 as the first function argument
- [ ] Pass in the second argument (look at your yaml)
- [ ] Iterate over the `transfers`
- [ ] Get the volume from the store

  > `EntityChanges` has been imported for you from the [substreams_entity_change](https://docs.rs/substreams-entity-change/latest/substreams_entity_change/index.html).rs library. You will need to use `tables` module to access:

  > 1. `createRow()` on the `Tables` struct to build the entity
  > 2. `set()` on the `Row` struct to set the entity’s fields

- [ ] Create a row on the table and set the value of each field
- [ ] Double check your `schema.graphql` to make sure you’re populating the entities exactly like the schema

  > The compiler won’t catch if the entity you’re building matches the schema, so double-check for spelling and capitalization.

## 🧪 Testing your graph_out

- [ ] Test your graph_out module with `make gui` and remember to update the `MODULE` variable

- ✅ On the output tab navigate to block #12,287,507 and make it matches this:

```

{
  “entityChanges”: [
    {
      “entity”: “transfer_volume”,
      “id”: “890c3b095fb0da2f610f4a3276db0a34591550a2”,
      “ordinal”: “0”,
      “operation”: “CREATE”,
      “fields”: [
        {
          “name”: “symbol”,
          “newValue”: {
            “string”: “ROCKYGATEWAYOPENEDITIONBYAAPROCKY”
          }
        },
        {
          “name”: “volume”,
          “newValue”: {
            “bigint”: “6”
          }
        },
        {
          “name”: “address”,
          “newValue”: {
            "string": "890c3b095fb0da2f610f4a3276db0a34591550a2"
          }
        },
        {
          “name”: “name”,
          “newValue”: {
            “string”: “ROCKY GATEWAY Open Edition by A$AP Rocky”
          }
        }
      ]
    }
  ]
}

```

If it does,

🎊 congratulations you have built your first Substreams! 🎊

# Checkpoint 4: 🤖 Deploying the Subgraph

1. Run `make pack` to make your substreams package (.spkg)

2. Go to [subgraph studio](https://thegraph.com/studio/)

3. Connect your wallet

4. Click "Create a Subgraph" on the right and give it a name

5. On the right hand side under the "AUTH & DEPLOY", copy the command under "authenticate in CLI". Run this command in your terminal.

6. Then copy and run the command under "deploy subgraph" and follow the instructions in the terminal

7. Once that's done the subgraph should be deployed. If you go back to the subgraph page on the studio, the subgraph should be syncing.

While we let the subgraph sync, we'll get started on the front end.

# Checkpoint 5: Hooking the frontend up to the subgraph

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

6. Wrap the returned HTML in:

```ts
<ApolloProvider client={client}></ApolloProvider>
```

7. Now go to the `Content.tsx` file under `nextjs > components > Content.tsx`

8. Before the `return statement` paste in the following:

```ts
const { loading, error, data } = useQuery();

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;
```

9. The `Table` component accepts a prop of `data`, so pass in the `data` returned from `useQuery()` into the `<Table data={} />`

10. Now let's give you a query to pass into `useQuery()`:

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

Notes for authors:

- make them paste in abi
-
- make a test map module for the store_module
- add a new checkpoint for deploying their subgraph
