import React, { useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bookmark } from "react-bootstrap-icons";
import { BookmarkFill } from "react-bootstrap-icons";
import { ProjectContext } from "../context/ProjectContext.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Locura = () => {
  const { projects, sesionIniciada, setProjects } = useContext(ProjectContext);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (email, password) => {
    setUser(email);
    localStorage.setItem("user", email);
    handleCloseLoginModal();
  };

  const handleAgregarFavorito = (project) => {
    if (user) {
      const updatedProjects = [...projects];
      const projectIndex = updatedProjects.findIndex((p) => p.title === project.title);

      if (projectIndex !== -1) {
        if (updatedProjects[projectIndex].favorito) {
          updatedProjects[projectIndex].favorito = false;
        } else {
          updatedProjects[projectIndex].favorito = true;
        }

        setProjects(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
      }
    } else {
      alert('Debes iniciar sesión para agregar a favoritos.');
    }
  };

  const isFavorito = (project) => {
    return project.favorito;
  };

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className="inicio-sesion">
        {user ? (
          <p className="welcome-message">Hola, {user} | <button className="logout-button" onClick={() => setUser(null)}>Cerrar Sesión</button></p>
        ) : (
          <Button variant="primary" onClick={handleShowLoginModal}>
            Iniciar Sesión
          </Button>
        )}
      </div>
      <Container className="Locura-container">
        <h1 className="titulo">Mis Proyectos</h1>
        <Row>
          {projects.map((project, index) => (
            <Col key={index} md={4}>
              <Card className="project-card">
                <Card.Img variant="top" src={project.imageUrl} alt={project.title} />
                <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text>{project.description}</Card.Text>
                  <p>Fecha: {project.date}</p>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    Ver Proyecto
                  </a>
                  {isFavorito(project) ? (
                    <BookmarkFill
                      fill="black"
                      className="star-icon favorito"
                      onClick={() => handleAgregarFavorito(project)}
                    />
                  ) : (
                    <Bookmark
                      className="star-icon"
                      onClick={() => handleAgregarFavorito(project)}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLoginModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => handleLogin(email, password)}>
            Iniciar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Locura;
