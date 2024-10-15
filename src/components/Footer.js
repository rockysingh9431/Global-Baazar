const Footer = () => {
  const currentyear = new Date().getFullYear();
  return (
    <footer className="footer flex items-end justify-center">
      <div className="text-center">
        <p>Copyright &copy; {currentyear}</p>
      </div>
    </footer>
  );
};
export default Footer;
