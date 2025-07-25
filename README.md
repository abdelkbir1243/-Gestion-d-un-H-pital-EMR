# -Gestion-d-un-Hopital-EMR
# 🏥 Système de Gestion des Dossiers Médicaux Électroniques (EMR)

> Projet académique - Faculté des Sciences - Université Mohammed V de Rabat  
> Réalisé par : **LAMNAOUAR Abdelkabir**  
> Encadré par : **Mme Safae CHARDALE**  
> Année universitaire : **2025 / 2026**

---

## 📌 Description

Ce projet est une plateforme web complète permettant la **gestion électronique des dossiers médicaux (EMR)** au sein d’un établissement hospitalier. Il permet à l’administrateur de superviser les patients, les médecins, les consultations, les prescriptions et les examens.

Le projet repose sur la **stack MERN** (MongoDB, Express, React, Node.js), offrant une architecture moderne, scalable et réactive.

---

## 🎯 Objectifs du projet

- Stocker les dossiers médicaux sous forme de documents **JSON**
- Gérer les **consultations, prescriptions, examens et antécédents**
- Associer chaque patient à un **identifiant unique**
- Permettre une **recherche dynamique** (symptômes, diagnostics, traitements)
- Assurer la **confidentialité, traçabilité** et évolutivité des données

---

## 🛠️ Technologies utilisées

| Côté | Technologies |
|------|--------------|
| Backend | Node.js, Express, MongoDB, Mongoose |
| Frontend | React.js, Axios, React Router |
| Outils | Postman, MongoDB Compass, VS Code |

---

## 🚀 Fonctionnalités principales

- 🔐 Connexion et dashboard administrateur
- 🧑‍⚕️ Gestion des patients (CRUD)
- 📂 Création automatique d’un dossier médical
- 📝 Gestion des consultations, prescriptions et examens
- 🔎 Recherche avancée par diagnostic / symptôme
- ⚙️ Communication REST API entre React et Express
- 🔄 Mise à jour dynamique des données sans rechargement
- 🧾 Préparation future : génération PDF, authentification JWT, DICOM

---

## 📂 Structure du projet
emr-backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── server.js
│ └── .env
emr-front/
│ ├── src/
│ ├── components/
│ ├── App.jsx
│ └── package.json

---

## ⚙️ Installation locale

### 1. Cloner le projet

```bash
git clone https://github.com/abdelkabirlamnaouar/emr-project.git
cd emr-project
