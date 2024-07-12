import grapesjs from 'grapesjs';
import GjsEditor, { Canvas } from '@grapesjs/react';
import TopNav from '../Layout/TopNav';
import Footer from '../Layout/Footer';
import * as gjspresetwebpage from 'grapesjs-preset-webpage';

const sessionStoragePlugin = (editor) => {
  // As sessionStorage is not an asynchronous API,
  // the `async` keyword could be skipped
  editor.Storage.add('session', {
    async load(options = {}) {
      return JSON.parse(sessionStorage.getItem(options.key));
    },

    async store(data, options = {}) {
      sessionStorage.setItem(options.key, JSON.stringify(data));
    }
  });
};

export default function ProfileEditor() {
  const onEditor = (editor) => {
    console.log('Editor loaded', { editor });
  };

  return (
    <>
    <TopNav/>
    <GjsEditor
      grapesjs={grapesjs}
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      onEditor={onEditor}
      options={{
        height: '100vh',
        plugins: [gjspresetwebpage, sessionStoragePlugin],
        storageManager: {
          id: 'gjs-',
          type: 'local',
          autosave: true,
          storeComponents: true,
          storeStyles: true,
          storeHtml: true,
          storeCss: true,
        },
        deviceManager: {
          devices:
          [
            {
              id: 'desktop',
              name: 'Desktop',
              width: '',
            },
            {
              id: 'tablet',
              name: 'Tablet',
              width: '768px',
              widthMedia: '992px',
            },
            {
              id: 'mobilePortrait',
              name: 'Mobile portrait',
              width: '320px',
              widthMedia: '575px',
            },
          ]
        },
        pluginsOpts: {
          'grapesjs-preset-webpage': {
            blocksBasicOpts: {
              blocks: ['column1', 'column2', 'column3', 'column3-7', 'text',     'link', 'image', 'video'],
              flexGrid: 1,
            },
            blocks: ['link-block', 'quote', 'text-basic'],
          },
        }
      }}
    ></GjsEditor>
    <Footer/>
    </>
  );
}