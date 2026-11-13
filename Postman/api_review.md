
# ShopSure API Review

## 1. Overview

This document reviews the eight API endpoints tested in the ShopSure API collection. The review focuses on the parameters sent, whether they are necessary, the information returned by the API, and recommendations for improving API design, data handling, and security.

The observations in this review are based on the requests executed and responses received during testing.

## 2. API Endpoint Review

| Endpoint | Params sent | Is every param needed? | Why? | Response fields that look over-exposed | Your recommendation |
|---|---|---|---|---|---|
| `POST /api/createAccount` | 17 registration fields, including name, email, password, personal and address details. | Not necessarily. | Email and password are needed to create and access an account. However, some additional profile and address details may not be essential during initial registration. | No obvious over-exposure was identified from the registration response reviewed. | Consider making non-essential profile and address fields optional and collecting them when they are needed. |
| `POST /api/verifyLogin` | Email and password. | Yes, based on the login functionality tested. | Both parameters are used to verify the user's identity and authenticate access to the account. | No user profile details were observed in the response. It returned a response code and message. | Keep the response limited to authentication status and avoid returning sensitive account information. |
| `GET /api/getUserDetailByEmail` | Email address passed as a query parameter. | The email is needed to identify the account. However, the tested request did not include a password or authentication token. | The email is used to retrieve the corresponding user's account details. | The response returns a user object containing personal information, including the user's name, email, and other profile details. | Review the access controls for this endpoint. Consider requiring authentication and authorization before returning user details, and limit the response to information the requesting user is permitted to access. |
| `PUT /api/updateAccount` | Email, password, and account profile details to be updated. | The email and password are needed based on the update functionality tested. The necessity of every profile field was not individually tested. | The endpoint uses the supplied credentials to identify and verify the account, while the profile details are used to update it. | No obvious over-exposure was identified from the update response reviewed. | Validate the supplied credentials and update only fields permitted for modification. Consider allowing optional profile fields to be updated independently. |
| `DELETE /api/deleteAccount` | Email and password. | Yes, based on the deletion functionality tested. | The credentials are used to identify and verify the account before deletion. | No user profile details were observed in the deletion response. It returned a response code and message. | Ensure that account deletion is properly authenticated and that the API returns a clear confirmation when deletion succeeds. |
| `GET /api/productsList` | No parameters were sent. | No request parameters were required for the tested GET request. | The endpoint returned the available products without requiring additional input. | The response contains product information, including product IDs, names, prices, brands, and categories. | Return only product information needed by API consumers and ensure the response uses the appropriate content type. |
| `GET /api/brandsList` | No parameters were sent. | No request parameters were required for the tested GET request. | The endpoint returned the available brands without requiring additional input. | The response contains brand IDs and brand names. No obvious over-exposure was identified in the fields reviewed. | Keep the response limited to relevant brand information and use the appropriate content type. |
| `POST /api/searchProduct` | `search_product` parameter passed in the request body. | Yes, for performing a product search. | The search term is needed to identify products matching the user's search. A request without this parameter returned a `400` response code in the response body. | The response returns product information, including IDs, names, prices, brands, and categories. No sensitive information was identified in the fields reviewed. | Validate the search parameter and improve search relevance so that returned products match the supplied search term more accurately. |

## 3. General Observations

### 3.1 HTTP Status Code and Response Code Mismatch

During testing, several requests returned HTTP status code `200` even when the response body contained different response codes, such as `201`, `400`, `404`, and `405`.

Examples include:

- Successful account creation returned HTTP `200` while the response body contained `201`.
- Requests with missing parameters returned HTTP `200` while the response body contained `400`.
- Unsupported request methods returned HTTP `200` while the response body contained `405`.

**Recommendation:** The API should use appropriate HTTP status codes to represent the actual outcome of each request. This would make it easier for clients to interpret responses consistently.

### 3.2 Content-Type Header

The responses reviewed contained JSON-formatted response bodies but returned the header:

`Content-Type: text/html; charset=utf-8`

This was observed across multiple endpoints, including Products, Brands, Search, and Account Lifecycle requests.

**Recommendation:** The API should return an appropriate content type, such as `application/json`, when responding with JSON data.

### 3.3 Search Relevance

When testing the Search Product endpoint with the search term `top`, some returned products did not appear relevant to the search term. Examples included:

- Little Girls Mr. Panda Shirt
- Colour Blocked Shirt – Sky Blue

**Recommendation:** Review the product search filtering logic to ensure that returned products are relevant to the supplied search term.

### 3.4 Login Behaviour

During testing, the valid credentials used for the original test account returned a response code of `404` with the message `User not found!`, even though the account could be retrieved through the Get User Detail by Email endpoint.

However, the valid login request in the chained account lifecycle test passed successfully.

**Recommendation:** Investigate the inconsistent login behaviour to determine why the original test account could not log in while the newly created chained test account could.

### 3.5 User Information Exposure

The Get User Detail by Email endpoint returned a user object containing personal and profile information. The tested request required only an email address and did not include a password or authentication token.

**Recommendation:** Review the access controls for this endpoint. User information should only be accessible to authorised users, and the API should avoid returning unnecessary personal information.

## 4. Conclusion

The testing exercise covered eight API endpoints across Products, Brands, Search, and Account Lifecycle functionalities.

The tests identified areas that may require further review, including HTTP status code handling, response content types, search relevance, login consistency, and access to user information.

These observations and recommendations can help improve the API's reliability, consistency, security, and overall user experience.