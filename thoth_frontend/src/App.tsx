import './App.css';
import ThothButton from './Components/ThothButton';
import ThothTextField from './Components/ThothTextField';

function App() {
  return (
    <>
      <ThothButton
        color = "primary"
        variant = "contained" 
      />
      <ThothTextField
        variant = "outlined" 
        id = "abc"
      />
      <ThothTextField
        variant = "outlined"
        id = "abc"
      />
    </>
  );
}

export default App;
