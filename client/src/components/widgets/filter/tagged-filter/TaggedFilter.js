import React from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import CheckIcon from '@material-ui/icons/Check';
import CustomButton from '../../CustomButton';

import Tag from '../../StyledTagView';
import Listbox from '../../StyledListBox';
import useStyles from './TaggedFilterStyles';
import * as storeKeys from '../../../../constants/storeKeys';
import * as utils from '../../../shared/utils';

export default function TaggedFilter(props) {
    const { config, title, filterData, selectedArray } = props;
    const cache = utils.parseJSON(localStorage.getItem(title+storeKeys.FILTER_PREV_CACHE_PREFIX));
    const [cachedValue, setCachedValue] = React.useState(cache ? cache : [])

    const classes = useStyles();

    const getSelectedOptions = (selectedArray) => {
        let seletcedOptions = [];
        selectedArray.map(selectedOption => {
            seletcedOptions.push(filterData.find(option => option.code === selectedOption.code))
        });
        return seletcedOptions;
    }
    const {
        getRootProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value
    } = useAutocomplete({
        id: 'taggedAutocomplete',
        defaultValue: props.selectedArray ? getSelectedOptions(props.selectedArray) : null,
        multiple: props.config.multiselect,
        options: props.filterData,
        getOptionLabel: option => option[config.searchBy],
    });
    const clearBtnConfig = ({
            title: "Clear",
            styles: {
                width: "width: calc(50% - 20px)",
                height: "36px",
                align: "right", 
                clearfix:"clear",
                bgColor:"linear-gradient(45deg, #86a7b0 30%, #879087 90%)"
            }
        }
    )

    const applyBtnConfig = ({
            title: "Apply",
            styles: {
                width: "width: calc(50% - 20px)",
                height: "36px",
                align: "right", 
                clearfix:"clear"
            }
        }
  )

    const handleApply = evt => {
        props.onApply(value);
    }

    const handleClear = () => {
        props.onApply([]);
    }

    const isSelected = (array, item) => {
        return array.some(value=> value.code === item.code);
    }

    const isChecked = (option) => {
        if(isSelected(selectedArray, option))
            return (<CheckIcon fontSize="small" />) 
    }

    const selectDeselect = (option) => {
        selectedArray.push(option)
        props.onApply(selectedArray);
    }

    const customFilter = (<div>
        <div {...getRootProps()} className={classes.taggedAutocomplete}>
            <ul className={classes.list}>
            {cachedValue.map((option, index) => (
                <li className={classes.listItem} key={index} onClick={() => selectDeselect(option)}><span>{option[config.searchBy]}{isChecked(option)}</span></li>
            ))}
            </ul>
            
            {value.map((option, index) => (
                <Tag label={option[config.searchBy]} {...getTagProps({ index })} className={classes.verticalSpacing10} />
            ))}
            <div className={classes.verticalSpacing10}>
                <input {...getInputProps()} placeholder={`Search ${title} `} className={classes.autoCompleteInput}/>
            </div>
        </div>
        {groupedOptions.length > 0 ? (
            <Listbox {...getListboxProps()}>
                {groupedOptions.map((option, index) => (
                    <li {...getOptionProps({ option, index })}>
                        <span>{option[config.searchBy]}</span>
                        <CheckIcon fontSize="small" />
                    </li>
                ))}
            </Listbox>
        ) : null}
    

    <CustomButton config={clearBtnConfig} onClick={handleClear}/>
    <CustomButton config={applyBtnConfig} onClick={handleApply}/>
    </div>)
    
    return customFilter;
}