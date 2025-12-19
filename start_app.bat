@echo off
echo Starting Hip-Hop Foundation Application...

REM Start the FastAPI backend in the background
echo Starting backend...
cd backend && start /b python run_app.py

REM Wait a moment for the backend to start
timeout /t 3 /nobreak >nul

REM Start the Next.js frontend
echo Starting frontend...
cd .. && npm run dev