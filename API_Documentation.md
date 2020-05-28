This file should document how to utilize the the API functions available to the front-end team. The should be in the following format

---

**API_Endpoint.php**

Input:

- "field1" : "Information about what is expected."
- "field2" : "Information about what is expected."

Output:

- "field1" : "Information about what is returned"
- "field2" : "Information about what is returned"

Usage: 

> Instructions on how the returned information is intended to be used.

---

**For any function that returns a list of results, the ErrorID property will not be populated if successful.**

Rather than checking if the ErrorID property is equal to zero for these functions, simply check if it exists at all.

For example, if you have retrieved the output as a JSON object called *output*, then you can check this via:

    if (output.hasOwnProperty("ErrorID"))
    { 
        // The ErrrorID field exists, and can now be handled.
    } 
---

**CreateUser.php**

Input:

- "User" : Desired username.
- "Password" : Desired password.
- "FirstName" : First name as provided.
- "LastName" : Last name as provided.

Output:

- "ErrorID"
  - 0 : Successful
  - 404 : Connection Error
  - 500 : Username already in use
- "Error" : More specific error information.
- "UserID" : The ID granted to a new user, or 0 if there is an error
- "FirstName" : As provided.
- "LastName" : As provided.

Usage: 

> Provide a desired username and password combination via JSON, along with the name information. If the operation is successful, the user is added to the database with an automatically generated ID returned for the purposes of identifying the user during this session. 
>
> If unsuccessful, the error fields are populated with information (regardless of error) and no add operation occurs.

---

**Login.php**

Input:

- "User" : Provided username.
- "Password" : Provided password.

Output:
- "ErrorID" : 
  - 0 : Successful operation.
  - 404 : Connection error.
  - 500 : Incorrect username or password.
- "Error" : More specific error information.
- "UserID" : The ID associated with the user (if successful), or 0 if there is an error.
- "FirstName" : The FirstName associated with the given account, or blank if error
- "LastName" : The LastName associated with the given account, or blank if error

Usage:

> Provide the entered username and password combination via JSON. If the operation is successful, the User ID and name information is returned for the purposes of identifying the user during this session. 
>
> If unsuccessful, the error fields are populated and no credentials are returned.

---

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
  - 404 : Connection Error
- "Error" : Error message, or empty if successful.
- "ContactID" : The ID associated with the contact (if successful) or a value of 0, if there is an error."

Usage:

> Provide the entered contact information and User ID via JSON. If the operation is successful the contact is added to the database with an automatically populated CreationDate and ID field, and associated with the given user. 
>
> If unsuccessful, the error fields are populated and no add operation occurs. 

---

**GetContacts.php**

Input:

- "UserID" : UserID associated with the request.

Output:
- Success: JSON-encoded numeric array of all contact records associated with that user.
    - "ContactID" : ContactID for this specific record, unique.
    - "FirstName" : Contact's first name.
    - "LastName" : Contact's last name.
    - "Email" : Contact's email.
    - "CreationDate" : Date contact was added to the database.
- Failure: JSON object 
    - "ErrorID" : 
        - 404 : Connection Error
        - 500 : No results found for the specified UserID
    - "Error" : More specific error message

Usage:

> Provide the related UserID via JSON. If the operation is successful, a numeric array is returned with contact information. 
>
> If unsuccessful, a JSON object with only an ErrorID and Error field are returned. To check for an error, check for the existence of an ErrorID property. 

---

**ReadContact.php**

Input:

- "ContactID" : ContactID associated with the requested record.
- "UserID" : UserID associated with the request.

Output:

- "ErrorID" : 
    - 0 : Successful
    - 404 : Connection Error
    - 500 : No contact found matching this criteria
- "Error" : Error message, or empty if successful.
- "FirstName" : Contact first name.
- "LastName" : Contact last name.
- "Email" : Contact email.
- "Phone" : Contact phone (in the format provided to the database.)

Usage:

> Provide the related ContactID and UserID via JSON. If the operation is successful the contact information is returned. 
>
> If unsuccessful, the error fields are populated. 
>
> Included as a method to auto-populate the text fields when the user begins updating a contact.

---

**UpdateContact.php**

Input:

- "ContactID" : ContactID associated with the requested record.
- "UserID" : UserID associated with the request.
- "FirstName" : Contact first name.
- "LastName" : Contact last name.
- "Email" : Contact email.
- "Phone" : Contact phone (in the format provided to the database.)

Output:

- "ErrorID" : 
    - 0 : Successful
    - 404 : Connection Error
    - 500 : No contact found matching this criteria
- "Error" : Error message, or empty if successful.

Usage:

> Provide the related ContactID and UserID via JSON. If the operation is successful the contact information is updated to match the provided information. 
>
> If unsuccessful, the error fields are populated and no update operation occurs. 

---

**DeleteContact.php**

Input:

- "ContactID" : ContactID associated with the requested record.
- "UserID" : UserID associated with the request.

Output:

- "ErrorID" : 
    - 0 : Successful
    - 404 : Connection Error
    - 500 : No contact found matching this criteria
- "Error" : Error message, or empty if successful.

Usage:

> Provide the related ContactID and UserID via JSON. If the operation is successful the contact is removed from the database. 
>
> If unsuccessful, the error field is populated and no delete operation occurs. 

---

**SearchContacts.php**

Input:

- "UserID" : UserID associated with the request.
- "Search" : Search query as entered by the user.

Output:
- Success: JSON-encoded numeric array of all contact records fitting the search criteria, for that user.
    - "ContactID" : ContactID for this specific record, unique.
    - "FirstName" : Contact's first name.
    - "LastName" : Contact's last name.
    - "Email" : Contact's email.
    - "CreationDate" : Date contact was added to the database.
- Failure: JSON object 
    - "ErrorID" : 
        - 404 : Connection Error
        - 500 : No results found for the given criteria
    - "Error" : More specific error message

Usage:

> Provide the related ContactID and UserID via JSON. If the operation is successful, a numeric array of all contacts with the search query present in any user-facing field (FirstName, LastName, Phone, Email) are returned. 
>
> If unsuccessful, a JSON object with only an ErrorID and Error field is returned. To check for an error, check for the existence of an ErrorID property. 

---
