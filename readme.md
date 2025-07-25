# 📘 API Documentation – EMR Management System

## 🧾 Introduction

This backend API is designed to manage Electronic Medical Records (EMR) in a hospital system using Node.js and MongoDB. It provides full CRUD operations, authentication, role-based access control, and automatic linkage between patients, doctors, and their medical data (consultations, prescriptions, exams).

---

## 🧩 Roles

* **Admin**: Full access to all resources
* **Doctor**: Can manage patients, consultations, exams, prescriptions
* **Patient**: Can view their own EMR only

---

## 🔐 Authentication

### 🔁 POST /auth/register-doctor

👤 Creates a doctor profile and linked user account (admin only).

```json
{
  "username": "dr.house",
  "password": "securePass123",
  "doctorInfo": {
    "firstName": "Gregory",
    "lastName": "House",
    "specialty": "Diagnostics"
  }
}
```

✅ Response:

```json
{
  "message": "Doctor account created successfully",
  "userId": "USER_ID",
  "doctorId": "DOCTOR_ID"
}
```

### 👤 POST /auth/register-patient

👤 Creates a patient profile and linked user account (admin only).

```json
{
  "username": "emma.doe",
  "password": "PatientPass321",
  "patientInfo": {
    "firstName": "Emma",
    "lastName": "Doe",
    "birthDate": "1990-05-01"
  }
}
```

✅ Response:

```json
{
  "message": "Patient account created successfully",
  "userId": "USER_ID",
  "patientId": "PATIENT_ID"
}
```

### 🧪 POST /auth/enroll

⚙️ Used to create a generic user account linked to an existing `linkedId` (for internal/test usage).

```json
{
  "username": "demo.user",
  "password": "DemoPass",
  "role": "doctor",
  "linkedId": "LINKED_ENTITY_ID"
}
```

### 🔐 POST /auth/login

🔑 Authenticates a user and returns a JWT token.

```json
{
  "username": "dr.house",
  "password": "securePass123"
}
```

✅ Response:

```json
{
  "message": "Welcome dr.house",
  "token": "JWT_TOKEN",
  "user": {
    "_id": "USER_ID",
    "username": "dr.house",
    "role": "doctor",
    "linkedId": "DOCTOR_ID"
  }
}
```

---

## 👤 Patient

### POST /patients

Create a new patient and auto-create EMR.

```json
{
  "firstName": "Emma",
  "lastName": "Doe",
  "birthDate": "1990-05-01"
}
```

✅ Response:

```json
{
  "message": "Patient created successfully",
  "patient": {
    "_id": "...",
    "firstName": "Emma",
    "lastName": "Doe",
    "birthDate": "1990-05-01"
  },
  "emrId": "EMR_ID"
}
```

### GET /patients

Get all patients (with pagination + from/to filter).

```
GET /patients?page=1&limit=10&from=2025-06-01&to=2025-07-01
```

### GET /patients/\:id

Get patient details by ID.

```
GET /patients/PATIENT_ID
```

### PUT /patients/\:id

Update a patient.

```json
{
  "firstName": "Emma",
  "lastName": "Doe",
  "birthDate": "1991-01-01"
}
```

### DELETE /patients/\:id

Remove a patient.

```
DELETE /patients/PATIENT_ID
```

---

## 🩺 Doctor

### POST /doctors

Create a new doctor profile (admin only).

```json
{
  "firstName": "Gregory",
  "lastName": "House",
  "specialty": "Diagnostics"
}
```

✅ Response:

```json
{
  "message": "Doctor created successfully",
  "doctor": {
    "_id": "...",
    "firstName": "Gregory",
    "lastName": "House",
    "specialty": "Diagnostics"
  }
}
```

### GET /doctors

List all doctors.

```
GET /doctors
```

### GET /doctors/\:id

Retrieve one doctor by ID.

```
GET /doctors/DOCTOR_ID
```

### PUT /doctors/\:id

Update an existing doctor profile.

```json
{
  "specialty": "Cardiology"
}
```

✅ Response:

```json
{
  "message": "Doctor updated",
  "doctor": {
    "_id": "...",
    "firstName": "Gregory",
    "lastName": "House",
    "specialty": "Cardiology"
  }
}
```

### DELETE /doctors/\:id

Delete a doctor profile.

