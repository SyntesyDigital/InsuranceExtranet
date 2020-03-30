import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function handleClickGlobal(e) {
    e.preventDefault;
    window.location.href = routes['extranet.elements.show']
}

function handleClickTemplate(e) {
    e.preventDefault;
    window.location.href = routes['extranet.elements.template']
}

export default function SimpleTabs() {
    const classes = useStyles();
    //const [value] = React.useState(0);

    let value = window.location.href == routes['extranet.elements.show'] ? 1 : 2;
    
    return (
        <div className="container-tab-button">
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                    >
                        <Tab
                            key={1}
                            label="GLOBAL"
                            icon={<SettingsIcon />}
                            {...a11yProps(0)}
                            onClick={handleClickGlobal}
                            value={1}
                            disabled={value == 1}
                        />
                        <Tab
                            key={2}
                            label="TEMPLATE" 
                            icon={<InsertDriveFileIcon />}
                            {...a11yProps(1)}
                            onClick={handleClickTemplate}
                            value={2}
                            disabled={value == 2}
                        />
                    </Tabs>
                </AppBar>
            </div>
        </div>
    );
}

SimpleTabs.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any
};
