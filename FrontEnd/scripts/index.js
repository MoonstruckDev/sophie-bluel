import { closeToast, closeToastDuration, createToast } from './toasts.js';
import { getWorks, uploadPhoto, deleteWork } from './api.js';
import { goHome, isLoggedIn, postLogin, showStatus } from './login-flow.js';
import { displayWorks, updateGallery, resetWorks, gallery } from './works.js';
import { isAdmin, getBearerToken, logout } from './admin.js';
import { modalGallery } from './modal.js';


export {
    closeToast,
    closeToastDuration,
    createToast,
    getWorks,
    uploadPhoto,
    deleteWork, 
    goHome,
    isLoggedIn, 
    postLogin, 
    showStatus,
    displayWorks,
    updateGallery,
    resetWorks,
    isAdmin,
    getBearerToken,
    logout,
    gallery,
    modalGallery
  };