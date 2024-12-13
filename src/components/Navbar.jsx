const Navbar = ({ user, onLogin, onLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <h4 className="navbar-brand fs-4 py-0">Priority Matrix</h4>
                {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Home</a>
                        </li>
                    </ul>
                
                </div> */}
                {user ? (
                    <div className="d-flex align-items-end">
                        <h5 className="text-white me-3">Welcome, <span className="text-success">{user.displayName}</span>!</h5>
                        <button className="btn btn-light" onClick={onLogout}>Sign out</button>
                    </div>
                ) : (
                    <button className="btn btn-light" onClick={onLogin}><i className="bi bi-google text-primary me-2"></i>Sign in with Google</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;