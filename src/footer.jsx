const Footer = () => {
    const currentYear = new Date().getFullYear(); 
  
    return (
      <div>
        Copyright &copy; {currentYear}
      </div>
    );
  };
  
  export default Footer;
  