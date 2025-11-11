#!/bin/bash

echo "========================================"
echo "  ReelPerk ERP - Launch Script"
echo "========================================"
echo ""

echo "[1/3] Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
sleep 3

echo "[2/3] Starting Metro Bundler..."
cd ..
npm start &
METRO_PID=$!
sleep 3

echo "[3/3] Opening API Documentation..."
sleep 5
open http://localhost:5000/api-docs 2>/dev/null || xdg-open http://localhost:5000/api-docs 2>/dev/null || echo "Open manually: http://localhost:5000/api-docs"

echo ""
echo "========================================"
echo "  ✅ App is starting!"
echo "========================================"
echo ""
echo "Backend: http://localhost:5000"
echo "API Docs: http://localhost:5000/api-docs"
echo ""
echo "To run mobile app:"
echo "  npm run ios      (for iOS)"
echo "  npm run android  (for Android)"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $METRO_PID 2>/dev/null; exit" INT
wait

