// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
	const nav = document.querySelector('nav');
	if (window.scrollY > 100) {
		nav.style.background = 'rgba(255, 255, 255, 0.25)';
	} else {
		nav.style.background = 'rgba(255, 255, 255, 0.2)';
	}
});