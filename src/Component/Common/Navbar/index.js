/* eslint-disable */
import { Element, scroller, animateScroll as scroll } from 'react-scroll';

import {
    navbars_left,
    navbars_right,
} from '../../../config';
import './styles.scss'


function Navbar({ onClickConnectWallet, onClickDisconnectWallet, walletAddress }) {
    const goScroll = (dest) => {
        scroller.scrollTo(dest, {
            duration: 1000,
            delay: 0,
            smooth: true,
        })
    }
    return (
        <div className="navbar">
            <div className="navbar-group left">
                <a className='reduce'>&#9776;</a>
                <div className="sidenav">
                    {
                        navbars_left.map((navbar, key) =>
                            <a className='links' onClick={() => { goScroll(navbar.link) }} key={key} href='#'>
                                {navbar.title}
                            </a>
                        )
                    }
                </div>
            </div>
            <div className="navbar-group right">
            {
              navbars_right.map((navbar, key) =>
              <a href={navbar.link} target="_blank">
                <img src={navbar.img} key={key} alt='navbar'/>
              </a>
              )
            }
            
            </div>
            <button 
                className='connect'
                role="button"
                onClick = {
                () => {
                    walletAddress ? onClickDisconnectWallet() : onClickConnectWallet(); 
                }
            }><span className="text">{walletAddress ? walletAddress.slice(0,3)+'...'+walletAddress.slice((walletAddress.length - 3), walletAddress.length) : 'Connect'}</span></button>
        </div >
    );
}

export default Navbar;