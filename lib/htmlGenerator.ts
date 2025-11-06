// lib/htmlGenerator.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import type { ProgramStructure } from './types.js';

export function generateHTML(program: ProgramStructure): void {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${program.programName} - Interactive Viewer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f6f7;
            color: #2c3e50;
            line-height: 1.6;
        }

        header {
            background: #2c3e50;
            color: white;
            padding: 2rem;
            text-align: center;
        }

        header h1 {
            margin-bottom: 0.5rem;
        }

        .container {
            max-width: 1400px;
            margin: 2rem auto;
            padding: 0 2rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .stat-card h3 {
            font-size: 0.875rem;
            color: #7f8c8d;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }

        .stat-card .value {
            font-size: 2rem;
            font-weight: bold;
            color: #3498db;
        }

        .calendar-section {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }

        .calendar-section h2 {
            margin-bottom: 1rem;
        }

        .calendar-table {
            width: 100%;
            border-collapse: collapse;
        }

        .calendar-table th {
            background: #ecf0f1;
            padding: 0.75rem;
            text-align: left;
            font-weight: 600;
        }

        .calendar-table td {
            padding: 0.75rem;
            border-bottom: 1px solid #ecf0f1;
        }

        .workout-link {
            color: #3498db;
            text-decoration: none;
            cursor: pointer;
        }

        .workout-link:hover {
            text-decoration: underline;
        }

        .tss-badge {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.875rem;
            margin-left: 0.5rem;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            max-width: 1000px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }

        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #7f8c8d;
        }

        .modal-close:hover {
            color: #2c3e50;
        }

        .workout-image {
            width: 100%;
            margin: 1rem 0;
        }

        .charts-section {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .charts-section img {
            width: 100%;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <header>
        <h1>${program.programName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
        <p>Interactive Workout Calendar & Statistics</p>
    </header>

    <div class="container">
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Weeks</h3>
                <div class="value">${program.stats.totalWeeks}</div>
            </div>
            <div class="stat-card">
                <h3>Total Workouts</h3>
                <div class="value">${program.stats.totalWorkouts}</div>
            </div>
            <div class="stat-card">
                <h3>Total TSS</h3>
                <div class="value">${Math.round(program.stats.totalTSS)}</div>
            </div>
            <div class="stat-card">
                <h3>Total Hours</h3>
                <div class="value">${program.stats.totalHours.toFixed(1)}</div>
            </div>
            <div class="stat-card">
                <h3>Avg TSS/Week</h3>
                <div class="value">${Math.round(program.stats.avgTSSPerWeek)}</div>
            </div>
            <div class="stat-card">
                <h3>Avg Hours/Week</h3>
                <div class="value">${program.stats.avgHoursPerWeek.toFixed(1)}</div>
            </div>
        </div>

        <div class="calendar-section">
            <h2>Workout Calendar</h2>
            <table class="calendar-table">
                <thead>
                    <tr>
                        <th>Week</th>
                        <th>Day</th>
                        <th>Workout</th>
                        <th>Duration</th>
                        <th>TSS</th>
                    </tr>
                </thead>
                <tbody>
${generateCalendarRows(program)}
                </tbody>
            </table>
        </div>

        <div class="charts-section">
            <h2>Progression Analysis</h2>
            <img src="../images/progression.png" alt="Progression Charts">
        </div>
    </div>

    <div class="modal" id="workoutModal">
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <div id="modalBody"></div>
        </div>
    </div>

    <script>
        const workouts = ${JSON.stringify(generateWorkoutData(program))};

        function showWorkout(filename) {
            const workout = workouts[filename];
            if (!workout) return;

            const modal = document.getElementById('workoutModal');
            const body = document.getElementById('modalBody');

            const imageFilename = filename.replace('.zwo', '.png');

            body.innerHTML = \`
                <h2>\${workout.name}</h2>
                <p><strong>Week \${workout.week}, Day \${workout.day} (\${workout.dayName})</strong></p>
                <p>\${workout.description}</p>
                <img src="../images/individual/\${imageFilename}" alt="\${workout.name}" class="workout-image">
                <div style="margin-top: 1rem;">
                    <strong>Duration:</strong> \${Math.round(workout.duration / 60)} minutes<br>
                    <strong>TSS:</strong> \${Math.round(workout.tss)}<br>
                    <strong>IF:</strong> \${workout.intensityFactor.toFixed(2)}<br>
                    <strong>NP:</strong> \${Math.round(workout.normalizedPower)}W
                </div>
            \`;

            modal.classList.add('active');
        }

        function closeModal() {
            document.getElementById('workoutModal').classList.remove('active');
        }

        document.getElementById('workoutModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    </script>
</body>
</html>`;

  const outputPath = path.join(program.programPath, 'docs', 'index.html');
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, html, 'utf-8');

  console.log(`Generated HTML viewer: ${outputPath}`);
}

function generateCalendarRows(program: ProgramStructure): string {
  const weeks = Array.from(program.weeks.values()).sort((a, b) => a.weekNumber - b.weekNumber);
  const rows: string[] = [];

  for (const week of weeks) {
    const days = Array.from(week.days.entries()).sort((a, b) => a[0] - b[0]);

    for (const [day, workout] of days) {
      const mins = Math.round(workout.duration / 60);
      rows.push(`                    <tr>
                        <td>${week.weekNumber}</td>
                        <td>${day} (${workout.dayName})</td>
                        <td>
                            <a class="workout-link" onclick="showWorkout('${workout.filename}')">${workout.workoutName}</a>
                        </td>
                        <td>${mins} min</td>
                        <td><span class="tss-badge">${Math.round(workout.tss)} TSS</span></td>
                    </tr>`);
    }
  }

  return rows.join('\n');
}

function generateWorkoutData(program: ProgramStructure): Record<string, any> {
  const data: Record<string, any> = {};

  for (const workout of program.workouts) {
    data[workout.filename] = {
      name: workout.name,
      description: workout.description,
      week: workout.week,
      day: workout.day,
      dayName: workout.dayName,
      duration: workout.duration,
      tss: workout.tss,
      intensityFactor: workout.intensityFactor,
      normalizedPower: workout.normalizedPower,
    };
  }

  return data;
}
