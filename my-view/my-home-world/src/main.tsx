import {Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Loader} from '@react-three/drei'

createRoot(document.getElementById('root')!).render(
  <>
    <Suspense fallback={null}>
      <App/>
    </Suspense>
    <Loader/>
  </>
)
