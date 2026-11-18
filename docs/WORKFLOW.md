# Workflow Git du projet

## Choix retenu : Git Flow allégé

Nous retenons une version **allégée de Git Flow** : nous conservons ses
branches principales (`main`, `develop`) et ses branches de travail
(`feature/*`, `hotfix/*`), mais **sans branches `release/*`**.

### Pourquoi Git Flow ?

- **Plusieurs développeurs travaillent en parallèle** sur des fonctionnalités
  distinctes (équipements, techniciens, planification, statuts) : chaque
  fonctionnalité doit être isolée dans sa propre branche.
- **L'équipe veut conserver une version stable** : `main` ne reçoit que du code
  validé, tandis que `develop` sert de zone d'intégration où les
  fonctionnalités sont assemblées et testées ensemble.
- **Les corrections urgentes doivent pouvoir partir en production** sans
  embarquer les fonctionnalités en cours de développement : c'est le rôle des
  branches `hotfix/*` créées depuis `main`.

### Pourquoi l'alléger ?

Les branches `release/*` servent à stabiliser une version (gel des
fonctionnalités, recette, numéro de version) sur des projets aux cycles de
livraison longs. Notre application est de petite taille et n'a pas de cycle
de recette formel : une **Pull Request `develop` → `main`** suffit pour livrer
une version, marquée par un **tag** (`v1.1.0`).

GitHub Flow (une seule branche `main` + branches courtes) aurait été plus
simple, mais il ne sépare pas le code intégré du code livré, ce qui va à
l'encontre de l'objectif de stabilité.

## Les branches et leur rôle

| Branche | Créée depuis | Fusionnée dans | Rôle |
|---|---|---|---|
| `main` | — | — | Version stable, en production. Jamais de commit direct. |
| `develop` | `main` | `main` (livraison) | Intégration des fonctionnalités terminées. |
| `feature/<nom>` | `develop` | `develop` | Développement d'une fonctionnalité. |
| `hotfix/<nom>` | `main` | `main` **et** `develop` | Correction urgente d'un défaut en production. |
| `docs/<nom>` | `develop` | `develop` | Documentation. |

## Développer une fonctionnalité

1. Une **Issue** décrit le besoin et ses critères d'acceptation.
2. Créer la branche depuis `develop` à jour :
   `git switch develop && git pull && git switch -c feature/<nom>`
3. Développer avec des commits **Conventional Commits** (`feat(...)`, `fix(...)`...).
4. Mettre à jour la branche avant la PR : `git pull --rebase origin develop`
5. Pousser et ouvrir une **Pull Request vers `develop`**, liée à l'Issue (`Closes #n`).
6. **Revue de code** par un autre membre ; corrections si nécessaire.
7. Fusion après approbation, suppression de la branche.

## Traiter une correction urgente (hotfix)

1. Une **Issue** de type `bug` avec le label `urgent` décrit le défaut.
2. Créer la branche **depuis `main`** (le code en production), pas depuis
   `develop` qui contient du code non livré :
   `git switch main && git pull && git switch -c hotfix/<nom>`
3. Corriger et **vérifier** le correctif (test manuel ou automatisé).
4. Ouvrir une **Pull Request vers `main`**, revue prioritaire, fusion.
5. Taguer la version corrigée (`v1.0.1`).
6. **Reporter le correctif dans `develop`** (PR `main` → `develop`), sinon la
   prochaine livraison réintroduirait le bug.

## Livrer une version

1. Pull Request `develop` → `main`, revue, fusion.
2. Tag de version sur `main` : `git tag v1.1.0 && git push origin v1.1.0`.