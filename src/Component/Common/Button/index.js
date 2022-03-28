/* eslint-disable */
import './styles.scss'

function Button({ text, className, ...props }) {
    const classData = `btn ${className}`;
    return (
        <div className={'button'} {...props}>
            <div className="container">
                <div className={classData}><a href='https://discord.gg/junglesafari' target='_blank'>{text}</a></div>
            </div>
        </div>
    );
}

export default Button;