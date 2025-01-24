import React, { memo, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Editor = memo(({code, rows}) => {
    const editorHeight = rows ? rows * 25 : 200;

    const [editedCode, setEditedCode] = useState(code);
    const [editMode, setEditMode] = useState(false);
    const [editText, setEditText] = useState('edit');

    const [codeConsole, setCodeConsole] = useState(code); // TODO

    function onEditHandler() {
        setEditMode(!editMode);
        const editBtnText = editMode ? 'edit' : 'show';
        setEditText(editBtnText)
    }

    return <>
        <div className='editor-interface'>
            <button className='btn editor-btn' onClick={onEditHandler}>{ editText }</button>
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