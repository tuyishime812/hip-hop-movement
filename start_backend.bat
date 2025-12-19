@echo off
echo Starting Hip-Hop Foundation backend...

REM Navigate to backend directory
cd backend

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Start the backend server
echo Starting backend server...
start /b python run_app.py

echo.
echo Backend server started on http://localhost:8000
echo Please wait a few moments for the server to fully start.
echo You can now start the frontend with: npm run dev in a new terminal
echo.
echo To check if the server is running, visit: http://localhost:8000/docs in your browser
pause