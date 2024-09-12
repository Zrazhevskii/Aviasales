import classes from './AsideBarItem.module.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { toggleStatus, toggleAllItemStatus } from '../../store/AsideSlise';
import { asideItem } from '../../interfase/asideInterface';

export default function AsideBarItem({ id, title, status }: asideItem): JSX.Element {
    const dispatch = useAppDispatch();
    const changeStatusHandle = (idItem: number) => {
        if (idItem === 11) {
            return dispatch(toggleAllItemStatus());
        }
        return dispatch(toggleStatus(idItem));
    };
    return (
        <li className={classes.filter__item}>
            <label htmlFor={String(id)} className={classes.filter__item__label}>
                <input
                    id={String(id)}
                    className={classes.filter__item__input}
                    type="checkbox"
                    checked={status}
                    onChange={() => changeStatusHandle(id)}
                />
                <span className={classes.filter__item__title}>{title}</span>
            </label>
        </li>
    );
}
