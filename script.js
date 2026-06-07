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
  'ASIB SORKAR',
  'Technical SEO Expert',
  'Search Visibility Strategist',
  'Generative Engine Optimization',
  
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

const contactForm = document.getElementById('form');
const resultText = document.getElementById('result');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    resultText.innerHTML = "Sending...";

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            if (response.status == 200) {
                resultText.innerHTML = "Message Sent Successfully!";
                contactForm.reset(); 
                
                
                if (window.navigator && window.navigator.clearData) {
                    window.navigator.clearData();
                }
            } else {
                let res = await response.json();
                resultText.innerHTML = res.message;
            }
        })
        .catch(error => {
            resultText.innerHTML = "Something went wrong!";
        })
        .then(function() {
            setTimeout(() => {
                resultText.innerHTML = "";
            }, 4000); 
        });
  });
}

window.onload = typeEffect;
