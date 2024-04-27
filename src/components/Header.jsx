import React from "react";

const Header = () => {
  const logo = "./tryy.png";
  const logoHeight = 150; // Desired height for the logo

  // Define the gradient style for the text
  const gradientStyle = {
    background: "-webkit-linear-gradient(left, #888888, #ffffff)", // WebKit browsers
    WebkitBackgroundClip: "text", // Clip the background to the text
    WebkitTextFillColor: "transparent", // Hide the original text color
    fontWeight: "bold",
    fontSize: 40, // Desired font size in pixels
    marginRight: 10, // Spacing between logo and text
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Logo */}
      <img
        src={logo}
        alt="logo"
        style={{ height: logoHeight, width: "auto", marginRight: 10 }} // Set height and maintain aspect ratio
      />

      {/* Text with gradient color */}
      <span style={gradientStyle}>PolyPhonic</span>
    </div>
  );
};

export default Header;
