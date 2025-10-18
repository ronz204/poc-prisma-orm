### POC Prisma ORM | Use Cases

**UC-001:** Register New Customer

**Description:** The system must allow the registration of a new person who wishes to contract services from the company. During the registration process, the following mandatory information is required: full name of the person, email address (which must be unique in the system), phone number (also unique), and country of residence. Once registration is completed successfully, the customer's account is automatically activated and becomes available for contracting services. The system must validate that both the email address and phone number are not already being used by another previously registered customer.

---

**UC-002:** Retrieve Customer Information

**Description:** The system must provide the capability to search for and display all personal information and activity history of a specific customer. This functionality allows viewing the customer's complete contact details, including their name, email address, phone number, and country of origin. Additionally, it must show the current account status (active or inactive) and any relevant information about the customer's activity within the system. The search can be performed using different criteria such as email address, phone number, or customer name.

---

**UC-003:** Update Customer Data

**Description:** The system must allow modification and correction of personal information for customers already registered in the system. The data that can be updated includes the customer's full name and country of residence. However, there is an important restriction: when attempting to modify the customer's email address or phone number, the system must verify that the new values are not being used by another existing customer. If the information is already in use, the system must reject the update and inform the user about this situation. This validation ensures that the uniqueness of these critical fields is maintained in the database.