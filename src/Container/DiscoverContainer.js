/* eslint-disable */
import {useState, useEffect} from 'react';
import { ethers, BigNumber } from 'ethers'
import { getContract } from '../util/interact';
import { toast } from 'react-toastify';
import {
  useWalletStore,
} from 'store';
import Discover from 'Component/Common/Discover';
import { 
  testNetOpenSea,
  mainNetOpenSea,
  chainId,
  contractAddress,
} from '../constants/address';

import {
  mainNet
} from '../config';

function DiscoverContainer() {
  const [status, setStatus] = useState('');
  const [mintingStatus, setMintingStatus] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxTokens, setMaxTokens] = useState(0);
  const [maxTokenPurchase, setMaxTokenPurchase] = useState(5);
  const [mintCount, setMintCount] = useState(1);

  const walletAddress = useWalletStore(
    (state) => state.walletAddress
  );

  const updateConnectingStatus = useWalletStore(
    (state) => state.updateConnectingStatus
  );

  const notify = () => toast.info(status, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  useEffect(() => {
    if(status) {
      notify()
      setStatus(null);
    }
  }, [status]);

  useEffect(async () => {
    if(!mintingStatus && walletAddress ) {
      let contract = getContract();
      let _totalSupply = await contract.totalSupply()
      let _maxTokens = await contract.MAX_TOKENS()
      setTotalSupply( parseInt(BigNumber.from(_totalSupply).toString()) )
      setMaxTokens( parseInt(BigNumber.from(_maxTokens).toString()) )
    }
  }, [walletAddress, mintingStatus])

  const updateMintCount = (addAmount) => {
    let mintCountToUpdate = addAmount + mintCount;
    if(mintCountToUpdate > 0 && mintCountToUpdate <= maxTokenPurchase) {
      setMintCount(mintCountToUpdate);
    }
  }

  const onMint = async () => {
    if (!walletAddress) {
        setStatus('Please connect with Metamask')
        return
    }
    if ( mintCount > (maxTokens - totalSupply) ) {
        setStatus(`We are reached already max supply, You can mint less than ${maxTokens - totalSupply}`)
        return 
    }
    setMintingStatus(true)

    const contract = getContract()
    try {
        let presale = await contract.presale();
        let presaleTokenPrice = await contract.presaleTokenPrice();
        let publicTokenPrice = await contract.tokenPrice();
        let tokenPrice = presale ? presaleTokenPrice : publicTokenPrice;
        let tx = await contract.mintToken(mintCount, { value: tokenPrice.mul(mintCount), from: walletAddress })
        let openSeaNetAddress = mainNet === chainId ? mainNetOpenSea : testNetOpenSea;
        let res = await tx.wait()
        let tokenLastMinted = await contract.totalSupply();
        if (res.transactionHash) {
            let nftUrl = openSeaNetAddress + walletAddress;
            let status = <>You minted {mintCount} Pxnda Successfully, 
            You can check by clicking <a href={nftUrl} target='_blank'>Here</a></>
            setStatus(status)  
            setMintingStatus(false)
        }
    } catch (err) {
      console.log(err)
        let status = "Transaction failed because you have insufficient funds or sales not started"
        setStatus(status)
        setMintingStatus(false)
    }
  }

  return (
    <Discover 
      totalSupply = {totalSupply}
      maxTokenPurchase = {maxTokenPurchase}
      maxTokens = {maxTokens}
      mintingStatus = {mintingStatus}
      mintCount = {mintCount}
      setMintCount = {updateMintCount}
      onMint = {onMint}
    />
  )
}

export default DiscoverContainer;