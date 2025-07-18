// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    const companyList = document.getElementById('company-list');
    const chartTitle = document.getElementById('chart-title');
    const ctx = document.getElementById('stock-chart').getContext('2d');
    let stockChart;

    const API_BASE_URL = 'http://localhost:3000'; // Your backend server URL

    // Fetch the list of companies and populate the left panel
    async function loadCompanies() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/companies`);
            const companies = await response.json();

            companyList.innerHTML = ''; // Clear existing list
            companies.forEach(company => {
                const li = document.createElement('li');
                li.textContent = company.name;
                li.dataset.ticker = company.ticker;
                li.addEventListener('click', () => {
                    // Highlight the active company
                    document.querySelectorAll('#company-list li').forEach(item => item.classList.remove('active'));
                    li.classList.add('active');
                    loadStockData(company.ticker, company.name);
                });
                companyList.appendChild(li);
            });
        } catch (error) {
            console.error('Failed to load companies:', error);
            companyList.innerHTML = '<li>Error loading companies.</li>';
        }
    }

    // Fetch historical data and render the chart
    async function loadStockData(ticker, name) {
        chartTitle.textContent = `Loading data for ${name}...`;
        try {
            const response = await fetch(`${API_BASE_URL}/api/historical/${ticker}`);
            const data = await response.json();
            
            const labels = data.map(d => new Date(d.date).toLocaleDateString());
            const prices = data.map(d => d.close);
            
            chartTitle.textContent = `${name} (${ticker})`;

            // If a chart instance already exists, destroy it
            if (stockChart) {
                stockChart.destroy();
            }

            // Create a new chart
            stockChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `Stock Price (Close)`,
                        data: prices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1,
                        pointRadius: 1,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                }
            });

        } catch (error) {
            console.error('Failed to load stock data:', error);
            chartTitle.textContent = `Could not load data for ${name}.`;
        }
    }

    // Initial load
    loadCompanies();
});