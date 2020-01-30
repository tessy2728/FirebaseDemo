import React from 'react';
const usefetchFilterData = (endpoint) => {
    const [filterData, setFilterData] = React.useState(null);
    const [error, setError] = React.useState(null);
  
    const fetchData = async () => {
      const abortController = new AbortController();
      try {
        const response = await fetch(endpoint, {
          signal: abortController.signal
        });
        if (response.status >= 300)
          throw new Error(response.statusText);
        const filterData = await response.json();
        return filterData;
      } catch (e) {
        if (e.name != "AbortError") setError(e.message);
      }
      return () => abortController.abort();
    }
      React.useEffect(() => {
        fetchData().then(list => {
          setFilterData(list)
        })
        .catch(error => {
            console.warn(JSON.stringify(error, null, 2));
        });      
      }, []);
      return { filterData, error };
  }

  export default usefetchFilterData;