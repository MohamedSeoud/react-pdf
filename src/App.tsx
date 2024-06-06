// src/App.tsx
import React, { useEffect, useRef } from 'react';
import  WebViewer from '@pdftron/webviewer';
import pdf from './assets/pdf/example.pdf'
const App: React.FC = () => {

  const viewerDiv = useRef<HTMLDivElement>(null);


  useEffect(()=>{
    WebViewer({
     path:'lib',
     licenseKey:"",
     initialDoc:pdf,

    }, viewerDiv.current as HTMLDivElement)
    .then(instance=>{
      instance.UI.disableElements(['saveAsButton','downloadButton','toolbarGroup-File-screenshotTool'])
    })

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault(); // Prevent the default context menu from appearing
  };

  window.addEventListener('contextmenu', handleContextMenu); // Add event listener to the window

  return () => {
      window.removeEventListener('contextmenu', handleContextMenu); // Cleanup by removing event listener
  };
  },[])

  useEffect(() => {
    const disableScreenshots = (e: { ctrlKey: any; metaKey: any; shiftKey: any; key: string; code: string; preventDefault: () => void; }) => {
      // Check if the user is trying to take a screenshot (Ctrl + Shift + S or Print Screen key)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'S' || e.key === 's' || e.code === 'KeyP')) {
        e.preventDefault();
        alert('Screenshots are disabled');
      }
    };

    const disableContextMenu = (e: { preventDefault: () => void; }) => {
      // Prevent right-click context menu
      e.preventDefault();
      alert('Context menu is disabled');
    };

    window.addEventListener('keydown', disableScreenshots);
    window.addEventListener('contextmenu', disableContextMenu);

    return () => {
      window.removeEventListener('keydown', disableScreenshots);
      window.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []);

    return (

          <div className=' webviewer view' ref={viewerDiv}>

          </div>

    );
};

export default App;
