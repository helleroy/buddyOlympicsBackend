Buddy Olympics Backend
======================

Node.js based backend for the Buddy Olympics app.
Uses Express for the REST API.

### REST API

<table>
	<tr>
		<td>Method</td><td>URL</td><td>Action</td>
	</tr>
	<tr>
		<td>GET</td><td>/runners</td><td>Retrieve all runners</td>
	</tr>
	<tr>
		<td>GET</td><td>/runners/:id</td><td>Retrieve the runner with the specified :id</td>
	</tr>
	<tr>
		<td>POST</td><td>/runners</td><td>Add a new runner</td>
	</tr>
	<tr>
		<td>PUT</td><td>/runners/:id</td><td>Update the runner with the specified :id</td>
	</tr>
	<tr>
		<td>DELETE</td><td>/runners/:id</td><td>Delete the runner with the specified :id</td>
	</tr>
	<tr>
		<td>GET</td><td>/runs</td><td>Retrieve all runs</td>
	</tr>
	<tr>
		<td>GET</td><td>/runs/:id</td><td>Retrieve the run with the specified :id</td>
	</tr>
	<tr>
		<td>POST</td><td>/runs</td><td>Add a new run</td>
	</tr>
	<tr>
		<td>PUT</td><td>/runs/:id</td><td>Update the run with the specified :id</td>
	</tr>
	<tr>
		<td>DELETE</td><td>/runs/:id</td><td>Delete the run with the specified :id</td>
	</tr>
</table>
