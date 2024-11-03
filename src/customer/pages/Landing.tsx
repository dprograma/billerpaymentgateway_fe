import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../shared/assets/images/amaps.png';
import { Carousel, Navbar, Nav, Container, Row, Col, Button, Card } from 'react-bootstrap';
import slider1 from '../../shared/assets/images/pexels9.png';
import slider2 from '../../shared/assets/images/pexels17.png';
import slider3 from '../../shared/assets/images/guy-with-earpiece.png';
import skincare from '../../shared/assets/images/pexels1.png';
import comfort from '../../shared/assets/images/pexels10.png';
import essentials from '../../shared/assets/images/pexels11.png';
import ojapay from '../../shared/assets/images/ojapay.png';
import imageone from '../../shared/assets/images/pexels6.png';
import imagetwo from '../../shared/assets/images/pexels19.png';
import imagethree from '../../shared/assets/images/pexels111.png';
import LanguageSwitcher from '../../LanguageSwitcher';
import '../assets/css/Landing.css';

const Landing: React.FC = () => {
  const { t } = useTranslation('customer_landing');
  console.log("translation from customer landing: ", t)

  return (
    <div>
      {/* Navigation */}
      <Navbar bg="light" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand href="/customer"><img src={ojapay} alt="amapgs" className='rounded-pill' /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#about">{t('about')}</Nav.Link>
              <Nav.Link href="#services">{t('services')}</Nav.Link>
              <Nav.Link href="#contacts">{t('contact')}</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link><LanguageSwitcher /></Nav.Link>
              <NavLink to="/customer/login" className="btn btn-custom">{t('login')}</NavLink>
              <NavLink to="/customer/signup" className="btn btn-custom">{t('signup')}</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Carousel */}
      <Carousel fade>
        <Carousel.Item>
          <div className="carousel-overlay"></div> 
          <img
            className="d-block w-100"
            src={slider1}
            alt="First slide"
          />
          <Carousel.Caption className="carousel-caption-custom">
            <h1 className="carousel-heading">{t('seamless_payment')}</h1>
            <h5 className="carousel-text d-none d-md-block">{t('secure_reliable')}</h5>
            <NavLink to="/customer/signup" className="btn default-theme-color default-border-color default-white-text-color btn-lg rounded-pill">{t('get_started')}</NavLink>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-overlay"></div>
          <img
            className="d-block w-100"
            src={slider2}
            alt="Second slide"
          />
          <Carousel.Caption className="carousel-caption-custom">
            <h1 className="carousel-heading">{t('discover_a_world')}</h1>
            <h5 className="carousel-text d-none d-md-block">{t('make_payments')}</h5>
            <NavLink to="/customer/signup" className="btn default-theme-color default-border-color default-white-text-color btn-lg rounded-pill">{t('get_started')}</NavLink>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-overlay"></div>
          <img
            className="d-block w-100"
            src={slider3}
            alt="Third slide"
          />
          <Carousel.Caption className="carousel-caption-custom">
            <h1 className="carousel-heading">{t('designed_for')}</h1>
            <h5 className="carousel-text d-none d-md-block">{t('empowering_innovation')}</h5>
            <NavLink to="/customer/signup" className="btn default-theme-color default-border-color default-white-text-color btn-lg rounded-pill">{t('get_started')}</NavLink>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* First Section */}
      <Container style={{ backgroundColor: '#eee', marginLeft: '0', marginRight: '0' }}>
        <Row>
          <Col md={5}>
            <Card className="p-5 my-5">
              <Card.Body>
                <Card.Title>{t('unlock_a_world')}</Card.Title>
                <Card.Text>{t('dive_into_a_marketplace')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="p-5 my-5">
              <Card.Body style={{ backgroundColor: 'transparent' }}>
                <Card.Title style={{ fontSize: '46px' }}>{t('seamless_shopping')}</Card.Title>
                <Card.Text>{t('ensure_financial')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Sections */}
      <Container className="my-5">
        <Row className="text-center">
          <Col md={4}>
            <Card style={{ height: '546px' }}>
              <Card.Img variant="top" src={essentials} />
              <div className="card-img-overlay"></div>
              <Card.Body>
                <Card.Title>{t('real_time_transaction')}</Card.Title>
                <Card.Text>{t('stay_informed')}
                </Card.Text>
                <Button className="rounded-pill default-theme-color default-border-color default-white-text-color">{t('learn_more')}</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ height: '546px' }}>
              <Card.Img variant="top" src={skincare} />
              <div className="card-img-overlay"></div>
              <Card.Body>
                <Card.Title>{t('247_customer')}</Card.Title>
                <Card.Text>{t('our_dedicated_customer')}
                </Card.Text>
                <Button className="rounded-pill default-theme-color default-border-color default-white-text-color">{t('learn_more')}</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ height: '546px' }}>
              <Card.Img variant="top" src={comfort} />
              <div className="card-img-overlay"></div>
              <Card.Body>
                <Card.Title>{t('instant_payment')}</Card.Title>
                <Card.Text>{t('receive_instant_confirmation')}
                </Card.Text>
                <Button className="rounded-pill default-theme-color default-border-color default-white-text-color">{t('learn_more')}</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <Row className="text-center">
          <Col md={4}>
            <Card style={{height: '546px'}}>
              <Card.Img variant="top" src={imageone} />
              <div className="card-img-overlay"></div>
              <Card.Body>
                <Card.Title>{t('comprehensive_transaction')}</Card.Title>
                <Card.Text>{t('security_is_our_priority')}
                </Card.Text>
                <Button className="rounded-pill default-theme-color default-border-color default-white-text-color">{t('learn_more')}</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
          <Card style={{height: '546px'}}>
              <Card.Img variant="top" src={imagetwo} />
              <div className="card-img-overlay"></div>
              <Card.Body>
                <Card.Title>{t('reliable_transaction')}</Card.Title>
                <Card.Text>{t('our_system_is_designed')}
                </Card.Text>
                <Button  className="rounded-pill default-theme-color default-border-color default-white-text-color">{t('learn_more')}</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
          <Card style={{height: '546px'}}>
              <Card.Img variant="top" src={imagethree} />
              <div className="card-img-overlay"></div>
              <Card.Body>
                <Card.Title>{t('instant_confirmation')}</Card.Title>
                <Card.Text>{t('experience_the_ease')}
                </Card.Text>
                <Button  className="rounded-pill default-theme-color default-border-color default-white-text-color">{t('learn_more')}</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="my-5 text-center">
        <Row>
          <Col>
            <h2>{t('stay_ahead')}</h2>
            <p><NavLink to="/customer/signup" className="btn default-theme-color default-border-color default-white-text-color btn-lg rounded-pill">{t('get_started')}</NavLink></p>
          </Col>
        </Row>
      </Container>

      <footer className="default-theme-color default-white-text-color text-white text-center py-3">
        <Container>
          <Row>
            <Col>
              <p>&copy; {t('copyright')} <img src={ojapay} style={{ width: '65px', height: '20px', marginRight: '10px' }} /><img src={Logo} style={{ width: '65px', height: '20px' }} /></p>
              <p>{t('legal')} | {t('terms')} | {t('privacy')}</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Landing;

