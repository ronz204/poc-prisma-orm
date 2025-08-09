### Prisma ORM | Use Cases

**UCS-001: Register a New User | Ready**

**Description:** Allows registering a new user in the system, ensuring the email is not already in use. The user must provide name, email, password, bio, and image. The account is created as active by default.

---

**UCS-002: Update User Profile | Ready**

**Description:** Enables the user to update their name, bio, or image. Only the fields sent in the request are modified, keeping other data unchanged.

---

**UCS-003: Disable User Account | Ready**

**Description:** Allows deactivating a user account, either by the user or an administrator. The inactive user cannot access restricted functionalities.

---

**UCS-004: Get User Details with Active Subscriptions | Ready**

**Description:** Retrieves information about a specific user along with a list of their active subscriptions. Useful for displaying the user's profile and current services.

---

**UCS-005: Create New Subscription Plan | Ready**

**Description:** Allows an administrator to create a new subscription plan, defining name, description, monthly price, frequency, and activation status. The plan becomes available for new users.

---

**UCS-006: Update Plan Price | Ready**

**Description:** Enables modification of the monthly price for an existing plan. Only administrators can perform this adjustment, preserving historical data integrity.

---

**UCS-007: List Available Plans | Ready**

**Description:** Displays all subscription plans that are active and available to users. Facilitates selection of current options on the platform.

---

**UCS-008: Subscribe User to Plan | Ready**

**Description:** Allows a user to subscribe to a selected plan. The subscription is created with the current start date and the end date calculated according to the plan's frequency.

---

**UCS-009: Unsubscribe User From the Plan | Ready**

**Description:** Allows a user or administrator to cancel an active subscription. This involves updating the status of the subscription to ‘canceled’ and, optionally, calculating an end date for the remainder of the paid period.

---

**UCS-010: List Users with Expired Subscriptions | Pending**

**Descriptions:** An administrator can retrieve a list of all users whose subscriptions have expired. This is useful for reactivation marketing campaigns or data cleansing. It involves filtering the subscription table where the end date is less than the current date.

---

**UCS-011: Generate a Subscription Invoice | Pending**

**Description:** An invoice is automatically generated each time a new subscription is created or at the start of a new payment period for a subscription that renews automatically. The invoice must record the amount, the billing period, and have an initial status of ‘pending’.

---

**UCS-012: Record an Invoice Payment | Pending**

**Description:** Record a new payment for a specific invoice. The payment should update the invoice status to ‘paid’ and record the amount paid, the payment date, and the payment method.

---

**UCS-013: List User Payments | Pending**

**Description:** Retrieves all payments made by a specific user. This is useful for the user to view their transaction history.

---

**UCS-014: Delete a Subscription Plan**

**Description:** Allows an administrator to deactivate a subscription plan so that it is no longer available to new users. Instead of physically deleting the record, the activity field is updated. This is important for maintaining the integrity of existing subscription data.