### Prisma ORM | Use Cases

**UCS-001: Register a New User**

**Description:** A user provides their name, email address, password, biography, and image URL. A new user record must be created, ensuring that the email address is not already in use. The account must be active by default.

---

**UCS-002: Update User Profile**

**Description:** A user wants to change their name, bio, or image URL. Only the fields provided should be updated.

---

**UCS-003: Disable User Account**

**Description:** An administrator or the user themselves can mark an account as inactive.

---

**UCS-004: Get User Details with Active Subscriptions**

**Description:** Retrieve information about a specific user, including a list of their current active subscriptions.

---

**UCS-005: Create New Subscription Plan**

**Description:** An administrator needs to add a new plan to the system, specifying its name, description, monthly price, frequency, and whether it is active.

---

**UCS-006: Update Plan Price**

**Description:** An administrator adjusts the monthly price of an existing plan.

---

**UCS-007: List Available Plans**

**Description:** Display all subscription plans that are currently active and available to users.

---

**UCS-008: Subscribe User to Plan**

**Description:** A user chooses a plan and a new subscription is created. The start date must be the current date and the end date calculated based on the plan's frequency.

---

**UCS-009: Get Subscriptions by State**

**Description:** Lists all subscriptions that are in a particular status (e.g., ‘active’, ‘past_due’).
