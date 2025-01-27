import React, { memo, useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Editor = memo(({code, rows}) => {
    const editorHeight = rows ? rows * 25 : 200;

    const [editedCode, setEditedCode] = useState(code);
    const [editMode, setEditMode] = useState(false);
    const [btnText, setBtnText] = useState('edit');

    const [codeConsole, setCodeConsole] = useState('');

    /** изменить режим редактирование\чтение */
    function onSetEditMode() {
        setEditMode(!editMode);
        const editBtnText = editMode ? 'edit' : 'read';
        setBtnText(editBtnText)
    }

    useEffect(() => {
        runScriptText(editedCode).then(([codeResult, consoleOutput]) => {
            setCodeConsole(consoleOutput.join('\n'));
        });

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

async function runScriptText(code) {
    const consoleOutput = [];
    let codeResult;

    /** Переопределяем console.log */
    const originalConsoleLog = console.log;
    console.log = function(...args) {
        consoleOutput.push(args.join(' '));
        originalConsoleLog.apply(console, args);
    };

    /** Переопределяем setTimeout */
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function(callback, delay, ...args) {
        const wrappedCallback = function() {
            callback.apply(this, args);
        };
        return originalSetTimeout(wrappedCallback, delay);
    }

    try {
        const func = new Function(code);
        codeResult = await func();
    } catch (error) {
        codeResult = error.message;
    } finally {
        // возвращаем базовые функции
        console.log = originalConsoleLog;
        window.setTimeout = originalSetTimeout;
    }

    return [codeResult, consoleOutput];
}