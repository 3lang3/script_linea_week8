export const poolAbi = [
  {
    type: 'constructor',
    stateMutability: 'nonpayable',
    inputs: [{ type: 'address', name: '_WETH', internalType: 'address' }],
  },
  {
    type: 'event',
    name: 'ClientData',
    inputs: [
      {
        type: 'bytes',
        name: 'clientData',
        internalType: 'bytes',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Error',
    inputs: [
      {
        type: 'string',
        name: 'reason',
        internalType: 'string',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Exchange',
    inputs: [
      {
        type: 'address',
        name: 'pair',
        internalType: 'address',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'amountOut',
        internalType: 'uint256',
        indexed: false,
      },
      {
        type: 'address',
        name: 'output',
        internalType: 'address',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Fee',
    inputs: [
      {
        type: 'address',
        name: 'token',
        internalType: 'address',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'totalAmount',
        internalType: 'uint256',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'totalFee',
        internalType: 'uint256',
        indexed: false,
      },
      {
        type: 'address[]',
        name: 'recipients',
        internalType: 'address[]',
        indexed: false,
      },
      {
        type: 'uint256[]',
        name: 'amounts',
        internalType: 'uint256[]',
        indexed: false,
      },
      { type: 'bool', name: 'isBps', internalType: 'bool', indexed: false },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        type: 'address',
        name: 'previousOwner',
        internalType: 'address',
        indexed: true,
      },
      {
        type: 'address',
        name: 'newOwner',
        internalType: 'address',
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Swapped',
    inputs: [
      {
        type: 'address',
        name: 'sender',
        internalType: 'address',
        indexed: false,
      },
      {
        type: 'address',
        name: 'srcToken',
        internalType: 'contract IERC20',
        indexed: false,
      },
      {
        type: 'address',
        name: 'dstToken',
        internalType: 'contract IERC20',
        indexed: false,
      },
      {
        type: 'address',
        name: 'dstReceiver',
        internalType: 'address',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'spentAmount',
        internalType: 'uint256',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'returnAmount',
        internalType: 'uint256',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'WETH',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'isWhitelist',
    inputs: [{ type: 'address', name: '', internalType: 'address' }],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'owner',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'renounceOwnership',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'rescueFunds',
    inputs: [
      { type: 'address', name: 'token', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'payable',
    outputs: [
      { type: 'uint256', name: 'returnAmount', internalType: 'uint256' },
      { type: 'uint256', name: 'gasUsed', internalType: 'uint256' },
    ],
    name: 'swap',
    inputs: [
      {
        type: 'tuple',
        name: 'execution',
        internalType: 'struct MetaAggregationRouterV2.SwapExecutionParams',
        components: [
          { type: 'address', name: 'callTarget', internalType: 'address' },
          { type: 'address', name: 'approveTarget', internalType: 'address' },
          { type: 'bytes', name: 'targetData', internalType: 'bytes' },
          {
            type: 'tuple',
            name: 'desc',
            internalType: 'struct MetaAggregationRouterV2.SwapDescriptionV2',
            components: [
              {
                type: 'address',
                name: 'srcToken',
                internalType: 'contract IERC20',
              },
              {
                type: 'address',
                name: 'dstToken',
                internalType: 'contract IERC20',
              },
              {
                type: 'address[]',
                name: 'srcReceivers',
                internalType: 'address[]',
              },
              {
                type: 'uint256[]',
                name: 'srcAmounts',
                internalType: 'uint256[]',
              },
              {
                type: 'address[]',
                name: 'feeReceivers',
                internalType: 'address[]',
              },
              {
                type: 'uint256[]',
                name: 'feeAmounts',
                internalType: 'uint256[]',
              },
              { type: 'address', name: 'dstReceiver', internalType: 'address' },
              { type: 'uint256', name: 'amount', internalType: 'uint256' },
              {
                type: 'uint256',
                name: 'minReturnAmount',
                internalType: 'uint256',
              },
              { type: 'uint256', name: 'flags', internalType: 'uint256' },
              { type: 'bytes', name: 'permit', internalType: 'bytes' },
            ],
          },
          { type: 'bytes', name: 'clientData', internalType: 'bytes' },
        ],
      },
    ],
  },
  {
    type: 'function',
    stateMutability: 'payable',
    outputs: [
      { type: 'uint256', name: 'returnAmount', internalType: 'uint256' },
      { type: 'uint256', name: 'gasUsed', internalType: 'uint256' },
    ],
    name: 'swapGeneric',
    inputs: [
      {
        type: 'tuple',
        name: 'execution',
        internalType: 'struct MetaAggregationRouterV2.SwapExecutionParams',
        components: [
          { type: 'address', name: 'callTarget', internalType: 'address' },
          { type: 'address', name: 'approveTarget', internalType: 'address' },
          { type: 'bytes', name: 'targetData', internalType: 'bytes' },
          {
            type: 'tuple',
            name: 'desc',
            internalType: 'struct MetaAggregationRouterV2.SwapDescriptionV2',
            components: [
              {
                type: 'address',
                name: 'srcToken',
                internalType: 'contract IERC20',
              },
              {
                type: 'address',
                name: 'dstToken',
                internalType: 'contract IERC20',
              },
              {
                type: 'address[]',
                name: 'srcReceivers',
                internalType: 'address[]',
              },
              {
                type: 'uint256[]',
                name: 'srcAmounts',
                internalType: 'uint256[]',
              },
              {
                type: 'address[]',
                name: 'feeReceivers',
                internalType: 'address[]',
              },
              {
                type: 'uint256[]',
                name: 'feeAmounts',
                internalType: 'uint256[]',
              },
              { type: 'address', name: 'dstReceiver', internalType: 'address' },
              { type: 'uint256', name: 'amount', internalType: 'uint256' },
              {
                type: 'uint256',
                name: 'minReturnAmount',
                internalType: 'uint256',
              },
              { type: 'uint256', name: 'flags', internalType: 'uint256' },
              { type: 'bytes', name: 'permit', internalType: 'bytes' },
            ],
          },
          { type: 'bytes', name: 'clientData', internalType: 'bytes' },
        ],
      },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [
      { type: 'uint256', name: 'returnAmount', internalType: 'uint256' },
      { type: 'uint256', name: 'gasUsed', internalType: 'uint256' },
    ],
    name: 'swapSimpleMode',
    inputs: [
      {
        type: 'address',
        name: 'caller',
        internalType: 'contract IAggregationExecutor',
      },
      {
        type: 'tuple',
        name: 'desc',
        internalType: 'struct MetaAggregationRouterV2.SwapDescriptionV2',
        components: [
          {
            type: 'address',
            name: 'srcToken',
            internalType: 'contract IERC20',
          },
          {
            type: 'address',
            name: 'dstToken',
            internalType: 'contract IERC20',
          },
          {
            type: 'address[]',
            name: 'srcReceivers',
            internalType: 'address[]',
          },
          { type: 'uint256[]', name: 'srcAmounts', internalType: 'uint256[]' },
          {
            type: 'address[]',
            name: 'feeReceivers',
            internalType: 'address[]',
          },
          { type: 'uint256[]', name: 'feeAmounts', internalType: 'uint256[]' },
          { type: 'address', name: 'dstReceiver', internalType: 'address' },
          { type: 'uint256', name: 'amount', internalType: 'uint256' },
          { type: 'uint256', name: 'minReturnAmount', internalType: 'uint256' },
          { type: 'uint256', name: 'flags', internalType: 'uint256' },
          { type: 'bytes', name: 'permit', internalType: 'bytes' },
        ],
      },
      { type: 'bytes', name: 'executorData', internalType: 'bytes' },
      { type: 'bytes', name: 'clientData', internalType: 'bytes' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'transferOwnership',
    inputs: [{ type: 'address', name: 'newOwner', internalType: 'address' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'updateWhitelist',
    inputs: [
      { type: 'address[]', name: 'addr', internalType: 'address[]' },
      { type: 'bool[]', name: 'value', internalType: 'bool[]' },
    ],
  },
  { type: 'receive', stateMutability: 'payable' },
];
