import './styles.scss'
import { footer_left } from '../../../config';
import Button from '../Button';

function Footer() {
    return (
        <div className="footer-container">
            <p className='footer-title'>TODAY</p>
            <p className='footer-desc'>Today, we want you to join us Jungle Safari <br></br>Get ready to rock the stage.</p>
            <div className='footer-links'>
                <div className='footer-links-left'>
                    {
                        footer_left.map((item, key) =>
                          <a href={item.link} target='_blank'>
                            <img src={item.img} key={key} alt='footer'/>
                          </a>
                        )
                    }
                </div>
                <div className='footer-links-right'>
                    <Button text='JOIN THE DISCORD COMMUNITY'>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Footer;