```
DELETE /doctors/DOCTOR_ID
```

✅ Response:

```json
{
  "message": "Doctor deleted"
}
```

---

## 📁 EMR

### GET /emrs

All EMRs (filterable by `createdAt`, paginated).

```
GET /emrs?page=1&limit=10&from=2025-01-01&to=2025-12-31
```

### GET /emrs/\:id

Get full EMR by ID (includes consultations, prescriptions, exams).

```
GET /emrs/EMR_ID
```

### GET /emrs/by-patient/\:patientId

Get EMR using a patient’s ID (admin, doctor, or patient).

```
GET /emrs/by-patient/PATIENT_ID
```

### GET /emrs/me/emr

Returns connected patient's own EMR (only `patient` role).

```
GET /emrs/me/emr
Headers: Authorization: Bearer <token>
```

### GET /emrs/\:id/export

Generate a PDF version of the EMR.

```
GET /emrs/EMR_ID/export
Response: PDF file (attachment)
```

---

## 📝 Consultations

### POST /consultations

Creates a consultation and links it to an existing EMR.

```json
{
  "date": "2025-07-21",
  "doctorId": "DOCTOR_ID",
  "emrId": "EMR_ID",
  "symptoms": ["fever"],
  "diagnosis": "Flu",
  "notes": "Rest advised"
}
```

✅ Response:

```json
{
  "message": "Consultation added and linked to EMR",
  "consultation": {
    "_id": "...",
    "date": "2025-07-21",
    "doctorId": "...",
    "emrId": "...",
    ...
  }
}
```

### GET /consultations

All consultations (paginated, filterable by date).

```
GET /consultations?page=2&limit=5&from=2025-07-01&to=2025-07-19
```

### GET /consultations/by-doctor/\:doctorId

Returns consultations created by a specific doctor.

```
GET /consultations/by-doctor/DOCTOR_ID?page=1&limit=10&from=2025-06-01&to=2025-07-01
```

### GET /consultations/by-patient/\:patientId

Returns consultations related to a patient’s EMR.

```
GET /consultations/by-patient/PATIENT_ID?page=1&limit=10&from=2025-06-01&to=2025-07-01
```

---

## 💊 Prescriptions

### POST /prescriptions

Create a prescription and link to EMR.

```json
{
  "date": "2025-07-21",
  "doctorId": "...",
  "emrId": "...",
  "medication": "Ibuprofen",
  "dosage": "400mg",
  "duration": "5 days"
}
```

✅ Response:

```json
{
  "message": "Prescription added and linked to EMR",
  "prescription": { ... }
}
```

### GET /prescriptions

Get all prescriptions (paginated and filterable by date).

```
GET /prescriptions?page=1&limit=10&from=2025-06-01&to=2025-07-01
```

### GET /prescriptions/by-doctor/\:doctorId

```
GET /prescriptions/by-doctor/DOCTOR_ID
```

### GET /prescriptions/by-patient/\:patientId

```
GET /prescriptions/by-patient/PATIENT_ID
```

---

## 🧪 Exams

### POST /exams

Create a new exam and link it to the patient’s EMR.

```json
{
  "date": "2025-07-21",
  "type": "Blood Test",
  "result": "Normal",
  "doctorId": "...",
  "emrId": "..."
}
```

✅ Response:

```json
{
  "message": "Exam added and linked to EMR",
  "exam": {
    "_id": "...",
    "type": "Blood Test",
    "result": "Normal",
    "date": "2025-07-21",
    "doctorId": "...",
    "emrId": "..."
  }
}
```

### GET /exams

Get all exams (paginated and filterable by date).

```
GET /exams?page=1&limit=10&from=2025-06-01&to=2025-07-01
```

### GET /exams/by-doctor/\:doctorId

Retrieve all exams performed by a specific doctor.

```
GET /exams/by-doctor/DOCTOR_ID
```

### GET /exams/by-patient/\:patientId

Retrieve all exams linked to a specific patient’s EMR.

```
GET /exams/by-patient/PATIENT_ID
```

---

## 🛡️ Middleware

All protected routes require:

```
Authorization: Bearer <token>
```

---

## 🔚 Conclusion

This API provides a scalable, secure and structured foundation to manage medical records, while ensuring traceability and access control per role. Future extensions may include: appointment scheduling, notification systems, and full audit logging.
