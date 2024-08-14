import React, { useEffect, useState } from 'react';
import './App.css';
import emailjs from 'emailjs-com';

function App() {
  const [showHeart, setShowHeart] = useState(false);
  const [sunY, setSunY] = useState(window.innerHeight * 0.65);

  const handleYesClick = () => {
    setShowHeart(true);
    sendYesEmail();
  };

  const handleNoClick = () => {
    sendNoEmail();
  };

  useEffect(() => {
    const canvas = document.getElementById('sunsetCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let requestId;

    function drawSunset() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#ff7e5f');
      gradient.addColorStop(1, '#feb47b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the heart-shaped sun behind the hills
      ctx.beginPath();
      const heartX = canvas.width / 2;
      const heartY = sunY;
      const heartSize = 75;

      ctx.moveTo(heartX, heartY - heartSize / 2);
      ctx.bezierCurveTo(
        heartX - heartSize / 2,
        heartY - heartSize,
        heartX - heartSize,
        heartY + heartSize / 4,
        heartX,
        heartY + heartSize
      );
      ctx.bezierCurveTo(
        heartX + heartSize,
        heartY + heartSize / 4,
        heartX + heartSize / 2,
        heartY - heartSize,
        heartX,
        heartY - heartSize / 2
      );
      ctx.closePath();
      ctx.fillStyle = '#FFD700';
      ctx.fill();

      // Draw the hills on top of the sun
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      ctx.lineTo(0, canvas.height * 0.7);
      ctx.bezierCurveTo(
        canvas.width * 0.25,
        canvas.height * 0.8,
        canvas.width * 0.75,
        canvas.height * 0.6,
        canvas.width,
        canvas.height * 0.7
      );
      ctx.lineTo(canvas.width, canvas.height);
      ctx.fillStyle = '#3e3c3a';
      ctx.fill();
      ctx.closePath();

      // Animate the sun
      if (sunY > canvas.height * 0.4) {
        setSunY(sunY - 0.5);
        requestId = requestAnimationFrame(drawSunset);
      }
    }

    drawSunset();

    // Clean up animation on unmount
    return () => cancelAnimationFrame(requestId);
  }, [sunY]);

  const sendYesEmail = () => {
    emailjs
      .send(
        'service_2cze3zq',
        'template_qcc09zo',
        {
          to_name: 'Admin',
          message: 'Someone said YES!',
        },
        'sV3ti73_cabpngeZv'
      )
      .then(
        (response) => {
          console.log('Email sent successfully!', response.status, response.text);
        },
        (error) => {
          console.error('Failed to send email:', error);
        }
      );
  };

  const sendNoEmail = () => {
    emailjs
      .send(
        'service_2cze3zq',
        'template_qcc09zo',
        {
          to_name: 'Admin',
          message: 'Someone said No!',
        },
        'sV3ti73_cabpngeZv'
      )
      .then(
        (response) => {
          console.log('Email sent successfully!', response.status, response.text);
        },
        (error) => {
          console.error('Failed to send email:', error);
        }
      );
  };

  return (
    <div className="container">
      <canvas id="sunsetCanvas"></canvas>
      <div className="content">
        <div className="poem-container">
          <p className="poem-text">
            "I used to not be able to imagine something more breathtaking than the sun's bow as it leaves the stage for the stars to take over. Until I became completely captivated by the way the sun dances on your hair and how the light of the sun could never dream of comparing to the one in your eyes. Lost in a matter of a few minutes while staring at a woman of such beauty. Trying not to stare, but also not wanting to look away. Stuttering on my words because the only thing that wants to come out are the words "Will you be my girlfriend?"
          </p>
          <button className="cta-button" onClick={handleYesClick}>
            Yes
          </button>
          <button className="no-button" onClick={handleNoClick}>
            No
          </button>
        </div>

        {showHeart && <div className="heart">❤️</div>}
      </div>
    </div>
  );
}

export default App;
