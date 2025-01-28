import React from 'react'
import '../style/template.scss'

export const PageTemplate = function ({ title, keywords, content, anchors }) {
    return(
        <div className='base-container'>
            <h1>{ title }</h1>
            <div className='key-info'>💡 { keywords }</div>
            <div className='content'>{ content.props.children.map((c, idx) => {
                if (typeof c !== 'string') {
                    return <div key={`content-${idx}`}>{c}</div>
                } else {
                    return (
                    c.length > 1 ? <div key={`content-${idx}`}>
                        { c.trim().split('\n').map((pc, idx) =>
                           <span className='content-text' key={`content-str-${idx}`}><HighlightedText text={pc} /><br /></span>
                        )}
                    </div> : <></> )
                }
            })}</div>
            <div className='anchors'>{ anchors.map(a => {
                const parts = a.split(' ');
                return(
                    <div className='anchor-part' key={a}>
                        <span>{parts[0]}  </span>
                        <a href={parts[1]} target='_blank'>{parts[1]}</a>
                        <br />
                    </div>
                )
            }) }
            </div>
        </div>
    )
}

/** Парсим и подсвечиваем текст */
const HighlightedText = ({ text }) => {
    const regex = {
        code: /\*\*\S*?\*\*/g
    }

    const highlightMatches = (str) => {
        const parts = str.split(regex.code);
        const phrases = str.match(regex.code);
        let pCount = -1;

        return parts.map((part, index) => {
            if (index < parts.length - 1) {
                pCount += 1;
                return (
                    <React.Fragment key={index}>
                        {part}
                        <span className="highlight">{phrases[pCount].slice(2, -2)}</span>
                    </React.Fragment>
                );
            }
            return part;
        });
    };

    return <>{highlightMatches(text)}</>;
};
