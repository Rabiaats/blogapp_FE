import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container, Grid } from "@mui/material";
// import { Container, Grid, useMediaQuery } from "@mui/material";
import { teal } from "@mui/material/colors";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import { useTheme } from "@emotion/react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const Auth = ({initialValues}) => {
  const [value, setValue] = React.useState(0);
  // const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ color: "#657AB8", padding: { xs: 0 } }}>
      <Grid
        container
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          p: { xs: 0, sm: 2 },
          alignItems: { xs: "center", sm: "normal" }, gap:"5rem"
        }}
      >
        <Grid height={50} sx={{ display: { xs: "none", sm: "block" }}} item sm={12}>
          <Typography variant="h3" align="center">
            BLOG APP
          </Typography>
        </Grid>

        <Grid 
        item
        xs={12}
          sm={10}
          md={6}
          sx={{minHeight:{xs:"100vh", sm:"700px"}}}>

        <Grid 
        item
          xs={12}
          sx={{border:{xs:0 , sm:"1px solid #657AB8"}, padding:{xs:0, sm:"2rem"},
          borderRadius:{xs:0, sm:20}}}>
        <Grid
          bgcolor={teal[50]}
          item
          xs={12}
          sx={{borderRadius:{xs:0, sm:20}}}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: {xs:"space-evenly", sm:"space-around"},
              flexDirection: "column",
              alignItems: "center",
              minHeight: { xs: "100vh", sm:"fit-content" },
            }}
          >
            <Grid sx={{ display: { xs: "block", sm: "none" } }} item sm={12}>
              <Typography variant="h3" align="center">
                BLOG APP
              </Typography>
            </Grid>
            <Box>
              <Tabs
                orientation="horizontal"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Tab
                  icon={<LockOpenIcon />}
                  label={"Login"}
                  {...a11yProps(0)}
                />
                <Tab
                  icon={<PersonAddIcon />}
                  label={"Register"}
                  {...a11yProps(0)}
                  {...a11yProps(1)}
                />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Login />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Register initialValues={initialValues}/>
              </TabPanel>
            </Box>
          </Box>
        </Grid>

        </Grid>
        </Grid>


      </Grid>
    </Container>
  );
};

export default Auth;
