import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      float:'left'
    },
    label: {
        position: 'absolute'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
      position: 'absolute',
      right: 10,
      top: 10
    },
    divider: {
      height: 28,
      margin: 4,
    },
    listItem: {
      color: '#333',
      listStyleType: 'none',
      padding: '10px'
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      margin: '10px 0'
    }
  }));

export default useStyles;