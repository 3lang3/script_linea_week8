export const lineasterAbi = [
  {
    inputs: [{
      components: [{
        internalType: "address",
        name: "to",
        type: "address"
      }, {
        internalType: "string",
        name: "handle",
        type: "string"
      }, {
        internalType: "string",
        name: "imageURI",
        type: "string"
      }, {
        internalType: "address",
        name: "followModule",
        type: "address"
      }, {
        internalType: "bytes",
        name: "followModuleInitData",
        type: "bytes"
      }, {
        internalType: "string",
        name: "followNFTURI",
        type: "string"
      }],
      internalType: "struct DataTypes.CreateProfileData",
      name: "vars",
      type: "tuple"
    }],
    name: "proxyCreateProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{
      components: [{
        internalType: "uint256",
        name: "profileId",
        type: "uint256"
      }, {
        internalType: "string",
        name: "contentURI",
        type: "string"
      }, {
        internalType: "address",
        name: "collectModule",
        type: "address"
      }, {
        internalType: "bytes",
        name: "collectModuleInitData",
        type: "bytes"
      }, {
        internalType: "address",
        name: "referenceModule",
        type: "address"
      }, {
        internalType: "bytes",
        name: "referenceModuleInitData",
        type: "bytes"
      }, {
        components: [{
          internalType: "uint8",
          name: "v",
          type: "uint8"
        }, {
          internalType: "bytes32",
          name: "r",
          type: "bytes32"
        }, {
          internalType: "bytes32",
          name: "s",
          type: "bytes32"
        }, {
          internalType: "uint256",
          name: "deadline",
          type: "uint256"
        }],
        internalType: "struct DataTypes.EIP712Signature",
        name: "sig",
        type: "tuple"
      }],
      internalType: "struct DataTypes.PostWithSigData",
      name: "vars",
      type: "tuple"
    }],
    name: "postWithSig",
    outputs: [{
      internalType: "uint256",
      name: "",
      type: "uint256"
    }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{
      components: [{
        internalType: "address",
        name: "follower",
        type: "address"
      }, {
        internalType: "uint256[]",
        name: "profileIds",
        type: "uint256[]"
      }, {
        internalType: "bytes[]",
        name: "datas",
        type: "bytes[]"
      }, {
        components: [{
          internalType: "uint8",
          name: "v",
          type: "uint8"
        }, {
          internalType: "bytes32",
          name: "r",
          type: "bytes32"
        }, {
          internalType: "bytes32",
          name: "s",
          type: "bytes32"
        }, {
          internalType: "uint256",
          name: "deadline",
          type: "uint256"
        }],
        internalType: "struct DataTypes.EIP712Signature",
        name: "sig",
        type: "tuple"
      }],
      internalType: "struct DataTypes.FollowWithSigData",
      name: "vars",
      type: "tuple"
    }],
    name: "followWithSig",
    outputs: [{
      internalType: "uint256[]",
      name: "",
      type: "uint256[]"
    }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{
      components: [{
        internalType: "address",
        name: "collector",
        type: "address"
      }, {
        internalType: "uint256",
        name: "profileId",
        type: "uint256"
      }, {
        internalType: "uint256",
        name: "pubId",
        type: "uint256"
      }, {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }, {
        components: [{
          internalType: "uint8",
          name: "v",
          type: "uint8"
        }, {
          internalType: "bytes32",
          name: "r",
          type: "bytes32"
        }, {
          internalType: "bytes32",
          name: "s",
          type: "bytes32"
        }, {
          internalType: "uint256",
          name: "deadline",
          type: "uint256"
        }],
        internalType: "struct DataTypes.EIP712Signature",
        name: "sig",
        type: "tuple"
      }],
      internalType: "struct DataTypes.CollectWithSigData",
      name: "vars",
      type: "tuple"
    }],
    name: "collectWithSig",
    outputs: [{
      internalType: "uint256",
      name: "",
      type: "uint256"
    }],
    stateMutability: "nonpayable",
    type: "function"
  }
]

