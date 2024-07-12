import React from "react";
import "./streaming.scss";
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../../assets/p1.jpeg';
import heroImg02 from '../../assets/p2.jpeg';
import heroVideo from '../../assets/p3.webp';
import paris from "../../assets/paris.jpeg";
import kyoto from "../../assets/kyoto.jpeg";
import santorini from "../../assets/santorini.webp";
import capetown from "../../assets/capetown.webp";
import ny from "../../assets/newyork.jpeg";
import rome from "../../assets/rome.webp";
import sydney from "../../assets/sydney.webp";
import mp from "../../assets/machu.jpeg";
import ry from "../../assets/reykjavik.webp";
import bali from "../../assets/bali.jpeg";
import barcelona from "../../assets/barcelona.jpeg";
import istanbul from "../../assets/istanbul.jpeg";
import queen from "../../assets/queenstown.png";
import prague from "../../assets/prague.jpeg";
import maldives from "../../assets/maldives.jpeg";
import dubai from "../../assets/dubai.jpeg";
import Subtitle from "../../shared/Subtitle";
import ServiceList from "../../services/ServiceList";
import NewsLetter from "../../shared/Newsletter";
import { useLocation, useNavigate } from "react-router-dom";


const Streaming = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const role = location.state?.role || 'guest';

    const handleVisitClickParis = () => {
        const id = '1';  // Replace with actual ID for Paris trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickKyoto = () => {
        const id = '2';  // Replace with actual ID for Kyoto trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickSantorini = () => {
        const id = '3';  // Replace with actual ID for Santorini trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickCT = () => {
        const id = '4';  // Replace with actual ID for Cape Town trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickNY = () => {
        const id = '5';  // Replace with actual ID for New York trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickRome = () => {
        const id = '6';  // Replace with actual ID for Rome trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickSydney = () => {
        const id = '7';  // Replace with actual ID for Sydney trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickMP = () => {
        const id = '8';  // Replace with actual ID for Machu Picchu trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickIsland = () => {
        const id = '9';  // Replace with actual ID for Reykjavik trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickBali = () => {
        const id = '10';  // Replace with actual ID for Bali trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickBarcelona = () => {
        const id = '11';  // Replace with actual ID for Barcelona trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickIstanbul = () => {
        const id = '12';  // Replace with actual ID for Istanbul trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickNZ = () => {
        const id = '13';  // Replace with actual ID for Queenstown trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickPrague = () => {
        const id = '14';  // Replace with actual ID for Prague trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickMaldives = () => {
        const id = '15';  // Replace with actual ID for Maldives trip
        navigate(`/trips/${id}`);
    };

    const handleVisitClickDubai = () => {
        const id = '16';  // Replace with actual ID for Dubai trip
        navigate(`/trips/${id}`);
    };

    return (
        <>
            {/*========== hero section start =============*/}
            <section>
                <Container>
                    <Row lg='12'>
                        <Col lg='6'>
                            <div className="hero__content">
                                <div className="hero__subtitle d-flex align-items-center">
                                    <Subtitle subtitle={'The art of streaming'} />
                                </div>
                                <h1>Stream your favorite artists, right here on <span className="highlight">Euphonic</span></h1>
                                <p>Euphonic is an innovative music platform that presents a unique combination of premium content and interactive features, making Euphonic the ideal place for all music lovers.</p>
                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className="hero__img-box">
                                <img src={heroImg} alt="" />
                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className="hero__img-box mt-4">
                                <img src={heroVideo} alt="" />
                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className="hero__img-box mt-5">
                                <img src={heroImg02} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/*========== hero section end =============*/}
            <section>
                <Container>
                    <Row>
                        <Col lg='3'>
                            <h5 className="services__subtitle">What we serve</h5>
                            <h2 className="services__title">We offer our best services</h2>
                        </Col>
                        <ServiceList />
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row className="d-flex justify-content-around">
                        <Col lg='12' className="mb-5">
                            <Subtitle subtitle={'Explore'} />
                            <h2 className="featured__tour-title"> Featured tours</h2>
                        </Col>
                        {[
                            { title: "Paris, France", img: paris, rating: 4.8, reviews: 2, handler: handleVisitClickParis },
                            { title: "Kyoto, Japan", img: kyoto, rating: 4.6, reviews: 1, handler: handleVisitClickKyoto },
                            { title: "Santorini, Greece", img: santorini, rating: 4.7, reviews: 3, handler: handleVisitClickSantorini },
                            { title: "Cape Town, SA", img: capetown, rating: 4.5, reviews: 1, handler: handleVisitClickCT },
                            { title: "New York, USA", img: ny, rating: 4.5, reviews: 1, handler: handleVisitClickNY },
                            { title: "Rome, Italy", img: rome, rating: 4.5, reviews: 1, handler: handleVisitClickRome },
                            { title: "Sydney, Australia, SA", img: sydney, rating: 4.5, reviews: 1, handler: handleVisitClickSydney },
                            { title: "Machu Picchu, Peru", img: mp, rating: 4.5, reviews: 1, handler: handleVisitClickMP },
                            { title: "Reykjavik, Iceland", img: ry, rating: 4.5, reviews: 1, handler: handleVisitClickIsland },
                            { title: "Bali, Indonesia", img: bali, rating: 4.5, reviews: 1, handler: handleVisitClickBali },
                            { title: "Barcelona, Spain", img: barcelona, rating: 4.5, reviews: 1, handler: handleVisitClickBarcelona },
                            { title: "Istanbul, Turkey", img: istanbul, rating: 4.5, reviews: 1, handler: handleVisitClickIstanbul },
                            { title: "Queenstown, NZ", img: queen, rating: 4.5, reviews: 1, handler: handleVisitClickNZ },
                            { title: "Prague, Czech Republic", img: prague, rating: 4.5, reviews: 1, handler: handleVisitClickPrague },
                            { title: "Maldives", img: maldives, rating: 4.5, reviews: 1, handler: handleVisitClickMaldives },
                            { title: "Dubai, UAE", img: dubai, rating: 4.5, reviews: 1, handler: handleVisitClickDubai }
                        ].map((trip, index) => (
                            <Col lg='3' md='6' sm='12' key={index} className="mb-4">
                                <div className="card">
                                    <img src={trip.img} alt={trip.title} className="card-img-top" />
                                    <div className="card-body">
                                        <div className="rating">
                                            {trip.rating} ({trip.reviews})
                                        </div>
                                        <h5 className="card-title">{trip.title}</h5>
                                        <button className="btn btn-primary" onClick={trip.handler}>Visit</button>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
          
            <NewsLetter />
        </>
    );
};

export default Streaming;
