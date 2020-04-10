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

function handleClickGlobal(e, route) {
    e.preventDefault;
    // window.location.href = routes['extranet.elements.show']
    window.location.href = route;
}

function handleClickTemplate(e, route) {
    e.preventDefault;
    //window.location.href = routes['extranet.elements.template'];
    window.location.href = route;
}

function go(route) {
    window.location.href = route;
}

export default function SimpleTabs(props) {
    const classes = useStyles();
    
    let value = window.location.href == props.routes[0] ? 1 : 2;
    
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
                            onClick={e => {
                                e.preventDefault();
                                go(props.routes[0]);
                            }}
                            value={1}
                            disabled={value == 1}
                        />
                        <Tab
                            key={2}
                            label="TEMPLATE" 
                            icon={<InsertDriveFileIcon />}
                            {...a11yProps(1)}
                            onClick={e => {
                                e.preventDefault();
                                go(props.routes[1]);
                            }}
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
