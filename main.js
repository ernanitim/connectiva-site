// Função para inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar cursor personalizado
  initCustomCursor();
  
  // Inicializar efeito de digitação
  initTypewriterEffect();
  
  // Inicializar carrossel
  initCarousel();
  
  // Inicializar animações ao scroll
  initScrollAnimations();
  
  // Inicializar hotspots do mapa
  initMapHotspots();
});

// Cursor personalizado
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Adicionar um pequeno atraso para o seguidor do cursor
    setTimeout(function() {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 50);
  });
  
  // Efeito de hover em links e botões
  const links = document.querySelectorAll('a, button');
  links.forEach(link => {
    link.addEventListener('mouseenter', function() {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursorFollower.style.width = '40px';
      cursorFollower.style.height = '40px';
    });
    
    link.addEventListener('mouseleave', function() {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursorFollower.style.width = '30px';
      cursorFollower.style.height = '30px';
    });
  });
}

// Efeito de digitação para o título principal
function initTypewriterEffect() {
  const typewriterElement = document.querySelector('.typewriter');
  if (!typewriterElement) return;
  
  const text = typewriterElement.textContent;
  typewriterElement.textContent = '';
  typewriterElement.style.borderRight = '0.15em solid #ff5c00';
  
  let i = 0;
  const speed = 100; // velocidade da digitação em milissegundos
  
  function type() {
    if (i < text.length) {
      typewriterElement.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Remover a borda piscante após a digitação
      setTimeout(() => {
        typewriterElement.style.borderRight = 'none';
      }, 2000);
    }
  }
  
  // Iniciar a digitação após um pequeno atraso
  setTimeout(type, 1000);
}

// Carrossel de imagens
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (!slides.length || !dots.length) return;
  
  let currentSlide = 0;
  let slideInterval;
  
  // Função para mostrar um slide específico
  function showSlide(n) {
    // Remover classe active de todos os slides e dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Adicionar classe active ao slide e dot atual
    slides[n].classList.add('active');
    dots[n].classList.add('active');
    
    // Atualizar o índice do slide atual
    currentSlide = n;
  }
  
  // Função para avançar para o próximo slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  // Função para voltar para o slide anterior
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  
  // Adicionar event listeners aos botões
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Adicionar event listeners aos dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      clearInterval(slideInterval); // Parar o intervalo quando o usuário clica em um dot
      startSlideInterval(); // Reiniciar o intervalo
    });
  });
  
  // Iniciar o intervalo para trocar os slides automaticamente
  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000); // Trocar slide a cada 5 segundos
  }
  
  // Iniciar o carrossel
  startSlideInterval();
}

