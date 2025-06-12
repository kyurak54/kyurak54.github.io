// Scroll progress indicator
window.addEventListener('scroll', () => {
	const scrollTop = document.documentElement.scrollTop;
	const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	const progress = (scrollTop / scrollHeight) * 100;
	document.querySelector('.scroll-indicator').style.transform = `scaleX(${progress / 100})`;
});

// Smooth reveal animation for cards
const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = '1';
			entry.target.style.transform = 'translateY(0)';
		}
	});
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card, .project-card, .skill-item').forEach(el => {
	el.style.opacity = '0';
	el.style.transform = 'translateY(20px)';
	el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
	observer.observe(el);
});

// Interactive cursor effect
document.addEventListener('mousemove', (e) => {
	const cursor = document.querySelector('.cursor');
	if (!cursor) {
		const newCursor = document.createElement('div');
		newCursor.className = 'cursor';
		newCursor.style.cssText = `
			position: fixed;
			width: 20px;
			height: 20px;
			background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
			border-radius: 50%;
			pointer-events: none;
			z-index: 9999;
			transition: transform 0.1s ease;
		`;
		document.body.appendChild(newCursor);
	}
	
	const cursorElement = document.querySelector('.cursor');
	cursorElement.style.left = e.clientX - 10 + 'px';
	cursorElement.style.top = e.clientY - 10 + 'px';
});

// Add hover effects to interactive elements
document.querySelectorAll('.glass-card, .project-card, .skill-item, .contact-btn').forEach(el => {
	el.addEventListener('mouseenter', () => {
		const cursor = document.querySelector('.cursor');
		if (cursor) cursor.style.transform = 'scale(1.5)';
	});
	
	el.addEventListener('mouseleave', () => {
		const cursor = document.querySelector('.cursor');
		if (cursor) cursor.style.transform = 'scale(1)';
	});
});
