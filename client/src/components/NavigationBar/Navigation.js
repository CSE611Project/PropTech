import React from "react";
import "./Navigation.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

class Navigation extends React.Component {
  home = () => {
    window.location = "/";
  };

  about = () => {
    window.location = "/About";
  };
  render() {
    return (
      <div>
        <AppBar position="absolute">
          <Toolbar>
            <Grid justify="space-between" container spacing={0}>
              <Grid item>
                <Typography component="h1" variant="h4" color="inherit" noWrap>
                  PropTech
                </Typography>
              </Grid>
              <Grid item>
                <ul>
                  {/* <Link href="/" onClick={this.home}>
                    <li>Home</li>
                  </Link> */}
                  <Link href="/About" onClick={this.about}>
                    <li>About</li>
                  </Link>
                </ul>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navigation;