// Animações ao scroll usando GSAP e ScrollTrigger
function initScrollAnimations() {
  // Verificar se GSAP está disponível
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Registrar o plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animação para a seção Sobre
    gsap.from('.about', {
      scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 1
    });
    
    // Animação para os cards de planos
    gsap.from('.plan-card', {
      scrollTrigger: {
        trigger: '.plans',
        start: 'top 70%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
    
    // Animação para os itens de público
    gsap.from('.audience-item', {
      scrollTrigger: {
        trigger: '.for-who',
        start: 'top 70%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15
    });
    
    // Animação para o mapa de cobertura
    gsap.from('.map-container', {
      scrollTrigger: {
        trigger: '.coverage-map',
        start: 'top 70%',
        toggleActions: 'play none none none'
      },
      scale: 0.9,
      opacity: 0,
      duration: 1
    });
    
    // Animação para a seção de contato
    gsap.from('.contact', {
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 1
    });
  }
}

// Animação dos hotspots do mapa
function initMapHotspots() {
  const hotspots = document.querySelectorAll('.hotspot');
  
  // Adicionar tooltip ao passar o mouse sobre os hotspots
  hotspots.forEach((hotspot, index) => {
    // Criar um elemento de tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '10';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.3s ease';
    tooltip.style.pointerEvents = 'none';
    
    // Definir o conteúdo do tooltip com base no índice
    const locations = [
      'Londrina - 500+ clientes',
      'Cambé - 300+ clientes',
      'Rolândia - 250+ clientes',
      'Ibiporã - 200+ clientes',
      'Arapongas - 150+ clientes',
      'Apucarana - 100+ clientes'
    ];
    
    tooltip.textContent = locations[index] || `Região ${index + 1}`;
    
    // Adicionar o tooltip ao documento
    document.body.appendChild(tooltip);
    
    // Mostrar o tooltip ao passar o mouse sobre o hotspot
    hotspot.addEventListener('mouseenter', function() {
      const rect = hotspot.getBoundingClientRect();
      tooltip.style.left = rect.left + 'px';
      tooltip.style.top = (rect.top - 30) + 'px';
      tooltip.style.opacity = '1';
    });
    
    // Esconder o tooltip ao tirar o mouse do hotspot
    hotspot.addEventListener('mouseleave', function() {
      tooltip.style.opacity = '0';
    });
  });
}

// Função para criar o logo SVG animado
function createAnimatedLogo() {
  // Implementação do logo SVG animado
  // Esta é uma versão simplificada, pode ser expandida conforme necessário
  const logoSvg = document.getElementById('logo-svg');
  const footerLogoSvg = document.getElementById('footer-logo-svg');
  
  if (logoSvg) {
    logoSvg.innerHTML = `
      <circle cx="30" cy="30" r="25" fill="none" stroke="#ff5c00" stroke-width="2" />
      <text x="60" y="35" fill="#ff5c00" font-size="24" font-weight="bold">Connectiva</text>
      <circle class="orbit" cx="30" cy="30" r="15" fill="none" stroke="#00c2ff" stroke-width="1" />
      <circle class="satellite" cx="45" cy="30" r="3" fill="#00c2ff" />
    `;
    
    // Adicionar animação à órbita
    const orbit = logoSvg.querySelector('.orbit');
    const satellite = logoSvg.querySelector('.satellite');
    
    if (orbit && satellite) {
      // Animação da órbita
      gsap.to(orbit, {
        rotation: 360,
        transformOrigin: "30px 30px",
        repeat: -1,
        duration: 10,
        ease: "none"
      });
      
      // Animação do satélite
      gsap.to(satellite, {
        rotation: 360,
        transformOrigin: "30px 30px",
        repeat: -1,
        duration: 5,
        ease: "none"
      });
    }
  }
  
  // Replicar o logo no rodapé
  if (footerLogoSvg) {
    footerLogoSvg.innerHTML = logoSvg.innerHTML;
    
    // Adicionar as mesmas animações
    const orbit = footerLogoSvg.querySelector('.orbit');
    const satellite = footerLogoSvg.querySelector('.satellite');
    
    if (orbit && satellite) {
      gsap.to(orbit, {
        rotation: 360,
        transformOrigin: "30px 30px",
        repeat: -1,
        duration: 10,
        ease: "none"
      });
      
      gsap.to(satellite, {
        rotation: 360,
        transformOrigin: "30px 30px",
        repeat: -1,
        duration: 5,
        ease: "none"
      });
    }
  }
}

// Chamar a função para criar o logo animado quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', createAnimatedLogo);

// Adicionar ícones SVG para os cards de planos
function addPlanIcons() {
  const planSvgs = document.querySelectorAll('.plan-svg');
  
  const icons = [
    // Ícone para Plano Residencial
    `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
     <polyline points="9 22 9 12 15 12 15 22"></polyline>`,
    
    // Ícone para Plano Gamer
    `<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
     <line x1="3" y1="6" x2="21" y2="6"></line>
     <path d="M16 10a4 4 0 0 1-8 0"></path>`,
    
    // Ícone para Plano Empresarial
    `<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
     <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>`,
    
    // Ícone para Plano Rural
    `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
     <circle cx="12" cy="10" r="3"></circle>`
  ];
  
  planSvgs.forEach((svg, index) => {
    if (index < icons.length) {
      svg.innerHTML = icons[index];
    }
  });
}

// Adicionar ícones SVG para os itens de público
function addAudienceIcons() {
  const audienceIcons = document.querySelectorAll('.audience-icon svg');
  
  const icons = [
    // Ícone para Famílias
    `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
     <circle cx="9" cy="7" r="4"></circle>
     <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
     <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`,
    
    // Ícone para Gamers
    `<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
     <line x1="8" y1="21" x2="16" y2="21"></line>
     <line x1="12" y1="17" x2="12" y2="21"></line>`,
    
    // Ícone para Empreendedores
    `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
     <circle cx="12" cy="7" r="4"></circle>`,
    
    // Ícone para Área Rural
    `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
     <polyline points="9 22 9 12 15 12 15 22"></polyline>`
  ];
  
  audienceIcons.forEach((svg, index) => {
    if (index < icons.length) {
      svg.innerHTML = icons[index];
    }
  });
}

// Adicionar ícones SVG para contato
function addContactIcons() {
  const contactIcons = document.querySelectorAll('.contact-item svg');
  
  const icons = [
    // Ícone para Telefone
    `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>`,
    
    // Ícone para Email
    `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
     <polyline points="22,6 12,13 2,6"></polyline>`,
    
    // Ícone para Endereço
    `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
     <circle cx="12" cy="10" r="3"></circle>`
  ];
  
  contactIcons.forEach((svg, index) => {
    if (index < icons.length) {
      svg.innerHTML = icons[index];
    }
  });
}

// Adicionar ícones SVG para redes sociais
function addSocialIcons() {
  const socialIcons = document.querySelectorAll('.social-icon svg');
  
  const icons = [
    // Ícone para Facebook
    `<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>`,
    
    // Ícone para Instagram
    `<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
     <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
     <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>`,
    
    // Ícone para Twitter/X
    `<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>`
  ];
  
  socialIcons.forEach((svg, index) => {
    if (index < icons.length) {
      svg.innerHTML = icons[index];
    }
  });
}

// Adicionar ícone SVG para WhatsApp
function addWhatsAppIcon() {
  const whatsappIcon = document.querySelector('.whatsapp-button svg');
  
  if (whatsappIcon) {
    whatsappIcon.innerHTML = `
      <path d="M17 2H7C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5z" fill="#25D366"></path>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7 8.75c.25-.15.54-.05.64.22.11.27.45.89.49.96.04.06.02.14-.01.21-.03.07-.06.12-.11.18-.05.06-.11.13-.16.18-.05.04-.11.09-.05.18.06.09.28.38.6.82.41.53.76.7.87.77.08.05.13.04.18-.02.05-.07.22-.26.28-.35.06-.09.12-.07.2-.04.08.03.51.24.6.29.08.04.14.06.16.1.02.04.02.22-.05.43-.07.21-.42.42-.58.45-.15.03-.29.14-.95-.2-.66-.34-1.09-.61-1.41-1.38-.16-.39-.27-.71-.27-.82 0-.11.06-.16.13-.23.06-.06.14-.16.21-.24.07-.08.09-.14.14-.23.05-.1.02-.18-.01-.25-.03-.07-.3-.72-.4-.98-.11-.26-.21-.22-.29-.22-.08 0-.16-.01-.25-.01z" fill="white"></path>
    `;
  }
}

// Chamar todas as funções para adicionar ícones quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  addPlanIcons();
  addAudienceIcons();
  addContactIcons();
  addSocialIcons();
  addWhatsAppIcon();
});
