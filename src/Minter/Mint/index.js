import './index.css'
import Button from '../../Component/Common/Button'
import '../../Component/Common/Discover/styles.scss'

export default function Mint() {
  const mintingStatus = false
  const onMint = () => {
    alert('sss')
  }
  return(
    <div style={{flex: 1, display:'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <div>
        <div className='top'>
          <p className='ptop'>Become a Tribe member of Jungle Safari</p>
        </div>
        <div className='bottom'>
          <p className='pbottom'>The journey of the lost tigers is going to be the most craziest journey ever</p>
        </div>
        <div style={{ paddingTop: '20px', textAlign: 'center' }}>
         
            <>
            <h1 className='mint-amount'>Minted {0}/3000</h1>
            <h6 className='mint-price'>Total Price: 0 MATIC</h6>
              <div className='div-counter'>
                <button className='minus'>-</button>
                <h1 className='counter'>{0}</h1>
                <button className='plus'>+</button>
              </div>
            </>
          
          {/* <button className='mint-btn'>Mint</button> */}
          <Button 
            text={mintingStatus ? 'Minting...' : 'Mint'} 
            onClick = {
                () => {
                    !mintingStatus && onMint()
                }
            }
            className = {
                mintingStatus && 'loading'
            }
          />
        </div>
      </div>
    </div>
  )
}