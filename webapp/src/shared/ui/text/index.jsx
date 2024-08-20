import './text.scss';

export const Text = ({typeText, sizeText, color = 'none', children, style, className, dangerouslySetInnerHTML}) => {
    return (
        <p className={`${typeText === 'bold' ? 'boldText' : typeText === 'light' ? 'lightText' : 'regularText'}--${sizeText} 
           ${color === 'black' ? 'textBlack' : color === 'dark' ? 'textDark' : color === 'red' ? 'textRed' : color === 'gray' ? 'textGray' : ''} ${className}`}
           style={style} dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        >
            {children}
        </p>
    )
}
