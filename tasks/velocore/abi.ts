export const swapAbi = [{
  stateMutability: "nonpayable",
  inputs: [{
    name: "implementation",
    type: "address",
    internalType: "contract IFacet"
  }],
  outputs: [],
  type: "function",
  name: "admin_addFacet"
}, {
  name: "admin_setAuthorizer",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
  inputs: [{
    internalType: "contract IAuthorizer",
    type: "address",
    name: "auth_"
  }]
}, {
  stateMutability: "nonpayable",
  inputs: [{
    name: "implementation",
    type: "address",
    internalType: "address"
  }, {
    type: "bytes4[]",
    name: "sigs",
    internalType: "bytes4[]"
  }],
  outputs: [],
  name: "admin_setFunctions",
  type: "function"
}, {
  inputs: [{
    type: "address",
    name: "gauge",
    internalType: "contract IGauge"
  }, {
    internalType: "contract IBribe",
    name: "bribe",
    type: "address"
  }],
  stateMutability: "nonpayable",
  type: "function",
  outputs: [],
  name: "attachBribe"
}, {
  outputs: [{
    name: "",
    type: "bytes32",
    internalType: "Token"
  }],
  type: "function",
  name: "ballotToken",
  stateMutability: "nonpayable",
  inputs: []
}, {
  type: "function",
  outputs: [{
    name: "",
    internalType: "Token",
    type: "bytes32"
  }],
  inputs: [],
  stateMutability: "nonpayable",
  name: "emissionToken"
}, {
  type: "function",
  outputs: [],
  inputs: [{
    type: "bytes32[]",
    internalType: "Token[]",
    name: "tokenRef"
  }, {
    name: "deposit",
    type: "int128[]",
    internalType: "int128[]"
  }, {
    components: [{
      type: "bytes32",
      internalType: "bytes32",
      name: "poolId"
    }, {
      name: "tokenInformations",
      type: "bytes32[]",
      internalType: "bytes32[]"
    }, {
      type: "bytes",
      name: "data",
      internalType: "bytes"
    }],
    name: "ops",
    type: "tuple[]",
    internalType: "struct VelocoreOperation[]"
  }],
  name: "execute",
  stateMutability: "payable"
}, {
  name: "inspect",
  type: "function",
  outputs: [],
  stateMutability: "nonpayable",
  inputs: [{
    type: "address",
    internalType: "address",
    name: "lens"
  }, {
    type: "bytes",
    internalType: "bytes",
    name: "data"
  }]
}, {
  name: "notifyInitialSupply",
  outputs: [],
  inputs: [{
    internalType: "Token",
    type: "bytes32",
    name: ""
  }, {
    internalType: "uint128",
    type: "uint128",
    name: ""
  }, {
    internalType: "uint128",
    type: "uint128",
    name: ""
  }],
  type: "function",
  stateMutability: "nonpayable"
}, {
  name: "query",
  stateMutability: "nonpayable",
  inputs: [{
    name: "user",
    internalType: "address",
    type: "address"
  }, {
    internalType: "Token[]",
    name: "tokenRef",
    type: "bytes32[]"
  }, {
    type: "int128[]",
    name: "deposit",
    internalType: "int128[]"
  }, {
    type: "tuple[]",
    internalType: "struct VelocoreOperation[]",
    name: "ops",
    components: [{
      name: "poolId",
      internalType: "bytes32",
      type: "bytes32"
    }, {
      name: "tokenInformations",
      internalType: "bytes32[]",
      type: "bytes32[]"
    }, {
      name: "data",
      internalType: "bytes",
      type: "bytes"
    }]
  }],
  type: "function",
  outputs: [{
    internalType: "int128[]",
    type: "int128[]",
    name: ""
  }]
}]