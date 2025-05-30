import React, { useEffect, useRef } from 'react';

const TechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Tech symbols and code snippets
    const symbols = [
      '{', '}', '()', '[]', ';', '//', '/*', '*/', '=>', '+=', '&&', '||',
      '<div>', '</div>', '</>',
      'function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while',
      'class', 'import', 'export', 'from', 'async', 'await',
      'React', 'Vue', 'Angular', 'Node', 'PHP', 'Laravel', 'Python', 'Java', 'C#',
      '0101', '1010', '0x', 'API', 'REST', 'JSON', 'HTTP', 'SQL', 'NoSQL',
      '404', '200', '500', 'GET', 'POST', 'PUT', 'DELETE'
    ];

    // Create particles
    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      text: string;
      opacity: number;
      color: string;
    }[] = [];

    const colors = [
      'rgba(6, 182, 212, 0.7)',    // cyan
      'rgba(124, 58, 237, 0.7)',   // purple
      'rgba(236, 72, 153, 0.7)',   // magenta
      'rgba(59, 130, 246, 0.7)',   // blue
      'rgba(16, 185, 129, 0.7)',   // green
      'rgba(245, 158, 11, 0.7)'    // amber
    ];

    // Create initial particles
    const createParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 12 + 8,
          speed: Math.random() * 0.5 + 0.1,
          text: symbols[Math.floor(Math.random() * symbols.length)],
          opacity: Math.random() * 0.15 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    createParticles();

    // Binary rain effect
    const binaryStrings: {
      x: number;
      y: number;
      speed: number;
      length: number;
      chars: string[];
      opacity: number;
    }[] = [];

    const createBinaryStrings = () => {
      const stringCount = Math.min(Math.floor(window.innerWidth / 100), 15);

      for (let i = 0; i < stringCount; i++) {
        const length = Math.floor(Math.random() * 15) + 5;
        const chars = [];

        for (let j = 0; j < length; j++) {
          chars.push(Math.random() > 0.5 ? '1' : '0');
        }

        binaryStrings.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 1 + 0.5,
          length: length,
          chars: chars,
          opacity: Math.random() * 0.12 + 0.08
        });
      }
    };

    createBinaryStrings();

    // Connection lines
    const drawConnections = () => {
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
      drawConnections();

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.y += particle.speed;

        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }

        ctx.font = `${particle.size}px monospace`;
        ctx.fillStyle = particle.color.replace('0.7', String(particle.opacity));
        ctx.fillText(particle.text, particle.x, particle.y);
      });

      // Update and draw binary strings
      binaryStrings.forEach((string, index) => {
        string.y += string.speed;

        if (string.y > canvas.height) {
          string.y = -string.length * 20;
          string.x = Math.random() * canvas.width;
        }

        ctx.font = '14px monospace';

        for (let i = 0; i < string.length; i++) {
          const charOpacity = string.opacity * (1 - i / string.length);
          ctx.fillStyle = `rgba(6, 182, 212, ${charOpacity})`;
          ctx.fillText(string.chars[i], string.x, string.y - i * 20);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
};

export default TechBackground;
