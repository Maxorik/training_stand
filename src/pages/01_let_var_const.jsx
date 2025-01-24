import React, { useState } from 'react';
import { Editor } from '../Editor'

const Content_01 = () => {
    const [code, setCode] = useState(`console.log(12); const a = 90;`)

    return <Editor code={code} rows={2}/>

}

export default Content_01;