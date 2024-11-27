import { TaskProvider } from "./store/TaskContext";
import useUserManager from "./hooks/useUserManager";
import PriorityMatrix from "./components/PriorityMatrix"
import ToastMessage from "./components/ToastMessage";

function App() {
  const { user, error, success, login, signOut, clearMessages } = useUserManager();

  return (
    <TaskProvider user={user}>
      <div className="container my-4">
        {error && <ToastMessage message={error} color="text-bg-danger" />}
        {success && <ToastMessage message={success} color="text-bg-success" closeToast={clearMessages} />}

        {user ? (
          <>
            <p>Welcome, {user.displayName}</p>
            <button onClick={signOut}>Logout</button>
            <PriorityMatrix  />
          </>
        ) : (
          <button onClick={login}>Login with Google</button>
        )}
      </div>
    </TaskProvider>
  )
}

export default App
