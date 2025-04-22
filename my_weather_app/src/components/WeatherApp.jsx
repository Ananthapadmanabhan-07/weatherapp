
import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Alert, Spinner, Row, Col } from "react-bootstrap";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "68084857467abd19c522644cc3db2eb6";  

  const getWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found or API error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100" id="contain">
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%", }} id="cards">
        <h2 className="text-center mb-4">Weather App</h2>

        <Form onSubmit={(e) => { e.preventDefault(); getWeather(); }}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading} className="w-100">
            {loading ? <Spinner animation="border" size="sm" /> : "Get Weather"}
          </Button>
        </Form>

        {error && <Alert variant="danger" className="mt-3 text-center">{error}</Alert>}

        {weather && (
          <div className="mt-4 text-center">
            <h4>{weather.name}, {weather.sys.country}</h4>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="my-2"
            />
            <p className="text-capitalize">{weather.weather[0].description}</p>
            <h2>{weather.main.temp}°C</h2>

            <Row className="mt-3">
              <Col xs={6} className="text-start">Humidity:</Col>
              <Col xs={6} className="text-end">{weather.main.humidity}%</Col>
            </Row>
            <Row>
              <Col xs={6} className="text-start">Pressure:</Col>
              <Col xs={6} className="text-end">{weather.main.pressure} hPa</Col>
            </Row>
            <Row>
              <Col xs={6} className="text-start">Wind Speed:</Col>
              <Col xs={6} className="text-end">{weather.wind.speed} m/s</Col>
            </Row>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default WeatherApp;

