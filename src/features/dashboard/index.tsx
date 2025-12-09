const Dashboard = () => {
  const todoSummary = { urgent: 3, high: 5, moderate: 7, low: 2, completed: 8 };
  const recentTodos = [
    { title: "Finish report", priority: "High" },
    { title: "Fix bug #23", priority: "Urgent" },
    { title: "Team meeting", priority: "Moderate" },
  ];

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Selamat datang!</h3>

      {/* Todo Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-red-100 text-red-700 rounded-lg p-4 shadow">
          <p className="text-sm font-medium">Urgent</p>
          <p className="text-2xl font-bold">{todoSummary.urgent}</p>
        </div>
        <div className="bg-orange-100 text-orange-700 rounded-lg p-4 shadow">
          <p className="text-sm font-medium">High</p>
          <p className="text-2xl font-bold">{todoSummary.high}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-700 rounded-lg p-4 shadow">
          <p className="text-sm font-medium">Moderate</p>
          <p className="text-2xl font-bold">{todoSummary.moderate}</p>
        </div>
        <div className="bg-green-100 text-green-700 rounded-lg p-4 shadow">
          <p className="text-sm font-medium">Low</p>
          <p className="text-2xl font-bold">{todoSummary.low}</p>
        </div>
        <div className="bg-gray-100 text-gray-700 rounded-lg p-4 shadow">
          <p className="text-sm font-medium">Completed</p>
          <p className="text-2xl font-bold">{todoSummary.completed}</p>
        </div>
      </div>

      {/* Recent Todos */}
      <div>
        <h4 className="text-md font-semibold text-gray-800 mb-3">Recent To-Do</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recentTodos.map((todo, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
              <p className="font-medium text-gray-800">{todo.title}</p>
              <span
                className={`mt-2 inline-block px-2 py-1 text-xs rounded-full ${
                  todo.priority === "Urgent"
                    ? "bg-red-200 text-red-800"
                    : todo.priority === "High"
                      ? "bg-orange-200 text-orange-800"
                      : todo.priority === "Moderate"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                }`}
              >
                {todo.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
