import React, { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './userContext.jsx'
import { ArticleProvider } from './components/article/articleContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ArticleProvider>
    <UserProvider>
        <App />
   
    </UserProvider>
    </ArticleProvider>
  
  </StrictMode>,
)
