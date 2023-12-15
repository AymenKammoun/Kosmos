# Kosmos software v2
## Description du projet
Ce projet est une branche du repository **KOSMOS_SOFTWARE** du **KonkArLab** qui ajoute une deusiéme alternative du commande de la camera Kosmos : La controle par les interrepteurs reed reste fonctionelle. On ajoute à ça une application web qui fait les memes chose que les interrepteurs et on ajoutant au memes temps d'autres fonctionnalités.
On peut résumé tous les fonctionnalité de l'application web par ce qui suit :
-   Activer ou désactiver l'enregistrement.
-   Voir le camera en flux direct avant l'enregistrement.
-   Consulter l'etat du système.
-   Configurer et consulter les paramétres du camera.
-   Consulter les derinier enregistrement.
## Description de la partie Backend
### Technologie utiliser
Vue que le software de base est développer par la language Python, On a décidé d'utiliser Flask qui est un micro framework open-source de développent web en Python. Il est classé comme microframework car il est très léger. Flask a pour objectif de garder un noyau simple mais extensible.

### Description des API
-   GET /state :
    Cette requette retourne l'etat du systéme
    #### Exemple de réponse :
    ```json
    {
        "state": "KState.STANDBY",
        "status": "ok"
    }
    ```

    #### Implémentation
    ```python
    def state(self):
            return {
                "status" : "ok",
                "state" : str(self.myMain.state)
            }
    ```

