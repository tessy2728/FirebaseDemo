import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import './Footer.css';

class Footer extends Component {
   render() {
    const { classes } = this.props;
    return(
        <footer>
            <Typography variant="title" color="inherit">
            Craft World
            </Typography>
            
        </footer>
    );
  }
}

export default Footer;