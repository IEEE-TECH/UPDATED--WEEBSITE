import React, { useState, useEffect } from 'react';
import { Button } from ;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2, Database, Users, CreditCard } from 'lucide-react';
import { supabase, checkDatabaseHealth } from '@/lib/supabase';
import { RegistrationService } from '@/services/registrationService';

interface ConnectionStatus {
  supabase: 'checking' | 'connected' | 'failed';
  tables: 'checking' | 'verified' | 'failed';
  operations: 'checking' | 'working' | 'failed';
}

interface DatabaseStats {
  totalRegistrations: number;
  gameRegistrations: number;
  totalRevenue: number;
}

const DatabaseConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    supabase: 'checking',
    tables: 'checking',
    operations: 'checking'
  });
  const [stats, setStats] = useState<DatabaseStats>({
    totalRegistrations: 0,
    gameRegistrations: 0,
    totalRevenue: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testSupabaseConnection = async () => {
    try {
      addTestResult('Testing Supabase connection...');
      const health = await checkDatabaseHealth();
      
      if (health.isHealthy) {
        setStatus(prev => ({ ...prev, supabase: 'connected' }));
        addTestResult('✅ Supabase connection successful');
        return true;
      } else {
        setStatus(prev => ({ ...prev, supabase: 'failed' }));
        addTestResult(`❌ Supabase connection failed: ${health.message}`);
        setError(health.message);
        return false;
      }
    } catch (error) {
      setStatus(prev => ({ ...prev, supabase: 'failed' }));
      const errorMessage = error instanceof Error ? error.message : 'Unknown connection error';
      addTestResult(`❌ Supabase connection error: ${errorMessage}`);
      setError(errorMessage);
      return false;
    }
  };

  const testDatabaseTables = async () => {
    try {
      addTestResult('Checking database tables...');
      
      // Test each table
      const tables = ['registrations', 'game_registrations', 'payments'];
      
      for (const table of tables) {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          throw new Error(`Table ${table} check failed: ${error.message}`);
        }
        
        addTestResult(`✅ Table '${table}' exists (${count || 0} records)`);
      }
      
      setStatus(prev => ({ ...prev, tables: 'verified' }));
      addTestResult('✅ All database tables verified');
      return true;
    } catch (error) {
      setStatus(prev => ({ ...prev, tables: 'failed' }));
      const errorMessage = error instanceof Error ? error.message : 'Table verification failed';
      addTestResult(`❌ Table verification failed: ${errorMessage}`);
      setError(errorMessage);
      return false;
    }
  };

  const testDatabaseOperations = async () => {
    try {
      addTestResult('Testing database operations...');
      
      // Test registration service functions
      addTestResult('Testing RegistrationService...');
      
      // Test email checking
      const emailExists = await RegistrationService.checkEmailExists('test@nonexistent.com');
      addTestResult(`✅ Email checking works: ${emailExists ? 'exists' : 'not found'}`);
      
      // Test PRN checking
      const prnExists = await RegistrationService.checkPRNExists('NONEXISTENT001');
      addTestResult(`✅ PRN checking works: ${prnExists ? 'exists' : 'not found'}`);
      
      // Get registration stats
      const registrationStats = await RegistrationService.getRegistrationStats();
      setStats(registrationStats);
      addTestResult(`✅ Statistics retrieved: ${registrationStats.totalRegistrations} registrations`);
      
      setStatus(prev => ({ ...prev, operations: 'working' }));
      addTestResult('✅ All database operations working');
      return true;
    } catch (error) {
      setStatus(prev => ({ ...prev, operations: 'failed' }));
      const errorMessage = error instanceof Error ? error.message : 'Operation test failed';
      addTestResult(`❌ Database operations failed: ${errorMessage}`);
      setError(errorMessage);
      return false;
    }
  };

  const runAllTests = async () => {
    setError(null);
    setTestResults([]);
    
    addTestResult('Starting database connection tests...');
    
    const connectionOk = await testSupabaseConnection();
    if (!connectionOk) return;
    
    const tablesOk = await testDatabaseTables();
    if (!tablesOk) return;
    
    await testDatabaseOperations();
    
    addTestResult('🎉 All tests completed!');
  };

  useEffect(() => {
    runAllTests();
  }, []);

  const getStatusIcon = (statusValue: string) => {
    switch (statusValue) {
      case 'checking':
        return <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />;
      case 'connected':
      case 'verified':
      case 'working':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />;
    }
  };

  const getStatusText = (statusValue: string) => {
    switch (statusValue) {
      case 'checking':
        return 'Checking...';
      case 'connected':
        return 'Connected';
      case 'verified':
        return 'Verified';
      case 'working':
        return 'Working';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case 'checking':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'connected':
      case 'verified':
      case 'working':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'failed':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-shadow-dark to-black p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-classified text-classified-gold mb-4">
            Database Connection Test
          </h1>
          <p className="text-gray-300 font-intel">
            Verifying TECHNOPEDIA 14 database connectivity and operations
          </p>
        </div>

        {/* Connection Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-shadow-dark/50 border-classified-gold/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-classified-gold flex items-center gap-2">
                <Database className="h-5 w-5" />
                Supabase Connection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getStatusIcon(status.supabase)}
                <Badge className={getStatusColor(status.supabase)}>
                  {getStatusText(status.supabase)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-shadow-dark/50 border-classified-gold/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-classified-gold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Database Tables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getStatusIcon(status.tables)}
                <Badge className={getStatusColor(status.tables)}>
                  {getStatusText(status.tables)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-shadow-dark/50 border-classified-gold/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-classified-gold flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Operations Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getStatusIcon(status.operations)}
                <Badge className={getStatusColor(status.operations)}>
                  {getStatusText(status.operations)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Database Statistics */}
        <Card className="bg-shadow-dark/50 border-classified-gold/30">
          <CardHeader>
            <CardTitle className="text-classified-gold">Database Statistics</CardTitle>
            <CardDescription className="text-gray-400">
              Current registration and payment data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-black/20 rounded-lg border border-classified-gold/20">
                <div className="text-2xl font-classified text-classified-gold">{stats.totalRegistrations}</div>
                <div className="text-sm text-gray-400 font-intel">Total Registrations</div>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg border border-classified-gold/20">
                <div className="text-2xl font-classified text-warning-amber">{stats.gameRegistrations}</div>
                <div className="text-sm text-gray-400 font-intel">Game Registrations</div>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg border border-classified-gold/20">
                <div className="text-2xl font-classified text-intel-green">₹{stats.totalRevenue}</div>
                <div className="text-sm text-gray-400 font-intel">Total Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-500 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                Connection Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-300 font-mono">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Test Results Log */}
        <Card className="bg-shadow-dark/50 border-classified-gold/30">
          <CardHeader>
            <CardTitle className="text-classified-gold">Test Results Log</CardTitle>
            <CardDescription className="text-gray-400">
              Real-time connection test results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto space-y-1">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono text-gray-300 p-2 bg-black/20 rounded">
                  {result}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={runAllTests}
            className="bg-classified-gold hover:bg-warning-amber text-black font-classified"
          >
            Run Tests Again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="border-classified-gold/50 text-classified-gold hover:bg-classified-gold/10"
          >
            Back to Website
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DatabaseConnectionTest;
