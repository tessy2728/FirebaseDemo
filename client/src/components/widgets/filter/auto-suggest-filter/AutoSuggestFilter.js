import React from 'react';
import Paper from '@material-ui/core/Paper';
import Autosuggest from 'react-autosuggest';
import useStyles from './AutoSuggestStyles';
import CustomButton from '../../CustomButton';
import * as storeKeys from '../../../../constants/storeKeys';
import * as utils from '../../../shared/utils';
import CheckIcon from '@material-ui/icons/Check';

export default function AutoSuggestFilter(props) {
    const { config, title, filterData, selecteValue } = props;
    const [query, setQuery] = React.useState(selecteValue ? selecteValue : '');
    const cache = utils.parseJSON(localStorage.getItem(title+storeKeys.FILTER_PREV_CACHE_PREFIX));
    const [cachedValue, setCachedValue] = React.useState(cache ? cache : [])
    const [suggestions, setSuggestions] = React.useState([]);
    const classes = useStyles();
    
    // Teach Autosuggest how to calculate suggestions for any given input value.
    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        setQuery(value);
        // setEndpoint(APIConstants.BASE_URL + config.source.sourceURL)
        console.log(filterData)
        return inputLength === 0 ? [] : filterData && filterData.filter(option =>
            option[config.searchBy].toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    const getSuggestionValue = suggestion => suggestion[config.searchBy];

    const renderSuggestion = suggestion => {
        return (
            <div className={suggestion.selected ? 'selected' : ''}>
                {suggestion[config.searchBy]}
            </div>
        )
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onChange = (event, { newValue }) => {
        setQuery(newValue);
        // if(config.closeOnSelect) {
        //     props.onApply(newValue);
        // }
    };

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
        placeholder: 'Search ' + title,
        name: title + 'Search',
        value: query,
        onChange: onChange
    };
    const clearBtnConfig = ({
        title: "Clear",
        styles: {
            width: "width: calc(50% - 20px)",
            height: "36px",
            align: "right",
            clearfix: "clear",
            bgColor: "linear-gradient(45deg, #86a7b0 30%, #879087 90%)"
        }
    })

    const applyBtnConfig = ({
        title: "Apply",
        styles: {
            width: "width: calc(50% - 20px)",
            height: "36px",
            align: "right",
            clearfix: "clear"
        }
    })

    const handleApply = evt => {
        props.onApply(query);
    }
    const handleClear = () => {
        props.onApply('');
    }

    const isChecked = (option) => {
        if(option === query)
            return (<CheckIcon fontSize="small" />) 
    }

    const selectDeselect = (option) => {
        if(option === query)
            setQuery('');
        else 
            setQuery(option);
    }
    const searchField = (<div>
        <ul className={classes.list}>
        {cachedValue.map((option, index) => (
            <li className={classes.listItem} key={index}><span onClick={() => selectDeselect(option)}>{option}</span>{isChecked(option)}</li>
        ))}
        </ul>
        <Paper component="form" className={classes.root}>
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            name='searchField'
        />
        <CustomButton config={clearBtnConfig} onClick={handleClear} />
        <CustomButton config={applyBtnConfig} onClick={handleApply} />
    </Paper></div>)

    return searchField;
}