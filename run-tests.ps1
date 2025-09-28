# PowerShell Test Runner
Write-Host "Starting Cypress tests..." -ForegroundColor Green
Write-Host "Server should be running on http://localhost:5173" -ForegroundColor Yellow

# Test server connectivity first  
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "Server is running!" -ForegroundColor Green
} catch {
    Write-Host "Server is not accessible! Please start the dev server first." -ForegroundColor Red
    exit 1
}

# Run simple test first
Write-Host "Running simple-test.cy.js..." -ForegroundColor Cyan
& npx cypress run --spec "cypress/e2e/simple-test.cy.js" --headless

Write-Host "Test completed!" -ForegroundColor Green