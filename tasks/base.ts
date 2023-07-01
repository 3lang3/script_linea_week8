import { ethers } from 'ethers';
import erc20abi from '@/const/erc20.json'
import { config } from '@/config';

export const lineaProvider = new ethers.providers.JsonRpcProvider('https://linea-goerli.infura.io/v3/be1401a29cbf405cad0a9192d0e40418')

const GASPRICE_LIMIT = config.MAX_GAS_PRICE || 5000;

export const overrides = async (addr: string, limit = GASPRICE_LIMIT) => {
  const gasPrice = await lineaProvider.getGasPrice();
  const gasGwei = ethers.utils.formatUnits(gasPrice, 'gwei');
  console.log(`⛽️当前气价: ${Math.ceil(+gasGwei)}Gwei`)
  if (+gasGwei > limit) throw Error(`❌气价超过 ${GASPRICE_LIMIT}Gwei 限制!`);
  const modifyGasPrice = gasPrice.add(ethers.utils.parseUnits(`${config.ADD_GAS_PRICE}`, 'gwei'))
  const nonce = await lineaProvider.getTransactionCount(addr);
  return ({
    nonce,
    maxFeePerGas: modifyGasPrice,
    maxPriorityFeePerGas: modifyGasPrice
  })
}

export const approveErc20 = async (signer: ethers.Wallet, token: string, spender: string) => {
  const coin = new ethers.Contract(token, erc20abi, signer);
  const balance = await coin.balanceOf(signer.address);
  const allowance = await coin.allowance(signer.address, spender);
  if (allowance.isZero()) {
    console.log(`⌛️ Token授权\ntoken:${token}\nspender:${spender}`);
    const approveTx = await coin.approve(spender, ethers.constants.MaxUint256, await overrides(signer.address));
    await approveTx.wait();
    console.log(`✅授权成功`)
  }
}

export const logGasCost = async (receipt: ethers.ContractReceipt) => {
  const cost = receipt.gasUsed.mul(receipt.effectiveGasPrice);
  console.log(`💰[花费Gas] ${ethers.utils.formatEther(cost)}Eth`)
}

export const logBalance = async (wallet: ethers.Wallet) => {
  const balance = await wallet.getBalance();
  console.log(`💰[ETH余额] ${ethers.utils.formatEther(balance)}Eth`)
}