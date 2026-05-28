const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if(pageYOffset >= sectionTop - 200){
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');

    if(link.getAttribute('href').includes(current)){
      link.classList.add('active');
    }
  });
});

const roles = [
  'Technical SEO Expert',
  'OSINT Researcher',
  'Digital Intelligence Specialist',
  'Search Visibility Strategist'
];

let roleIndex = 0;
let charIndex = 0;

const typingElement = document.querySelector('.typing-text');

function typeEffect(){

  if(charIndex < roles[roleIndex].length){
    typingElement.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect,100);
  }
  else{
    setTimeout(eraseEffect,2000);
  }
}

function eraseEffect(){

  if(charIndex > 0){
    typingElement.textContent = roles[roleIndex].substring(0,charIndex-1);
    charIndex--;
    setTimeout(eraseEffect,50);
  }
  else{
    roleIndex++;

    if(roleIndex >= roles.length){
      roleIndex = 0;
    }

    setTimeout(typeEffect,500);
  }
}

window.onload = typeEffect;
