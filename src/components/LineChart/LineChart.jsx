import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = (props) => {
    const { coinHistory, currentPrice, coinName } = props;

    const coinPrice = [];
    const coinTimestamp = [];

    useEffect(() => {
        for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
            coinPrice.push(coinHistory?.data?.history[i].price);
        }

        for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
            coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
        }
    });

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <>
            <Row className="Chart-header">
                <Title level={2} className="Chart-title">{coinName} Price Chart</Title>
                <Col className="Chart-priceContainer">
                    <Title level={5} className="Chart-priceChange">{coinHistory?.data?.change}%</Title>
                    <Title level={5} className="Chart-currentPrice">Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}

export default LineChart;
