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
                    <div key={`content-${idx}`}>
                        { c.split('\n').map((pc, idx) =>
                            <span className='content-text' key={`content-str-${idx}`}>{ pc }<br /></span>
                        )}
                    </div> )
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
