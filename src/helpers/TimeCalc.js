
export const timeCalc = (date) => {
    const diff= new Date(date) - new Date();
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
  
    if (diffHours < 24 && diffHours>-24) {
      return `${Math.abs(diffHours)} saat önce`;
    } else {
        
      return `${Math.abs(diffDays)} gün önce`;
    }
  };