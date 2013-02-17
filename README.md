Buddy Olympics Backend
======================

Node.js backend for the Buddy Olympics app. Uses Express and Mongoose for the REST API.

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
		<td>PUT</td><td>/runs/:runId/accept/:id</td><td>Set accept to true on a run with the specified :runId for the participant with the specified :id</td>
	</tr>
	<tr>
		<td>PUT</td><td>/runs/:runId/coords/:id</td><td>Pushes coordinates from the runner with the specified :id to the run with the specified :runId</td>
	</tr>
	<tr>
		<td>DELETE</td><td>/runs/:id</td><td>Delete the run with the specified :id</td>
	</tr>
</table>

### Models

#### Runners

The Runners model represents a Buddy Olympics user.
```
username : {type : String, unique : true, required : true},
password : {type : String, required : true},
fullname : String,
email : {type : String, unique : true, required : true},
birthday : Date,
gender : String,
country : String,
city : String,
datejoined : Date,
rank : Number,
interests : String,
ambition : String,
description : String,
profilepic : String,
friends : [{type : ObjectId, ref : 'Runner'}],
achievements : [ObjectId],
runs : [{type : ObjectId, ref : 'Run'}],
newruns : [{type : ObjectId, ref : 'Run'}]
```
#### Runs

The Runs model represents a run in Buddy Olympics. 
```
title : String,
starttime : Date,
owner : {type : ObjectId, ref : 'Runner'},
type : {
	time : Number,
	distance : Number,
	avgspeed : Number,
	topspeed : Number
},
participants : [{
	runner : {type : ObjectId, ref : 'Runner', required : true},
	time : Number,
	distance : Number,
	accept : Boolean,
	finished : Boolean,
	coordinates : [{
		longitude : Number,
		latitude : Number,
		timestamp : Date
	}]
}],
finished : Boolean,
winner : {type : ObjectId, ref : 'Runner'}
```

Copyright (c) 2013 Henrik Hellerøy, https://github.com/helleroy/
Licensed under the MIT license, http://opensource.org/licenses/MIT
