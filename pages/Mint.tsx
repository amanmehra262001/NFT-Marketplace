import type { NextPage } from "next";
import {
  Illustration,
  Button,
  useNotification,
  Card,
  Tooltip,
} from "@web3uikit/core";
import { useWeb3Contract, useMoralis } from "react-moralis";
import nftAbi from "../constants/NftABI.json";
import nftMarketplaceAbi from "../constants/MarketplaceABI.json";
import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import NFTBox from "./components/NFTBox";
import Image from "next/image";

type NetworkConfigItem = {
  NftMarketplace: string[];
};

type NetworkConfigMap = {
  [chainId: string]: NetworkConfigItem;
};

const Mint: NextPage = () => {
  const nftAddress = "0xD997CaCC2f52B2085f5133fD84A16A8e990eFe68";
  const marketplaceAddress = "0xdd7bbC68D3A7Ff96e9744E2472B7f3F57140AbaB";
  const price = BigNumber.from("100000000000000000");
  const tokenName = "Dwarf Sword";
  const tokenDescription = "A dwarf holding sword in pride.";
  const imageURI =
    "https://gateway.pinata.cloud/ipfs/QmXhbthTyqAmMugjfzNjfAyAPiD1h8dp1xy2ESjSCUt53e/Dwarf_1.png";

  const { runContractFunction: mintNft } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: nftAddress,
    functionName: "mintNft",
    msgValue: "100000000000000000",
    params: { amount: 1, _tokenId: 0 },
  });

  const handleCardClick = async () => {
    await mintNft();
  };

  return (
    <div style={{ margin: "30px", width: "20%" }}>
      <h2 className="py-4 px-4 font-bold text-3xl">Mint Your NFT!</h2>
      <Card
        title={tokenName}
        description={tokenDescription}
        onClick={handleCardClick}
      >
        <Tooltip content={""} position="top">
          <div className="p-2">
            {imageURI ? (
              <div className="flex flex-col items-end gap-2">
                <Image
                  loader={() => imageURI}
                  src={imageURI}
                  height="200"
                  width="200"
                />
                {price && (
                  <div className="font-bold">
                    {ethers.utils.formatUnits(price, "ether")} MATIC
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <Illustration height="180px" logo="lazyNft" width="100%" />
                Loading...
              </div>
            )}
          </div>
        </Tooltip>
      </Card>
    </div>
  );
};
export default Mint;

// 0xE599c3DA2bF38f3278838eCce433386c386Bd019 -> NFT 721
// 0xD997CaCC2f52B2085f5133fD84A16A8e990eFe68 -> NFT 1155
// 0xdd7bbC68D3A7Ff96e9744E2472B7f3F57140AbaB -> NFT-MARKETPLACE
