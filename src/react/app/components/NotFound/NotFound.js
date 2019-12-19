import React from 'react';
import { Grid, Typography } from '@material-ui/core';


const NotFound = () => {
  return (
    <div styles={{padding:"32px"}}>
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <div styles={{paddingTop: "150px",textAlign: 'center'}}>
            <Typography variant="h1">
              404: The page you are looking for isn’t here
            </Typography>
            <Typography variant="subtitle2">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
            <img
              alt="Under development"
              styles={{paddingTop: "50px",display: 'inline-block',maxWidth: '100%', width: 560}}
              src="https://matarstars.co/img/team/logo.png"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
