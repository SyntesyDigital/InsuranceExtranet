import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SettingsIcon from '@material-ui/icons/Settings';

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
            </div>
        </div>
    );
}

SimpleTabs.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any,
    value: PropTypes.any.isRequired,
};
