import { TaskProvider } from "./store/TaskContext";
import useUserManager from "./hooks/useUserManager";
import PriorityMatrix from "./components/PriorityMatrix"
import ToastMessage from "./components/ToastMessage";
import Navbar from "./components/Navbar";

function App() {
  const { user, error, success, login, signOut, clearMessages } = useUserManager();

  return (
    <TaskProvider user={user}>
      <Navbar user={user} onLogin={login} onLogout={signOut} />
      <div className="container my-4">
        {error && <ToastMessage message={error} color="text-bg-danger" closeToast={clearMessages} />}
        {success && <ToastMessage message={success} color="text-bg-success" closeToast={clearMessages} />}

        {user ? (
          <PriorityMatrix />
        ) : (
          <>
            <p className="text-warning text-center mb-4"><i className="bi bi-exclamation-triangle me-2"></i>You are currently not signed in, your tasks will only be saved locally on this device.</p>
            <PriorityMatrix />
          </>
        )}
      </div>
    </TaskProvider>
  )
}

export default App
