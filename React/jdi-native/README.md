# JDI Native

Application mobile de gestion de tâches quotidiennes, portage React Native de l'application web JDI.

## 🎯 Fonctionnalités

- **Accueil** : Vue d'ensemble avec statistiques des tâches en cours et accomplies
- **Tâches** : Gestion complète des tâches avec priorités (Urgente, Moyenne, Basse)
- **Historique** : Consultation des tâches accomplies groupées par date
- **Statistiques** : Visualisation graphique de votre productivité
  - Heatmap annuelle (365 jours)
  - Histogramme des 7 derniers jours
  - Graphique linéaire des 30 derniers jours
- **Profil** : Gestion du nom d'utilisateur et paramètres

## 🎨 Design

- **Thème** : DaisyUI Light uniquement
- **Couleurs** : Palette harmonieuse avec accent violet (#570df8)
- **UI/UX** : Interface optimisée pour mobile avec interactions tactiles fluides
- **Graphiques** : Visualisations interactives et animées

## 🛠️ Technologies

- **Framework** : React Native avec Expo
- **Navigation** : Expo Router avec tabs
- **Styling** : NativeWind (TailwindCSS) + DaisyUI
- **Graphiques** : 
  - react-native-gifted-charts (bar & line charts)
  - react-native-svg (heatmap personnalisé)
- **Icônes** : Lucide React Native
- **Stockage** : AsyncStorage
- **Langage** : TypeScript

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm start
```

## 🚀 Lancement

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### Web (pour tests rapides)
```bash
npm run web
```

## 📱 Utilisation

1. **Ajouter une tâche** : Utilisez l'onglet "Tâches" pour créer de nouvelles tâches
2. **Définir la priorité** : Choisissez entre Urgente (U), Moyenne (M), ou Basse (B)
3. **Marquer comme accomplie** : Cochez la case pour compléter une tâche
4. **Filtrer** : Utilisez les boutons de filtre pour afficher des tâches spécifiques
5. **Consulter l'historique** : Visualisez toutes vos tâches accomplies
6. **Analyser vos stats** : Suivez votre productivité avec les graphiques
7. **Personnaliser** : Modifiez votre nom d'utilisateur dans "Mon Compte"

## 🎯 Différences avec la version web

- Navigation par onglets en bas (au lieu de sidebar)
- Interactions tactiles optimisées
- Graphiques adaptés pour mobile
- Heatmap personnalisé en SVG (au lieu de react-calendar-heatmap)
- AsyncStorage (au lieu de localStorage)
- Thème light uniquement

## 📝 Structure du projet

```
jdi-native/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Configuration des onglets
│   │   ├── index.tsx         # Page d'accueil
│   │   ├── todo.tsx          # Gestion des tâches
│   │   ├── historic.tsx      # Historique
│   │   ├── stats.tsx         # Statistiques
│   │   └── user.tsx          # Profil utilisateur
│   └── _layout.tsx           # Layout principal
├── components/
│   └── charts/
│       ├── Heatmap.tsx       # Heatmap annuelle
│       ├── Histogram.tsx     # Graphique 7 jours
│       └── MonthlyTasks.tsx  # Graphique 30 jours
├── types/
│   └── index.ts              # Définitions TypeScript
├── utils/
│   └── storage.ts            # Utilitaires AsyncStorage
├── global.css                # Styles Tailwind
├── tailwind.config.js        # Configuration Tailwind + DaisyUI
└── metro.config.js           # Configuration Metro + NativeWind
```

## 🎨 Palette de couleurs (DaisyUI Light)

- **Primary** : #570df8 (Violet)
- **Success** : #059669 (Vert)
- **Warning** : #f59e0b (Orange)
- **Error** : #dc2626 (Rouge)
- **Base** : #ffffff / #f3f4f6 / #e5e7eb

## 📄 License

MIT
