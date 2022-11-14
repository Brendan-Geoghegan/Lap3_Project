import LeaderBoard from './pages/LeaderBoard';
import data from './data';

function App() {
    return (
        <div className="App">
            <h1>App</h1>
            <LeaderBoard data={data} />
        </div>
    );
}

export default App;
