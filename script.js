// MetalForge Interactivity
document.addEventListener('DOMContentLoaded', () => {
    console.log('MetalForge Loaded Successfully');

    // Add smooth scrolling for navigation links
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add to cart animation
    const cartBtns = document.querySelectorAll('.btn-secondary, .btn-primary');
    cartBtns.forEach(btn => {
        if (btn.innerText.includes('Add to Cart')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Added! ✓';
                btn.style.backgroundColor = '#27ae60';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                }, 2000);
            });
        }
    });
});
