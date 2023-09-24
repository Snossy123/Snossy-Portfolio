import React from 'react';
import { BsTwitter, BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
// import { Link } from 'next/link';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href={'https://www.linkedin.com/in/solieman-snossy/'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <BsLinkedin />
      </a>
    </div>
    <div>
      <a href="https://github.com/Snossy123" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <FaGithub />
      </a>
    </div>
    <div>
      <a href="https://twitter.com/EngSnossy" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <BsTwitter />
      </a>
    </div>
  </div>
);

export default SocialMedia;
