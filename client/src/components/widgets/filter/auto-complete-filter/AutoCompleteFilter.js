import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomButton from '../../CustomButton';
import TextField from '@material-ui/core/TextField';
import useStyles from '../CustomFilterStyles';
import * as storeKeys from '../../../../constants/storeKeys';
import * as utils from '../../../shared/utils';
import CheckIcon from '@material-ui/icons/Check';

export default function AutoCompleteFilter(props) {
    const { config, title, filterData, selecteValue } = props;
    const cache = utils.parseJSON(localStorage.getItem(title+storeKeys.FILTER_PREV_CACHE_PREFIX));
    const [cachedValue, setCachedValue] = React.useState(cache ? cache : [])
    const classes = useStyles();
    const [value, setValue] = React.useState(selecteValue ? selecteValue : '');
    const applyBtnConfig = ({
        title: "Apply",
        styles: {
            width: "width: calc(50% - 20px)",
            height: "36px",
            align: "right",
            clearfix: "clear",
            margin: '5px 10px'
        }
    })

    const handleApply = evt => {
        props.onApply(value);
    }

    const setAutoCompleteValue = (value) => {
        if (value) {
            const option = {
                value: value,
                name: value.name
            };
            setValue(option);
        } else
        setValue('')
    }

    const onChange = (event, value) => {
        setAutoCompleteValue(value);
    };
    const isChecked = (option) => {
        if(option.name === selecteValue.name)
            return (<CheckIcon fontSize="small" />) 
    }

    const selectDeselect = (option) => {
        if(option.name === selecteValue.name)
            setValue({});
        else {
            setAutoCompleteValue(option)
        }
    }

    const autoCompleteFilter = (<Autocomplete
        value={value.value}
        options={filterData}
        autoComplete={true}
        multiple={config.multiselect}
        getOptionLabel={option => option.name}
        onChange={onChange}
        style={{ width: 300, padding: '10px' }}
        renderInput={params => (
            <div>
                <ul className={classes.list}>
                {cachedValue.map((option, index) => (
                    <li className={classes.listItem} key={index}><span onClick={()=>selectDeselect(option)}>{option.name}</span>{isChecked(option)}</li>
                ))}
                </ul>
                <TextField {...params} label={title} variant="outlined" fullWidth />
                <CustomButton config={applyBtnConfig} onClick={handleApply} />
            </div>
        )}
    />)
    return autoCompleteFilter;
}