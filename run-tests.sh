#!/bin/bash
# Test runner script - runs tests while server is stable

echo "Starting Cypress tests..."
echo "Server should be running on http://localhost:5173"

# Run simple test first
echo "Running simple-test.cy.js..."
npx cypress run --spec "cypress/e2e/simple-test.cy.js" --headless --no-exit

echo "Test completed!"