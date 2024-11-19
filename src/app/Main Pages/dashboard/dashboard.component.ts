import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { Router } from 'express';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
      });
    }

    // Initialize Charts
    this.initCharts();
  }

  private initCharts(): void {
    const userGrowthCanvas = document.getElementById('userGrowthChart') as HTMLCanvasElement | null;
    const revenueCanvas = document.getElementById('revenueChart') as HTMLCanvasElement | null;

    if (userGrowthCanvas && revenueCanvas) {
      const userGrowthCtx = userGrowthCanvas.getContext('2d');
      const revenueCtx = revenueCanvas.getContext('2d');

      if (userGrowthCtx && revenueCtx) {
        // Common chart options
        Chart.defaults.color = '#94a3b8';
        Chart.defaults.borderColor = '#334155';

        // User Growth Chart Configuration
        const userGrowthConfig: ChartConfiguration = {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Users',
                data: [3000, 4500, 5200, 6800, 7400, 8249],
                borderColor: '#7dd3fc',
                backgroundColor: 'rgba(125, 211, 252, 0.1)',
                fill: true,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: '#1e293b',
                },
              },
              x: {
                grid: {
                  color: '#1e293b',
                },
              },
            },
          } as ChartOptions,
        };

        // Revenue Chart Configuration
        const revenueConfig: ChartConfiguration = {
          type: 'doughnut',
          data: {
            labels: ['Products', 'Services', 'Subscriptions'],
            datasets: [
              {
                data: [12500, 8000, 4000],
                backgroundColor: ['#7dd3fc', '#38bdf8', '#0284c7'],
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
          } as ChartOptions,
        };

        // Create charts
        new Chart(userGrowthCtx, userGrowthConfig);
        new Chart(revenueCtx, revenueConfig);
      }
    }
  }
}
