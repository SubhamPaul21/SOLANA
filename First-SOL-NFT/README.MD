# Solana-NFT-Anchor

This project shows how to mint your first NFT on the Solana blockchain using [Anchor](https://www.anchor-lang.com/) and [Metaplex](https://www.anchor-lang.com/).

## Table of Contents
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)

## Getting Started

To use this fork, you need to have [yarn](https://yarnpkg.com/getting-started/install), [Anchor](https://www.anchor-lang.com/docs/installation) and the [Solana cli suite](https://solana.com/developers/guides/getstarted/setup-local-development) installed on your machine. 


1. Install missing node packages

```bash
yarn install
```

**NOTE:** You must use yarn to install the dependencies. If you use a different package manager, you will run into issues minting the NFT.

2. Build your anchor project.

```bash
anchor build
```

3. List the project deployment keys and copy the address to a clipboard

```bash
anchor keys list
```

4. Update your [`Anchor.toml`](Anchor.toml) file, by uncommenting the line blow and adding the address generated in the previous step. 

```toml
[programs.devnet]
solana_nft_anchor = "<CHANGE WITH YOUR ADDRESS>"
```

5. Update your [`lib.rs`](programs/solana-nft-anchor/src//lib.rs) file by adding the the address generated in step 4 to the `declare_id!()` macro

```rust
    // snip
use mpl_token_metadata::{
    pda::{find_master_edition_account, find_metadata_account},
    state::DataV2,
};

declare_id!("<CHANGE WITH YOUR ADDRESS>");
#[program]
pub mod solana_nft_anchor {
    // snip
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

All files within this repository are licensed under the MIT License unless explicitly stated otherwise.

100% Open Source software.
