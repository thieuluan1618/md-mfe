//Raidal Sunbeams
const canvas = document.getElementById('sunbeamCanvas');
const ctx = canvas.getContext('2d');

// Initial canvas size setup
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables
let config = {
    amountOfBeams: 50,
    minLength: window.innerHeight, // Dynamic based on current window size
    maxLength: Math.sqrt(window.innerWidth**2 + window.innerHeight**2), // Hypotenuse
    gradientStartOpacity: 0.05,
    gradientEndOpacity: 0,
    circleRadius: 130, // Radius of the circle representing the sun    
	  blurStrength: 5,
    fadeInOutTime: 15,
    rotationSpeed: -0.004, // Radians per frame
    lineWidth: 45,
    beamOrigin: {x: 0, y: 0}, // Adjust as needed for other corners
	  beamColor: 0,
};

function generateBeams() {
    let beams = [];
    for (let i = 0; i < config.amountOfBeams; i++) {
        let length = Math.random() * (config.maxLength - config.minLength) + config.minLength;
        let angle = Math.random() * Math.PI * 2;
      
        // Generate a random width for each beam
        let widthRandomness = Math.random(); // Generate a random number between 0 and 1
        let biasedWidth = widthRandomness * widthRandomness; // Square it to bias towards smaller numbers
        let width = biasedWidth * (config.lineWidth - config.lineWidth / 10) + config.lineWidth / 10;
        let opacityPhase = Math.random() * Math.PI * 2; // Random phase for each beam

		beams.push({length, angle, width, opacityPhase});
    }
    return beams;
}

let beams = generateBeams();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the sun
  ctx.beginPath();
  ctx.arc(config.beamOrigin.x, config.beamOrigin.y, config.circleRadius, 0, Math.PI * 2, false);
  
  // Set the fill style to sun gradient
  let sunGradient = ctx.createRadialGradient(config.beamOrigin.x, config.beamOrigin.y, 0, config.beamOrigin.x, config.beamOrigin.y, config.circleRadius);
  sunGradient.addColorStop(0, 'rgba(255, 204, 0, 1)'); // Inner color
  sunGradient.addColorStop(1, 'rgba(255, 153, 0, 0.95)'); // Outer color, semi-transparent
  
  ctx.fillStyle = sunGradient;
  ctx.fill();
  ctx.closePath();

  // Apply blur filter
  ctx.filter = `blur(${config.blurStrength}px)`;

  beams.forEach(beam => {
    beam.angle += config.rotationSpeed;
    const time = performance.now() / 1000; // Get time in seconds
    const opacity = (Math.sin(time * Math.PI / config.fadeInOutTime + beam.opacityPhase) + 1) / 2;

    drawBeam(beam, opacity);
  });

  requestAnimationFrame(animate);
}

function drawBeam(beam, opacity) {
  let x0 = config.beamOrigin.x, y0 = config.beamOrigin.y;
  let x1 = x0 + Math.cos(beam.angle) * beam.length;
  let y1 = y0 + Math.sin(beam.angle) * beam.length;

  let gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  gradient.addColorStop(0, `rgba(255, 255, 0, ${config.gradientStartOpacity * opacity})`);
  gradient.addColorStop(1, `rgba(255, 255, 0, ${config.gradientEndOpacity * opacity})`);

  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = beam.width;
  ctx.stroke();
}

animate()
