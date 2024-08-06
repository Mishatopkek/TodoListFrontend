import * as React from 'react';
import {cloneElement, useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

export default function BasicMenu({title, children}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Clone each child to attach handleClose to the onClick event
    const enhancedChildren = React.Children.map(children, (child) => {
        // Only process elements of type MenuItem
        if (React.isValidElement(child)) {
            return cloneElement(child, {
                onClick: (event) => {
                    // Call the original onClick of the child if it exists
                    if (child.props.onClick) {
                        child.props.onClick(event);
                    }
                    // Call handleClose
                    handleClose();
                },
            });
        }
        return child;
    });

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {title}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {enhancedChildren}
            </Menu>
        </div>
    );
}