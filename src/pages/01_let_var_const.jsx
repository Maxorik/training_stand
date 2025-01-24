import React, { useState } from 'react';
import { Editor } from '../Editor'

const Content_01 = () => {
    let str = `let a = 5; \nconsole.log(a)`

    return <Editor code={ str } rows={13}/>

}

export default Content_01;