import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { userKeypair } from "./helper";
import { generateSigner, Keypair, KeypairSigner, percentAmount, Umi } from "@metaplex-foundation/umi";
import { createFungible, createV1, mintV1, mplTokenMetadata, TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import { keypairIdentity } from "@metaplex-foundation/umi";

// instantiate a new instance of Umi Client running on the Solana devnet cluster
const umi: Umi = createUmi("https://api.devnet.solana.com");
// Wrap our paper wallet keypair around umi's eddsa interface for usage by keypairIdentity
const keypair: Keypair = umi.eddsa.createKeypairFromSecretKey(userKeypair.secretKey);
// Register this wrapped keypair as the signer for all our transactions and register the mplTokenMetadata which we will be calling to create our token
umi.use(keypairIdentity(keypair)).use(mplTokenMetadata());

/** 
 * The minting process involves three steps:
 * 1. Uploading our asset metadata to an off-chain or centralised storage provider.
 * 2. Creating the on-chain metadata account that will hold our asset data such as the off-chain URI, mint, symbol
 * 3. Finally, we mint our token with the associated accounts.
*/

interface Metadata {
    name: string,
    symbol: string,
    uri: string
}

const metadata: Metadata = {
    name: "Solana Gold",
    symbol: "GOLDSOL",
    uri: "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json",
};

const mint: KeypairSigner = generateSigner(umi);

async function createMetadataDetails() {
    // CreateV1 is a generic method, we are defining the metadata and behaviour of our token
    await createV1(umi, {
        mint,
        authority: umi.identity,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        sellerFeeBasisPoints: percentAmount(0),
        decimals: 9,
        tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi);
}

async function mintToken() {
    await mintV1(umi, {
        mint: mint.publicKey,
        authority: umi.identity,
        amount: 10_000,
        tokenOwner: umi.identity.publicKey,
        tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi);
}

// Instead of the two step process above to create Tokens, UMI provides a single method to create token, using CreateFunglible Method

async function createFungibleToken() {
    const output = await createFungible(umi, {
        mint,
        authority: umi.identity,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        sellerFeeBasisPoints: percentAmount(0),
        decimals: 9,
    }).sendAndConfirm(umi);

    console.log("Signature: ", output.signature);
    console.log("Result: ", output.result.value);
}

createFungibleToken();

