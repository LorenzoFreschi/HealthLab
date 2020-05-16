document.addEventListener('DOMContentLoaded', function () {
	setTimeout(function () {
		document.getElementById('spinner-box').remove();
		document.getElementById('body').classList.remove('overflow-y-hidden');
	}, 1500);
});

//toggle descrizioni principi di still

unoOpen = false;
dueOpen = false;
treOpen = false;

uno = document.getElementById('uno');
due = document.getElementById('due');
tre = document.getElementById('tre');

contentUno = document.getElementById('cnt-uno');
contentDue = document.getElementById('cnt-due');
contentTre = document.getElementById('cnt-tre');
uno.addEventListener('click', function () {
	console.log('test uno');
	console.log(unoOpen);

	if (!unoOpen) {
		contentUno.classList.remove('hidden');
	} else {
		contentUno.classList.add('hidden');
	}

	unoOpen = !unoOpen;
});

due.addEventListener('click', function () {
	/*     console.log("test due");
    console.log(dueOpen); */

	if (!dueOpen) {
		contentDue.classList.remove('hidden');
	} else {
		contentDue.classList.add('hidden');
	}

	dueOpen = !dueOpen;
});

tre.addEventListener('click', function () {
	/*     console.log("test tre");
    console.log(treOpen); */

	if (!treOpen) {
		contentTre.classList.remove('hidden');
	} else {
		contentTre.classList.add('hidden');
	}

	treOpen = !treOpen;
});

const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = false; // Auto scroll
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
	// Get current class
	const current = document.querySelector('.current');
	// Remove current class
	current.classList.remove('current');
	// Check for next slide
	if (
		current.nextElementSibling &&
		!current.nextElementSibling.classList.contains('buttons')
	) {
		// Add current to next sibling

		current.nextElementSibling.classList.add('current');
	} else {
		// Add current to start
		slides[0].classList.add('current');
	}
	setTimeout(() => current.classList.remove('current'));
};

const prevSlide = () => {
	// Get current class
	const current = document.querySelector('.current');
	// Remove current class
	current.classList.remove('current');
	// Check for prev slide
	if (current.previousElementSibling) {
		// Add current to prev sibling

		current.previousElementSibling.classList.add('current');
	} else {
		// Add current to last
		slides[slides.length - 1].classList.add('current');
	}
	setTimeout(() => current.classList.remove('current'));
};

// Button events
next.addEventListener('click', (e) => {
	nextSlide();
	if (auto) {
		clearInterval(slideInterval);
		slideInterval = setInterval(nextSlide, intervalTime);
	}
});

prev.addEventListener('click', (e) => {
	prevSlide();
	if (auto) {
		clearInterval(slideInterval);
		slideInterval = setInterval(nextSlide, intervalTime);
	}
});

// Auto slide
if (auto) {
	// Run next slide at interval time
	slideInterval = setInterval(nextSlide, intervalTime);
}
