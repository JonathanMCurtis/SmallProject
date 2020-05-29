This file should document how to utilize the the API functions available to the front-end team. The should be in the following format

***

**API_Endpoint.php**

Input:

- "field1" : "Information about what is expected."
- "field2" : "Information about what is expected."

Output:

- "field1" : "Information about what is returned"
- "field2" : "Information about what is returned"

Usage: 

> Instructions on how the returned information is intended to be used.

Results: 

- "Successful" : What happens for a successful request?
- "Unsuccessful" : What happens when there is a problem (list cases, and results for each.)

***

### Important: How to confirm successful API execution

**For any function that returns a list of results, the ErrorID property will not be populated if successful.**

Rather than checking if the ErrorID property is equal to zero for these functions, simply check if it exists at all.

For example, if you have retrieved the output as a JSON object called *output*, then you can check this via:

    if (output.hasOwnProperty("ErrorID"))
    { 
        // The ErrorID field exists, and can now be handled.
    }

Otherwise, simply confirm the "ErrorID" field is equal to zero to confirm there were no issues.
  
**Do not rely on response.ok alone** as a method for confirming success. Some operations are successfully received and attempted (returning 200 OK), but return a different problem in the errorID info. (eg. Username already in use.)

ErrorID Quick Reference:

> - (No error ID field present, **and** response.ok) : Successful executed
> - 0 : Successful executed as documented below.
> - 204 : No data found for your request
> - 400 : **Likely indicates a problem with JSON, read the response JSON for more info!**
> - 401 : Incorrect username or password, or user does not exist (non-specific for security reasons.)
> - 409 : Username already in use
> - 503 : Service Unavailable (likely SQL connection for this project.)

***

### Special case: All functions

**All functions** have the following special case, and return values.

Output:

- "ErrorID" : 400 
- "Missing" : JSON-encoded array

If any of the required fields are missing from your API call, the function will return with ErrorID = 400, a message mentioning there are missing fields, and a JSON-encoded array containing the missing fields.

***

**CreateUser.php**

Input:

- "User" : Desired username.
- "Password" : Desired password.
- "FirstName" : First name as provided.
- "LastName" : Last name as provided.

Output:

- "ErrorID"
  - 0 : Successful
  - 409 : Username already in use
  - 503 : Internal Service Error
- "Error" : More specific error information.
- "UserID" : The ID granted to a new user, or 0 if there is an error
- "FirstName" : As provided.
- "LastName" : As provided.

Usage: 

> Provide a desired username and password combination via JSON, along with the name information. 

Results: 

- "Successful" : The user is added to the database with an automatically generated ID returned for the purposes of identifying the user during this session.
- "Unsuccessful" : The error fields are populated with information (regardless of error) and no add operation occurs.

***

**Login.php**

Input:

- "User" : Provided username.
- "Password" : Provided password.

Output:
- "ErrorID" : 
  - 0 : Successful operation.
  - 401 : Incorrect username or password, or user does not exist.
  - 503 : Service Unavailable
- "Error" : More specific error information.
- "UserID" : The ID associated with the user (if successful), or 0 if there is an error.
- "FirstName" : The FirstName associated with the given account, or blank if error
- "LastName" : The LastName associated with the given account, or blank if error

Usage:

> Provide the entered username and password combination via JSON.  

Results: 

- "Successful" : The User ID and name information are returned for the purposes of identifying the user during this session.
- "Unsuccessful" : The error fields are populated with information (regardless of error) and no identifying info is returned.

***

**CreateContact.php**

Input:

- "FirstName" : Contact first name as entered.
- "LastName" : Contact last name as entered.
- "Email" : Contact email as entered (no formatting currently enforced.)
- "Phone" : Contact phone (no formatting currently enforced.)
- "UserID" : User which is requesting this contact be added.

Output:

- "ErrorID" : 
  - 0 : Successful
  - 503 : Service Unavailable
- "Error" : Error message, or empty if successful.
- "ContactID" : The ID associated with the contact (if successful) or a value of 0, if there is an error."

Usage:

> Provide the entered contact information and User ID via JSON. 

Results: 

