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
    //const [endpoint, setEndpoint] = React.useState(APIConstants.BASE_URL + props.config.source.sourceURL);
    let { name, config } = state;
    const [selectedArray, setSelected] = React.useState(utils.parseJSON(localStorage.getItem(name + storeKeys.FILTER_CACHE_PREFIX)));

    //Call API and set the source data for the filters
    filterData = usefetchFilterData(APIConstants.BASE_URL + config.source.sourceURL).filterData;

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
        return prevArray ? prevArray.reduce((array, item) => prevArray.some(pItem => pItem.code === item.code) && !currentArray.some(cItem => cItem.code === item.code) ? [...array, item] : array, []) : []
    }

    const deleteObjectsInCurrentArray = (currentArray, cachedArray) => {
        return cachedArray ? cachedArray.reduce((array, item) => !currentArray.some(cItem => cItem.code === item.code) ? [...array, item] : array, []) : []
    }

    const getSingleSelectCacheArray = (cachedValue, selectedValue, prevSelectedValue) => {
        if (cachedValue) {
            if (selectedValue !== prevSelectedValue) {
                if (cachedValue.length < config.cacheUpto) {
                    if (!isObjectFound(cachedValue, selectedValue))
                        cachedValue.push(selectedValue);
                } else {
                    cachedValue.splice(0, 1);
                    if (!isObjectFound(cachedValue, selectedValue))
                        cachedValue.push(selectedValue);
                }
            }
        } else
            cachedValue = [selectedValue];
            return cachedValue;
    }

    //Cache recent seletctions. Number of selections will come from config
    const updateRecentCacheValues = (value) => {
        let cachedValue = utils.parseJSON(localStorage.getItem(name + storeKeys.FILTER_PREV_CACHE_PREFIX))
        if (value) {
            if (config.valueType === 'string') {
                cachedValue = getSingleSelectCacheArray(cachedValue, value, selectedArray);
            } else if (config.valueType === 'object') {
                cachedValue = getSingleSelectCacheArray(cachedValue, value ? value.value : {}, selectedArray ? selectedArray.value : {});
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

    const clearFilter = (emptyValue) => {
        setSelected(emptyValue);
        setDisplayName(name);
        localStorage.removeItem(name + storeKeys.FILTER_CACHE_PREFIX);
    }
    const setCache = (value) => {
        updateRecentCacheValues(value);
        setSelected(value);
        localStorage.setItem(name + storeKeys.FILTER_CACHE_PREFIX, JSON.stringify(value));
    }

    const setValue = value => {
        setCache(value);
        if (config.multiselect) {
            if (value.length > 1) {
                setDisplayName('Multiple');
            } else if (value.length) {
                setDisplayName(value[0][config.searchBy]);
            } else {
                clearFilter([]);
            }
        } else {
            if (config.valueType === 'string') {
                value ? setDisplayName(value) : clearFilter('');
            } else if (config.valueType === 'object') {
                value ? setDisplayName(value[config.searchBy]) : clearFilter({})
            }
        }
        setShowSelect(false);
    }

    const clearValue = () => {
        setSelected(config.multiselect ? [] : '');
        setDisplayName(name);
    }

    const renderFilter = () => {
            if(config.source.prePopulate && config.multiselect && config.multiselect.taggedView)
                return (<TaggedFilter 
                    config={config} 
                    title={name} 
                    filterData={filterData} 
                    selectedArray={selectedArray} 
                    onClear={clearValue} 
                    onApply={setValue} />);
            else if (config.source.prePopulate && !config.multiselect)
                return <AutoCompleteFilter 
                    config={config} 
                    title={name} 
                    filterData={filterData} 
                    selecteValue={selectedArray} 
                    onClear={clearValue} 
                    onApply={setValue} />;
            else 
                return <AutoSuggestFilter 
                    config={config} 
                    title={name} 
                    filterData={filterData} 
                    selecteValue={selectedArray} 
                    onClear={clearValue} 
                    onApply={setValue} />;
    }

    const openFilterOptions = (e) => {
        setShowSelect(!showSelect);
    }

    const renderFilterOptions = () => {
        if (showSelect) {
            if (!config.source.autocomplete && filterData) {
                return <ul class="filter-dropdown__menu dropdown-menu">
                    {filterData.map((option, index) => (
                        <li className={classes.listItem} key={index} onClick={()=> setValue(option)}><span>{option[config.searchBy]}</span></li>
                    ))}
                </ul>
            } else
                return <ul className="filter-dropdown__menu">
                    <li>{renderFilter()}</li>
                </ul>
        } else {
            return null;
        }
        
    }

    const filter = (
        <div className="filter-dropdown dropdown" ref={filterRef}>
            <Button onClick={openFilterOptions} color="inherit" className="dropdown-toggle" data-toggle="dropdown">{displayName}
                <span className="filter-caret"></span></Button>
            {renderFilterOptions()}

        </div>);
    return filter;
}
export default CustomFilter;
