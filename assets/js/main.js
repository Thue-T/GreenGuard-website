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
    const roadmapContainer = document.querySelector('.gg-roadmap-container');
    if (!roadmapContainer) return;

    const svg = roadmapContainer.querySelector('.gg-roadmap-svg');
    const milestones = roadmapContainer.querySelectorAll('.milestone');
    const detailWrapper = document.getElementById('roadmap-detail-wrapper');
    const detailBox = document.getElementById('roadmap-detail-box');
    const detailTitle = document.getElementById('roadmap-detail-title');
    const detailText = document.getElementById('roadmap-detail-text');

    let activeMilestone = null;
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    function getDetailBoxCenterInSvg() {
      const boxRect = detailBox.getBoundingClientRect();
      const point = svg.createSVGPoint();
      point.x = boxRect.left + boxRect.width / 2;
      point.y = boxRect.top + boxRect.height / 2;
      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      const svgPoint = point.matrixTransform(ctm.inverse());
      return { x: svgPoint.x, y: svgPoint.y };
    }

    function getConnectorGeometry(milestone) {
      const circle = milestone.querySelector('circle');
      if (!circle) return null;

      const startX = parseFloat(circle.getAttribute('cx'));
      const startY = parseFloat(circle.getAttribute('cy'));
      const { x: endX, y: endY } = getDetailBoxCenterInSvg();

      const dx = endX - startX;
      const dy = endY - startY;
      const length = Math.sqrt(dx * dx + dy * dy);

      return { startX, startY, endX, endY, length };
    }

    function applyConnectorGeometry(connector, geometry) {
      if (!geometry) return;
      connector.setAttribute('x1', geometry.startX);
      connector.setAttribute('y1', geometry.startY);
      connector.setAttribute('x2', geometry.endX);
      connector.setAttribute('y2', geometry.endY);
      connector.setAttribute('stroke-dasharray', geometry.length);
      connector.setAttribute('stroke-dashoffset', geometry.length);
    }

    function deactivateAllMilestones() {
      if (activeMilestone) {
        activeMilestone.milestone.classList.remove('active');
        activeMilestone.connector.classList.remove('active');
      }
      detailWrapper.classList.remove('active');
      detailBox.classList.remove('active');
      activeMilestone = null;
    }

    function activateMilestone(milestone) {
      if (activeMilestone && activeMilestone.milestone === milestone) {
        return;
      }

      // Deactivate any currently active milestone before activating a new one
      deactivateAllMilestones();

      const circle = milestone.querySelector('circle');
      const connector = milestone.querySelector('.connector');
      if (!circle || !connector || !detailBox || !detailTitle || !detailText) return;

      // --- 1. Populate Content ---
      detailTitle.textContent = milestone.dataset.title || '';
      detailText.textContent = milestone.dataset.text || '';

      // --- 2. Calculations ---
      const geometry = getConnectorGeometry(milestone);

      // --- 3. Update Connector ---
      applyConnectorGeometry(connector, geometry);

      // --- 4. Calculate Detail Box "Emerge" Translation ---
      if (geometry) {
        const emergeTranslateX = (geometry.startX - geometry.endX) * 0.15; // Move slightly from the direction of the milestone
        detailBox.style.setProperty('--translate-x', `${emergeTranslateX}px`);
      }

      // --- 5. Activate Animations ---
      // We need a tiny delay to ensure CSS transitions apply correctly after properties are set
      setTimeout(() => {
        milestone.classList.add('active');
        connector.classList.add('active');
        detailWrapper.classList.add('active');
        detailBox.classList.add('active');
        applyConnectorGeometry(connector, getConnectorGeometry(milestone));
        activeMilestone = { milestone, connector };
      }, 10);

      requestAnimationFrame(() => {
        applyConnectorGeometry(connector, getConnectorGeometry(milestone));
      });
    }

    // --- 6. Event Listeners ---
    milestones.forEach(ms => {
      const circle = ms.querySelector('circle');
      if (isTouchDevice) {
        // On touch devices, activate on tap
        circle.addEventListener('click', (e) => {
          e.stopPropagation();
          if (activeMilestone && activeMilestone.milestone === ms) {
            deactivateAllMilestones();
          } else {
            activateMilestone(ms);
          }
        });
      } else {
        // On desktop, activate on hover
        circle.addEventListener('mouseenter', () => activateMilestone(ms));
      }
    });

    // Deactivation logic
    if (isTouchDevice) {
      document.addEventListener('click', (e) => {
        if (activeMilestone && !roadmapContainer.contains(e.target)) {
          deactivateAllMilestones();
        }
      });
    } else {
      roadmapContainer.addEventListener('mouseleave', () => deactivateAllMilestones());
    }

    window.addEventListener('resize', () => {
      if (activeMilestone) {
        const { milestone, connector } = activeMilestone;
        applyConnectorGeometry(connector, getConnectorGeometry(milestone));
      }
    });
  });

})();
