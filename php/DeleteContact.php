<?php
	// Creates contact in the database

	// Gets the information provided in the file call
	$inputData = getRequestInfo();

	// Data to be inserted into database
	$ID = $inputData["ID"];
	$FirstName = "";
	$LastName = "";
	$Email = "";
	$Phone = "";
	$CreationDate = "";
	$User = "";

	// Opens an SQL connection to the database using the stored credentials
	$ini = parse_ini_file("../../php/temp.ini");
	$connection = new mysqli("localhost", $ini["username"], $ini["password"], $ini["db_name"]);


	// If there is an error in the connection, returns a formatted error
	if($connection->connect_error)
	{
		returnWithError($connection->connect_error);
	}
	else
	{
		// Create an SQL statement to insert the provided data into the contacts
		// table.
		$sql = "DELETE FROM Contacts WHERE ID = " . $ID;

		$connection->query($sql);
	}

	// Close the connection
	$connection->close();



	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function returnWithError($error)
	{
		$retValue = '{"ID":"","FirstName":"", "LastName":"","Email":"", "Phone":"","CreationDate":"", "User":"", "error":"' . $error . '"}';
		sendResultInfoAsJson($retValue);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}

?>
