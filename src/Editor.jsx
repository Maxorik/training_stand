import React, { memo, useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Editor = memo(({code, rows}) => {
    const editorHeight = rows ? rows * 25 : 200;

    const [editedCode, setEditedCode] = useState(code);
    const [editMode, setEditMode] = useState(false);
    const [btnText, setBtnText] = useState('edit');

    const [codeConsole, setCodeConsole] = useState(useParseTextToCode(code));

    /** изменить режим редактирование\чтение */
    function onSetEditMode() {
        setEditMode(!editMode);
        const editBtnText = editMode ? 'edit' : 'read';
        setBtnText(editBtnText)
    }

    useEffect(() => {
        setCodeConsole(useParseTextToCode(editedCode));
    }, [editedCode])

    return <>
        <div className='editor-interface'>
            <button className='btn editor-btn' onClick={onSetEditMode}>{ btnText }</button>
        </div>
        <div className='editor-container' style={{height: editorHeight}}>
            <div className='editor-code'>
                { editMode ? <div className='edit-code-area'>
                <textarea
                    value={editedCode}
                    onChange={(e) => setEditedCode(e.target.value)}
                    autoFocus={true}
                />
                </div> : <SyntaxHighlighter language="javascript" style={gruvboxLight} class='read-code-area'>
                    {editedCode}
                </SyntaxHighlighter> }
            </div>
            <div className='results-area'>
                <SyntaxHighlighter language="javascript" style={gruvboxLight} class='read-code-area'>
                    {codeConsole}
                </SyntaxHighlighter>
            </div>
        </div>
    </>
})


/** TODO доработать парсер, чтобы он принимал
 * console.log(`${elem}`)
 * console.log('one', two)
*/
function useParseTextToCode(text) {
    let logMessages = [];
    const regex = /console.log((.*?));/g;
    let match;

    if (typeof text === "string") {
        while ((match = regex.exec(text)) !== null) {
            logMessages.push(match[1].trim())
                // .slice(2, -2));
        }
    }

    console.log(logMessages)

    return logMessages.join('\n');
}