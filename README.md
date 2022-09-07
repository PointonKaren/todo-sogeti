# TodoApp

L'application web "ToDo" a été développée dans le cadre d'un test technique pour l'entreprise Sogeti.

## Features exigées:

- 1: Liste de mes TODOs :
  - Le "titre" et l'état du TODO doivent être visibles,
  - Ajout de quelques TODOS codés en dur,
- 2: Etat d'un TODO :
  Quand un TODO est coché, son état est changé et il est déplacé en bas de la liste.
- 3: Détailler un TODO
  En cliquant sur le bouton [...], on accède à une nouvelle page dédiée au TODO contenant le détail du TODO dont la description, non visible sur la page principale.
- 4: Ajouter un nouveau TODO :
  - Le titre est obligatoire
  - La description est facultative
  - Le nouveau TODO ajouté doit apparaître en haut de la liste

## Features bonus :

- Supprimer un TODO : au clic sur la croix, le TODO est supprimé de la liste.
- Au dernier TODO supprimé, un message signifiant que la liste est vide apparaît.

# Commentaires

- Lorsqu'on supprime une Tâche A, B, C ou D, que l'on recharge la page puis que l'on clique sur le bouton [...], le détail n'est pas disponible et la tâche est signalée comme inexistante.
  C'est logique : la tâche est présente en dur dans le code :

  - Si on la supprime via le bouton, elle est supprimée du local storage, du tableau todoItems et du code.
  - Si on recharge la page, elle est de nouveau présente dans le tableau todoItems et apparaît sur la page, mais reste **absente du local storage**, d'où le message d'erreur.

  Ce "bug" n'existerait pas si ces tâches n'étaient pas codées en dur.
