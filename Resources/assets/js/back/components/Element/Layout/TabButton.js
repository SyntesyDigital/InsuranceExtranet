import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SettingsIcon from '@material-ui/icons/Settings';

function TabButton(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="container-tab-button">
            <div className={classes.root}>

                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab
                            label="GLOBAL"
                            icon={<SettingsIcon />}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="TEMPLATE" 
                            icon={<InsertDriveFileIcon />}
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </AppBar>

                {/* <TabButton value={value} index={0}>
                    GLOBAL CONTENT
                </TabButton>

                <TabButton value={value} index={1}>
                    TEMPLATES CONTENT
                </TabButton> */}

            </div>
        </div>
    );
}

TabButton.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
