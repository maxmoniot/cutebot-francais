# Cutebot avec Simulateur

Extension pour MakeCode micro:bit qui combine tous les blocs français de l'extension officielle Elecfreaks Cutebot avec le simulateur de l'extension générique Microsoft.

## Fonctionnalités

### Tous les blocs Cutebot originaux en français
- Contrôle des moteurs (vitesse gauche/droite)
- LEDs (phares avant, RGB)
- Capteur ultrason HC-SR04
- Capteurs de suivi de ligne
- Servos S1 et S2
- Récepteur infrarouge
- Support complet de tous les capteurs et actuateurs

### Simulateur intégré
- Visualisation du robot en temps réel
- Simulation des moteurs avec physique réaliste
- Capteurs de ligne simulés
- Capteur ultrason simulé
- Fonctionne exactement comme le robot réel

## Installation

### Depuis GitHub
1. Dans MakeCode micro:bit, allez dans "Extensions"
2. Collez l'URL du dépôt GitHub
3. Cliquez sur "Importer"

### Installation locale
1. Ouvrez l'éditeur MakeCode
2. Cliquez sur l'icône engrenage puis "Extensions"
3. Cliquez sur "Importer un fichier"
4. Sélectionnez le fichier de l'extension

## Utilisation

L'extension fonctionne exactement comme l'extension Cutebot officielle. Tous les blocs sont disponibles en français sous la catégorie "cuteBot".

Le simulateur s'active automatiquement quand vous testez votre programme dans MakeCode. Aucune configuration supplémentaire n'est nécessaire.

### Exemple simple

```blocks
basic.forever(function () {
    if (cuteBot.tracking(cuteBot.TrackingState.L_R_line)) {
        cuteBot.motors(50, 50)
    } else {
        cuteBot.motors(30, 50)
    }
})
```

## Compatibilité

- Compatible avec micro:bit V1 et V2
- Fonctionne avec tous les modèles Cutebot (standard et Pro)
- Les programmes générés fonctionnent sur le robot réel
- Le simulateur s'active uniquement en mode simulation MakeCode

## Différences avec l'extension officielle

Cette extension est identique à l'extension officielle mais avec le simulateur en plus. Tous vos programmes existants fonctionneront sans modification.

## Support et contribution

Pour signaler un problème ou contribuer, visitez le dépôt GitHub.

## Licence

MIT - Compatible avec les licences des extensions Elecfreaks et Microsoft

## Crédits

- Extension Cutebot originale : Elecfreaks
- Simulateur : Microsoft (extension pxt-robot)
- Intégration : Version fusionnée
