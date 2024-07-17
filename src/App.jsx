import AppRouting from './config/routes/AppRouting';
import useNetworkStatus from './hooks/useNetworkStatus';

const App = () => {
  useNetworkStatus();
  return (
    <div className='h-[100vh] font-bold'>
      <AppRouting />
    </div>
  );
};

export default App;
