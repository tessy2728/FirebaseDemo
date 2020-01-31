import React from 'react';
import usefetchFilterData from './HOCFilterData'
import Button from '@material-ui/core/Button';
import useStyles from './CustomFilterStyles';
import TaggedFilter from './tagged-filter/TaggedFilter';
import AutoSuggestFilter from './auto-suggest-filter/AutoSuggestFilter';
import AutoCompleteFilter from './auto-complete-filter/AutoCompleteFilter';
import './CustomFilter.css';
import * as APIConstants from '../../../constants/apiConstants';
import * as storeKeys from '../../../constants/storeKeys';
import * as utils from '../../shared/utils';

const CustomFilter = (props) => {
    const classes = useStyles();
    let [filterData] = React.useState(null);
    const [showSelect, setShowSelect] = React.useState(false);
    const filterRef = React.useRef(null);
    const [displayName, setDisplayName] = React.useState(props.name);
    const state = {
        name: props.name,
        config: props.config
    }
    //const [endpoint, setEndpoint] = React.useState(APIConstants.BASE_URL + props.config.source.autocomplete.sourceURL);
    let { name, config } = state;
    const [selectedArray, setSelectedArray] = React.useState(utils.parseJSON(localStorage.getItem(name + storeKeys.FILTER_CACHE_PREFIX)));
    
    //Call API and set the source data for the filters
    filterData = usefetchFilterData(APIConstants.BASE_URL + config.source.autocomplete.sourceURL).filterData;

    const handleClick = (e) => {
        if (e.target.id && e.target.id.includes('option')) {
            var div = document.getElementById(e.target.id.substring(0, e.target.id.length - 9));
            if (filterRef.current.contains(div))
                return;
        }

        if (filterRef && filterRef.current.contains(e.target)) {
            return;
        }
        setShowSelect(false);
    }
    React.useEffect(() => {
        if (selectedArray) setValue(selectedArray);
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const isObjectFound = (array, item) => {
        if (config.valueType === 'object')
            return array.find(cacheValue => cacheValue.code === item.code);
        else if (config.valueType === 'string')
            return array.find(cacheValue => cacheValue === item);
    }

    const extractDeletedObjects = (prevArray, currentArray, cachedArray) => {
        return prevArray.reduce((array, item) => prevArray.some(pItem => pItem.code === item.code) && !currentArray.some(cItem => cItem.code === item.code) ? [...array, item] : array,[])
    }

    const deleteObjectsInCurrentArray = (currentArray, cachedArray) => {
        return cachedArray.reduce((array, item) => !currentArray.some(cItem => cItem.code === item.code) ? [...array, item] : array, [])
    }

    //Cache recent seletctions. Number of selections will come from config
    const cacheValues = (value) => {
        let cachedValue = utils.parseJSON(localStorage.getItem(name + storeKeys.FILTER_PREV_CACHE_PREFIX))
        if(value) {
            if (config.valueType === 'string' || config.valueType === 'object') {
                if (cachedValue) {
                    if(value !== selectedArray) {
                        if (cachedValue.length < config.cacheUpto) {
                            if (!isObjectFound(cachedValue, value))
                                cachedValue.push(value);
                        } else {
                            cachedValue.splice(0, 1);
                            if (!isObjectFound(cachedValue, value))
                              cachedValue.push(value);
                        }
                    }
                } else
                    cachedValue = [value];
            } else if (config.valueType === 'array') {
                if (cachedValue) {
                            if (cachedValue.length < config.cacheUpto) {
                                cachedValue = cachedValue.concat(extractDeletedObjects(selectedArray, value, cachedValue))
                            } else {
                                cachedValue.splice(0, 1);
                                cachedValue = cachedValue.concat(extractDeletedObjects(selectedArray, value, cachedValue))
                            }
    
                } else {
                    cachedValue = extractDeletedObjects(selectedArray, value, cachedValue)
                }   
                cachedValue = deleteObjectsInCurrentArray(value, cachedValue); 
            }
        }
        if (cachedValue)
            localStorage.setItem(name + storeKeys.FILTER_PREV_CACHE_PREFIX, JSON.stringify(cachedValue));
    }

    const setValue = value => {
        cacheValues(value);
        setSelectedArray(value);
        localStorage.setItem(name + storeKeys.FILTER_CACHE_PREFIX, JSON.stringify(value))
        if (config.multiselect) {
            if (value.length > 1) {
                setDisplayName('Multiple');
            } else if (value.length) {
                setDisplayName(value[0].name);
            } else {
                setSelectedArray([]);
                setDisplayName(name);
                localStorage.removeItem(name + storeKeys.FILTER_CACHE_PREFIX);
            }
        } else {
            if (config.valueType === 'string') {
                if (value)
                    setDisplayName(value);
                else {
                    setSelectedArray('');
                    setDisplayName(name);
                    localStorage.removeItem(name + storeKeys.FILTER_CACHE_PREFIX);
                }
            } else if (config.valueType === 'object') {
                if (value)
                    setDisplayName(value.name);
                else {
                    setSelectedArray({});
                    setDisplayName(name);
                    localStorage.removeItem(name + storeKeys.FILTER_CACHE_PREFIX);
                }
            }
        }
        setShowSelect(false);
    }

    const clearValue = () => {
        setSelectedArray(config.multiselect ? [] : '');
        setDisplayName(name);
    }

    const renderFilter = () => {
        if (config.source.autocomplete && config.source.prefetch && filterData && config.customFilter) {
            return (<TaggedFilter config={config} title={name} filterData={filterData} selectedArray={selectedArray} onClear={clearValue} onApply={setValue} />);
        }
        if (config.source.autocomplete && config.source.prefetch && filterData)
            return <AutoCompleteFilter config={config} title={name} filterData={filterData} selecteValue={selectedArray} onClear={clearValue} onApply={setValue} />;
        if (config.source.autocomplete && !config.source.prefetch && filterData)
            return <AutoSuggestFilter config={config} title={name} filterData={filterData} selecteValue={selectedArray} onClear={clearValue} onApply={setValue} />;
    }

    const openFilterOptions = (e) => {
        setShowSelect(!showSelect);
    }

    const renderFilterOptions = () => {
        if (showSelect) {
            return <ul className="filter-dropdown__menu">
                <li>{renderFilter()}</li>
            </ul>
        } else {
            return null;
        }
    }

    const filter = (
        <div className="filter-dropdown" ref={filterRef}>
            <Button onClick={openFilterOptions} color="inherit">{displayName}
                <span className="filter-caret"></span></Button>
            {renderFilterOptions()}
        </div>);
    return filter;
}
export default CustomFilter;
