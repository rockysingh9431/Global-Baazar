import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentyear = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center">
            <p>Copyright &copy; {currentyear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
