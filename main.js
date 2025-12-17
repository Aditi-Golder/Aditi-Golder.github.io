// main.js

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


function loadContent(section) {
    const file = section + '-content.html';
    fetch(file)
      .then(response => response.text())
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
      })
      .catch(error => {
        console.error('Error loading content:', error);
        document.getElementById('main-content').innerHTML = '<p>Error loading content.</p>';
      });
  }
  
  // Load home content by default on page load
  window.onload = function () {
    loadContent('home');
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
      if (distanceToBottom < 200) {
        footer.classList.add('show');
      } else {
        footer.classList.remove('show');
      }
    }

    updateFooterVisibility();
    window.addEventListener('scroll', updateFooterVisibility, { passive: true });
    window.addEventListener('resize', updateFooterVisibility);
  })();
  