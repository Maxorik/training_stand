import React, { memo, useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../style/editor.scss'

// TODO memo Работает?
export const Editor = memo(({ code }) => {
    const initialCode = code.trim();
    const [editedCode, setEditedCode] = useState(code.trim());
    const [editMode, setEditMode] = useState(false);
    const [btnText, setBtnText] = useState('edit');
    const [editorHeight, setEditorHeight] = useState(code.match(/[\\n]/g).length * 25); // TODO динамическое растягивание textarea

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

    return <div className='editor-area'>
        <div className='editor-interface'>
            <button className='btn editor-btn' onClick={onSetEditMode}>{ btnText }</button>
            <button className='btn editor-btn' onClick={ () => setEditedCode(initialCode) }>reset</button>
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
    </div>
})

async function runScriptText(code) {
    const consoleOutput = [];
    let codeResult;

    /** Переопределяем console.log */
    const originalConsoleLog = console.log;
    console.log = function(...args) {
        consoleOutput.push(args.join(' '));
    };

    /** Переопределяем setTimeout */
    const timeouts = [];
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function(callback, delay, ...args) {
        timeouts.push({callback, delay, ...args});
    }

    try {
        const func = new Function(code);
        codeResult = await func();
    } catch (error) {
        codeResult = error.message;
    } finally {
        /** TODO выполняем макротаски (без учета вложенных в них макротасок...) - добавить рекурсию, пока timeouts.length */
        timeouts.sort((a, b) => a.delay - b.delay);
        timeouts.forEach(f => {
            f.callback();
        })

        window.setTimeout = originalSetTimeout;
        console.log = originalConsoleLog;
    }

    return [codeResult, consoleOutput];
}