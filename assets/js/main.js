/**
* Template Name: Axis
* Template URL: https://bootstrapmade.com/axis-bootstrap-corporate-template/
* Updated: Sep 13 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 0 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  document.addEventListener('DOMContentLoaded', () => {
    const svg = document.querySelector('.gg-roadmap-svg');
    const container = document.querySelector('.gg-roadmap-container');
    const milestones = document.querySelectorAll('.gg-roadmap-container .milestone');
    const detailBox = document.getElementById('roadmap-detail-box');
    const detailTitle = document.getElementById('roadmap-detail-title');
    const detailText = document.getElementById('roadmap-detail-text');
    const follow = document.querySelector('.roadmap-follow');

    const connectorOffsets = [-50, -10, 25, 60, -35, 30];

    function clientToSvgCoords(svgEl, x, y) {
      const pt = svgEl.createSVGPoint();
      pt.x = x;
      pt.y = y;
      return pt.matrixTransform(svgEl.getScreenCTM().inverse());
    }

    function resetRoadmap() {
      milestones.forEach(item => {
        item.classList.remove('active');
        const connector = item.querySelector('.connector');
        if (connector) {
          connector.setAttribute('opacity', '0');
          connector.setAttribute('stroke-dashoffset', '0');
          connector.setAttribute('stroke-dasharray', '0');
        }
      });
      if (detailBox) {
        detailBox.classList.add('d-none');
        detailBox.classList.remove('active');
        detailBox.style.removeProperty('--roadmap-tx');
      }
      if (container) container.classList.remove('roadmap-active');
      if (follow) follow.style.marginTop = '';
    }

    function updateConnector(ms, connector, targetX, targetY) {
      const circle = ms.querySelector('circle');
      if (!circle || !connector || !svg) return;

      const circleRect = circle.getBoundingClientRect();
      const circleCenterX = circleRect.left + circleRect.width / 2;
      const circleCenterY = circleRect.top + circleRect.height / 2;
      const svgStart = clientToSvgCoords(svg, circleCenterX, circleCenterY);
      const svgEnd = clientToSvgCoords(svg, targetX, targetY);

      connector.setAttribute('x1', svgStart.x);
      connector.setAttribute('y1', svgStart.y);
      connector.setAttribute('x2', svgEnd.x);
      connector.setAttribute('y2', svgEnd.y);

      const dx = svgEnd.x - svgStart.x;
      const dy = svgEnd.y - svgStart.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      connector.setAttribute('stroke-dasharray', length.toString());
      connector.setAttribute('stroke-dashoffset', length.toString());
      connector.setAttribute('opacity', '1');

      requestAnimationFrame(() => {
        connector.setAttribute('stroke-dashoffset', '0');
      });
    }

    function activateMilestone(ms) {
      const index = Array.from(milestones).indexOf(ms);
      milestones.forEach(item => item.classList.remove('active'));
      ms.classList.add('active');
      if (!detailTitle || !detailText || !detailBox || !svg) return;

      detailTitle.textContent = ms.getAttribute('data-title') || '';
      detailText.textContent = ms.getAttribute('data-text') || '';
      detailBox.classList.remove('d-none');

      detailBox.classList.remove('active');
      detailBox.style.visibility = 'hidden';
      detailBox.style.opacity = '0';

      requestAnimationFrame(() => {
        const boxRect = detailBox.getBoundingClientRect();
        const containerRect = container ? container.getBoundingClientRect() : svg.getBoundingClientRect();
        const boxCenterX = boxRect.left + boxRect.width / 2;
        const boxCenterY = boxRect.top + boxRect.height / 2 - 4;

        const circle = ms.querySelector('circle');
        const circleRect = circle ? circle.getBoundingClientRect() : null;
        const circleCenterX = circleRect ? circleRect.left + circleRect.width / 2 : boxCenterX;

        const relCenterX = circleCenterX - containerRect.left;
        const desiredTx = relCenterX - (boxRect.width / 2) - (boxRect.left - containerRect.left);
        detailBox.style.setProperty('--roadmap-tx', `${desiredTx}px`);

        const offsetX = (connectorOffsets[index] || 0);
        const targetX = boxCenterX + offsetX;
        const targetY = boxCenterY;

        const connector = ms.querySelector('.connector');
        if (connector) {
          updateConnector(ms, connector, targetX, targetY);
        }

        if (container) container.classList.add('roadmap-active');
        if (follow) follow.style.marginTop = '48px';

        requestAnimationFrame(() => {
          detailBox.style.visibility = 'visible';
          detailBox.classList.add('active');
        });
      });
    }

    milestones.forEach(ms => {
      const circle = ms.querySelector('circle');
      if (!circle) return;
      circle.addEventListener('mouseenter', () => activateMilestone(ms));
      circle.addEventListener('click', () => activateMilestone(ms));
    });

    if (svg) {
      svg.addEventListener('mouseleave', () => resetRoadmap());
    }

    document.addEventListener('pointerdown', (e) => {
      if (!container) return;
      if (!container.contains(e.target)) {
        resetRoadmap();
      }
    });
  });

})();
