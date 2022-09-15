// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error NeedMoreETHSent();
error Nft__TransferFailed();

contract Nft is ERC721URIStorage, Ownable {

    string public constant TOKEN_URI =
        "ipfs://QmYQC5aGZu2PTH8XzbJrbDnvhj3gVs7ya33H9mqUNvST3d";

    // NFT Variables
    uint256 private immutable i_mintFee;
    uint256 private s_tokenCounter;
    bool private s_initialized;


    // Events
    event NftMinted(address minter);

    constructor(uint256 mintFee)ERC721("Adorable Pug NFT", "PUG") {
        i_mintFee = mintFee;
        s_tokenCounter = 1;
    }

    function mintNft() public payable {
        if (msg.value < i_mintFee) {
            revert NeedMoreETHSent();
        }
        address dogOwner = msg.sender;
        uint256 newTokenId = s_tokenCounter;
        s_tokenCounter = s_tokenCounter + 1;
        _safeMint(dogOwner, newTokenId);
        _setTokenURI(newTokenId, TOKEN_URI);
        emit NftMinted(dogOwner);
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            revert Nft__TransferFailed();
        }
    }

    function getMintFee() public view returns (uint256) {
        return i_mintFee;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}