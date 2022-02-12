import { Button, Container, Stack, TextField } from "@mui/material";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const Loginpage = ({ auth }) => {
    //constantes de usuario
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [tries, setTries] = useState(false);
    //Funcion de verificacion de usuario y contraseña
    //limpia los campos
    //hace un query que regresa verdadero o falso si existe el usuario con la contraseña
    //finalmente pasa las variables a App.js
    const handleSubmit = async (e) => {
        setTries(true);
        setUser('');
        setPwd('');
        const query = `{logIn(user:"${user}",pwd:"${pwd}")}`;
        fetch('http://localhost:4000/graphql', {method: 'POST',
            headers: {'Content-Type': 'application/json','Accept': 'application/json',},
            body: JSON.stringify({
                query
            })}).then(r => r.json()).then(data => {
                if (data.data.logIn) {
                    auth(user, true);
                    navigate("/Home")
                }
            })
    }
    return (
        <Container maxWidth="xs">
            <Stack spacing={2}>
                <TextField id="standard-basic" label="Username" variant="standard"
                    onChange={(e) => setUser(e.target.value)} value={user} required />
                <br />
                <TextField id="standard-basic" label="Password" variant="standard" type="password"
                    onChange={(e) => setPwd(e.target.value)} value={pwd} required />
                <br />
                <br />
                <Button variant="contained" onClick={handleSubmit}>Sign In</Button>
                {tries?(<p>Usuario y/o Contraseña equivocados</p>):(<></>)}
            </Stack>
        </Container>
    );
}