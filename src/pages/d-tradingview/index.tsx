import './d-tradingview.scss';

const DTradingView = () => (
    <div className='d-tradingview'>
        <iframe
            className='d-tradingview__iframe'
            src='https://charts.deriv.com/deriv'
            title='D-Tradingview'
            allowFullScreen
        />
    </div>
);

export default DTradingView;