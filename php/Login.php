<?php
	// Gets the information provided when the php file was called
	$inData = getRequestInfo();

	// Creates new variables to store the data in
	$id = 0;
	$firstName = "";
	$lastName = "";

  // Opens a sql connection using the username and password for the project,
	// to a database named
	$conn = new mysqli("localhost", "smallProject", "thisIsInsecure", "SmallProjectDB"); //localhost, db username, db password, db name

	// If the connection status returns an error, return with a connection error
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
		$conn->close();
	}
	else
	{
		// Otherwise, create a SQL statement to get the ID, firstName and lastName from the Users table, where the login and password match the provided info
		$sql = "SELECT ID,FirstName,LastName FROM Users where User='" . $inData["User"] . "' and Password='" . $inData["Password"] . "'";
		// Execute this query, and store the results in a new variable called 'result'
		$result = $conn->query($sql);
		// If there is at least one row returned
		if ($result->num_rows > 0)
		{
			// Get the associated row with this result
			$row = $result->fetch_assoc();
			// Store the first name, last name, and ID from that row
			$firstName = $row["FirstName"];
			$lastName = $row["LastName"];
			$id = $row["ID"];

      // Return this information from the call
			returnWithInfo($firstName, $lastName, $id );
		}
		else
		{
			// Otherwise, no record matching that exists (either user doesn't exist, or invalid password)
			returnWithError("UserID or Password does not exists");
		}
    // Close the connection
		$conn->close();
	}

	function returnWithError($error)
	{
		$retValue = '{"id":0,"FirstName":"","LastName":"","error":"' . $error . '"}';
		sendResultInfoAsJson($retValue);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithInfo($firstName, $lastName, $id)
	{
		$retValue = '{"id":' . $id . ',"FirstName":"' . $firstName . '","LastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson($retValue);
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
?>
