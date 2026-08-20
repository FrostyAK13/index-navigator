import './analysis-tools-embed.scss';

const AnalysisToolsEmbed = () => (
    <div className='analysis-tools-embed'>
        <iframe
            className='analysis-tools-embed__iframe'
            src='https://indexnavigator.vercel.app'
            title='Analysis-Tools'
            allowFullScreen
        />
    </div>
);

export default AnalysisToolsEmbed;