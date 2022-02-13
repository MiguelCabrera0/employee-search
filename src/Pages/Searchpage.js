import { Component } from "react";
import React from "react";
import { Dialog, TextField, Box, Table, TableContainer, TableRow, TableCell, Container, TableHead, TableBody, CircularProgress, DialogTitle, Button, ListItem, List, DialogContent } from "@mui/material";

export class Searchpage extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [{}], load: false, openDialog: false, employee: {} }
  }
  componentDidMount() {
    const query = `{filterEmployees(filtro:""){
      id,first_name,last_name,email,Nationality,Phone,civil_status,Birthday}}`;
    fetch('https://vast-reaches-55098.herokuapp.com/', {
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
      fetch('https://vast-reaches-55098.herokuapp.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        body: JSON.stringify({ query })
      }).then(r => r.json()).then((d) => {
        this.setState({ data: d.data.filterEmployees });
      })
    }
    const clickRowHandler = (row) => {
      this.setState({ employee: row, openDialog: true })
    }
    const dialogHandler = () => {
      const query = `mutation{setEmployee(
        id:${employee.id},
        first_name:"${employee.first_name}", 
        last_name:"${employee.last_name}",
        email:"${employee.email}", 
        Nationality:"${employee.Nationality}", 
        Phone:"${employee.Phone}", 
        civil_status:"${employee.civil_status}", 
        Birthday:"${employee.Birthday}")}`;
      console.log(query);
      fetch('https://vast-reaches-55098.herokuapp.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        body: JSON.stringify({ query })
      });
      this.setState({ openDialog: false, employee: employee })
    }
    var employee = this.state.employee;
    return (
      <Box>
        <Container maxWidth="md">
          <TextField id="Filter" label="Filtro" variant="standard" onChange={handler} />
          <Dialog open={this.state.openDialog} maxWidth="sm" fullWidth="true" onClose={() => this.setState({ openDialog: false })}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}>
              <DialogTitle>Employee</DialogTitle>
              <DialogContent>
                <List>
                  <ListItem><TextField id="Dialogid" label="id" defaultValue={this.state.employee.id} inputProps={{ readOnly: true }} /></ListItem>
                  <ListItem><TextField id="Dialogname" label="Name" defaultValue={this.state.employee.first_name} onChange={(e) => { employee.first_name = e.target.value }} /></ListItem>
                  <ListItem><TextField id="Dialoglastname" label="Last Name" defaultValue={this.state.employee.last_name} onChange={(e) => { employee.last_name = e.target.value }} /></ListItem>
                  <ListItem><TextField id="Dialogemail" label="email" defaultValue={this.state.employee.email} onChange={(e) => { employee.email = e.target.value }} /></ListItem>
                  <ListItem><TextField id="Dialognationality" label="Nationality" defaultValue={this.state.employee.Nationality} inputProps={{ readOnly: true }} /></ListItem>
                  <ListItem><TextField id="Dialogphone" label="Phone" defaultValue={this.state.employee.Phone} onChange={(e) => { employee.Phone = e.target.value }} /></ListItem>
                  <ListItem><TextField id="Dialogcivilstatus" label="Civil Status" defaultValue={this.state.employee.civil_status} inputProps={{ readOnly: true }} /></ListItem>
                  <ListItem><TextField id="DialogBirthday" label="Birthday" defaultValue={this.state.employee.Birthday} inputProps={{ readOnly: true }} /></ListItem>
                  <ListItem>
                    <Button onClick={dialogHandler}>Save...</Button>
                    <Button onClick={() => this.setState({ openDialog: false })}>Close</Button>
                  </ListItem>
                </List>
              </DialogContent>
            </Box>
          </Dialog>
        </Container>
        {this.state.load ? (
          <Box>
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
                    <TableRow key={row.id} value={row.id} onClick={() => { clickRowHandler(row) }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
          </Box>

        ) : (
          <Container maxWidth="sm"><br /><CircularProgress /></Container>
        )}

      </Box >
    )
  }
}
