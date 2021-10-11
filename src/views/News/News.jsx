import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi.services';
import { useGetCryptosQuery } from '../../services/cryptoApi.services';
import Loader from '../../components/Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = (props) => {
    const { simplified } = props;
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data } = useGetCryptosQuery(100);
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

    if (!cryptoNews?.value) return <Loader />;

    const handleCryptoNewsSearch = (value) => {
        setNewsCategory(value);
    }

    const handleFilterOptionSearch = (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    const appliedCSSRules = !simplified ? { paddingTop: '20px' } : '';

    return (
        <Row gutter={[24, 24]} style={appliedCSSRules}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={handleCryptoNewsSearch}
                        filterOption={handleFilterOptionSearch}
                    >
                        <Option value="Cryptocurency">Cryptocurrency</Option>
                        {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
                    </Select>
                </Col>
            )}
            {
                cryptoNews && cryptoNews?.value.map((news, index) => (
                    <Col key={index} xs={24} sm={24} md={12} lg={8}>
                        <Card hoverable className="NewsCard">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="NewsCard-imageContainer">
                                    <Title className="NewsCard-title" level={4}>{news.name}</Title>
                                    <img style={{
                                        maxHeight: '100px',
                                        maxWidth: '200px',
                                    }}
                                        src={news?.image?.thumbnail?.contentUrl || demoImage} alt={`Cryptonews - ${news.name}`} />
                                </div>
                                <p>
                                    {
                                        news.description > 100
                                            ? `${news.description.substring(0, 100)}`
                                            : news.description
                                    }
                                </p>
                                <div className="ProviderCard">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt={`Cryptonews - ${news.provider[0]?.name}`} />
                                        <Text className="ProviderCard-name">{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    )
}

export default News
