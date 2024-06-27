import './text.scss';

export const Text = ({typeText, sizeText, color = 'none', children, style, className}) => {
    return (
        <p className={`${typeText === 'bold' ? 'boldText' : 'regularText'}--${sizeText} 
           ${color === 'black' ? 'textBlack' : color === 'none' ? '' : 'textGray'} ${className}`}
           style={style}
        >
            {children}
        </p>
    )
}