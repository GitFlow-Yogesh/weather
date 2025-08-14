import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
  
    
        <div className="footer-social">
          <a href="https://linkedin.com/in/yogesh-yadav24" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/GitFlow-Yogesh" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://leetcode.com/yogeshrao5024/" target="_blank" rel="noopener noreferrer">LeetCode</a>
        </div>
  

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Made By Yogesh  All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
