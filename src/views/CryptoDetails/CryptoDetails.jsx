import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import {
    MoneyCollectOutlined,
    DollarCircleOutlined, FundOutlined,
    ExclamationCircleOutlined, StopOutlined,
    TrophyOutlined, CheckOutlined,
    NumberOutlined, ThunderboltOutlined
} from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../services/cryptoApi.services';
import LineChart from '../../components/LineChart';
import Loader from '../../components/Loader';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coin_id: coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
    const cryptoDetails = data?.data?.coin;

    console.log(coinHistory);

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    if (isFetching) return <Loader />;

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails?.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];

    const handleTimePeriodChange = (value) => {
        setTimePeriod(value);
    }

    return (
        <Col className="CoinDetailCard">
            <Col className="CoinDetailCard-heading">
                <Title level={2} className="CoinDetailCard-name">
                    {cryptoDetails?.name} ({cryptoDetails?.slug}) Price
                </Title>
                <p>
                    {cryptoDetails?.name} live price in US dollars.
                    View value statistics, market cap and supply.
                </p>
            </Col>
            <Select
                defaultValue="7d"
                className="select-timeperiod"
                placeholder="Select Time Period"
                onChange={handleTimePeriodChange}
            >
                {
                    time && time.map((date) => <Option key={date} value={date}>{date}</Option>
                    )}
            </Select>
            <LineChart
                coinHistory={coinHistory}
                currentPrice={millify(cryptoDetails.price)}
                coinName={cryptoDetails.name}
            />
            <Col className="CoinDetailCard-chart">
                <Col className="CoinDetailCard-statistics">
                    <Col className="CoinDetailCard-statisticsHeading">
                        <Title level={3} className="CoinDetailCard-statisticsCoinHeading">
                            {cryptoDetails?.name} Value Statistics
                        </Title>
                        <p>
                            An overview showing the stats of the {cryptoDetails?.name} value over the last {timePeriod}
                        </p>
                        {
                            stats && stats.map(({ icon, title, value }, index) => (
                                <Col key={index} className="CoinStatsCard">
                                    <Col className="CoinStatsCard-name">
                                        <Text>{icon}</Text>
                                        <Text>{title}</Text>
                                    </Col>
                                    <Text className="CoinStatsCard-stats">{value}</Text>
                                </Col>
                            ))
                        }
                    </Col>
                    <Col className="CoinDetailCard-statisticsHeading">
                        <Title level={3} className="CoinDetailCard-statisticsCoinHeading">
                            Other Statistics
                        </Title>
                        <p>
                            An overview showing the stats of all the cryptocurrencies value over the last {timePeriod}
                        </p>
                        {
                            genericStats && genericStats.map(({ icon, title, value }, index) => (
                                <Col key={index} className="CoinStatsCard">
                                    <Col className="CoinStatsCard-name">
                                        <Text>{icon}</Text>
                                        <Text>{title}</Text>
                                    </Col>
                                    <Text className="CoinStatsCard-stats">{value}</Text>
                                </Col>
                            ))
                        }
                    </Col>
                </Col>
                <Col className="CoinDetailCard-descLink">
                    <Row className="CoinDetailCard-desc">
                        <Title level={3} className="CoinDetailCard-heading">
                            What is {cryptoDetails.name}?
                            {HTMLReactParser(cryptoDetails.description)}
                        </Title>
                    </Row>
                    <Col className="CoinDetailCard-links">
                        <Title level={3} className="CoinDetailCard-heading">
                            {cryptoDetails.name} Links
                        </Title>
                        {
                            cryptoDetails.links && cryptoDetails.links.map((link) => (
                                <Row key={link.name} className="CoinDetailCard-link">
                                    <Title level={5} className="CoinDetailCard-linkName">
                                        {link.type}
                                    </Title>
                                    <a href={link.url} target="_blank" rel="noreferrer">
                                        {link.name}
                                    </a>
                                </Row>
                            ))
                        }
                    </Col>
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails
