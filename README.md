# 🎂 Ariyike's Birthday Surprise

A magical 3D birthday experience built with Three.js and React. Walk into a cozy living room as Ariyike and cut the birthday cake!

## ✨ Features

- **3D Interactive Room** - Cozy living room with chocolate/maroon color scheme
- **Character Control** - Walk around using mobile joystick or keyboard
- **Interactive Cake** - Walk up to the cake and tap to cut it
- **Celebration Effects** - Confetti explosion when cake is cut
- **Sweet Birthday Message** - Personalized message for Ariyike
- **Mobile Optimized** - Touch controls and responsive design

## 🎮 How to Play

1. **Walk to the Cake** - Use the joystick (bottom left) or arrow keys to move
2. **Cut the Cake** - When you see "Tap to cut cake!", tap or press space/enter
3. **Celebrate!** - Enjoy the confetti and birthday message 🎉

## 📁 Project Structure

```
ariyike-birthday/
├── public/
│   ├── assets/         # 3D models, textures, audio
│   └── ariyike-photo.jpg  # ← Add her photo here!
├── src/
│   ├── components/     # 3D components (Room, Character, Cake)
│   ├── scenes/         # Main scenes (Loading, Main Room)
│   ├── hooks/          # Custom React hooks
│   └── styles/         # CSS styles
└── dist/              # Production build
```

## 🚀 Quick Start

### 1. Add the Photo

**IMPORTANT**: Add Ariyike's photo to the `public/` folder with the filename:
```
public/ariyike-photo.jpg
```

**Photo Requirements:**
- Front-facing, well-lit photo
- Clear view of face
- JPG format preferred
- Recommended size: 400x500px

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 📱 Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 2: Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Option 3: Manual Deploy

```bash
# Build the project
npm run build

# The dist/ folder contains your static site
# Upload these files to any static hosting service
```

## 🎨 Customization

### Change the Birthday Message

Edit the message in `src/App.jsx`:

```jsx
<div className="birthday-message">
  <h1>Happy Birthday, Ariyike!</h1>
  <p>Your custom message here...</p>
</div>
```

### Change Colors

Edit the color palette in `src/styles/global.css` and `src/components/Room/Room.jsx`

### Add Background Music

1. Add audio file to `public/assets/audio/`
2. Uncomment and configure audio in `src/App.jsx`

## 🛠️ Technologies Used

- **React 18** - UI Framework
- **Three.js** - 3D Graphics
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Helpful 3D components
- **GSAP** - Animations
- **Vite** - Build tool

## 📱 Mobile Controls

- **Virtual Joystick** - Bottom left corner
- **Tap Cake** - When nearby
- **Arrow Keys / WASD** - Desktop alternative
- **Space / Enter** - Interact with cake

## 🎯 Performance Tips

- Built for mobile devices
- Optimized 3D models
- Efficient particle systems
- Lazy loading of assets

## 🐛 Troubleshooting

### Photo not showing?
- Make sure it's named exactly `ariyike-photo.jpg`
- Place it in the `public/` folder
- Refresh the page after adding

### 3D scene not loading?
- Check browser console for errors
- Ensure WebGL is enabled
- Try a different browser (Chrome/Firefox recommended)

### Mobile controls not working?
- Ensure touch events are enabled
- Try tapping directly on the joystick
- Use keyboard as fallback on desktop

## 📝 License

Made with ❤️ for Ariyike's birthday

## 🎉 Happy Birthday!

May this little virtual world bring a big smile to Ariyike's face! 🎂✨