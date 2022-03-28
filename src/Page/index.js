/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect } from 'react';
import VLine from '../Component/Common/VLine'
import HLine from '../Component/Common/HLine'
import Join from '../Component/Common/Join'
import Meta from '../Component/Common/Meta'
import RoadMap from '../Component/Common/RoadMap'
import Mamber from '../Component/Common/Mamber'
import FAQs from '../Component/Common/FAQs'
import Footer from '../Component/Common/Footer'
import Filter from 'Component/Common/Filter'

import {animation_delay} from '../config';
import NavbarContainer from 'Container/NavbarContainer'
import ToastContainer from 'Container/ToastContainer';
import { toast } from 'react-toastify'
import DiscoverContainer from 'Container/DiscoverContainer'

import { connectWallet, getCurrentWalletConnected } from 'util/interact';
import { chainId } from 'constants/address';

function Index() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [status, setStatus] = useState(null);
  const [counter, setCount] = useState(1)

  const onClickConnectWallet = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  }

  const onClickDisconnectWallet = async () => {
    setWalletAddress(null)
    setStatus('😥 Connect your wallet account to the site.')
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log('accountchain')
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus("👆🏽 You can mint new now.");
        } else {
          setWalletAddress(null);
          setStatus("🦊 Connect to Metamask and choose the correct chain using the top right button.");
        }
      });
      window.ethereum.on("chainChanged", (chain) => {
        console.log('chainchange')
        connectWalletPressed()
        console.log(chain)
        if (chain !== chainId) {
          setWalletAddress(null);
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          {/* <a target="_blank" href={`https://metamask.io/download.html`}> */}
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.(https://metamask.io/download.html)
          {/* </a> */}
        </p>
      );
    }
  }

  const notify = () => toast.info(status, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  const decrease = () => {
    if(counter > 1) {
      setCount(counter-1)
    }
  }

  const increase = () => {
    if(counter < 10)
    setCount(counter+1)
  }

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected()
    setWalletAddress(address)
    setStatus(status)
    addWalletListener()
  }, [])

  useEffect(() => {
    if (status) {
      notify()
      setStatus(null)
    }
  }, [status])

  return (
      <div className='minting'>
          <VLine />
          <div className='row'>
              <HLine />
          </div>
          <div className='row'>
              <NavbarContainer 
                onClickConnectWallet={onClickConnectWallet}
                onClickDisconnectWallet={onClickDisconnectWallet}
                walletAddress={walletAddress}
              />
          </div>
          <div className='row discover'>
              <DiscoverContainer />
          </div>
          <div 
              className='row join aos-item' 
              data-aos="flip-left" 
              data-aos-duration={animation_delay}
          >
              <Join />
          </div>
          <div 
              className='row meta aos-item' 
              id='artworks'
          >
              <Meta />
          </div>
          <div className='row roadmap aos-item'>
              <RoadMap />
          </div>
          <div 
              className='row mamber aos-item'  
              id='team'
          >
              <Mamber />
          </div>
          <div className='row faqs'>
              <FAQs />
          </div>
          <div 
              className='row footer aos-item' 
              data-aos="fade-down"
              data-aos-duration={animation_delay}
          >
              {<Filter style={{background: '#6E2B34', left: '-25vw', bottom: 0}}/>}
              <Footer />
          </div>
          <ToastContainer />
      </div>
  )
}

export default Index;