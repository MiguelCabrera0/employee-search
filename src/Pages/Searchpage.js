import { Component } from "react"
import { TextField, Box, Table, TableContainer, TableRow, TableCell, Container, TableHead, TableBody, CircularProgress } from "@mui/material";

export class Searchpage extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [{}], load: false }
  }
  componentDidMount() {
    const query = `{filterEmployees(filtro:""){
      id,first_name,last_name,email,Nationality,Phone,civil_status,Birthday}}`;
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
      body: JSON.stringify({ query })
    }).then(r => r.json()).then((d) => {
      this.setState({ data: d.data.filterEmployees, load: true });
    })
  }
  render() {
    var rows = this.state.data;
    const handler = (e) => {
      const query = `{filterEmployees(filtro:"${e.target.value}"){
        id,first_name,last_name,email,Nationality,Phone,civil_status,Birthday}}`;
      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        body: JSON.stringify({ query })
      }).then(r => r.json()).then((d) => {
        this.setState({ data: d.data.filterEmployees });
      })
    }
    return (
      <Box>
        <Container maxWidth="sm">
          <TextField id="Filter" label="Filtro" variant="standard" onChange={handler} />
        </Container>
        {this.state.load ? (
          <TableContainer>
            <Table sx={{ minWidth: 250 }} aria-label="Employees">
              <TableHead>
                <TableRow key="top">
                  <TableCell align="right">id</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">email</TableCell>
                  <TableCell align="right">Nationality</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Civil Status</TableCell>
                  <TableCell align="right">Birthday</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.first_name}</TableCell>
                    <TableCell align="right">{row.last_name}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.Nationality}</TableCell>
                    <TableCell align="right">{row.Phone}</TableCell>
                    <TableCell align="right">{row.civil_status}</TableCell>
                    <TableCell align="right">{row.Birthday}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Container maxWidth="sm"><br/><CircularProgress/></Container>
        )}

      </Box >
    )
  }
}
