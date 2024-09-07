import React from 'react';

const Footer = () => {
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        <div className="footer-section">
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <p className="text-sm mb-4">At Shopkaro.com we're passionate about providing an exceptional shopping experience. With a curated selection of premium products and a commitment to customer satisfaction, we strive to make online shopping effortless and enjoyable. Our mission is to connect you with quality goods that enhance your lifestyle, delivered with care and reliability.</p>
          {/* <button className="text-blue-400 hover:text-blue-600" onClick={() => handleScrollToSection('aboutSection')}>Go to About</button> */}
        </div>
        <div className="footer-section">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm mb-1">1234 Main Street, City, Country</p>
          <p className="text-sm mb-1">Email: example@example.com</p>
          <p className="text-sm mb-4">Phone: +1234567890</p>
          {/* <button className="text-blue-400 hover:text-blue-600" onClick={() => handleScrollToSection('contactSection')}>Go to Contact</button> */}
        </div>
        <div className="footer-section">
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <p className="text-sm mb-4">At Shopkaro.com, we are committed to providing exceptional services to our valued customers. With our fast shipping options, you can expect timely delivery of your orders right to your doorstep. Rest assured, your payments are secure with our trusted payment gateways and encryption methods.</p>
          <p className="text-sm mb-4">We understand that shopping online can sometimes be daunting, which is why we offer easy returns for your peace of mind. Our 24/7 customer support team is always here to assist you with any queries or concerns you may have, ensuring a seamless shopping experience.</p>
          {/* <button className="text-blue-400 hover:text-blue-600" onClick={() => handleScrollToSection('servicesSection')}>Go to Services</button> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
