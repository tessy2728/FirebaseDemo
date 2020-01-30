import React from 'react';
const useClickOutside = (filterRef) => {
    const handleClick = (e) => {
    if(e.target.id && e.target.id.includes('option')) {
        var div  = document.getElementById(e.target.id.substring(0, e.target.id.length - 9));
        if(filterRef.current.contains(div))
            return true;
    }

    if(filterRef && filterRef.current.contains(e.target)) {
        return true;
    }
    return false;
    // setShowSelect(false);
}
React.useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
}

export default useClickOutside;