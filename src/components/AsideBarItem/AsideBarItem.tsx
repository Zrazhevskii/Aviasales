// import React from 'react'
import classes from './AsideBarItem.module.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { toggleStatus, toggleAllItemStatus } from '../../store/AsideSlise';
import { asideItem } from '../../interfase/asideInterface';

export default function AsideBarItem({ id, title, status }: asideItem) {
    const dispatch = useAppDispatch();

    const changeStatusHandle = (idItem: number) => {
        // console.log(id);
        if (idItem === 1) {
            return dispatch(toggleAllItemStatus());
        }
        return dispatch(toggleStatus(idItem));
    };
    return (
        <li className={classes.filter__item}>
            <input type="checkbox" checked={status} onChange={() => changeStatusHandle(id)} />
            <span>{title}</span>
        </li>
    );
}

// export default AsideBarItem;
