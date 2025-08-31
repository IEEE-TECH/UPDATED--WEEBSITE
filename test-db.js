// Database Connection Test
// Run this in browser console on localhost:8082 to test database

async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test registration service
    const { RegistrationService } = await import('./src/services/registrationService.ts');
    
    // Test if we can get stats (this will test connection)
    const stats = await RegistrationService.getRegistrationStats();
    console.log('✅ Database connected successfully!');
    console.log('📊 Current stats:', stats);
    
    return { success: true, stats };
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return { success: false, error: error.message };
  }
}

// Automatically run test
testDatabaseConnection();
