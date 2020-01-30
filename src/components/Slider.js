import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});
const PrettoSlider = withStyles({
    root: {
      color: '#F50057',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);


export default function RangeSlider() {

  const classes = useStyles();
  const [value, setValue] = React.useState([1, 20]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function valueLabelFormat(value) {
      if(value == 41){
        return `40+`;
      }
    return `${value}hrs`;
  }

  return (
    <div className={classes.root}>
      <Typography  color={'textSecondary'} id="range-slider" gutterBottom>
        Quant. Horas
      </Typography>
      <PrettoSlider
       min={1}
       max={41}
        value={value}
        onChange={handleChange}

        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        // getAriaValueText={valuetext}
        valueLabelFormat={valueLabelFormat}
      />
    </div>
  );
}