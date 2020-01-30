import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  taggedAutocomplete: {
    padding: 10,
    width: 230
  },
  verticalSpacing10: {
    marginTop: '10px !important',
    marginBottom: '10px !important'
  },
  autoCompleteInput: {
    padding: '10px 4px',
    borderRadius: 5,
    width: 'calc(100% - 10px)'
  },
  listItem: {
    color: '#333',
    listStyleType: 'none',
    padding: '10px'
  },
  list: {
    listStyleType: 'none',
    padding: 0
  }
}));

export default useStyles;