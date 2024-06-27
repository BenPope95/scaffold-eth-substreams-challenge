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
