// import { useState } from 'react'
import classes from './App.module.scss';
import AsideBar from './components/AsideBar/index';
import Header from './components/Header/index';
import TicketList from './components/TicketList/index';

function App() {
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
