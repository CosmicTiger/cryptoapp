import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../../services/cryptoApi.services';
import Loader from '../../components/Loader';

const CryptoCurrencies = (props) => {
    const { simplified } = props;
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);

        const filteredCryptos = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

        setCryptos(filteredCryptos);
    }, [cryptosList, searchTerm])

    if (isFetching) return <Loader />;

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search Cryptocurrency" onChange={handleSearch} />
                </div>
            )}
            <Row gutters={[32, 32]} className="cryptoCard-container">
                {
                    cryptos && cryptos?.map((currency) => (
                        <Col xs={24} sm={12} lg={6} className="cryptoCard" key={currency.id}>
                            <Link to={`/crypto/${currency.id}`}>
                                <Card
                                    title={`${currency.rank}. ${currency.name}`}
                                    extra={<img className="cryptoCard-image" src={currency.iconUrl} alt={currency.name} />}
                                    hoverable
                                >
                                    <p>Price: {millify(currency.price)}</p>
                                    <p>Market Cap: {millify(currency.marketCap)}</p>
                                    <p>Daily Change: {millify(currency.change)}%</p>
                                </Card>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default CryptoCurrencies
