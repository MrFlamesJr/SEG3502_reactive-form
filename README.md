## Répartition des tâches

### Personne A – Le formulaire et le CSS (`src/app/user-form/`)

- Formulaire réactif avec les 4 champs (prénom, nom, téléphone, courriel)
- Validation :
  - prénom et nom obligatoires
  - téléphone, lorsqu'il est fourni : 10 chiffres, 1er et 4e chiffres différents de 0
  - courriel : `Validators.email()`
- Messages d'erreur appropriés si les entrées sont invalides
- CSS

### Personne B – La page résultat (`src/app/user-result/`)

- Nouvelle page qui affiche les données saisies dans un tableau lorsque des informations valides sont soumises
- Rapport de lab (prendre le lab d'avant comme template)

## Note

- Seul l'exercice (partie III du PDF) est évalué.
