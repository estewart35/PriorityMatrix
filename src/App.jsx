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
            <div className="alert alert-dismissible alert-warning d-flex align-items-center">
              <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
              <p className="mb-0"><span className="fw-semibold me-2"><i className="bi bi-exclamation-triangle me-2"></i>Warning!</span>You are currently not signed in, your tasks will only be saved locally on this device.</p>
            </div>
            <PriorityMatrix />
          </>
        )}
      </div>
    </TaskProvider>
  )
}

export default App
