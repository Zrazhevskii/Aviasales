// import { useState } from 'react'
import classes from './App.module.scss';
import AsideBar from './components/AsideBar/index';
import Header from './components/Header/Header';

function App() {
    return (
        <div className={classes.wrapper__app}>
            <div className={classes.wrapper__app__box}>
                <AsideBar />
                <div className={classes.wrapper__context}>
                    <Header />
                </div>
            </div>
        </div>
    );
}

export default App;
