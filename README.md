# InsureCentive - Incentive Compensation & R&R Platform Prototype

This is a fully interactive, front-end prototype of an Indian Life Insurance Incentive Platform. It uses Vanilla HTML5, CSS3, JavaScript, and Chart.js.

## Features Included
1. **Executive Dashboard**: Aggregate liability, NB vs Renewal split, Persistency heatmaps.
2. **Agency Channel**: RNB performance, Club Tracker.
3. **Bancassurance Channel**: Self vs Assisted sourcing tracking.
4. **Query Management**: SLA ticket timers and payout explanations.
5. **Payout Simulation**: Adjust variables (slab %, persistency logic) to calculate budget variance.
6. **Notifications Engine**: Automated nudge generation based on mock metrics.
7. **Hierarchy Management**: Simulated org tree and IC → SM transfers.
8. **Invoicing**: TDS 10% defaults, PT deductions, T1/T2/T3 coding logic.
9. **Vendor Management**: KYC compliance and SLA tracking for external incentive providers.
10. **Gamification**: Streaks, MDRT qualifiers, and convention progress timers.

## How to Run

Because this project uses ES6 features and `localStorage` to mock an API and database, it must be run via a local web server (opening the `.html` files directly from `C:\` might block `localStorage` access on some strict browsers, though it typically works).

### Option 1: Python HTTP Server (Recommended)
1. Open your terminal/command prompt.
2. Navigate to this directory (`C:\Users\mayur\.gemini\antigravity\scratch\ic-platform`).
3. Run the following command:
   ```bash
   python -m http.server 8000
   ```
4. Open your browser and navigate to `http://localhost:8000`.

### Option 2: VS Code Live Server
1. Open the folder in Visual Studio Code.
2. Install the "Live Server" extension.
3. Right click on `index.html` and click "Open with Live Server".

## Application State Reset
The mock data (Zones, Branches, ICs, Query Tickets, Budgets) is generated on the first load and saved to your browser's Local Storage. 
If you wish to re-generate random data (e.g., reset the simulations or view different numbers):
1. Open Browser Dev Tools (`F12`).
2. Go to the **Application** tab (Chrome) or **Storage** tab (Firefox).
3. Clear `Local Storage`.
4. Refresh the page.
