
import Background from '../../images/background.jpeg';

export default theme => ({
    main: {
      width: '100%',
      display: 'flex', // Fix IE 11 issue.
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover'
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    left_banner: {
      display: 'flex'
    }
  });