### POC Prisma ORM | Use Cases

**UC-001:** Register New Customer

**Description:** The system must allow the registration of a new person who wishes to contract services from the company. During the registration process, the following mandatory information is required: full name of the person, email address (which must be unique in the system), phone number (also unique), and country of residence. Once registration is completed successfully, the customer's account is automatically activated and becomes available for contracting services. The system must validate that both the email address and phone number are not already being used by another previously registered customer.

---

**UC-002:** Retrieve Customer Information

**Description:** The system must provide the capability to search for and display all personal information and activity history of a specific customer. This functionality allows viewing the customer's complete contact details, including their name, email address, phone number, and country of origin. Additionally, it must show the current account status (active or inactive) and any relevant information about the customer's activity within the system. The search can be performed using different criteria such as email address, phone number, or customer name.

---

**UC-003:** Update Customer Data

**Description:** The system must allow modification and correction of personal information for customers already registered in the system. The data that can be updated includes the customer's full name and country of residence. However, there is an important restriction: when attempting to modify the customer's email address or phone number, the system must verify that the new values are not being used by another existing customer. If the information is already in use, the system must reject the update and inform the user about this situation. This validation ensures that the uniqueness of these critical fields is maintained in the database.

---

**UC-004:** Suspend Customer Account

**Description:** The system must provide the functionality to temporarily or permanently deactivate a customer's account when necessary. This action changes the customer's status from active to inactive, preventing them from accessing system features or contracting new services. However, all historical data, including previous contracts, service history, and personal information, must remain preserved in the system for audit and reference purposes. The deactivation process should be reversible, allowing the account to be reactivated in the future if needed. This feature is essential for managing customers who may have payment issues, policy violations, or simply wish to temporarily suspend their relationship with the company.

---

**UC-005:** Register New Service Offering

**Description:** The system must allow authorized personnel to add new service offerings to the company's catalog available for customers. During the service registration process, the following information must be provided: a unique service name that clearly identifies the offering (the system must verify this name is not already in use), and the service price expressed in monetary units with decimal precision for accurate billing. Once successfully registered, the new service is automatically marked as active and becomes immediately available for customers to contract. The system must ensure that service names remain unique across the entire catalog to prevent confusion and maintain clear service identification for both customers and administrative staff.

---

**UC-006:** Display Available Service Catalog

**Description:** The system must provide a comprehensive view of all services currently available for customer purchase and contracting. This functionality displays a complete catalog showing only active services, including their names, current pricing information, and any relevant service details. The catalog should be presented in a user-friendly format that allows easy browsing and comparison of different service options. This feature serves both customers who want to explore available offerings and staff members who need to reference current services during sales processes. The system must automatically exclude any inactive or suspended services from this display, ensuring that only purchasable services are shown to potential customers.

---

**UC-007:** Modify Service Price

**Description:** The system must allow authorized personnel to update and adjust the pricing of existing services in the company's catalog when market conditions or business requirements change. This functionality enables the modification of service costs while maintaining historical pricing data for audit and reporting purposes. The price adjustment process requires careful validation to ensure that the new price is entered with proper decimal precision and follows established pricing policies. Once the price modification is completed successfully, the updated pricing becomes immediately effective for new customer contracts, while existing active contracts maintain their original agreed-upon pricing. This feature is crucial for maintaining competitive pricing strategies and responding to market fluctuations or cost changes in service delivery.

---

**UC-008:** Formalize Service Contract

**Description:** The system must enable the creation of binding service agreements that establish a contractual relationship between an active customer and a specific service offering. This process can only be executed when both the customer account and the selected service are in active status, ensuring that all parties meet current operational requirements. The contract formalization automatically records the current date as the agreement start date and initially marks the contract as active with no predetermined end date. The system must validate customer eligibility and service availability before proceeding with contract creation. This functionality serves as the foundation for the customer-service relationship, establishing clear terms and enabling proper tracking of service commitments and customer obligations throughout the contract lifecycle.

---

**UC-009:** Review Customer Contract History

**Description:** The system must provide comprehensive access to a complete chronological record of all service agreements associated with a specific customer account. This functionality displays both currently active contracts and previously terminated agreements, providing a full historical perspective of the customer's relationship with the company. Each contract entry in the history shows detailed information including the associated service name, contract start date, current status (active or terminated), and end date when applicable. This feature enables customer service representatives and management to understand the customer's service evolution, identify patterns in service usage, and make informed decisions about future service offerings. The historical view supports both customer inquiries and internal business analysis requirements.