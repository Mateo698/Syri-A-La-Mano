import * as React from 'react';

function useWindowsSize(){
    const [windowSize,setWindowSize] = React.useState({
        width : undefined
    });

    React.useEffect(()=>{
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
              width: window.innerWidth
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    },[])

    return windowSize;
}

