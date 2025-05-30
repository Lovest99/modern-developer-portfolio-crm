import React, { useEffect, useRef, useState } from 'react';

interface TechIconsBackgroundProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  intensity?: 'low' | 'medium' | 'high';
  iconSize?: 'small' | 'medium' | 'large';
}

const TechIconsBackground: React.FC<TechIconsBackgroundProps> = ({
  variant = 'primary',
  intensity = 'medium',
  iconSize = 'medium'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);

  // Define tech stack logo paths
  const techLogoPaths = [
    '/images/stacklogos/javascript.png',
    '/images/stacklogos/reactjs.png',
    '/images/stacklogos/phplogo.png',
    '/images/stacklogos/laravellogo.png',
    '/images/stacklogos/pythonlogo.png',
    '/images/stacklogos/mysql.png',
    '/images/stacklogos/flutterlogo.png',
    '/images/stacklogos/supabaselogo.png'
  ];

  // Get color scheme based on variant
  const getColorScheme = () => {
    switch (variant) {
      case 'primary':
        return {
          main: 'rgba(6, 182, 212, 0.7)',    // cyan
          secondary: 'rgba(124, 58, 237, 0.7)',   // purple
          accent: 'rgba(59, 130, 246, 0.7)',   // blue
        };
      case 'secondary':
        return {
          main: 'rgba(124, 58, 237, 0.7)',   // purple
          secondary: 'rgba(6, 182, 212, 0.7)',    // cyan
          accent: 'rgba(236, 72, 153, 0.7)',   // pink
        };
      case 'tertiary':
        return {
          main: 'rgba(59, 130, 246, 0.7)',   // blue
          secondary: 'rgba(16, 185, 129, 0.7)',   // emerald
          accent: 'rgba(245, 158, 11, 0.7)',    // amber
        };
      default:
        return {
          main: 'rgba(6, 182, 212, 0.7)',
          secondary: 'rgba(124, 58, 237, 0.7)',
          accent: 'rgba(59, 130, 246, 0.7)',
        };
    }
  };

  // Get opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case 'low':
        return 0.25;
      case 'medium':
        return 0.35;
      case 'high':
        return 0.45;
      default:
        return 0.35;
    }
  };

  // Get size based on iconSize - reduced by half
  const getSize = () => {
    switch (iconSize) {
      case 'small':
        return { min: 15, max: 20 };
      case 'medium':
        return { min: 20, max: 30 };
      case 'large':
        return { min: 30, max: 40 };
      default:
        return { min: 20, max: 30 };
    }
  };

  // Load all images first
  useEffect(() => {
    const loadImages = async () => {
      const images: HTMLImageElement[] = [];
      let loadedCount = 0;

      const loadPromises = techLogoPaths.map((path) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.onload = () => {
            loadedCount++;
            resolve(img);
            if (loadedCount === techLogoPaths.length) {
              setImagesLoaded(true);
              setLoadedImages(images);
            }
          };
          img.src = path;
          images.push(img);
        });
      });

      await Promise.all(loadPromises);
    };

    loadImages();
  }, []);

  // Set up canvas and animation after images are loaded
  useEffect(() => {
    if (!imagesLoaded || loadedImages.length === 0) return;

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

    const opacity = getOpacity();
    const size = getSize();

    // Create particles
    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      image: HTMLImageElement;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      scale: number;
    }[] = [];

    // Create initial particles
    const createParticles = () => {
      // Even fewer particles - about 8-10 for a typical screen (half of previous)
      const particleCount = Math.min(Math.floor(window.innerWidth / 160), 10);

      for (let i = 0; i < particleCount; i++) {
        const imageIndex = Math.floor(Math.random() * loadedImages.length);
        const sizeMultiplier = Math.random() * (size.max - size.min) / 30 + (size.min / 30);

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 25, // Base size for scaling (half of previous)
          // Much slower speed
          speed: Math.random() * 0.2 + 0.05,
          image: loadedImages[imageIndex],
          rotation: Math.random() * 360,
          // Slower rotation
          rotationSpeed: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * opacity + (opacity / 2),
          scale: sizeMultiplier
        });
      }
    };

    createParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.y += particle.speed;
        particle.rotation += particle.rotationSpeed;

        if (particle.y > canvas.height) {
          particle.y = -50;
          particle.x = Math.random() * canvas.width;
        }

        // Save the current context state
        ctx.save();

        // Move to the particle position
        ctx.translate(particle.x, particle.y);

        // Rotate the context
        ctx.rotate(particle.rotation * Math.PI / 180);

        // Set global alpha for opacity
        ctx.globalAlpha = particle.opacity;

        // Calculate scaled dimensions while maintaining aspect ratio
        const aspectRatio = particle.image.width / particle.image.height;
        const scaledWidth = particle.size * particle.scale * aspectRatio;
        const scaledHeight = particle.size * particle.scale;

        // Draw the image centered
        ctx.drawImage(
          particle.image,
          -scaledWidth / 2,
          -scaledHeight / 2,
          scaledWidth,
          scaledHeight
        );

        // Restore the context to its original state
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [imagesLoaded, loadedImages, variant, intensity, iconSize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default TechIconsBackground;
