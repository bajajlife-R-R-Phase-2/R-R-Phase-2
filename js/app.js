// ==========================================
// CORE APPLICATION LOGIC & UTILITIES
// ==========================================

const App = {
    // 1. Storage Helpers
    getData(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },

    // 2. Formatting Helpers
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    },

    formatNumber(num) {
        return new Intl.NumberFormat('en-IN').format(num);
    },

    // 3. Layout Rendering
    renderLayout(activePageId) {
        const layoutHTML = `
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>InsureCentive</h2>
          <div class="subtitle">Indian Life Insurance R&R</div>
        </div>
        <nav class="sidebar-nav">
          <a href="index.html" class="nav-item ${activePageId === 'executive' ? 'active' : ''}"><i class="fas fa-chart-line"></i> Executive View</a>
          <a href="agency-dashboard.html" class="nav-item ${activePageId === 'agency' ? 'active' : ''}"><i class="fas fa-building"></i> Agency Channel</a>
          <a href="banca-dashboard.html" class="nav-item ${activePageId === 'banca' ? 'active' : ''}"><i class="fas fa-university"></i> Bancassurance</a>
          <a href="query.html" class="nav-item ${activePageId === 'query' ? 'active' : ''}"><i class="fas fa-ticket-alt"></i> Query Tool</a>
          <a href="simulation.html" class="nav-item ${activePageId === 'simulation' ? 'active' : ''}"><i class="fas fa-sliders-h"></i> Payout Simulation</a>
          <a href="notifications.html" class="nav-item ${activePageId === 'notifications' ? 'active' : ''}"><i class="fas fa-bell"></i> Notifications</a>
          <a href="hierarchy.html" class="nav-item ${activePageId === 'hierarchy' ? 'active' : ''}"><i class="fas fa-sitemap"></i> Hierarchy</a>
          <a href="invoicing.html" class="nav-item ${activePageId === 'invoicing' ? 'active' : ''}"><i class="fas fa-file-invoice-dollar"></i> Invoicing</a>
          <a href="vendor.html" class="nav-item ${activePageId === 'vendor' ? 'active' : ''}"><i class="fas fa-handshake"></i> Vendor Mgmt</a>
          <a href="gamification.html" class="nav-item ${activePageId === 'gamification' ? 'active' : ''}"><i class="fas fa-trophy"></i> Gamification</a>
        </nav>
        <div class="sidebar-footer">
          <div class="user-avatar">AD</div>
          <div class="user-info">
            <div class="user-name">Ashok Desai</div>
            <div class="user-role">Zone Head - West</div>
          </div>
        </div>
      </aside>
      <main class="main-content">
        <header class="topbar">
          <div class="page-title" id="page-title">Dashboard</div>
          <div class="topbar-actions">
            <button class="action-btn" title="AI Insights"><i class="fas fa-magic"></i></button>
            <button class="action-btn" title="Notifications">
              <i class="fas fa-bell"></i>
              <span class="badge">3</span>
            </button>
            <button class="action-btn" title="Settings"><i class="fas fa-cog"></i></button>
          </div>
        </header>
        <div class="content-wrapper" id="page-content">
          <!-- Page content injected here -->
        </div>
      </main>
      
      <!-- Global Modal Skeleton -->
      <div class="modal-overlay" id="global-modal">
        <div class="modal-box">
          <div class="modal-header">
            <h3 id="modal-title">Modal Title</h3>
            <button class="close-modal" onclick="App.closeModal()">&times;</button>
          </div>
          <div class="modal-body" id="modal-body">
            <!-- Content -->
          </div>
          <div class="modal-footer" id="modal-footer">
            <button class="btn btn-outline" onclick="App.closeModal()">Close</button>
            <button class="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    `;

        document.body.innerHTML = layoutHTML;
    },

    setPageTitle(title) {
        document.getElementById('page-title').innerText = title;
    },

    setContent(html) {
        document.getElementById('page-content').innerHTML = html;
    },

    // 4. Modal System
    openModal(title, bodyHTML, footerHTML) {
        document.getElementById('global-modal').classList.add('active');
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-body').innerHTML = bodyHTML;
        if (footerHTML) {
            document.getElementById('modal-footer').innerHTML = footerHTML;
        }
    },

    closeModal() {
        document.getElementById('global-modal').classList.remove('active');
    },

    // 5. Chart.js Wrapper to dry up code
    renderChart(canvasId, type, data, options = {}) {
        const ctx = document.getElementById(canvasId).getContext('2d');

        // Default chart properties for enterprise feel
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.color = "#64748b";

        return new Chart(ctx, {
            type: type,
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true, padding: 20 }
                    }
                },
                ...options
            }
        });
    }
};
