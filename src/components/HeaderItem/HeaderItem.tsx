// import React from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { headerItem } from '../../interfase/headerinterface';
import { changeStatusHeaderElem } from '../../store/HeaderSlice';
import classes from './HeaderItem.module.scss';

export default function HeaderItem({ id, title, status }: headerItem): JSX.Element {
    const dispatch = useAppDispatch();

    const handleChangeStatus = (): void => {
        dispatch(changeStatusHeaderElem(id));
    };

    return (
        <button
            type="button"
            className={`${classes.header__btn} ${status && classes['header__btn-active']}`}
            onClick={handleChangeStatus}
        >
            {title}
        </button>
    );
}
