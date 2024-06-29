# Substreams Challenge

📚 This challenge is meant for developers with a basic understanding Rust 🦀 and Web3.

Do you want to use substreams but don't know Rust? You only need a subset of Rust!

- [The Book](https://doc.rust-lang.org/book/index.html)
  Just read and understand chapters 1-9, maybe 10, plus chapters 13 and 18.
- [Rustlings](https://rustlings.cool/) is great to apply what you've learned!

🌊 Substreams are a powerful way to process blockchain data efficiently, allowing developers
to stream, transform, and analyze large volumes of on-chain data in real-time.

For a basic introduction to Substreams, watch this [video](https://www.youtube.com/watch?v=fogh2D-vpzg&t=2122s)

For a quicker, more applicable overview watch [this](https://www.youtube.com/watch?v=vWYuOczDiAA&t=27s)

---

Create a simple Substreams powered Subgraph:

You'll be using a template Substreams to filter through blockchain data and indexing the transfer volume of NFT collections.

Then you'll be outputting the target data into a subgraph.

Finally you'll query the subgraph in a template frontend to display the data with swag. 😎

## Checkpoint 0: 📦 Environment 📚

Before you begin, you need to install the following tools:

(for Scaffold-ETH)

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

(for Substreams)

- [Rust, Buf, and Substreams CLI](https://substreams.streamingfast.io/documentation/consume/installing-the-cli#dependency-installation)
- [Authentication and API key](https://substreams.streamingfast.io/documentation/consume/installing-the-cli#dependency-installation)
  We recommend using the "All-in-one bash function" to make life easier 🤙

  > You'll need to install Scaffold-ETH with

  ```sh
  yarn install
  ```

Complete the challenge however you want, as long
as you populate the pb with the required data.
Just follow our steps if you want a more guided experience.

# Checkpoint 1: map_events

Your first module will be a map_module.
[map_modules](https://substreams.streamingfast.io/documentation/develop/manifest-modules#map-modules) are how you will retrieve and filter your data.

## 1.1 Making a Protobuf

- Protobufs are a language-agnostic way to serialize structured data.
- Substreams use protobufs to carry data through their modules, so we need to define our protobufs in accordance to the data we want.
- [Protobufs](https://substreams.streamingfast.io/documentation/develop/creating-protobuf-schemas#protobuf-definition-for-substreams) from the Streamingfast docs.
- In substreams > proto > contract.proto, make sure your file looks like this:

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

In this challenge your first map_module will return a protobuf called `Transfers`.

Your `Transfers` protobuf is a vector of `Transfer` protobufs.

When returning a protobuf, you always need to return a `Protobuf` that contains a vector of `Protobufs`.

Because substreams index entire blocks at a time before moving to the next block, you need to be able to return multiple protobufs.

## 1.2 Updating the Yaml

In substreams_challenge > substreams.yaml, you'll find the outline of the project structure.
When adding new modules, you'll need to specify its structure in the `substream.yaml`.

The map_module has mostly been filled out.

- [ ] For the name field put `map_events`
- [ ] For the kind field put `map`.

- Your first module will take in `block`s, so the `inputs` field needs `- source: sf.ethereum.type.v2.Block`.
  > Your first module can additionally take in `params` or `clock`, but it will always take in `block`.

Downstream, your map_module's `input` field can take in any of the following [inputs](https://substreams.streamingfast.io/documentation/develop/manifest-modules/inputs#inputs-overview).

It is best practice to only take in `sf.ethereum.type.v2.Block` in your first module so you're only iterating over the block in one module.

- The `output:` is `type: proto:contract.v1.Transfers` which is the `Transfers` protobuf.

## 1.3 Building the map_module 🏗️

- [ ] Go to `substreams_challenge > src > lib.rs`.

> Every module needs a handler above it: `#[substreams::handlers::(map or store)]` so that your yaml finds the module.

#### What is filled out:

- Your `map_events` module takes in `blk: eth::Block` (blocks).
- The module returns : `Result<Transfers, substreams::errors::Error>`.
  > map_modules always return [Result Types](https://doc.rust-lang.org/rust-by-example/error/result.html).
- `token_meta` is a helper that makes RPC calls to fetch token `name` and `symbol`.
  > Take a look at rpc.rs if you're curious about how RPC calls work.
- The `Transfer` protobuf is instantiated for you with `name` and `symbol` populated from `token_meta`. In the `address` field `Hex::Encode()` is provided to conveinently convert the address (most likely a `Vec<u8>`) to a hexadecimal string.
- The `Transfers` protobuf (what the module returns) has also been instantiated.
- At the top of file we have imported the `TransferEvent` type for you to use.

#### Goal of the module

The module should search the block for all ERC721 transfer events, populate the `Transfer` protobuf with the event address, and populate the `Transfers` protobuf with a vector of `Transfer` protobufs.

---

### Your Goals

- [ ] Look at the [available methods](https://docs.rs/substreams-ethereum/latest/substreams_ethereum/pb/eth/v2/struct.Block.html#implementations) on the Block Struct

  > `transactions()`, `reciepts()`, `logs()`, `calls()`, and `events()`, these will allow you to iterate over the block's data.

- [ ] Look at the [Event Trait](https://docs.rs/substreams-ethereum/latest/substreams_ethereum/trait.Event.html) for helpful methods to deal with events.

- [ ] TODO 1: Search the block to find all events that match the `TransferEvent`.

- [ ] TODO 2: Pass the address that emmitted the event into `token_meta` so it can make the calls to the correct address.

- [ ] TODO 3: Assign the `address` field on the protobuf the event address.

- [ ] TODO 4: Assign the `transfers` field on the `Transfers` protobuf the vector of `transfer` protobufs.

---

# Checkpoint 2: store_transfer_volume

The next module you'll be builidng is a store_module.
[store_modules](https://substreams.streamingfast.io/documentation/develop/manifest-modules#store-modules) are used to aggregate and store values through the use of key value pairs.

## 2.1 Updating the yaml (again)

- [ ] Go back to the substreams.yaml

This time we only filled out the `initialBlock`.

- [ ] Fill out the `name` with `store_transfer_volume`

- [ ] Fill out the `kind` with `store`

- [ ] Look at the [updatePolicy](https://substreams.streamingfast.io/documentation/develop/manifest-modules/types#updatepolicy-property) property

  > These are the available options for `updatePolicy`

- [ ] Look at the [valueType](https://substreams.streamingfast.io/documentation/develop/manifest-modules/types#valuetype-property) property

  > These are the available options for `valueType`

- [ ] Look at the [stores](https://docs.rs/substreams/latest/substreams/store/index.html#structs) in the substreams docs.

  Notice: Most of the stores are a combination of an `updatePolicy` and a `valueType`.

  You will be using `StoreAddInt64`.

> NOTE: the [substreams](https://docs.rs/substreams/latest/substreams/index.html).rs library is a different library than the [substreams-ethereum](https://docs.rs/substreams-ethereum/latest/substreams_ethereum/index.html).rs library that you used for the map_modules.

- [ ] Now fill out `updatePolicy` and `valueType` appropriately

> store_modules take in the same inputs as map_modules.
> Unlike map_modules, store_modules do not have outputs.

- [ ] Under `inputs` fill in the `-map` field with the name of our map_module

## 2.2 Building the store_module

- [ ] Go to `substreams_challenge > src > lib.rs`.

#### What is filled out:

- Your `store_transfer_volume` module takes in the `transfers: Transfers` protobuf outputted by `map_events`, as the first argument.
- At the top of file we have imported the `StoreAddInt64` type, along with `StoreAdd` and `StoreNew` traits.
  > You need to import the corresponding traits (such as `StoreAdd` and `StoreNew` for `StoreAddInt64`) to use the store types.

#### The Goal of the module

The module iterate over the `Transfers` and for each unique address increment the store value by 1.

### Your Goals

- [ ] Pass in the appropiate store type as the second argument
- [ ] iterate over transfers
- [ ] Use the appropriate method on the store type you passed in
