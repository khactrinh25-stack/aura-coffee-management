# Aura Coffee Software Business Requirements

## 1. Access Management and Authorization
### 1.1 Login
The user provides a login name and password. The interface does not provide authorization options. The system makes a POST protocol call to the /api/auth/login path. The system checks the active status of the account and matches the password using the BCrypt algorithm. If valid, the system returns the employee code, full name, and administrator or employee role. The password is not allowed to be returned in the response data. The session data is stored in the browser's sessionStorage memory.

### 1.2 Navigation and Session Expiration
After a successful login, administrators are redirected to the revenue screen, and employees are redirected to the sales screen. The work session automatically expires after 8 hours of inactivity. The system deletes the session and redirects to the login page with a notification when the work session expires.

### 1.3 Password Change
The password change process requires verifying the current password before updating the new password. The new password must match the password confirmation field. The new password data is encrypted using the BCrypt algorithm before being saved to the database.

## 2. Category and Beverage Management
The category and beverage management function is reserved for administrators only. Employees only have the right to read the list of beverages in the active status to serve the sales task.
* The beverage selling price must be a positive integer and displayed in Vietnam Dong units. The beverage name and category name must not be duplicated across the entire system.
* Deleting a category is prohibited if that category still has referencing beverages.
* The beverage deletion function only changes the status to discontinued; physically deleting data is absolutely prohibited to preserve the invoice history. Do not change the generated invoice detail data when executing a new selling price update.

## 3. Point-of-Sale Management
The sales screen for employees handles the local shopping cart, customizes beverage attributes, and sets the navigation lock status when a transaction is in progress.

### 3.1 Beverage Size Surcharges
The base selling price of the beverage will change based on the selected size. Size S does not add a surcharge. Size M adds 5000 Vietnam Dong to the unit price. Size L adds 8000 Vietnam Dong to the unit price. The unit price and total amount stored in the database must record the value that includes the surcharge.

### 3.2 Cart Aggregation Logic
The system iterates through the list of products in the shopping cart when the user adds a new product. The system only aggregates the product quantity if the new product perfectly matches 4 criteria compared to the existing product: beverage code, size, sugar level, and ice level. If there is any difference in the criteria, the system initializes a completely new product line in the shopping cart.

### 3.3 Navigation Lock Status
The customer phone number lookup component is disabled until the shopping cart has at least one product. When the shopping cart has products, the system activates the transaction status and locks all navigation functions to other screens. The checkout process must be completed or the user must confirm canceling the transaction to unlock the navigation function.

## 4. Customer and Reward Points Management
The accumulated points are non-negative integers and do not contain decimal parts. The reward points application function requires the customer to be attached to the order and the accumulated points must be greater than zero.
* Point accumulation: Customers receive 1 accumulated point for every 1000 Vietnam Dong actually paid. The total payment amount is rounded down before calculating points. The point addition and invoice saving algorithm must be executed together in a single database transaction.
* Point redemption: 1 accumulated point is equivalent to a 10 Vietnam Dong discount on the total invoice. The number of used points is not allowed to exceed the customer's currently available points and the discount amount must not exceed the provisional total amount. The system only deducts points when the payment transaction is successfully confirmed.

## 5. Invoice Management
Invoice data and invoice detail data switch to a completely read-only status after successful creation. All invoice editing or deleting operations are strictly prohibited.
* The data sent to the server includes the employee code, customer code, number of used points, payment method, and beverage detail list.
* The server system must recalculate the total amount based on the detail list and reward points logic; do not directly use the total amount transmitted by the interface.
* Administrators have the right to view the entire invoice history. Employees only have the right to view the invoices created by that employee on the current day based on the server's time zone.

## 6. Human Resources Management
Functions exclusively for administrators include creating accounts, updating employee information, resetting passwords, and locking accounts.
* When creating a new employee, the system checks for duplicate login names and sets the default active status.
* The password reset function does not require entering the current password because this operation is performed by an administrator.
* The account lock function only revokes the right to log into the system; it does not physically delete data records to ensure the integrity of the historical invoice data.

## 7. Revenue Statistics Reporting
The revenue reporting function has separate access authorization for administrators.
* Revenue is calculated based on the total actual collected amount of invoices within a specified time period.
* The default screen displays the revenue chart for the last 7 days. The system aggregates data by day.
* When using a custom time filter, the system must verify the validity of the start date and end date. The system blocks the query and displays an error if the start date is greater than the end date. The maximum data filtering range is set to 365 days to optimize query performance.