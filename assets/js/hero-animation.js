/**
 * Interactive Hero Canvas Animation
 * Precision Field Scanning - visualizing laser precision and detection
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let gridLines = [];
        let mouse = { x: null, y: null, radius: 120 };
        let animationId;

        // Resize canvas
        function resizeCanvas() {
            const container = canvas.parentElement;
            width = container.offsetWidth;
            height = container.offsetWidth * 0.75; // 4:3 aspect ratio
            canvas.width = width;
            canvas.height = height;
            initParticles();
            initGrid();
        }

        // Particle class - represents detection points
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2 + 1;
                this.baseX = x;
                this.baseY = y;
                this.density = Math.random() * 30 + 10;
                this.distance = 0;
                this.color = `rgba(225, 227, 222, ${Math.random() * 0.5 + 0.5})`;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                this.distance = Math.sqrt(dx * dx + dy * dy);

                const forceDirectionX = dx / this.distance;
                const forceDirectionY = dy / this.distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - this.distance) / maxDistance;
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;

                if (this.distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }

        // Grid line class - represents scanning grid
        class GridLine {
            constructor(isVertical, position) {
                this.isVertical = isVertical;
                this.position = position;
                this.opacity = Math.random() * 0.3 + 0.1;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }

            draw() {
                this.pulsePhase += this.pulseSpeed;
                const pulseFactor = Math.sin(this.pulsePhase) * 0.15 + 0.85;
                ctx.strokeStyle = `rgba(120, 180, 120, ${this.opacity * pulseFactor})`;
                ctx.lineWidth = 1;
                ctx.beginPath();

                if (this.isVertical) {
                    ctx.moveTo(this.position, 0);
                    ctx.lineTo(this.position, height);
                } else {
                    ctx.moveTo(0, this.position);
                    ctx.lineTo(width, this.position);
                }

                ctx.stroke();
            }
        }

        // Initialize particles
        function initParticles() {
            particles = [];
            const numberOfParticles = Math.floor((width * height) / 4000);
            for (let i = 0; i < numberOfParticles; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                particles.push(new Particle(x, y));
            }
        }

        // Initialize grid
        function initGrid() {
            gridLines = [];
            const gridSpacing = 60;
            for (let i = 0; i < width; i += gridSpacing) {
                gridLines.push(new GridLine(true, i));
            }
            for (let i = 0; i < height; i += gridSpacing) {
                gridLines.push(new GridLine(false, i));
            }
        }

        // Connect nearby particles
        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(100, 150, 100, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Draw scanning cursor
        function drawCursor() {
            if (mouse.x && mouse.y) {
                // Outer ring
                ctx.strokeStyle = 'rgba(100, 180, 100, 0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
                ctx.stroke();

                // Inner crosshair
                ctx.strokeStyle = 'rgba(100, 180, 100, 0.6)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(mouse.x - 15, mouse.y);
                ctx.lineTo(mouse.x + 15, mouse.y);
                ctx.moveTo(mouse.x, mouse.y - 15);
                ctx.lineTo(mouse.x, mouse.y + 15);
                ctx.stroke();

                // Center dot
                ctx.fillStyle = 'rgba(100, 180, 100, 0.8)';
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Animation loop
        function animate() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(0, 0, width, height);

            // Draw grid
            gridLines.forEach(line => line.draw());

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Connect particles
            connectParticles();

            // Draw cursor
            drawCursor();

            animationId = requestAnimationFrame(animate);
        }

        // Mouse events
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Touch events for mobile
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            mouse.x = touch.clientX - rect.left;
            mouse.y = touch.clientY - rect.top;
        });

        canvas.addEventListener('touchend', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Initialize
        resizeCanvas();
        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            cancelAnimationFrame(animationId);
            resizeCanvas();
            animate();
        });
    });

})();
