import { useEffect } from 'react';
import classes from './App.module.scss';
import AsideBar from './components/AsideBar/index';
import Header from './components/Header/index';
import TicketList from './components/TicketList/index';
import getSearchId from './servises/TicketsApi';
import { useAppDispatch } from './hooks/hooks';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('searchId') === null) {
            dispatch(getSearchId());
        }
    }, [dispatch]);

    return (
        <div className={classes.wrapper__app}>
            <div className={classes.wrapper__app__box}>
                <AsideBar />
                <div className={classes.wrapper__context}>
                    <Header />
                    <TicketList />
                </div>
            </div>
        </div>
    );
}

export default App;
