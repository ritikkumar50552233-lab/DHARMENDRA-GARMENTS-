# Security Specification: Dharmendra Garments

## 1. Data Invariants
- Products and Categories are publicly viewable by all customers and guests.
- Only authenticated admins (checked via the `/admins/{adminId}` document or verified admin email) can create, update, or delete products, categories, and store information.
- Normal customers can read their own profile in `/users/{userId}` and update their own name/phone. Normal customers cannot access or write to `/admins/{adminId}`.
- All product writes must enforce strictly validated data types, name lengths, non-negative price, and valid category IDs.

## 2. The Dirty Dozen Payloads (Designed to test boundaries)
1. Unauthenticated Product Create: Attempting to insert a product without authentication -> PERMISSION_DENIED.
2. Customer Role Escalation: A customer trying to create `/admins/{uid}` with `role: "admin"` -> PERMISSION_DENIED.
3. Negative Product Price: Attempting to set price: -500 -> PERMISSION_DENIED.
4. Oversized Product Name: Attempting to inject a 10KB string as product name -> PERMISSION_DENIED.
5. Unauthorized StoreInfo Mutation: An anonymous visitor updating `whatsappNumber` -> PERMISSION_DENIED.
6. Cross-User Profile Read: User A attempting to read User B's private profile in `/users/{userId}` -> PERMISSION_DENIED.
7. Cross-User Profile Write: User A attempting to overwrite User B's profile -> PERMISSION_DENIED.
8. Junk Document ID Injection: Injecting invalid characters into document ID -> PERMISSION_DENIED.
9. Malformed Category: Creating a category without a name -> PERMISSION_DENIED.
10. Unverified Email Admin Spoof: Signing up with unverified email matching admin address -> PERMISSION_DENIED.
11. Unauthenticated Product Delete: Attempting to delete a product anonymously -> PERMISSION_DENIED.
12. Customer updating Store Announcement: An unprivileged customer modifying store announcement banner -> PERMISSION_DENIED.
