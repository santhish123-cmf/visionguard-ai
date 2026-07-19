// AI Defect Detection & Maintenance System - Shared State Manager & UI Utilities

// Load DB from LocalStorage
let db = getSystemDB();

// Dynamic Header Stats Renderer
function renderHeaderStats() {
  const healthBadge = document.querySelector(".health-badge");
  if (healthBadge && db && db.stats) {
    const criticalCount = db.maintenanceOrders.filter(o => o.priority === "Critical" && o.status !== "Completed").length;
    
    let colorClass = "healthy";
    let statusText = `System Nominal • ${db.stats.plantHealthIndex}%`;
    
    if (criticalCount > 0) {
      colorClass = "critical";
      statusText = `${criticalCount} Critical Alerts • ${db.stats.plantHealthIndex}%`;
    } else if (db.maintenanceOrders.filter(o => o.priority === "High" && o.status !== "Completed").length > 0) {
      colorClass = "warning";
      statusText = `Warnings Pending • ${db.stats.plantHealthIndex}%`;
    }
    
    healthBadge.className = `health-badge ${colorClass}`;
    healthBadge.innerHTML = `<span class="health-dot" style="background-color: var(--color-${colorClass}); animation: pulse-${colorClass === 'healthy' ? 'green' : 'red'} 2s infinite;"></span> ${statusText}`;
  }
}

// Toast Alert System
function showToast(message, type = "info") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }
  
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <span style="cursor:pointer; margin-left: 10px;" onclick="this.parentElement.remove()">✕</span>
  `;
  
  toastContainer.appendChild(toast);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.style.animation = "slide-in 0.3s reverse forwards";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Custom CSS for pulse animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes pulse-red {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 51, 102, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(255, 51, 102, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 51, 102, 0); }
  }
  @keyframes pulse-yellow {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 170, 0, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(255, 170, 0, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 170, 0, 0); }
  }
`;
document.head.appendChild(styleSheet);

// Active navigation link highlighting & responsive menu handler
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navItems = document.querySelectorAll(".nav-links li");
  
  navItems.forEach(item => {
    const link = item.querySelector("a");
    if (link) {
      const linkPath = link.getAttribute("href");
      if (linkPath === currentPath) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    }
  });

  // Mobile menu toggle logic
  const navToggle = document.getElementById("nav-toggle-btn");
  const navLinksMenu = document.querySelector(".nav-links");
  
  if (navToggle && navLinksMenu) {
    navToggle.addEventListener("click", () => {
      navLinksMenu.classList.toggle("active-mobile");
      navToggle.classList.toggle("open");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navLinksMenu.contains(e.target)) {
        navLinksMenu.classList.remove("active-mobile");
        navToggle.classList.remove("open");
      }
    });
  }
  
  renderHeaderStats();
});

// Helper to update global state db
function updateDB(callback) {
  db = getSystemDB();
  callback(db);
  saveSystemDB(db);
  renderHeaderStats();
}

