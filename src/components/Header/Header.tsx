import classes from './Header.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import HeaderItem from '../HeaderItem/index';

export default function Header(): JSX.Element {
    const headerItems = useAppSelector((state) => state.header.choiceHeader);

    return (
        <div className={classes.header}>
            {headerItems.map((elem) => (
                <HeaderItem key={elem.id} {...elem} />
            ))}
        </div>
    );
}
