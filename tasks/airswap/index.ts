import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, approveErc20, logGasCost } from '../base'
import axios from 'axios';
import erc20abi from '@/const/erc20.json'
import { randomUUID } from 'node:crypto'
import { task } from '@/utils/utils';

export const run = async (wallet: ethers.Wallet) => {

  await task(async () => {
    const signer = wallet.connect(provider);
    const abi = [
      'function swap(address recipient, uint256 nonce, uint256 expiry, address signerWallet, address signerToken, uint256 signerAmount, address senderToken, uint256 senderAmount, uint8 v, bytes32 r, bytes32 s)'
    ]
    const contract = new ethers.Contract('0x1e92ffc1c39a0a982c462f521a135a0407b21b71', abi, signer);
    const usdc = new ethers.Contract('0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068', erc20abi, signer);
    const usdcAmount = ethers.utils.parseUnits('10', 6);
    const usdcBalance = await usdc.balanceOf(wallet.address);

    if (usdcBalance.lt(usdcAmount)) {
      console.log(`Insufficient USDC balance. Please deposit at least ${usdcAmount.toString()} USDC to ${wallet.address}`)
      return
    }
    await approveErc20(signer, usdc.address, contract.address)

    const uuid = randomUUID();
    const res = await axios.post('https://airswap-linea-http-fd13bb1cf776.herokuapp.com/', { "method": "getSignerSideOrderERC20", "jsonrpc": "2.0", "params": { "chainId": "59140", "swapContract": "0x1E92FFC1c39a0a982c462f521a135a0407b21B71", "senderAmount": ethers.utils.parseUnits('10', 6).toString(), "signerToken": "0x1990bc6dfe2ef605bfc08f5a23564db75642ad73", "senderToken": "0xf56dc6695cf1f5c364edebc7dc7077ac9b586068", "senderWallet": wallet.address }, "id": uuid })
    const { result } = res.data;
    const tx = await contract.swap(
      result.senderWallet,
      result.nonce,
      result.expiry,
      result.signerWallet,
      result.signerToken,
      result.signerAmount,
      result.senderToken,
      result.senderAmount,
      result.v,
      result.r,
      result.s,
      await overrides(wallet.address)
    )
    logGasCost(await tx.wait())
  }, {
    taskName: 'airswap_swap',
    walletAddr: wallet.address,
  })
}

// @todo otc swap
export const otcSwap = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const expiry = (Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7).toString();
  const nonce = Date.now().toString();
  const senderWallet = ethers.constants.AddressZero;
  const signerWallet = wallet.address;
  const signerToken = '0xf56dc6695cf1f5c364edebc7dc7077ac9b586068';
  const senderToken = '0x2C1b868d6596a18e32E61B901E4060C872647b6C';
  const protocolFee = "7";
  const signerAmount = "10000000"
  const senderAmount = "10000000000000";
  const unsignedOrder = {
    expiry,
    nonce,
    protocolFee,
    senderAmount,
    senderToken,
    senderWallet,
    signerAmount,
    signerToken,
    signerWallet
  }
  const EIP712SwapERC20 = {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    OrderERC20: [
      { name: 'nonce', type: 'uint256' },
      { name: 'expiry', type: 'uint256' },
      { name: 'signerWallet', type: 'address' },
      { name: 'signerToken', type: 'address' },
      { name: 'signerAmount', type: 'uint256' },
      { name: 'protocolFee', type: 'uint256' },
      { name: 'senderWallet', type: 'address' },
      { name: 'senderToken', type: 'address' },
      { name: 'senderAmount', type: 'uint256' },
    ],
  }
  const signature = await signer._signTypedData(
    {
      verifyingContract: '0x1e92ffc1c39a0a982c462f521a135a0407b21b71',
      chainId: 59140,
      version: '4',
      name: 'SWAP_ERC20',
    },
    { OrderERC20: EIP712SwapERC20.OrderERC20 },
    unsignedOrder
  );
  const splitSignature = ethers.utils.splitSignature(signature);
  const fullOrder = {
    ...unsignedOrder,
    ...splitSignature,
    chainId: 59140,
    swapContract: '0x1e92ffc1c39a0a982c462f521a135a0407b21b71'
  }
  console.log("🚀 ~ file: index.ts:99 ~ otcSwap ~ signature:", signature)
}