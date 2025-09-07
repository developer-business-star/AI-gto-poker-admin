#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🔍 Testing Next.js build...');

try {
  // Run the build command
  const output = execSync('npm run build', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  
  console.log('✅ Build successful!');
  console.log(output);
  
} catch (error) {
  console.error('❌ Build failed:');
  console.error(error.stdout || error.message);
  process.exit(1);
}