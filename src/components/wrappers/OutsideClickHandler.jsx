import React, {useEffect, useRef} from 'react';

function OutsideClickHandler({children, onOutsideClick}) {
    const wrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            onOutsideClick();
        }
    };

    useEffect(() => {
        // Attach the event listener to the document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on a component unmount
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return <div ref={wrapperRef}>{children}</div>;
}

export default OutsideClickHandler;
