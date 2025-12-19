# Extension Cutebot Français avec Simulateur

## 🎯 Solution idéale pour l'enseignement

Cette extension combine :
- ✅ **Tous les blocs en français** (comme l'extension officielle)
- ✅ **Simulateur visuel fonctionnel** (de l'extension Microsoft)
- ✅ **Interface unique** pour les élèves

## Comment ça marche ?

Cette extension utilise l'infrastructure de simulation Microsoft `pxt-robot` mais expose les blocs en français du Cutebot officiel. C'est un "wrapper" intelligent qui traduit les commandes entre les deux systèmes.

## Blocs disponibles

### Moteurs
- Régler vitesse roue gauche % roue droite %
- Avancer en ligne droite à vitesse maximum
- Reculer en ligne droite à vitesse maximum
- Tourner à gauche/droite à vitesse maximum
- Arrêter le robot immédiatement

### Capteurs
- Capteur ultrason HC-SR04
- État capteur de ligne (● ●, ● ◌, ◌ ●, ◌ ◌)

### LEDs
- Régler phares LED couleur

### Servos
- Régler servo S1/S2 angle

## Installation

### Sur GitHub
1. Upload tous les fichiers de cette archive dans ton repository
2. Dans MakeCode : Extensions → Colle l'URL de ton repo

### Depuis l'URL
Dans MakeCode, ajoute l'extension avec l'URL de ton repository GitHub.

## Utilisation

### Programme de test simple

```blocks
basic.forever(function () {
    cuteBot.motors(50, 50)
    basic.pause(1000)
    cuteBot.motors(0, 0)
    basic.pause(1000)
})
```

### Programme suiveur de ligne

```blocks
basic.forever(function () {
    if (cuteBot.tracking(cuteBot.TrackingState.L_R_line)) {
        cuteBot.motors(50, 50)
    } else if (cuteBot.tracking(cuteBot.TrackingState.L_line_R_unline)) {
        cuteBot.motors(30, 50)
    } else if (cuteBot.tracking(cuteBot.TrackingState.L_unline_R_line)) {
        cuteBot.motors(50, 30)
    } else {
        cuteBot.motors(20, 20)
    }
})
```

### Programme éviteur d'obstacles

```blocks
basic.forever(function () {
    if (cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters) < 10) {
        cuteBot.stopcar()
        basic.pause(500)
        cuteBot.turnright()
        basic.pause(500)
    } else {
        cuteBot.forward()
    }
})
```

## Résultat attendu

- ✅ Les blocs apparaissent en français dans la catégorie "cuteBot"
- ✅ Le simulateur se charge avec le robot visible
- ✅ Le robot se déplace dans le simulateur
- ✅ Les capteurs fonctionnent dans le simulateur
- ✅ Le programme compile et fonctionne sur le robot réel

## Fonctionnalités

### Fonctionnent parfaitement ✅
- Moteurs (vitesses individuelles gauche/droite)
- Mouvements prédéfinis (avant, arrière, gauche, droite, stop)
- Capteur ultrason avec affichage visuel
- Capteurs de ligne avec visualisation
- LEDs (simulées)
- Servos (convertis en "bras")

### Limitations connues ⚠️
- **Récepteur infrarouge** : Non simulé (fonctionne sur robot réel uniquement)
- **RGB LEDs sous le robot** : Non simulés visuellement
- Les servos sont simulés comme des "bras" qui s'ouvrent/ferment

## Pédagogie

Cette extension est parfaite pour :
1. **Phase 1 - Simulation** : Les élèves testent leur programme sur le simulateur
2. **Phase 2 - Validation** : Une fois validé, ils téléchargent sur le robot réel
3. **Une seule interface** : Pas besoin de changer d'extension ou de blocs

## Support

- Compatible micro:bit V1 et V2
- Fonctionne sur MakeCode en ligne et desktop
- Les programmes générés fonctionnent sur le Cutebot réel

## Dépannage

### Le simulateur ne se charge pas
- Vérifie que tous les fichiers sont bien uploadés (notamment le dossier `botsim`)
- Recharge la page MakeCode

### Les blocs sont en anglais
- Va dans Paramètres → Langue → Français
- Recharge la page

### Erreur de compilation
- Vérifie que le fichier `protocol/protocol.ts` est présent
- Vérifie que tous les dossiers (`robots/`, `drivers/`, etc.) sont présents

## Architecture technique

Cette extension est un "wrapper" qui :
- Expose le namespace `cuteBot` avec les blocs français
- Utilise l'infrastructure `robot` de Microsoft en arrière-plan
- Traduit automatiquement entre les deux systèmes
- Initialise le robot automatiquement au premier appel

## Crédits

- Blocs originaux : Elecfreaks
- Infrastructure de simulation : Microsoft pxt-robot
- Wrapper français : Custom pour l'enseignement