- "Successful" : The contact is added to the database with an automatically populated CreationDate and ID field, and associated with the given user.
- "Unsuccessful" : The error fields are populated and no add operation occurs. 

***

**GetContacts.php**

Input:

- "UserID" : UserID associated with the request.

Output:
- Success: JSON-encoded associative array of all contact records associated with that user. 
  - The ContactID field is used as the key, and the array contains objects with the following properties:
    - "FirstName" : Contact's first name.
    - "LastName" : Contact's last name.
    - "Email" : Contact's email. (in the format provided to the database.)
    - "Phone" : Contact's phone number. (in the format provided to the database.)
    - "CreationDate" : Date contact was added to the database.
- Failure: JSON object 
    - "ErrorID" : 
        - 204 : No results found for the specified UserID
        - 503 : Service Unavailable
    - "Error" : More specific error message

Usage:

> Provide the related UserID via JSON.  

Results: 

- "Successful" : A numeric array is returned with contact information. 
- "Unsuccessful" : A JSON object with only an ErrorID and Error field are returned. To check for an error, check for the existence of an ErrorID property.  

***

**ReadContact.php**

Input:

- "ContactID" : ContactID associated with the requested record.
- "UserID" : UserID associated with the request.

Output:

- "ErrorID" : 
    - 0 : Successful
    - 204 : No contact found matching this criteria
    - 503 : Service Unavailable
- "Error" : Error message, or empty if successful.
- "FirstName" : Contact first name.
- "LastName" : Contact last name.
- "Email" : Contact email. (in the format provided to the database.)
- "Phone" : Contact phone (in the format provided to the database.)

Usage:

> Provide the related ContactID and UserID via JSON. 
>
> Included as a method to auto-populate the text fields when the user begins updating a contact.
 
Results: 

- "Successful" : The information associated with the requested contact is returned. 
- "Unsuccessful" : The error fields are populated and no identifying information is returned. 

***

**UpdateContact.php**

Input:

- "ContactID" : ContactID associated with the requested record.
- "UserID" : UserID associated with the request.
- "FirstName" : Contact first name.
- "LastName" : Contact last name.
- "Email" : Contact email (no formatting currently enforced.)
- "Phone" : Contact phone (no formatting currently enforced.)

Output:

- "ErrorID" : 
    - 0 : Successful
    - 204 : No contact found matching this criteria
    - 503 : Service Unavailable
- "Error" : Error message, or empty if successful.

Usage:

> Provide the related ContactID and UserID via JSON.
 
Results: 

- "Successful" : The contact information is updated to match the provided information.
- "Unsuccessful" : The error fields are populated and no update operation occurs. 

***

**DeleteContact.php**

Input:

- "ContactID" : ContactID associated with the requested record.
- "UserID" : UserID associated with the request.

Output:

- "ErrorID" : 
    - 0 : Successful
    - 204 : No contact found matching this criteria
    - 503 : Service Unavailable
- "Error" : Error message, or empty if successful.

Usage:

> Provide the related ContactID and UserID via JSON. 
 
Results: 

- "Successful" : The contact is removed from the database.
- "Unsuccessful" : The error field is populated and no delete operation occurs. 

***

**SearchContacts.php**

Input:

- "UserID" : UserID associated with the request.
- "Search" : Search query as entered by the user.

Output:
- Success: JSON-encoded numeric array of all contact records fitting the search criteria, for that user.
    - "ContactID" : ContactID for this specific record, unique.
    - "FirstName" : Contact's first name.
    - "LastName" : Contact's last name.
    - "Email" : Contact's email. (in the format provided to the database.)
    - "Phone" : Contact phone (in the format provided to the database.)
    - "CreationDate" : Date contact was added to the database.
- Failure: JSON object 
    - "ErrorID" : 
        - 204 : No results found for the given criteria
        - 503 : Service Unavailable
    - "Error" : More specific error message

Usage:

> Provide the related ContactID and UserID via JSON. 
 
Results: 

- "Successful" : A numeric array of all contacts with the search query present in any user-facing field (FirstName, LastName, Phone, Email) are returned, sorted by most recent creation dates.
- "Unsuccessful" : A JSON object with only an ErrorID and Error field is returned. To check for an error, check for the existence of an ErrorID property. 

***
