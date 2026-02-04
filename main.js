// main.js

// News carousel scroll function
function scrollNews(direction) {
  const container = document.querySelector('.news-cards-container');
  if (container) {
    container.scrollBy({
      left: direction * 340,
      behavior: 'smooth'
    });
  }
}

// Add dark/light theme toggle
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.createElement("button");
    toggle.className = "toggle-theme";
    toggle.innerHTML = "☀️";
    document.querySelector("nav").appendChild(toggle);
  
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      toggle.innerHTML = document.body.classList.contains("dark") ? "🌙" : "☀️";
    });
  });
// main.js


// Store the original home content on page load
let homeContent = null;

document.addEventListener('DOMContentLoaded', function() {
  // Save the original home content
  homeContent = document.getElementById('main-content').innerHTML;
});

function loadContent(section) {
    // Home is static in index.html, restore the original home content
    if (section === 'home') {
      if (homeContent) {
        document.getElementById('main-content').innerHTML = homeContent;
      }
      return;
    }
    
    const file = section + '-content.html';
    fetch(file)
      .then(response => response.text())
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
        
        // Reload scripts after a small delay to ensure DOM is ready
        setTimeout(() => {
          const scripts = document.getElementById('main-content').querySelectorAll('script[src]');
          scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            newScript.type = 'text/javascript';
            if (oldScript.id) newScript.id = oldScript.id;
            newScript.src = oldScript.src;
            newScript.async = true;
            newScript.defer = false;
            oldScript.parentNode.replaceChild(newScript, oldScript);
          });
        }, 50);
        
        // Recalculate layout-dependent UI (e.g., footer visibility)
        try {
          window.dispatchEvent(new Event('resize'));
        } catch (e) {}
      })
      .catch(error => {
        console.error('Error loading content:', error);
        document.getElementById('main-content').innerHTML = '<p>Error loading content.</p>';
      });
  }
  
  // Load home content by default on page load (home is now static)
  window.onload = function () {
    // Reload globe widget script to ensure it initializes
    setTimeout(() => {
      const globeScript = document.getElementById('mmvst_globe');
      if (globeScript) {
        const newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.id = 'mmvst_globe';
        newScript.src = '//mapmyvisitors.com/globe.js?d=6fxZpZfaQw2WV5XFhecj1Kz7WLHXrDdV_5Q0OQoto7E';
        newScript.async = true;
        globeScript.parentNode.replaceChild(newScript, globeScript);
      }
    }, 500);
  };


  function toggleDetails(headerEl) {
    const details = headerEl.nextElementSibling;
    const icon = headerEl.querySelector('.toggle-icon');

    if (details.classList.contains("open")) {
      details.classList.remove("open");
      icon.textContent = "▼";
      icon.setAttribute("title", "Expand");
    } else {
      details.classList.add("open");
      icon.textContent = "▲";
      icon.setAttribute("title", "Collapse");
    }
  }

  // Reveal footer near bottom of page
  (function setupFooterReveal(){
    const footer = document.getElementById('site-footer');
    if (!footer) return;
    document.body.classList.add('has-fixed-footer');

    function updateFooterVisibility(){
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const viewport = window.innerHeight;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const distanceToBottom = docHeight - (scrollY + viewport);
      const scrollable = docHeight - viewport;

      // Show only near the rear end: very close to bottom, after meaningful scroll, and only on tall pages
        const nearEnd = distanceToBottom < 40;
        const scrolled = scrollY > 240;
        const pageTallEnough = scrollable > 400;

        if (!pageTallEnough || (nearEnd && scrolled)) {
          footer.classList.add('show');
        } else {
          footer.classList.remove('show');
        }
    }

    updateFooterVisibility();
    window.addEventListener('scroll', updateFooterVisibility, { passive: true });
    window.addEventListener('resize', updateFooterVisibility);
  })();
  