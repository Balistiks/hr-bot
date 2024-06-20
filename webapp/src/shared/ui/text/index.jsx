import './text.scss';

export const Text = ({typeText, sizeText, color = 'none', children, style}) => {
    return (
        <p className={`${typeText === 'bold' ? 'boldText' : 'regularText'}--${sizeText} 
           ${color === 'black' ? 'textBlack' : color === 'none' ? '' : 'textGray'}`}
           style={style}
        >
            {children}
        </p>
    )
}