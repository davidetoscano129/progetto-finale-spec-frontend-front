import "../../styles/Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container text-center py-2">
        <span className="footer-text">
          © {currentYear} Faculty Comparator · Made with{" "}
          <span className="heart">❤️</span> for Boolean
        </span>
      </div>
    </footer>
  );
}
