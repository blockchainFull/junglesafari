/* eslint-disable */
import {useState, useEffect} from 'react';
import Navbar from '../Component/Common/Navbar';
import {connectWallet} from '../util/interact';
import { toast } from 'react-toastify';

function NavbarContainer({onClickConnectWallet, onClickDisconnectWallet, walletAddress}) {
  return (
    <Navbar
      onClickConnectWallet={onClickConnectWallet}
      onClickDisconnectWallet={onClickDisconnectWallet}
      walletAddress={walletAddress}
    />
  )
}

export default NavbarContainer;