import React, {ChangeEvent} from 'react';
import {Checkbox} from "@material-ui/core";

type SuperCheckboxType = {
    callback: (e: ChangeEvent<HTMLInputElement>) => void
    checked: boolean
}

const SuperCheckbox: React.FC<SuperCheckboxType> = ({callback, checked}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e)
    }

    return (
        <Checkbox onChange={onChangeHandler} checked={checked}/>
    );
};

export default SuperCheckbox;