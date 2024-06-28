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

Create a simple Substreams:

You'll be using a template Substreams to filter through blockchain data and indexing the transaction volume of NFTs.

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

  ***

  > You'll need to install Scaffold-ETH with

  ```sh
  yarn install
  ```

Complete the challenge however you want, as long
as you populate the pb with the required data.
Just follow our steps if you want a more guided experience.

# Checkpoint 1: map_module

### 1.1 Making a Protobuf

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

### 1.2 Updating the Yaml

In substreams_challenge > substreams.yaml, you'll find the outline of the project structure.
When adding new modules, you'll need to specify its structure in the `substream.yaml`.
There are two kinds of modules you can read about [here](https://substreams.streamingfast.io/documentation/develop/manifest-modules#module-kinds)

- The map_module has mostly been filled out, but you'll need to specify its `name` and `kind`.

TASK: For the name field put `map_events` and for kind, put `map`.

- Your first map_module will always take in blocks, so the `inputs` field needs to specify its `source` as `sf.ethereum.type.v2.Block`
- Only use the `source` field if you're take in blocks.
- But map_modules downstream can take in other map_modules or store_modules as inputs directely.

### 1.3 Map module

- Funciton signature, takes block
- on the block struct, look at the available methods under the "implemntations" section

- WE have already imported the type `TransferEvent` which represents the ERC721 TransferEvent

- Your goal is to search the blk for all the events that match the `Transafer EVent`

- The `token_meta` is a struct we made that contrains the fields `name` and `symbol`
- It makes RPC calls to populate these fields, so you need to provide it with the addres of the matched event, so it can make the call to the token contract.

- ***

# Yaml Part 2

# Store module

# Graph Out
