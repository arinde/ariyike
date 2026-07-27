import { useState, useCallback } from 'react'

export const useGameState = () => {
  // Scene management
  const [currentScene, setCurrentScene] = useState('loading')
  // loading -> compound -> walkway -> door -> livingroom -> celebration -> photoshoot -> poster
  
  // User data collected throughout experience
  const [userData, setUserData] = useState({
    name: 'Ariyike',
    wish: '',
    age: '',
    photoTaken: false,
    selectedPose: null,
    posterGenerated: false
  })
  
  // Dialog states
  const [activeDialog, setActiveDialog] = useState(null)
  // null | 'wish' | 'age' | 'message' | 'photoshoot' | 'pose'
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  
  // Update user data
  const updateUserData = useCallback((updates) => {
    setUserData(prev => ({ ...prev, ...updates }))
  }, [])
  
  // Scene transitions
  const goToScene = useCallback((scene) => {
    setIsLoading(true)
    setLoadingText(getLoadingText(scene))
    
    setTimeout(() => {
      setCurrentScene(scene)
      setIsLoading(false)
    }, 1500)
  }, [])
  
  const getLoadingText = (scene) => {
    const texts = {
      compound: 'Entering the birthday compound...',
      walkway: 'Walking to the house...',
      door: 'Approaching the door...',
      livingroom: 'Entering the living room...',
      celebration: 'Preparing the celebration...',
      photoshoot: 'Setting up the photo shoot...',
      poster: 'Creating your birthday poster...'
    }
    return texts[scene] || 'Loading...'
  }
  
  // Show dialog
  const showDialog = useCallback((dialogType) => {
    setActiveDialog(dialogType)
  }, [])
  
  // Close dialog
  const closeDialog = useCallback(() => {
    setActiveDialog(null)
  }, [])
  
  // Handle wish submission
  const submitWish = useCallback((wish) => {
    updateUserData({ wish })
    closeDialog()
    goToScene('walkway')
  }, [updateUserData, closeDialog, goToScene])
  
  // Handle age submission
  const submitAge = useCallback((age) => {
    updateUserData({ age })
    closeDialog()
    goToScene('door')
  }, [updateUserData, closeDialog, goToScene])
  
  // Start photo shoot
  const startPhotoShoot = useCallback(() => {
    closeDialog()
    goToScene('photoshoot')
  }, [closeDialog, goToScene])
  
  // Skip photo shoot
  const skipPhotoShoot = useCallback(() => {
    closeDialog()
    goToScene('poster')
  }, [closeDialog, goToScene])
  
  // Complete photo shoot
  const completePhotoShoot = useCallback((pose) => {
    updateUserData({ 
      photoTaken: true, 
      selectedPose: pose 
    })
    goToScene('poster')
  }, [updateUserData, goToScene])
  
  return {
    currentScene,
    userData,
    activeDialog,
    isLoading,
    loadingText,
    goToScene,
    updateUserData,
    showDialog,
    closeDialog,
    submitWish,
    submitAge,
    startPhotoShoot,
    skipPhotoShoot,
    completePhotoShoot
  }
}