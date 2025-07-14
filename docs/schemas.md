**SCH-001: Plans Table**

**Description:** This is where we keep all the different subscription types we offer (e.g., "Basic," "Premium," "Annual"). It includes details like the plan name, its price, and how often it renews (the periodicity).


**SCH-002: Users Table**

**Description:** This stores the basic information for our registered customers in the system, like their name, email address, and when they signed up.


**SCH-003: Subscriptions Table**

**Description:** This table links a user to a specific plan. It records when the subscription started, when the current period is expected to end, its current status (active, canceled, etc.), and if it will auto-renew.


**SCH-004: Invoices Table**

**Description:** Here, we save the details of every invoice generated for a subscription. This includes the amount due, the issue and due dates, and whether it has been paid.


**SCH-005: Payments Table**

**Description:** This records each payment transaction a customer makes to settle an invoice. It contains the amount paid, the date, and the payment method used.