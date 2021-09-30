import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout as AntLayout } from 'antd';
import Homepage from '../../views/Homepage';
import Exchanges from '../../views/Exchanges';
import CryptoCurrencies from '../../views/CryptoCurrencies';
import CryptoDetails from '../../views/CryptoDetails';
import News from '../../views/News';

const Layout = () => {
    return (
        <AntLayout>
            <div className="Content">
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/exchanges" component={Exchanges} />
                    <Route exact path="/cryptocurrencies" component={CryptoCurrencies} />
                    <Route exact path="/crypto/:coin_id" component={CryptoDetails} />
                    <Route exact path="/news" component={News} />
                </Switch>
            </div>
        </AntLayout>
    )
}

export default Layout
