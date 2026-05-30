/**
 * YourBrand Period Underwear — Main JavaScript
 * Lightweight, performance-focused, accessible
 */

(function() {
    'use strict';

    // ===== MOBILE MENU =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('mobile-open');
            document.body.classList.toggle('menu-open');
        });
    }

    // ===== SMOOTH SCROLL for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update URL without jumping
                history.pushState(null, '', targetId);
            }
        });
    });

    // ===== PRODUCT GALLERY THUMBNAILS =====
    const mainImage = document.getElementById('main-image');
    const thumbs = document.querySelectorAll('.thumb');

    if (mainImage && thumbs.length > 0) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    mainImage.src = img.src.replace(/-thumb/, '');
                    mainImage.alt = this.getAttribute('aria-label') || '';
                }
                thumbs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // ===== VARIANT SWATCHES =====
    const swatches = document.querySelectorAll('.swatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const name = this.querySelector('input')?.name;
            if (name) {
                document.querySelectorAll(`.swatch input[name="${name}"]`).forEach(input => {
                    input.closest('.swatch').classList.remove('active');
                });
            }
            this.classList.add('active');
            this.querySelector('input').checked = true;
        });
    });

    // ===== VARIANT BUTTONS (SIZE) =====
    const variantBtns = document.querySelectorAll('.variant-btn');
    variantBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.querySelector('input')?.name;
            if (name) {
                document.querySelectorAll(`.variant-btn input[name="${name}"]`).forEach(input => {
                    input.closest('.variant-btn').classList.remove('active');
                });
            }
            this.classList.add('active');
            this.querySelector('input').checked = true;
        });
    });

    // ===== QUANTITY SELECTOR =====
    const qtyInput = document.querySelector('.quantity-selector input');
    const qtyBtns = document.querySelectorAll('.qty-btn');

    if (qtyInput && qtyBtns.length === 2) {
        qtyBtns[0].addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) qtyInput.value = val - 1;
        });
        qtyBtns[1].addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val < 10) qtyInput.value = val + 1;
        });
    }

    // ===== COLLECTION FILTERS =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-grid .product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                productCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = '';
                        return;
                    }
                    // Simple filter logic based on absorbency text content
                    const absorbencyText = card.querySelector('.absorbency-text')?.textContent?.toLowerCase() || '';
                    const badge = card.querySelector('.product-card__badge')?.textContent?.toLowerCase() || '';
                    
                    let show = false;
                    if (filter === 'light' && absorbencyText.includes('light')) show = true;
                    if (filter === 'moderate' && absorbencyText.includes('moderate')) show = true;
                    if (filter === 'heavy' && absorbencyText.includes('heavy') && !absorbencyText.includes('super')) show = true;
                    if (filter === 'super' && absorbencyText.includes('super')) show = true;
                    if (filter === 'best-sellers' && badge.includes('best seller')) show = true;
                    if (filter === 'sets' && card.closest('.bundles')) show = true;
                    
                    card.style.display = show ? '' : 'none';
                });
            });
        });
    }

    // ===== COUNTDOWN TIMER =====
    function updateCountdown() {
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (!hoursEl || !minutesEl || !secondsEl) return;

        // Set deadline to tonight at midnight
        const now = new Date();
        const deadline = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        const diff = deadline - now;

        if (diff <= 0) {
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    if (document.getElementById('hours')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ===== INTERSECTION OBSERVER for scroll animations =====
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        };

        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for scroll reveal
        document.querySelectorAll('.product-card, .step, .feature, .testimonial, .blog-card, .bundle-card, .local-card, .story-block, .giving-partner, .neighborhood-group, .local-info-card').forEach(el => {
            el.classList.add('reveal');
            fadeObserver.observe(el);
        });
        
        // Stagger children in grids
        document.querySelectorAll('.product-grid, .steps, .features, .testimonial-grid, .bundle-grid, .blog-grid, .local-grid').forEach(grid => {
            const children = grid.children;
            Array.from(children).forEach((child, index) => {
                child.classList.add(`reveal-delay-${Math.min(index + 1, 4)}`);
            });
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('.product-card, .step, .feature, .testimonial, .blog-card, .bundle-card, .local-card, .story-block, .giving-partner, .neighborhood-group, .local-info-card').forEach(el => {
            el.classList.add('is-visible');
        });
    }

    // ===== ADD TO CART FEEDBACK =====
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const originalText = this.textContent;
            this.textContent = '✓ Added to Cart!';
            this.style.background = 'var(--color-success)';
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                let count = parseInt(cartCount.textContent) || 0;
                const qty = document.querySelector('.quantity-selector input');
                count += parseInt(qty?.value || 1);
                cartCount.textContent = count;
            }

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 2000);
        });
    }

    // ===== NEWSLETTER FORM =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const btn = this.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Subscribed! 🎉';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                this.reset();
            }, 3000);
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    let lastScroll = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                // Close other items (optional accordion behavior)
                faqItems.forEach(other => {
                    if (other !== this && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });

    // ===== CART PERSISTENCE (simple) =====
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('yourbrand_cart') || '[]');
        } catch {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem('yourbrand_cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const cart = getCart();
        const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
        const cartCountEl = document.querySelector('.cart-count');
        if (cartCountEl) {
            cartCountEl.textContent = count;
        }
    }

    // Initialize cart count on page load
    updateCartCount();

    console.log('🩸 YourBrand loaded. Period underwear that actually works.');

})();
