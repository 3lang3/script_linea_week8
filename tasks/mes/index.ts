import { ethers } from 'ethers';
import { lineaProvider as provider, overrides } from '../base'
import { task } from '@/utils/utils';
import websocket from 'websocket';

const domain = {
  "name": "MES",
  "version": "1.0",
  "chainId": "59140"
}

const withdrawTypes = {
  "WithdrawRequest": [
    {
      "name": "route",
      "type": "string"
    },
    {
      "name": "userAddress",
      "type": "address"
    },
    {
      "name": "symbol",
      "type": "string"
    },
    {
      "name": "destinationChainId",
      "type": "string"
    },
    {
      "name": "withdrawAmount",
      "type": "string"
    }
  ]
}

const depositTypes = {
  "DepositRequest": [
    {
      "name": "userAddress",
      "type": "address"
    },
    {
      "name": "symbol",
      "type": "string"
    },
    {
      "name": "originatingChainId",
      "type": "string"
    },
    {
      "name": "depositAmount",
      "type": "string"
    }
  ]
}

const genWss = async (type: string, message: string) => {
  await new Promise((resolve, reject) => {
    const ws = new websocket.client()

    ws.connect('wss://backend.mesprotocol.com/socket.io/?EIO=4&transport=websocket', 'echo-protocol');

    ws.on('connect', connection => {
      // connection.on('message', function (message) {
      //   if (message.type === 'utf8') {
      //     if (type === 'deposit' && message.utf8Data.includes('depositMined')) {
      //       connection.close();
      //       resolve(true);
      //     }
      //   }
      // });

      if (connection.connected) {
        connection.send('40');
        connection.send(message);
        setTimeout(() => resolve(true))
      }
    })
  })
}

export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const ca = '0x8f3Ddd0FBf3e78CA1D6cd17379eD88E261249B52'
  let abi = [
    'function deposit(address, uint256) payable',
    'function withdraw(address, uint256)',
  ];
  const contract = new ethers.Contract(ca, abi, signer);

  await task(async () => {
    let amount = '0.01';
    const amountParsed = ethers.utils.parseEther(amount);
    const tx = await contract.deposit(
      ethers.constants.AddressZero,
      amountParsed,
      {
        ...await overrides(wallet.address),
        value: amountParsed
      }
    )
    await tx.wait();
    const values = {
      "userAddress": wallet.address,
      "symbol": "ETH",
      "originatingChainId": "59140",
      "depositAmount": amount,
    }
    const signature = await wallet._signTypedData(domain, depositTypes, values);
    const sendMessage = `42${JSON.stringify(["message", `{\"op\":\"createDepositRequest\",\"args\":[{\"userAddress\":\"${wallet.address}\",\"symbol\":\"ETH\",\"originatingChainId\":\"59140\",\"depositAmount\":\"${amount}\",\"transactionHash\":\"\",\"signature\":\"${signature}\"}]}`])}`
    await genWss('deposit', sendMessage);
  }, {
    taskName: 'mes_deposit',
    walletAddr: wallet.address,
  })

  // 提现需要上面deposit到账后才能成功，deposit到账需要很长时间
  // https://testnet.mesprotocol.com/transfers
  await task(async () => {
    const amount = '0.001';
    const amountParsed = ethers.utils.parseEther(amount);
    const tx = await contract.withdraw(
      ethers.constants.AddressZero,
      amountParsed,
      {
        ...await overrides(wallet.address),
      }
    )
    await tx.wait();
    const values = { "route": "Single", "userAddress": wallet.address, "symbol": "ETH", "destinationChainId": "59140", "withdrawAmount": amount }
    const signature = await wallet._signTypedData(domain, withdrawTypes, values);
    const sendMessage = `42${JSON.stringify(["message",
      {
        "op": "createSingleWithdrawRequest",
        "args": [
          {
            "userAddress": wallet.address,
            "symbol": "ETH",
            "destinationChainId": "59140",
            "withdrawAmount": amount,
            "signature": signature
          }
        ]
      }])}`
    await genWss('withdraw', sendMessage);
  }, {
    taskName: 'mes_withdraw',
    walletAddr: wallet.address,
    force: true
  })
}

