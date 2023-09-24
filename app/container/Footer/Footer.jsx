'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async () => {
  //   setLoading(true);

  //   const contact = {
  //     name,
  //     email,
  //     message,
  //   };

  //   try {
  //     const response = await fetch('/api/send', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(contact),
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log('Response Data:', responseData);
  //     } else {
  //       console.error('Error:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };


// client.create(contact)
    //   .then(() => {
    //     setLoading(false);
    //     setIsFormSubmitted(true);
    //   })
    //   .catch((err) => console.log(err));
  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>
      
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <Image src={images.email} alt="email" width={40} height={40} className='.img' />
          <a href="mailto:soliemansnossy@gmail.com" className="p-text">
            soliemansnossy@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <Image src={images.mobile} alt="phone" width={40} height={40} className='.img' />
          <a href="tel:+201125833982" className="p-text">
            +20 1125833982
          </a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <form action="/api/send" method="post" className="app__flex">
          <div className="app__footer-form app__flex">
            <div className="app__flex">
              <input
                className="p-text"
                type="text"
                placeholder="Your Name"
                name="name"
                value={name}
                onChange={handleChangeInput}
              />
            </div>
            <div className="app__flex">
              <input
                className="p-text"
                type="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <textarea
                className="p-text"
                placeholder="Your Message"
                value={message}
                name="message"
                onChange={handleChangeInput}
              />
            </div>
            <button className="p-text" 
            // onClick={handleSubmit} 
            type="submit">
              {!loading ? 'Send Message' : 'Sending...'}
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__whitebg');
