import LoginForm from "./components/LoginForm";
function App() {
  return (
    <div className="App">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 hover:bg-purple-200 hover:text-white">
        <div className="shrink-0"></div>
        <div>
          <div className="text-xl font-medium text-black">ChitChat</div>
          <p className="text-slate-500">You have a new message!</p>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}

export default App;
