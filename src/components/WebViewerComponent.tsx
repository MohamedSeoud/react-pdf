// src/components/WebViewerComponent.tsx
import React, { useEffect } from 'react';
import  WebViewer from '@pdftron/webviewer';

interface WebViewerProps {
    documentUrl: string;
}

const WebViewerComponent: React.FC<WebViewerProps> = ({ documentUrl }) => {
    useEffect(() => {
        WebViewer(
            {
                path: '@pdftron/webviewer-instant/dist',
                initialDoc: documentUrl,

            },
            document.getElementById('viewer') as HTMLElement
        );
    }, [documentUrl]);

    return <div id="viewer" style={{ width: '100%', height: '100vh' }}></div>;
};

export default WebViewerComponent;
