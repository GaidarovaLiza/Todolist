import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {Box, Button, IconButton, Toolbar, Typography} from "@material-ui/core";

export default function ButtonAppBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    {/*    <IconButton*/}
                    {/*        size="medium"*/}
                    {/*        edge="start"*/}
                    {/*        color="inherit"*/}
                    {/*        aria-label="menu"*/}
                    {/*        sx={{ mr: 2 }}*/}
                    {/*    >*/}
                    {/*<MenuIcon />*/}
                    {/*</IconButton>*/}
                    {/*<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>*/}
                    {/*    News*/}
                    {/*</Typography>*/}
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}