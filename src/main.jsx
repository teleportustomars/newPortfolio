import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ParallaxProvider } from 'react-scroll-parallax'


const ParallaxSetter = () => {
  const [scrollEl, setScrollEl] = React.useState(null)
  const ref = React.useRef();
  
  React.useEffect(()=>{
    setScrollEl(ref.current)
  })

  // React.useEffect(() => {
  //   console.log(ref.current);
  // }, [scrollEl])

  return ( 
    <ParallaxProvider scrollEl={scrollEl}>
      <div ref={ref} className="parallaxSetter">
        <App />
      </div>
    </ParallaxProvider>
  )

}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParallaxSetter />
  </React.StrictMode>,
)
