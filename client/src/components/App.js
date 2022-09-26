import PageTemplate from "./common/PageTemplate";
import JobScreen from "../screens/JobScreen";

function App() {
  return (
    <div className="App">
      <PageTemplate>{<JobScreen />}</PageTemplate>
    </div>
  );
}

export default App;
