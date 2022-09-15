const Moralis = require("moralis-v1/node");

const contractAddress = "0xdd7bbC68D3A7Ff96e9744E2472B7f3F57140AbaB";
const serverUrl = "https://z0iux8ocgiax.usemoralis.com:2053/server";
const appId = "F4d7yaIPJIB6nFnk0VP9cVB1F6b1M85Gafbv4dLy";
const masterKey = "uuc6o0Bzr74AmLW5nY4TS3YJxeRoyXgKb2zIY2IM";
// const contractAddress = process.env.NEXT_PUBLIC_NFT_MARKETPLACE_ADDRESS;
// const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
// const appId = process.env.NEXT_PUBLIC_APP_ID;
// const masterKey = process.env.MASTER_KEY;

async function main() {
    await Moralis.start({ serverUrl, appId, masterKey });
    console.log(`Working with contract address ${contractAddress}`);

    let itemListedOptions = {
        // Moralis understands a local chain is 1337
        chainId: "80001",
        sync_historical: true,
        topic: "ItemListed(address,address,uint256,uint256)",
        address: contractAddress,
        abi: {
            anonymous: false,
            inputs: [{
                    indexed: true,
                    internalType: "address",
                    name: "seller",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "nftAddress",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "tokenId",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "price",
                    type: "uint256",
                },
            ],
            name: "ItemListed",
            type: "event",
        },
        tableName: "ItemListed",
    };

    let itemBoughtOptions = {
        chainId: "80001",
        address: contractAddress,
        sync_historical: true,
        topic: "ItemBought(address,address,uint256,uint256)",
        abi: {
            anonymous: false,
            inputs: [{
                    indexed: true,
                    internalType: "address",
                    name: "buyer",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "nftAddress",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "tokenId",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "price",
                    type: "uint256",
                },
            ],
            name: "ItemBought",
            type: "event",
        },
        tableName: "ItemBought",
    };

    let itemCanceledOptions = {
        chainId: "80001",
        address: contractAddress,
        topic: "ItemCanceled(address,address,uint256)",
        sync_historical: true,
        abi: {
            anonymous: false,
            inputs: [{
                    indexed: true,
                    internalType: "address",
                    name: "seller",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "nftAddress",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "tokenId",
                    type: "uint256",
                },
            ],
            name: "ItemCanceled",
            type: "event",
        },
        tableName: "ItemCanceled",
    };

    const listedResponse = await Moralis.Cloud.run(
        "watchContractEvent",
        itemListedOptions, {
            useMasterKey: true,
        }
    );
    const boughtResponse = await Moralis.Cloud.run(
        "watchContractEvent",
        itemBoughtOptions, {
            useMasterKey: true,
        }
    );
    const canceledResponse = await Moralis.Cloud.run(
        "watchContractEvent",
        itemCanceledOptions, {
            useMasterKey: true,
        }
    );
    if (
        listedResponse.success &&
        canceledResponse.success &&
        boughtResponse.success
    ) {
        console.log("Success! Database Updated with watching events");
    } else {
        console.log("Something went wrong...");
    }
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });