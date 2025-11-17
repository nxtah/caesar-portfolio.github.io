
// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function(){
	const nav = document.getElementById('nav');
	const toggle = document.getElementById('nav-toggle');
	const navLinks = document.querySelectorAll('.nav-link');
	const yearEl = document.getElementById('year');

	if(yearEl) yearEl.textContent = new Date().getFullYear();

	toggle.addEventListener('click', ()=>{
		nav.classList.toggle('open');
		toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
	});

	// Close mobile menu on link click
	navLinks.forEach(l => l.addEventListener('click', ()=> nav.classList.remove('open')));

	// Smooth scroll
	document.querySelectorAll('a[href^="#"]').forEach(a => {
		a.addEventListener('click', function(e){
			const href = this.getAttribute('href');
			if(href.length>1){
				e.preventDefault();
				const el = document.querySelector(href);
				if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
			}
		});
	});

	// Reveal on scroll & active nav
	const sections = document.querySelectorAll('main .section');
	const options = {root:null, rootMargin:'0px', threshold:0.15};
	const observer = new IntersectionObserver((entries)=>{
		entries.forEach(entry =>{
			const id = entry.target.id;
			const link = document.querySelector('.nav-link[href="#'+id+'"]');
			if(entry.isIntersecting){
				entry.target.querySelectorAll('.reveal').forEach(n => n.classList.add('is-visible'));
				if(link){
					document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));
					link.classList.add('active');
				}
			}
		});
	}, options);

	sections.forEach(s => observer.observe(s));
  
	// Close nav when tapping outside (mobile)
	document.addEventListener('click', (e)=>{
		const isClickInsideNav = nav.contains(e.target) || toggle.contains(e.target);
		if(!isClickInsideNav && nav.classList.contains('open')){
			nav.classList.remove('open');
			toggle.setAttribute('aria-expanded','false');
		}
	});
});
