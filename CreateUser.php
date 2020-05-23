<?php
	// Gets the information provided when the php file was called
	$inData = getRequestInfo();

	// Creates new variables to store the data in
	$id = 0;
	$firstName = "";
	$lastName = "";

	// Opens a sql connection using the username and password for the project,
	// to a database named
	$conn = new mysqli("localhost", "smallProject", "thisIsInsecure", "smallProjectDB"); //localhost, db username, db password, db name

	// If the connection status returns an error, return with a connection error
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		// Otherwise, create a SQL statement to get the ID, firstName and lastName from the Users table, where the login and password match the provided info
		$sql = "SELECT ID,FirstName,LastName FROM Users where Login='" . $inData["User"] . "''";
		// Execute this query, and store the results in a new variable called 'result'
		$result = $conn->query($sql);
		// If there is at least one row returned
		if ($result->num_rows > 0)
		{
			// Return error because this input from the user is already associated
			// with another account
			$error = '{"id":0,"firstName":"","lastName":"","error":"This account already Exists"}';
			returnWithErrorForUser($error);
		}
		else
		{
			// Otherwise, no record matching that exists (either user doesn't exist, or invalid password)
			// and just add it into the database

			$newUser = "INSERT INTO Users(User, Password) VALUES ('" . $inData["User"] . "', '" . $inData["Password"] . "')";
			$conn->query($newUser);
		}
		// Close the connection
		$conn->close();
	}

	function returnWithErrorForUser($error)
	{
		$retValue = $error;
		sendResultInfoAsJson($retValue);
		}

	function returnWithError($error)
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $error . '"}';
		sendResultInfoAsJson($retValue);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithInfo($firstName, $lastName, $id)
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson($retValue);
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
?>
