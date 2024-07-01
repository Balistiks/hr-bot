import './text.scss';

export const Text = ({typeText, sizeText, color = 'none', children, style, className}) => {
    return (
        <p className={`${typeText === 'bold' ? 'boldText' : typeText === 'light' ? 'lightText' : 'regularText'}--${sizeText} 
           ${color === 'black' ? 'textBlack' : color === 'dark' ? 'textDark' : color === 'none' ? '' : 'textGray'} ${className}`}
           style={style}
        >
            {children}
        </p>
    )
}