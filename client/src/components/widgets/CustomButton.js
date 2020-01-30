import React from 'react';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const CustomButton = styled(Button)(props => ({
  background: props.styles.bgColor ? props.styles.bgColor : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: '10px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: props.styles.height ? props.styles.height : 48,
  padding: props.styles.clearfix ? 0 : '0 30px',
  width: props.styles.width ? props.styles.width : 'auto',
  padding: props.styles.padding ? props.styles.padding : '0 5px',
  margin: props.styles.margin ? props.styles.margin : '0 5px',
  float: props.styles.align ? props.styles.align : 'none'
}));

export default function StyledComponents(props) {
  const {config} = props;
  const handleClick = () => {
    props.onClick && props.onClick();
  }
  return <CustomButton styles={config.styles} onClick={handleClick}>{config.title}</CustomButton>;
}