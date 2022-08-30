/*
 * Simple login page to demonstrate the use of state
 *
 * Gilberto Echeverria
 * 2022-08-29
 */


// Receive the set method from the parent component to modify its state
function Login ({setName}) {

    function changeName(event) {
        setName(event.target.value);
    }

    return (
        <div>
        <h1>Login page</h1>
        <form>
            <label>Name</label>
            <input type="text" onChange={changeName} />
        </form>
        </div>
    );
}

export default Login;
