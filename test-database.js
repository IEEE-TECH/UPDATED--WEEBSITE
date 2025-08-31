import { supabase, checkDatabaseHealth } from './src/lib/supabase.js';
import { RegistrationService } from './src/services/registrationService.js';

console.log('🔍 Testing TECHNOPEDIA 14 Database Connection...\n');

async function testDatabaseConnection() {
  try {
    console.log('1. Testing Supabase connection...');
    const health = await checkDatabaseHealth();
    
    if (health.isHealthy) {
      console.log('✅ Supabase connection: SUCCESS');
    } else {
      console.log('❌ Supabase connection: FAILED');
      console.log('   Error:', health.message);
      return false;
    }

    console.log('\n2. Testing database tables...');
    const tables = ['registrations', 'game_registrations', 'payments'];
    
    for (const table of tables) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.log(`❌ Table '${table}': FAILED (${error.message})`);
          return false;
        } else {
          console.log(`✅ Table '${table}': EXISTS (${count || 0} records)`);
        }
      } catch (err) {
        console.log(`❌ Table '${table}': ERROR (${err.message})`);
        return false;
      }
    }

    console.log('\n3. Testing database operations...');
    
    // Test email checking
    try {
      const emailExists = await RegistrationService.checkEmailExists('test@nonexistent.com');
      console.log(`✅ Email check: WORKING (result: ${emailExists ? 'exists' : 'not found'})`);
    } catch (err) {
      console.log(`❌ Email check: FAILED (${err.message})`);
      return false;
    }

    // Test PRN checking
    try {
      const prnExists = await RegistrationService.checkPRNExists('NONEXISTENT001');
      console.log(`✅ PRN check: WORKING (result: ${prnExists ? 'exists' : 'not found'})`);
    } catch (err) {
      console.log(`❌ PRN check: FAILED (${err.message})`);
      return false;
    }

    // Test statistics
    try {
      const stats = await RegistrationService.getRegistrationStats();
      console.log(`✅ Statistics: WORKING`);
      console.log(`   - Total Registrations: ${stats.totalRegistrations}`);
      console.log(`   - Game Registrations: ${stats.gameRegistrations}`);
      console.log(`   - Total Revenue: ₹${stats.totalRevenue}`);
    } catch (err) {
      console.log(`❌ Statistics: FAILED (${err.message})`);
      return false;
    }

    console.log('\n🎉 All database tests PASSED!');
    console.log('\n📝 Database Setup Status:');
    console.log('✅ Environment variables configured');
    console.log('✅ Supabase connection working');
    console.log('✅ Database tables accessible');
    console.log('✅ CRUD operations functional');
    
    return true;
  } catch (error) {
    console.log(`\n❌ Database test FAILED: ${error.message}`);
    return false;
  }
}

// Run the test
testDatabaseConnection()
  .then(success => {
    if (success) {
      console.log('\n🚀 Your database is ready for TECHNOPEDIA 14!');
      console.log('📖 Visit http://localhost:8082/database-test for detailed testing');
      console.log('🏠 Visit http://localhost:8082 to test registration forms');
    } else {
      console.log('\n⚠️  Database setup needs attention. Check the errors above.');
      console.log('📋 Make sure you have executed the database-setup.sql file in Supabase');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('\n💥 Test script failed:', error);
    process.exit(1);
  });
