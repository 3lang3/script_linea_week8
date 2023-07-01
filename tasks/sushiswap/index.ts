import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, logGasCost, approveErc20 } from '../base'
import { task } from '@/utils/utils';
import { swapAbi } from './abi';

export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const uniMintAddr = '0xb2A334FE6e360DE8F2BDDFc336EdD6C70aF1acD8'
  const uniMintAbi = [
    'function mint(address _to, uint256 _amount) payable',
    'function balanceOf(address) view returns (uint256)',
  ]
  const uni = new ethers.Contract(uniMintAddr, uniMintAbi, signer);

  await task(async () => {
    const tx = await uni.mint(wallet.address, ethers.BigNumber.from('1890000000000000100'), {
      ...await overrides(wallet.address),
      value: ethers.utils.parseEther('0.005')
    })
    logGasCost(await tx.wait());
  }, {
    taskName: 'sushiswap_mint_uni',
    walletAddr: wallet.address,
  })
  const uniTokenAddr = '0x7823E8DCC8bfc23EA3AC899EB86921f90e80F499';
  const ca = '0xd40f1b2dfe81b471c4cab2953e24fda9353b1cac';

 
  const contract = new ethers.Contract(ca, swapAbi, signer);

  const amountIn = ethers.utils.parseEther('0.005')
  const route = `0x03010238aee712b3245f163ccfcde86af26dd40ad8eb000000000000000000000000000000000000000000000000016345785d8a00000a0238aee712b3245f163ccfcde86af26dd40ad8eb7823e8dcc8bfc23ea3ac899eb86921f90e80f49900${wallet.address.toLocaleLowerCase().substring(2)}`;
  await task(async () => {
    await approveErc20(signer, uniTokenAddr, ca);

    const tx = await contract.processRoute(
      uniTokenAddr,
      ethers.BigNumber.from('100000000000000000'),
      "0x1990BC6dfe2ef605Bfc08f5A23564dB75642Ad73",
      356808,
      wallet.address,
      route,
      {
        ...await overrides(wallet.address),
        value: amountIn
      }
    );
    logGasCost(await tx.wait());
  }, {
    taskName: 'sushiswap_swap',
    walletAddr: wallet.address,
  })
}