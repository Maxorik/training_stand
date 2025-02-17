import React from 'react';
import { PageTemplate } from "../components/PageTemplate";

export const Content_01 = () => {
    return <PageTemplate { ...test_page } />
}

const test_page = {
    content: ( <> {`Hello there`} </>),
    keywords: 'start page',
    title: 'welcome',
    anchors: ['']
}