export const snapshotXData = (address: string) => {
  return '0xf2a40be400000000000000000000000096706138eef4bd871448cf9b842b01b005822aa1bc7e56f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000180000000000000000000000000a95c5f65e8e81fd4abaf3d2bd058a536a88b20e40000000000000000000000000000000000000000000000000000000000000007000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'.replace('a95c5f65e8e81fd4abaf3d2bd058a536a88b20e4', address.toLocaleLowerCase().substring(2))
}

export const lineal2DomainAbi = [{ "inputs": [{ "internalType": "contract Oracle", "name": "_oracle", "type": "address" }, { "internalType": "contract UsernameNFT", "name": "_usernameNFT", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "FailedWithdrawError", "type": "error" }, { "inputs": [], "name": "InsufficientNativeError", "type": "error" }, { "inputs": [], "name": "NameAlreadyActiveError", "type": "error" }, { "inputs": [], "name": "NotTokenOwnerOrNameTakenError", "type": "error" }, { "inputs": [], "name": "OnlyNFTOwnerError", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "oracle", "outputs": [{ "internalType": "contract Oracle", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint96", "name": "duration", "type": "uint96" }], "name": "register", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint96", "name": "duration", "type": "uint96" }], "name": "renew", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract Oracle", "name": "_oracle", "type": "address" }], "name": "setOracle", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "usernameNFT", "outputs": [{ "internalType": "contract UsernameNFT", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

export const tatarotAbi = [
  {
    "inputs": [
      {
        "components": [
          { "internalType": "address", "name": "to", "type": "address" }, 
          { "internalType": "uint256", "name": "scryId", "type": "uint256" }, 
          { "internalType": "uint128", "name": "validityStartTimestamp", "type": "uint128" }, 
          { "internalType": "uint128", "name": "validityEndTimestamp", "type": "uint128" }
        ],
        "internalType": "struct Tarot.MintRequest",
        "name": "req",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "mintWithSignature",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]

export const meetAbi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "endTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "getRedeemRecord", "outputs": [{ "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "time", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }], "internalType": "struct Stake.Record[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getRedeemRecordAll", "outputs": [{ "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "time", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }], "internalType": "struct Stake.Record[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "getStakeRecord", "outputs": [{ "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "time", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }], "internalType": "struct Stake.Record[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getStakeRecordAll", "outputs": [{ "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "time", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }], "internalType": "struct Stake.Record[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nft", "outputs": [{ "internalType": "contract IERC721", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bytes", "name": "", "type": "bytes" }], "name": "onERC721Received", "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]" }], "name": "redeem", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "redeemAddresses", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "redeemAddressesExists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]" }], "name": "redeemFocus", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "redeemRecords", "outputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "time", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_endTime", "type": "uint256" }], "name": "setEndTime", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC721", "name": "_nft", "type": "address" }], "name": "setNftAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_startTime", "type": "uint256" }], "name": "setStartTime", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "stakeAddresses", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "stakeAddressesExists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]" }], "name": "stakeNFTs", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "stakeRecords", "outputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "time", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "startTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "tokenIdAddressMap", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
export const meetNftAbi = [{"inputs":[{"internalType":"string","name":"baseURI_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_tokenIds","type":"uint256[]"}],"name":"burns","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"mintAsOwner","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"mintAsPublic","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mintBatchAsOwner","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mintBatchAsPublic","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"_amount","type":"uint64"}],"name":"mintPublic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ownerMintIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicActivityTimeEnd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicActivityTimeStart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicMintAmountLimit","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicMintIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicMintOnceLimit","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"publicMintRecord","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"recordExpiredTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"buri_","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_ownerMintIndex","type":"uint256"}],"name":"setOwnerMintIndex","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_publicActivityTimeStart","type":"uint256"},{"internalType":"uint256","name":"_publicActivityTimeEnd","type":"uint256"}],"name":"setPublicActivityTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"_publicMintAmountLimit","type":"uint64"}],"name":"setPublicMintAmountLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_publicMintIndex","type":"uint256"}],"name":"setPublicMintIndex","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"_publicMintOnceLimit","type":"uint64"}],"name":"setPublicMintOnceLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"_recordExpiredTime","type":"uint64"}],"name":"setRecordExpiredTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_balance","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]