import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../../services/cryptoApi.services';
import CryptoCurrencies from '../CryptoCurrencies';
import News from '../News';

const { Title } = Typography;

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if (isFetching) return 'Loading...';

    return (
        <>
            <Title level={2} className="Homepage-heading">
                Global Crypto Stats
            </Title>
            <Row>
                <Col span={12}>
                    <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Exchanges" value={globalStats.totalExchange} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
                </Col>
            </Row>
            <div className="Homepage-headingWrapper">
                <Title level={2} className="Homepage-title">Top 10 CryptoCurrencies in the World</Title>
                <Title level={3} className="Homepage-showMore">
                    <Link to="/cryptocurrencies">Show more</Link>
                </Title>
            </div>
            <CryptoCurrencies simplified />
            <div className="Homepage-headingWrapper">
                <Title level={2} className="Homepage-title">Latest Crypto News</Title>
                <Title level={3}>
                    <Link to="/news">Show more</Link>
                </Title>
            </div>
            <News simplified />
        </>
    )
}

export default Homepage
